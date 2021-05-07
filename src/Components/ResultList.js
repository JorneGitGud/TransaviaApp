import { useContext, useEffect, useState } from "react";
import axios from '../Components/AxiosFactory';
const ResultList = (props) => {
   
    //variables
    const userData = props;
    const config ={params: { origin: 'AMS', destination: 'AGP', originDepartureDate: '20210630-20210710',
    daysAtDestination: '5' }}
    const [results, setResults] = useState([])
    const [hasResults, setHasResults] = useState(false)
    //methods


    useEffect(() => {
       getTickets();
    }, []);
    const getTickets = (() => {
        
        axios.get('https://api.transavia.com/v1/flightoffers/?', config)
                .then(res => {
                const data = res.data;
                const options = data.flightOffer.map(data => ({
                    "pricePerPassenger": data.pricingInfoSum.totalPriceOnePassenger,
                    "priceAllPassengers": data.pricingInfoSum.totalPriceAllPassengers,
                    "inboundArrDateTime" : data.inboundFlight.arrivalDateTime,
                    "inboundDepDateTime" : data.inboundFlight.departureDateTime,
                    "outboundArrDateTime" : data.outboundFlight.arrivalDateTime,
                    "outboundDepDateTime" : data.outboundFlight.departureDateTime,
                }))
                setResults(options)
               
            })
            .then(() => {
                console.log(results)

            })
            .catch((e) => {
                console.log('Something went wrong fetching the data.  ' + e);
            })
    })

    //template
    return ( 
        <div className="Results">
            <div className="wrapper">
            <h1>Results</h1>
            
            </div>
        </div>
     );
}
 
export default  ResultList;