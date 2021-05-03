import { useState, useEffect } from "react";
import ResultList from '../Components/ResultList'

const Results = () => {
    //variables
    const [tickets, setTickets] = useState([
        { Id: '1', Price: '220', Days: '3', TimeDepature: '8:00', TimeArrival: '19:40', Stops: '2' },
        { Id: '2', Price: '240', Days: '3', TimeDepature: '6:00', TimeArrival: '16:00', Stops: '2' },
        { Id: '3', Price: '260', Days: '3', TimeDepature: '14:00', TimeArrival: '2:40', Stops: '3' }
    ]);
    const handleClickBuyButton = (id) => {
        console.log('User wants to buy ticket with ID: ' + id)
    }
    useEffect(() => {
        console.log('user effect ran')

    }, []);
    return (
        <div className="Results">
            <h1>Overzicht resultaten: </h1>    
            <ResultList tickets={tickets} myFunction={handleClickBuyButton}/>        
        </div>
    );
}

export default Results;