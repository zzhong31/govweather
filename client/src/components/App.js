import React, { useState, useEffect } from 'react';
import axios from 'axios';

import CurrentWeatherPane from './CurrentWeatherPane';
import Searchbar from './Searchbar';
import WeatherPane from './WeatherPane';
import useWindowDimensions from './GetWindowSize';

const containerStyle = {
  backgroundColor: 'rgba(255,255,255,0.65)',
  minHeight: '50px'
};

export default () => {
  const { width } = useWindowDimensions();
  const [appLocation, setAppLocation] = useState({ paddingTop: '30vh' });
  const [locationResult, setLocationResult] = useState({});
  const [showDefaultDiv, setShowDefaultDiv] = useState(false);
  const [forecasts, setForecasts] = useState({});
  const [locationLabel, setLocationLabel] = useState({});
  const [numericLocationResult, setNumericLocationResult] = useState({});
  const [showRefreshPrompt, setShowRefreshPrompt] = useState(false);

  useEffect(() => {
    if (width < 768) {
      setAppLocation({ paddingTop: '7vh' });
    } else {
      setAppLocation({ paddingTop: '10vh' });
    }
  }, [width]);

  useEffect(() => {
    const getCurrentLocation = async () => {
      const { data } = await axios.get('/api/location/');

      setLocationResult(data);
    };
    getCurrentLocation();
  }, []);

  const onFormSubmit = async (location) => {
    setLocationResult({});

    const { data } = await axios.get(`/api/place/${location}`);

    const { address_components, geometry } = data.result;
    const lookupCity = address_components.filter(
      (result) =>
        result.types.includes('locality') && result.types.includes('political')
    );
    const lookupState = address_components.filter(
      (result) =>
        result.types.includes('administrative_area_level_1') &&
        result.types.includes('political')
    );
    const latLong = `${geometry.location.lat},${geometry.location.lng}`;

    let cityDisplay = '';

    if (lookupCity.length > 0) {
      cityDisplay = lookupCity[0].long_name;
    } else {
      cityDisplay = address_components[0].long_name;
    }

    const locationResult = {
      city: cityDisplay,
      region: lookupState[0].long_name,
      loc: latLong
    };

    setLocationResult(locationResult);
  };

  useEffect(() => {
    const { city, region, loc } = locationResult;

    const getLocationData = async () => {
      setShowDefaultDiv(true);
      let locationData = {};
      try {
        locationData = await axios.get('https://api.weather.gov/points/' + loc);
      } catch (err) {
        setShowDefaultDiv(false);
        setShowRefreshPrompt(true);
        return null;
      }

      const { data } = locationData;

      if (data.properties.forecast) {
        const forecastData = await axios.get(data.properties.forecast);
        const numericForecastData = await axios.get(
          data.properties.forecastGridData
        );

        const forecastResults = forecastData.data.properties.periods;

        setForecasts(forecastResults);
        setNumericLocationResult(numericForecastData.data.properties);

        setLocationLabel({
          city,
          region
        });
      } else {
        setForecasts({
          noForecastReturned: true
        });
      }
    };

    if (Object.keys(locationResult).length > 0) {
      getLocationData();
    } else {
      setForecasts({});
    }
  }, [locationResult]);

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      <div className="ui fixed inverted menu">
        <div className="ui container">
          <a className="header item" href="./">
            Home
          </a>
        </div>
      </div>
      <div
        className="spacer"
        style={{
          width: '100%',
          height: '5%'
        }}
      >
        &nbsp;
      </div>
      <div
        style={{
          paddingBottom: '35px',
          minHeight: '100%'
        }}
      >
        <div className="ui container" style={appLocation}>
          <h1 className="ui header center aligned">Simply Weather</h1>
          <Searchbar
            styleProp={containerStyle}
            onFormSubmit={onFormSubmit}
          ></Searchbar>
        </div>
        {showDefaultDiv ? (
          <div>
            <div className="ui container" style={{ padding: '20px 0px' }}>
              <CurrentWeatherPane
                styleProp={containerStyle}
                location={locationResult}
                forecasts={forecasts}
                city={locationLabel.city}
                region={locationLabel.region}
                currentForecast={numericLocationResult}
              ></CurrentWeatherPane>
            </div>
            <div className="ui container" style={{ paddingBottom: '20px' }}>
              <WeatherPane
                styleProp={containerStyle}
                location={locationResult}
                forecasts={forecasts}
                city={locationLabel.city}
                region={locationLabel.region}
              ></WeatherPane>
            </div>
          </div>
        ) : null}
        {showRefreshPrompt ? (
          <div>
            <div className="ui container" style={{ padding: '20px 0px' }}>
              <div className="ui segment">
                <div className="ui header">
                  The Weather.gov failed to return a result. Please refresh the
                  page, as this is usually because of the dyno starting up from
                  the web host from idle.
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>

      <div
        className="ui inverted vertical footer segment"
        style={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          height: '35px',
          paddingTop: '7px'
        }}
      >
        <div className="ui center aligned container">
          <div className="ui horizontal inverted small divided link list">
            <a className="item" href="http://www.github.com/zzhong31">
              Zhenyu Zhong | 2020
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
