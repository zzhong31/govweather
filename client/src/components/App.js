import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Searchbar from './Searchbar';
import WeatherPane from './WeatherPane';
import useWindowDimensions from './GetWindowSize';


const containerStyle = {
    backgroundColor: 'rgba(255,255,255,0.65)',
    minHeight: '50px'
}

export default () => {

    const { width } = useWindowDimensions();
    const [appLocation, setAppLocation] = useState({ paddingTop: '30vh' })
    const [locationResult, setLocationResult] = useState({});
    const [showDefaultDiv, setShowDefaultDiv] = useState(false);


    useEffect(() => {
        if (width < 768) {
            setAppLocation({ paddingTop: '2vh' })
        }
        else {
            setAppLocation({ paddingTop: '20vh' })
        }
    }, [width]);

    useEffect(() => {
        const getCurrentLocation = async () => {

            const { data } = await axios.get('/api/location/');
            setLocationResult(data);

            setShowDefaultDiv(true);
        }
        getCurrentLocation();
    }, [])

    const onFormSubmit = async (location) => {

        setLocationResult({})
        const { data } = await axios.get(`/api/place/${location}`);
        const { address_components, geometry } = data.result;
        const lookupCity = address_components.filter(result => result.types.includes('locality') && result.types.includes('political'));
        const lookupState = address_components.filter(result => result.types.includes('administrative_area_level_1') && result.types.includes('political'));
        const latLong = `${geometry.location.lat},${geometry.location.lng}`

        let cityDisplay = '';

        if (lookupCity.length > 0) {
            cityDisplay = lookupCity[0].long_name;
        }
        else {
            cityDisplay = address_components[0].long_name;
        }

        const locationResult = {
            city: cityDisplay,
            region: lookupState[0].long_name,
            loc: latLong
        }

        setLocationResult(locationResult);

    }

    return (
        <div>
            <div className="ui container" style={appLocation}>
                <h1 className="ui header center aligned">Obama's Forecast</h1>
                <Searchbar styleProp={containerStyle} onFormSubmit={onFormSubmit}></Searchbar>
            </div>
            {showDefaultDiv ?
                <div className="ui container" style={{ padding: "20px 0px" }}>
                    <WeatherPane
                        styleProp={containerStyle}
                        location={locationResult}
                    ></WeatherPane>
                </div>
                :
                null}

        </div>
    );
};