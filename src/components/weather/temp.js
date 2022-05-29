import React, { useEffect, useState } from 'react';
import WeatherCard from './weathercard';
import './style.css';

const Temp = () => {

    const [searchValue, setSearchValue] = useState("pune");
    const [tempInfo, setTempInfo] = useState({});

    // whole API fetching in ths function.

    const getWeatherInfo = async () => {

        // try for the API and if found error catch will execute.

        try {

            // API url stored in varible so that we can fettch and convert to JSON file.

            let url =`https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=8528eeaec8f4e91a26022b8b2e9c3a24`

            const res = await fetch(url)
            const data = await res.json()

            // console.log(data);

            const {temp, humidity, pressure} = data.main;
            const{main: weathermood} = data.weather[0];
            const{name} = data;
            const{speed} = data.wind;
            const{country, sunset} = data.sys;

            const myNewWeatherInfo = {
                temp,
                humidity,
                pressure,
                weathermood,
                name,
                speed,
                country,
                sunset
            }

            setTempInfo(myNewWeatherInfo);

        } catch (error) {
            console.log(error);
        }
    };

    useEffect (() => {
        getWeatherInfo();
    }, [])

    return (
        <>
            {/* Search Bar */}

            <div className="wrap">
                <div className="search">
                    <input type="search"
                        placeholder='search...'
                        autoFocus
                        id='search'
                        className='searchTerm'
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)} />

                    <button
                        className="searchButton"
                        type='button'
                        onClick={getWeatherInfo}>
                        Search
                    </button>
                </div>
            </div>
            <WeatherCard tempInfo = {tempInfo}/>
        </>
    )
}

export default Temp
