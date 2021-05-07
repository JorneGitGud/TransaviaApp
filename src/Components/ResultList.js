import { useContext, useEffect, useState } from "react";
import axios from '../Components/AxiosFactory';
const ResultList = (props) => {
   
    //variables
    const config = props.userChoices;
  
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
                    "destination": data.outboundFlight.arrivalAirport.locationCode,
                    "origin": data.outboundFlight.departureAirport.locationCode,
                    "pricePerPassenger": data.pricingInfoSum.totalPriceOnePassenger,
                    "priceAllPassengers": data.pricingInfoSum.totalPriceAllPassengers,
                    "inboundArrDateTime" : data.inboundFlight.arrivalDateTime,
                    "inboundDepDateTime" : data.inboundFlight.departureDateTime,
                    "outboundArrDateTime" : data.outboundFlight.arrivalDateTime,
                    "outboundDepDateTime" : data.outboundFlight.departureDateTime,
                }))
                setResults(options)
               
            })
            .catch((e) => {
                console.log('Something went wrong fetching the data.  ' + e);
            })
    })

    const printMyStuff = (() => {
        console.log(config.params.toString())
        console.log(results)
    })

    //template
    return ( 
        <div className="Results">
            <div className="wrapper">
            <h1>Results</h1>
            <p><button className='form-button' onClick={printMyStuff}>print</button></p>
            
            </div>
        </div>
     );
}
 
export default  ResultList;