import React, { useState, useEffect } from 'react';
import { Dropdown } from 'semantic-ui-react';

const countryOptions = [
    { key: 'af', value: 'af', flag: 'af', text: 'Afghanistan' },
    { key: 'ax', value: 'ax', flag: 'ax', text: 'Aland Islands' },
    { key: 'al', value: 'al', flag: 'al', text: 'Albania' },
    { key: 'dz', value: 'dz', flag: 'dz', text: 'Algeria' },
    { key: 'as', value: 'as', flag: 'as', text: 'American Samoa' },
    { key: 'ad', value: 'ad', flag: 'ad', text: 'Andorra' },
    { key: 'ao', value: 'ao', flag: 'ao', text: 'Angola' },
    { key: 'ai', value: 'ai', flag: 'ai', text: 'Anguilla' },
    { key: 'ag', value: 'ag', flag: 'ag', text: 'Antigua' },
    { key: 'ar', value: 'ar', flag: 'ar', text: 'Argentina' },
    { key: 'am', value: 'am', flag: 'am', text: 'Armenia' },
    { key: 'aw', value: 'aw', flag: 'aw', text: 'Aruba' },
    { key: 'au', value: 'au', flag: 'au', text: 'Australia' },
    { key: 'at', value: 'at', flag: 'at', text: 'Austria' },
    { key: 'az', value: 'az', flag: 'az', text: 'Azerbaijan' },
    { key: 'bs', value: 'bs', flag: 'bs', text: 'Bahamas' },
    { key: 'bh', value: 'bh', flag: 'bh', text: 'Bahrain' },
    { key: 'bd', value: 'bd', flag: 'bd', text: 'Bangladesh' },
    { key: 'bb', value: 'bb', flag: 'bb', text: 'Barbados' },
    { key: 'by', value: 'by', flag: 'by', text: 'Belarus' },
    { key: 'be', value: 'be', flag: 'be', text: 'Belgium' },
    { key: 'bz', value: 'bz', flag: 'bz', text: 'Belize' },
    { key: 'bj', value: 'bj', flag: 'bj', text: 'Benin' },
]

export default ({ styleProp, onFormSubmit }) => {

    const [selectedValue, setSelectedValue] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedTerm, setDebouncedTerm] = useState("");
    const [ options, setOptions ] = useState([]);

    const onChange = (e, {value}) =>{
        setSelectedValue(value)
        onFormSubmit(value);
    }

    const submitForm = (e) => {
        e.preventDefault();
        onFormSubmit(selectedValue);
    }

    useEffect(() => {
        const timerId = setTimeout(() => {
            setDebouncedTerm(searchTerm);
          }, 1000);
      
          return () => {
            clearTimeout(timerId);
          };
    },[searchTerm])

    useEffect(()=>{
        return null
    }, [debouncedTerm]);

    return (
        <div className="ui segment" style={styleProp}>
            <form className="ui form" onSubmit={submitForm} name="searchForm">
                <div className="inline fields" style={{ margin: '0px' }}>
                    <div className="sixteen wide field">
                        <div className="two wide" style={{ margin: '0px' }}>

                        </div>
                        <div className="twelve wide" style={{ width: "100%" }}>
                            <Dropdown
                                placeholder='Enter Location...'
                                fluid
                                search
                                selection
                                options={countryOptions}
                                value={selectedValue}
                                onChange={onChange}
                                onSearchChange={ (e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};


/*                            <button className="ui basic button">
                                <i style={{ margin: '0px' }} className="search icon"></i>
                            </button>*/



/*<input
                        type="text"
                        placeholder="Search City or Zipcode..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />*/