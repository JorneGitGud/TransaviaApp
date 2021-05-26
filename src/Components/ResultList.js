// this class gets and displays the results from the userChoises made in Tickets.js
import { useEffect, useState } from "react";
import axios from '../Components/AxiosFactory';
const ResultList = (props) => {

    //variables
    const config = props.userChoices;
    const [results, setResults] = useState([])
    const [resultsCopy, setResulstCopy] = useState([])
    const [hasResults, setHasResults] = useState(false)
    const [sortType, setSortType] = useState('');
    //methods    
    useEffect(() => {
        if (!hasResults) {
            getTickets()
        }
        sortArray(sortType);
    }, [sortType]);
    //sorts the results array
    const sortArray = ((type) => {
        const types = {
            date: 'outboundDepDateTime',
            priceAsc: 'priceAllPassengers',
            priceDesc: 'priceAllPassengers',
        };

        if (type === 'date') {
            setResults(resultsCopy)
        }
        else {
            const sortProperty = types[type];
            const sorted = [...resultsCopy].sort((a, b) => b[sortProperty] - a[sortProperty]);
            if (type === 'priceAsc') {
                sorted.reverse();
            }
            setResults(sorted);
        }
    });
    //gets tickets from api
    const getTickets = (() => {
        axios.get('https://api.transavia.com/v1/flightoffers/?', config)
            .then(res => {
                const data = res.data;
                const options = data.flightOffer.map(data => ({
                    "id": data.outboundFlight.id + '-' + data.inboundFlight.id,
                    "destination": data.outboundFlight.arrivalAirport.locationCode,
                    "origin": data.outboundFlight.departureAirport.locationCode,
                    "pricePerPassenger": data.pricingInfoSum.totalPriceOnePassenger,
                    "priceAllPassengers": data.pricingInfoSum.totalPriceAllPassengers,
                    "inboundArrDateTime": data.inboundFlight.arrivalDateTime,
                    "inboundDepDateTime": data.inboundFlight.departureDateTime,
                    "outboundArrDateTime": data.outboundFlight.arrivalDateTime,
                    "outboundDepDateTime": data.outboundFlight.departureDateTime,
                    "travelTimeOutbound": Math.round(Math.floor(Date.parse(data.outboundFlight.arrivalDateTime) - Date.parse(data.outboundFlight.departureDateTime)) / 3600000),
                    "travelTimeInbound": Math.round(Math.floor(Date.parse(data.inboundFlight.arrivalDateTime) - Date.parse(data.inboundFlight.departureDateTime)) / 3600000)
                }))
                setResults(options)
                setResulstCopy(options)
                setHasResults(true)
            })
            .catch((e) => {
                console.log('Something went wrong fetching the data.  ' + e);
            })
    })
    //Filters results based on selected traveltime range.
    const shouldShow = ((res) => {
        if ((
            res.travelTimeInbound < config.params.maxTravelTime || res.travelTimeOutbound < config.params.maxTravelTime)
            &&
            (res.travelTimeInbound > config.params.minTravelTime || res.travelTimeOutbound > config.params.minTravelTime)) {
            return true;
        }
        else {
            return false;
        }
    })
    //template
    return (
        <div className="Results">
            <div className="wrapper result-list">
                {
                    resultsCopy.length > 0
                        ? <div>
                            <h1>Resultaten {results.length}</h1>
                            <h3>Resultaten die niet aan uw zoekopdracht voldoen worden niet weergegeven</h3>
                            <h2>sorteer op:</h2>
                            <select onChange={(e) => setSortType(e.target.value)}>
                                <option value='dateAsc'> Datum</option>
                                <option value='priceAsc'> Prijs oplopend </option>
                                <option value='priceDesc'> Prijs aflopend</option>
                            </select>
                            {results.map(result => (
                                <div key={result.id}>
                                    { shouldShow(result) &&
                                        <div>
                                            <h2>{`Prijs: ${result.priceAllPassengers}`}</h2>
                                            <p>{`Vanaf: ${result.origin}`}</p>
                                            <p>{`Naar: ${result.destination}`}</p>
                                            <p>{`Heenreis: ${result.outboundDepDateTime.substring(0, 10)} om: ${result.outboundDepDateTime.substring(11, 20)}`}</p>
                                            <p>{`Aankomst: ${result.outboundArrDateTime.substring(0, 10)} om: ${result.outboundArrDateTime.substring(11, 20)}`}</p>
                                            <p>{`reisduur: ${result.travelTimeOutbound}`}</p>
                                            <p>{`Terugreis: ${result.inboundDepDateTime.substring(0, 10)} om: ${result.inboundDepDateTime.substring(11, 20)}`}</p>
                                            <p>{`Aankomst: ${result.inboundArrDateTime.substring(0, 10)} om: ${result.inboundArrDateTime.substring(11, 20)}`}</p>
                                            <p>{`reisduur: ${result.travelTimeInbound} uur.`}</p>
                                            <button>buy</button>
                                        </div>}
                                </div>
                            ))}
                        </div>
                        :
                        <div>
                            <h1>Resultaten: {results.length}</h1>
                            <p>Pas de zoek parameters aan en probeer het opnieuw.</p>
                        </div>}
            </div>
        </div>
    );
}

export default ResultList;