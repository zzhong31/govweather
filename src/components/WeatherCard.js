import React from 'react';
import '../css/weather-icons.min.css';

export default ({ displayMessage, temperature, shortForecast, weatherIcon }) => {


    return (

        <div className="ui card">
            <div className="content">
                <i style={{ fontSize: '42px' }} 
                className={`right floated mini ui wi ${weatherIcon}`}></i>
                <div className="header middle aligned">
                    {temperature}
                </div>
                <div className="meta">
                    <span className="date">
                        {shortForecast}
                    </span>
                </div>

            </div>
            <div className="extra content">
                <div className="description" style={{ marginTop: '2px' }}>
                    {displayMessage}
                </div>
            </div>
        </div>
    );
};