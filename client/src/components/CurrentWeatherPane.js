import React from 'react';
import WeatherCard from './WeatherCard';
import DetermineWeatherIcon from './DetermineWeatherIcon';
import InfoWeatherCard from './InfoWeatherCard';

export default ({ styleProp, forecasts, city, region, currentForecast }) => {
  const numKeys = Object.keys(forecasts).length;
  const numKeysCurrent = Object.keys(currentForecast).length;

  if (numKeys > 0 && numKeysCurrent > 0) {
    const currentTemp = currentForecast.temperature.values[0].value;

    //console.log(Math.round(currentTemp*9/5+32));

    if (!forecasts.noForecastReturned) {
      const renderedWeatherCard = forecasts[1];

      const { name, shortForecast, detailedForecast } = renderedWeatherCard;

      const determinedIcon = DetermineWeatherIcon(shortForecast, name);

      const formattedShortForecast = shortForecast.replace(
        'Thunderstorms',
        'T-storms'
      );

      const weatherPaneHeader = `${city}, ${region}`;

      return (
        <div className="ui segment" style={styleProp}>
          <div className="ui header">{weatherPaneHeader}</div>
          <div className="ui three stackable cards">
            <WeatherCard
              displayMessage={name}
              temperature={`${Math.round(
                (currentTemp * 9) / 5 + 32
              )} °F (${Math.round(currentTemp)} °C)`}
              shortForecast={formattedShortForecast}
              weatherIcon={determinedIcon}
            ></WeatherCard>
            <InfoWeatherCard currentForecast={currentForecast} />
            <div className="ui card">
              <div className="content">
                <div className="description">{detailedForecast}</div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  } else {
    return null;
  }
};
