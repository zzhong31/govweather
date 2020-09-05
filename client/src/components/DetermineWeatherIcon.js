export default (shortForecast, timePeriod)=>{
    let icon = "";
    const description = shortForecast.toLowerCase();
    
    if(timePeriod.includes("Night") || timePeriod.includes("Tonight"))
    {
        if (description.includes('thunderstorm')){
            icon = 'wi-night-alt-lightning';
        }
        else if (description.includes('cloudy')){
            icon = 'wi-night-alt-cloudy';
        }
        else if (description.includes('rain')){
            icon = 'wi-night-alt-rain-wind';
        }
        else if (description.includes('shower')){
            icon = 'wi-night-alt-showers';
        }
        else if (description.includes('hail')){
            icon = 'wi-night-alt-hail';
        }
        else{
            icon = 'wi-night-clear'
        }
        
    }
    else{
        if (description.includes('thunderstorm')){
            icon = 'wi-day-lightning';
        }
        else if (description.includes('cloudy')){
            icon = 'wi-day-cloudy';
        }
        else if (description.includes('rain')){
            icon = 'wi-day-rain';
        }
        else if (description.includes('shower')){
            icon = 'wi-day-sprinkle';
        }
        else if (description.includes('hail')){
            icon = 'wi-day-hail';
        }
        else{
            icon = 'wi-day-sunny'
        }
    }
    return icon  
}