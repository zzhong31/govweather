import React from 'react';

export default ({ currentForecast }) => {

    return <div className="ui card">
        <div className="content">
            <div className="ui small feed">
                <div className="event">
                    <div className="content">
                        <div className="summary">
                            <span className="right floated">Humidity: {currentForecast.relativeHumidity.values[0].value}%</span>
                            <span>Dewpoint: {Math.round(currentForecast.dewpoint.values[0].value)} °C</span>
                        </div>
                        <div className="summary">
                            <span className="right floated">Wind Direction: {currentForecast.windDirection.values[0].value} °</span>
                            <span>Wind Speed: {Math.round(currentForecast.windSpeed.values[0].value)} km/h</span>
                        </div>
                        <div className="summary">
                            <span className="right floated">Sky Cover: {currentForecast.skyCover.values[0].value} %</span>
                            <span >Chance of Rain: {currentForecast.probabilityOfPrecipitation.values[0].value} %</span>                            
                        </div>
                        <div className="summary">
                            <span >Heat Index: {Math.round(currentForecast.heatIndex.values[0].value)} °C</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}