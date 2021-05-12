import { useEffect, useState } from "react";
import Select from 'react-select'
import axios from '../Components/AxiosFactory';
import DatePicker from "react-datepicker";
import ResultList from '../Components/ResultList'

import "react-datepicker/dist/react-datepicker.css";

const Tickets = () => {
    //variables logic
    const [airports, setAirports] = useState([]);
    const timeOptions = ([0, 2, 4, 6, 8, 12, 16, 24, 48]);
    const [selectTimeOption, setSelectTimeOptions] = useState([]);
    const [showResultList, setShowResultList] = useState(false)

    //user defined variables
    const [selectedOriginAirport, setSelectedOriginAirport] = useState('AMS');
    const [selectedDestinationAirport, setSelectedDestinationAirport] = useState('AGP');
    const [firstDepartureDate, setfirstDepartureDate] = useState(new Date());
    const [lastDepartureDate, setlastDepartureDate] = useState(new Date(firstDepartureDate.getFullYear(), firstDepartureDate.getMonth() + 1, firstDepartureDate.getDate() - 1));
    const [minTravelTime, setMinTravelTime] = useState(0)
    const [maxTravelTime, setMaxTravelTime] = useState(48)
    const [overnights, setOvernights] = useState(1);
    const [userChoices, setUserChoices] = useState([])

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
        setShowResultList(false)
        setUserChoices({
            params: {
                origin: selectedOriginAirport,
                destination: selectedDestinationAirport,
                originDepartureDate: parseDate(firstDepartureDate) + '-' + parseDate(lastDepartureDate),
                daysAtDestination: overnights,
                minTravelTime: minTravelTime,
                maxTravelTime: maxTravelTime
            }
        })
        setShowResultList(true)
    });
    //this function is where the scope of the project ends. 
    const handleBuyTickets = (() => {
        console.log("You have succesfully navigated to the end of this project. Well done!")
    })

    //template
    return (
        <div>
            <div className="wrapper">
                <div className="tickets">

                    {!showResultList ?
                        <div className="search-field">
                            <h1>Tickets</h1>
                            <p>Selecteer hieronder uw bestemming, datum en aantal personen waarme u op reis wilt.</p>

                            <h2>Thuis Luchthaven:</h2>
                            <Select options={airports} onChange={(e) => setSelectedOriginAirport(e.value)}></Select>
                            <h3>standaard Amsterdam, Nederland</h3>

                            <h2>Bestemming Luchthaven:</h2>
                            <Select options={airports} onChange={(e) => setSelectedDestinationAirport(e.value)}></Select>
                            <h3>standaard Malaga, Spanje</h3>

                            <h2>Kies de minimale reistijd:</h2>
                            <Select options={selectTimeOption} onChange={(e) => setMinTravelTime(e.value)}></Select>
                            <h3>standaard 0 uur</h3>

                            <h2>Kies de maximale reistijd:</h2>
                            <Select options={selectTimeOption} onChange={(e) => setMaxTravelTime(e.value)}></Select>
                            <h3>standaard 48 uur</h3>

                            <h2>Vertrek tussen:</h2>
                            <DatePicker dateFormat="yyyy/MM/dd" selected={firstDepartureDate} onChange={date => setfirstDepartureDate(date)} />
                            <DatePicker dateFormat="yyyy/MM/dd" selected={lastDepartureDate} onChange={date => setlastDepartureDate(date)} />
                            <h3>Maximaal 30 dagen.</h3>

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
                                <p><button onClick={handleFindTickets}>Vind tickets</button></p>
                            </div>
                        </div>

                        : <div className="space">
                            <p><button onClick={() => {
                                window.location.reload()
                            }}>Zoek opnieuw</button></p>
                        </div>}
                </div>
            </div>
            {showResultList && <ResultList userChoices={userChoices} myFunction={handleBuyTickets} />}
        </div>
    );
}

export default Tickets;