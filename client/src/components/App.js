import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Searchbar from './Searchbar';
import WeatherPane from './WeatherPane';
import useWindowDimensions from './GetWindowSize';
import { Item } from 'semantic-ui-react';


const containerStyle = {
    backgroundColor: 'rgba(255,255,255,0.65)',
    minHeight: '100px'
}

export default () => {

    const { width } = useWindowDimensions();
    const [appLocation, setAppLocation] = useState({ paddingTop: '30vh' })
    const [locationResult, setLocationResult] = useState({});
    const [showDefaultDiv, setShowDefaultDiv] = useState(false);
    //const [selectedLocation, setSelectedLocation] = useState({});
    //const [loading, setLoading] = useState(true);


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
            console.log(data);
            /*if ( initialLocation.loc==="failed"){
                window.navigator.geolocation.getCurrentPosition(
                    async (position) => {
                        const latlong = `${position.coords.latitude},${position.coords.longitude}`
                        const reverseLookupResults = await axios.get('https://maps.googleapis.com/maps/api/geocode/json?latlng='+latlong+'&key='+apiKeys.googleAPI())
                        
                        const bestResults = reverseLookupResults.data.results[0].address_components;
    
                        const lookupCity = bestResults.filter(result => result.types.includes('locality')&&result.types.includes('political'));
                        const lookupState = bestResults.filter(result => result.types.includes('administrative_area_level_1')&&result.types.includes('political'));                          
    
                        result = {
                            city: lookupCity[0].long_name,
                            region: lookupState[0].long_name,
                            loc: latlong
                        }
                    },
                    (err) => result = { loc: 'failed'}
                    )
            }
            else{
                setLocationResult(data);
            }*/
        }
        //setUnableToDetermineLocation(true)
        getCurrentLocation();
    }, [])

    const onFormSubmit = (location) => {
        console.log(`${location} selected`);
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