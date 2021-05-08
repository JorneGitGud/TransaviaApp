import { useContext, useEffect, useState } from "react";
import axios from '../Components/AxiosFactory';
const ResultList = (props) => {

    //variables
    const config = props.userChoices;
    const [dateSorted, setDatSorted] = useState(false)
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

    const sortArray = ((type) => {
        console.log('sorting')

        const types = {
            date: 'outboundDepDateTime',
            priceAsc: 'priceAllPassengers',
            priceDesc: 'priceAllPassengers',
        };

        if (type == 'date') {
            setResults(resultsCopy)
        }
        else {
            const sortProperty = types[type];
            const sorted = [...resultsCopy].sort((a, b) => b[sortProperty] - a[sortProperty]);
            if (type == 'priceAsc') {
                console.log('reverse')
                sorted.reverse();
            }
            setResults(sorted);
        }
    });

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
                }))
                setResults(options)
                setResulstCopy(options)
                setHasResults(true)
            })
            .catch((e) => {
                console.log('Something went wrong fetching the data.  ' + e);
            })
    })



    const printMyStuff = (() => {
        console.log(results)

    })

    //template
    return (
        <div className="Results">
            <div className="wrapper">
                <h1>Results</h1>
                <p><button onClick={printMyStuff}>print</button></p>
                <h2>sorteer op:</h2>
                <select onChange={(e) => setSortType(e.target.value)}>
                    <option value='dateAsc'> Datum</option>
                    <option value='priceAsc'> Prijs oplopend </option>
                    <option value='priceDesc'> Prijs aflopend</option>
                </select>
                {/* <button onClick={invertArray}>/\\/</button> */}
                {results.map(result => (
                    <div className="result-list" key={result.id}>
                        <h2>{`Prijs: ${result.priceAllPassengers}`}</h2>
                        <p>{`Heenreis: ${result.outboundDepDateTime}  => aankomst: ${result.outboundArrDateTime}`}</p>
                        <p>{`Terugreis: ${result.inboundDepDateTime}  => aankomst: ${result.inboundArrDateTime}`}</p>
                        <button>buy</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ResultList;