import { useContext, useEffect, useState } from "react";
import Select from 'react-select'
import axios from '../Components/AxiosFactory';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const Tickets = () => {
    //variables
    const [airports, setAirports] = useState([]);    
    const timeOptions = ([2, 4, 6, 8, 12, 16, 24, 48]);
    const [selectTimeOption, setSelectTimeOptions] = useState([]);
    
    //user defined variables
    const [selectedAirport, setSelectedAirport] = useState('');    
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [maxTravelTime, setMaxTravelTime] = useState(6)
    const [overnights, setOvernights] = useState(5);

    //methods
    useEffect(() => {
        setTimeVariables();
        getAirports();
    }, []);

    const setTimeVariables = () => {
        const options = timeOptions.map(time => ({
            "value": time,
            "label": time + " uur."
        }))
        setSelectTimeOptions(options)
    }

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
                if (airports) console.log('fetched data')
            }
            ).catch((e) => {
                console.log('Something went wrong fetching the data.  ' + e);
            })
    })
    
    //template
    return (
        <div className="wrapper">
            <div className="tickets">
                <h1>Tickets</h1>
                <p>Selecteer hieronder uw bestemming, datum en aantal personen waarme u op reis wilt.</p>

                <form>
                    <Select options={airports} onChange={(e)=> setSelectedAirport(e.value.toString())}></Select>
                    <h2>Vroegste datum heenreis:</h2>
                    <DatePicker selected={startDate} onChange={date => setStartDate(date)} />
                    <h2>Laatste datum terugreis:</h2>
                    <DatePicker selected={endDate} onChange={date => setEndDate(date)} />
                    <h2>Kies de maximale reistijd:</h2>
                    <Select options={selectTimeOption} onChange={(e)=> setMaxTravelTime(e.value)}></Select>

                    <label>
                        <h2>Vul het aantal overnachtingen in:</h2>
                        <input
                            type="number"
                            required
                            value={overnights}
                            onChange={(e)=> setOvernights(e.target.value)}
                        />
                    </label>
                    <div className="space">
                        <p>Ben je klaar met invullen? klik op de button hier onder.</p>
                        <p><button className='form-button'>Vind tickets</button></p>
                    </div>
                </form>
                <p>{selectedAirport}</p>
                <p>{startDate.toDateString()}</p>
                <p>{endDate.toDateString()}</p>
                <p>{maxTravelTime}</p>
                <p>{overnights}</p>

            </div>
        </div>
    );
}

export default Tickets;