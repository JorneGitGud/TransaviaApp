import { useEffect, useState } from "react";
import Select from 'react-select'
import axios from '../Components/AxiosFactory';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const SearchOption = (props) => {
    //variables logic
    const [airports, setAirports] = useState([]);
    const timeOptions = ([0, 2, 4, 6, 8, 12, 16, 24, 48]);
    const [selectTimeOption, setSelectTimeOptions] = useState([]);

    //user defined variables
    const [selectedOriginAirport, setSelectedOriginAirport] = useState('AMS');
    const [selectedDestinationAirport, setSelectedDestinationAirport] = useState('AGP');
    const [firstDepartureDate, setfirstDepartureDate] = useState(new Date());
    const [lastDepartureDate, setlastDepartureDate] = useState(new Date(firstDepartureDate.getFullYear(), firstDepartureDate.getMonth(), firstDepartureDate.getDate() + 10));
    const [minTravelTime, setMinTravelTime] = useState(0)
    const [maxTravelTime, setMaxTravelTime] = useState(48)
    const [overnights, setOvernights] = useState(1);

    //methods
    useEffect(() => {
        setTimeVariables();
        getAirports();
    }, []);
    //sets selectedTimeOption which are used by the select travel time dropdown buttons.
    const setTimeVariables = (() => {
        const options = timeOptions.map(time => ({
            "value": time,
            "label": time + " uur."
        }))
        setSelectTimeOptions(options)
    });
    //this method parses the date to a format that kan be send to the api
    const parseDate = ((date) => {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join('');
    })
    //fetches the list of airports which are use to fill in the select airport dropdown buttons.
    const getAirports = (() => {
        axios.get(`https://api.transavia.com/v2/airports/`)
            .then(res => {
                const data = res.data;
                const options = data.map(data => ({
                    "value": data.id,
                    "label": data.name + ", " + data.country.name
                }))
                setAirports(options)
            })
            .then(() => {
            }
            ).catch((e) => {
                console.log('Something went wrong fetching the data.  ' + e);
            })
    });
    //this method sets the Params for the api, this object is given to the ResultsList component
    const handleFindTickets = (() => {
        const userChoices = {
            params: {
                origin: selectedOriginAirport,
                destination: selectedDestinationAirport,
                originDepartureDate: parseDate(firstDepartureDate) + '-' + parseDate(lastDepartureDate),
                daysAtDestination: overnights,
                minTravelTime: minTravelTime,
                maxTravelTime: maxTravelTime
            }
        }              
        props.onShowResultComponent(userChoices) 
    });
   
    //checks if the dates are valid, not more then 30 days and no less then 1
    const dateCheck = (() => {
        if (Math.ceil((Math.abs(firstDepartureDate.getTime() - lastDepartureDate.getTime()) / (1000 * 3600 * 24))) > 30) { return false };
        if (Math.ceil((Math.abs(firstDepartureDate.getTime() - lastDepartureDate.getTime()) / (1000 * 3600 * 24))) < 1) return false;
        else { return true }
    })



    return (<div className="wrapper">
        <div className="tickets">
            <div className="search-field">
                <h1>Tickets</h1>
                <p>Selecteer hieronder uw bestemming, datum en aantal personen waarme u op reis wilt.</p>

                <h2>Thuis Luchthaven:</h2>
                <Select options={airports} onChange={(e) => setSelectedOriginAirport(e.value)}></Select>
                <h3>standaard Amsterdam, Nederland</h3>

                <h2>Bestemming Luchthaven:</h2>
                <Select options={airports} onChange={(e) => setSelectedDestinationAirport(e.value)}></Select>
                <h3>standaard Malaga, Spanje</h3>

                {selectedOriginAirport === selectedDestinationAirport && <div className="warning"><h1>Ongeldige invoer luchthaven data</h1></div>}

                <h2>Kies de minimale reistijd:</h2>
                <Select options={selectTimeOption} onChange={(e) => setMinTravelTime(e.value)}></Select>
                <h3>standaard 0 uur</h3>

                <h2>Kies de maximale reistijd:</h2>
                <Select options={selectTimeOption} onChange={(e) => setMaxTravelTime(e.value)}></Select>
                <h3>standaard 48 uur</h3>
                {maxTravelTime < minTravelTime && <div className="warning"><h1>Ongeldige invoer reistijd</h1></div>}
                <h2>Vertrek tussen:</h2>
                <DatePicker dateFormat="yyyy/MM/dd" selected={firstDepartureDate} onChange={date => setfirstDepartureDate(date)} />
                <DatePicker dateFormat="yyyy/MM/dd" selected={lastDepartureDate} onChange={date => setlastDepartureDate(date)} />
                <h3>Maximaal 30 dagen.</h3>
                {!dateCheck() && <div className="warning"><h1>Ongeldige invoer vetrek data</h1></div>}

                <h2>Vul het aantal overnachtingen in:</h2>
                <input
                    type="number"
                    required
                    value={overnights}
                    onChange={(e) => setOvernights(e.target.value)}
                />
                {overnights < 1 && <div className="warning"><h1>Ongeldige invoer overnachtingen</h1></div>}
                <div className="space">
                    <p>Ben je klaar met invullen? klik op de button hier onder.</p>
                    <p><button onClick={handleFindTickets}>Vind tickets</button></p>
                </div>
            </div>
        </div>
    </div>);
}

export default SearchOption;