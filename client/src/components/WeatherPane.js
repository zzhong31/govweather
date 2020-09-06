import React from 'react';

import WeatherCard from './WeatherCard';
import DetermineWeatherIcon from './DetermineWeatherIcon'

export default ({ styleProp, forecasts, city, region }) => {

  
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
                    const renderedWeatherCards = forecasts.slice(1, 7).map((forecast, index) => {

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

                return (

                    <div className="ui segment" style={styleProp}>
                        <React.Fragment>
                            <div className="ui six stackable cards" style={{paddingTop: '15px'}}>
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