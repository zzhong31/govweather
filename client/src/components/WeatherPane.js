import React, { useState, useEffect } from 'react';
import axios from 'axios';

import WeatherCard from './WeatherCard';
import DetermineWeatherIcon from './DetermineWeatherIcon'

export default ({ styleProp, location }) => {

    const { city, region, loc } = location;

    const [forecasts, setForecasts] = useState({});

    useEffect(() => {

        const getLocationData = async () => {

            const locationData = await axios.get("https://api.weather.gov/points/" + loc)
            const { data } = locationData;

            if (data.properties.forecast) {
                const forecastData = await axios.get(data.properties.forecast);

                const forecastResults = forecastData.data.properties.periods;

                setForecasts(forecastResults);
            }
            else {
                setForecasts({
                    noForecastReturned: true
                })
            }
        }

        if (loc) {
            getLocationData();
        }
        else {
            setForecasts({});
        }

    }, [loc]);

    const numKeys = Object.keys(forecasts).length;

    const showWeatherPane = () => {
        if (numKeys > 0) {

            if (forecasts.noForecastReturned) {
                return <div className="ui segment center aligned">
                <React.Fragment>
                    <div className="ui header">
                        No forecast was returned. This is an issue with certain cities in Alaska.
                    </div>
                </React.Fragment>
            </div>
            }
            else {
                const renderedWeatherCards = forecasts.slice(0, 6).map((forecast, index) => {

                    const { name, temperature, shortForecast } = forecast;

                    const determinedIcon = DetermineWeatherIcon(shortForecast, name);

                    const formattedShortForecast = shortForecast.replace("Thunderstorms", "T-storms")

                    return (
                        <React.Fragment key={index}>
                            <WeatherCard
                                displayMessage={name}
                                temperature={temperature + ' °F'}
                                shortForecast={formattedShortForecast}
                                weatherIcon={determinedIcon}
                            >
                            </WeatherCard>
                        </React.Fragment>
                    );
                });

                let weatherPaneHeader = '';
                if (city && region) {
                    weatherPaneHeader = `${city}, ${region}`
                }

                return (

                    <div className="ui segment" style={styleProp}>
                        <React.Fragment>
                            <div className="ui header">
                                {weatherPaneHeader}
                            </div>
                            <div className="ui six stackable cards">
                                {renderedWeatherCards}
                            </div>
                        </React.Fragment>
                    </div>
                );
            }
        }
        else {
            const loadingStyle = {
                backgroundColor: styleProp.backgroundColor,
                minHeight: '80px'
            };

            return <div className="ui segment" style={loadingStyle}>
                <div className="ui active inverted dimmer">
                    <div className="ui text loader">Loading</div>
                </div>
            </div>
        }


    }

    return (
        <div>
            {showWeatherPane()}
        </div>

    )
};