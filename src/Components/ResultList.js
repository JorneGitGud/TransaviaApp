import { useContext, useEffect, useState } from "react";
import axios from '../Components/AxiosFactory';
const ResultList = (props) => {
   
    //variables
    const userData = props;
    const [tickets, setTickets] = useState([]);
    
    //methods
    const getTickets = (() => {
        axios.get(`https://api.transavia.com/v1/flightoffers/[?AMS]`)
            .then(res => {
                const data = res.data;
                console.log(data)

                // const options = data.map(data => ({
                //     "value": data.id,
                //     "label": data.name + ", " + data.country.name
                // }))
                // setAirports(options)
            })
            .then(() => {
                if (tickets) console.log('fetched data')
            }
            ).catch((e) => {
                console.log('Something went wrong fetching the data.  ' + e);
            })
    })

    //template
    return ( 
        <div className="Results">
        
        </div>
     );
}
 
export default  ResultList;