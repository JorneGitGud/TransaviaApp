import { useContext, useEffect, useState } from "react";
import axios from 'axios';

const Tickets = () => {
    //variable
    const [airports, setAirports] = useState([]);
    const [isLoaded, setIsLoaded] = useState(true);
    const primaryKey = 'd9bdfa4543364f9cbec8855da5a4d353';

    //methods
    useEffect(() => {
        axios.get(`https://api.transavia.com/v2/airports/`, { headers: { apikey: primaryKey } })
            .then(res => {
                setAirports(res.data)
                console.log('fetching data')
            })
            .then(() => {
                if (airports.length > 10) {
                    console.log(airports)
                } else {
                    setIsLoaded(false);
                }
            }
            ).catch((e) => {
                console.log('Something went wrong fetching the data.  ' + e);
            })
    }, [isLoaded]);

    //template
    return (
        <div className="tickets">
            <h1>Tickets</h1>
            <p>Selecteer hieronder uw bestemming, datum en aantal personen waarme u op reis wilt.</p>


        </div>
    );
}

export default Tickets;