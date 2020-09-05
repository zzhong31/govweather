import React, { useState, useEffect } from 'react';
import { Dropdown } from 'semantic-ui-react';
import axios from 'axios';

import googleLogo from '../images/powered_by_google_on_white.png'

export default ({ styleProp, onFormSubmit }) => {

    const [selectedValue, setSelectedValue] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedTerm, setDebouncedTerm] = useState("");
    const [options, setOptions] = useState([]);
    const [noResultsMessage, setNoResultsMessage] = useState(null);
    const [loading, setLoading] = useState(false);

    const onChange = (e, data) => {
        setSelectedValue(data.value)
        onFormSubmit(data.value);
    }

    const onSearchChange = (e) =>{
        setSearchTerm(e.target.value)
        if(noResultsMessage){
            setNoResultsMessage(null);
        }
    }

    const submitForm = (e) => {
        e.preventDefault();
        onFormSubmit(selectedValue);
    }

    useEffect(() => {
        const timerId = setTimeout(() => {
            setDebouncedTerm(searchTerm);
        }, 750);

        return () => {
            clearTimeout(timerId);
        };
    }, [searchTerm])

    useEffect(() => {
        
        const executeQuerySearch = async () => {
            setLoading(true);
            const { data } = await axios.get(`/api/location/${encodeURIComponent(debouncedTerm)}`);
            setLoading(false);
            if (data.predictions.length > 0) {
                const formattedResults = data.predictions.map((prediction) => {
                    return {
                        text: prediction.description,
                        key: prediction.place_id,
                        value: prediction.place_id
                    }
                })
                setOptions(formattedResults)
            }
            else {
                setOptions([])
            }
            setNoResultsMessage('No Results Found');
        }
        if (debouncedTerm) {            
            
            executeQuerySearch()
            
        }
    }, [debouncedTerm]);

    const searchBarStyle = {
        backgroundColor: styleProp.backgroundColor,
        minHeight: styleProp.minHeight,
        paddingBottom: '3px'
    }

    return (
        <div className="ui segment right aligned" style={searchBarStyle}>
            <form className="ui form" onSubmit={submitForm} name="searchForm">
                <Dropdown
                    placeholder='Enter Location...'
                    fluid
                    search
                    selection
                    options={options}
                    value={selectedValue}
                    onChange={onChange}
                    onSearchChange={onSearchChange}
                    noResultsMessage={noResultsMessage}
                    loading={loading}
                />
            </form>
            <div className="ui" style={{marginTop:'10px'}} >
                <img className="" src={googleLogo} alt='powered by Google' />
            </div>

        </div>
    );
};
