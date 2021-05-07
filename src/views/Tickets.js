import { useContext, useEffect, useState } from "react";
import Select from 'react-select'
import axios from '../Components/AxiosFactory';
import DatePicker from "react-datepicker";
import ResultList from '../Components/ResultList'

import "react-datepicker/dist/react-datepicker.css";

const Tickets = () => {
    //variables
    const [airports, setAirports] = useState([]);
    const timeOptions = ([2, 4, 6, 8, 12, 16, 24, 48]);
    const [selectTimeOption, setSelectTimeOptions] = useState([]);

    //user defined variables
    const [selectedAirport, setSelectedAirport] = useState();
    const [firstDepartureDate, setfirstDepartureDate] = useState(new Date());
    const [lastDepartureDate, setlastDepartureDate] = useState(new Date());
    const [maxTravelTime, setMaxTravelTime] = useState(24)
    const [overnights, setOvernights] = useState(5);
    const [userChoices, setUserChoices] = useState([])
    //methods
    useEffect(() => {
        setTimeVariables();
        getAirports();
        setUserChoices();
    }, []);

    const setTimeVariables = (() => {
        const options = timeOptions.map(time => ({
            "value": time,
            "label": time + " uur."
        }))
        setSelectTimeOptions(options)
    });
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
    const handleFindTickets = (() => {
        setUserChoices([{
            selectedAirport: selectedAirport,
            firstDepartureDate: firstDepartureDate,
            lastDepartureDate: lastDepartureDate,
            maxTravelTime: maxTravelTime,
            overnights: overnights
        }])
    });

    const printMyStuff = (() => {
        // console.log(airports)
        //console.log(Date.parse(firstDepartureDate))
        console.log(firstDepartureDate)
        console.log(parseDate(firstDepartureDate))
    })

    const handleBuyTickets = (() => {

    })

    //template
    return (
        <div>
            <div className="wrapper">
                <div className="tickets">
                    <h1>Tickets</h1>
                    <p>Selecteer hieronder uw bestemming, datum en aantal personen waarme u op reis wilt.</p>


                    <Select options={airports} onChange={(e) => setSelectedAirport(e.value)}></Select>
                    <h2>Vertrek tussen:</h2>
                    <DatePicker dateFormat="yyyy/MM/dd" selected={firstDepartureDate} onChange={date => setfirstDepartureDate(date)} />
                        /* fix Spacing */
                    <DatePicker dateFormat="yyyy/MM/dd" selected={lastDepartureDate} onChange={date => setlastDepartureDate(date)} />
                    <h2>Kies de maximale reistijd:</h2>
                    <Select options={selectTimeOption} onChange={(e) => setMaxTravelTime(e.value)}></Select>

                    <label>
                        <h2>Vul het aantal overnachtingen in:</h2>
                        <input
                            type="number"
                            required
                            value={overnights}
                            onChange={(e) => setOvernights(e.target.value)}
                        />
                    </label>
                    <div className="space">
                        <p>Ben je klaar met invullen? klik op de button hier onder.</p>
                        <p><button className='form-button' onClick={handleFindTickets}>Vind tickets</button></p>
                        <p><button className='form-button' onClick={printMyStuff}>print</button></p>
                    </div>
                </div>
            </div>
            {userChoices && <ResultList userChoices={userChoices} myFunction={handleBuyTickets} />}

        </div>

    );
}

export default Tickets;