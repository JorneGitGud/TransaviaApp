import { useEffect, useState } from "react";
import SearchOptions from '../Components/SearchOptions'
import ResultList from '../Components/ResultList'
import DatePicker from "react-datepicker";
const Tickets = () => {
    //variables
    const [showSearch, setShowSearch] = useState(true);
    const [showResultList, setShowResultList] = useState(false);
    const [userChoices, setUserChoices] = useState([])
    //methods
    useEffect(() => {     
    }, [userChoices]);
    // show results, hide search options.
    const showResultComponent = ((data) => {
        setUserChoices(data)
        setShowSearch(false);
        setShowResultList(true);
    })
    // deactivate resultList component, activate search
    const resetPage = (()=>{        
        setShowResultList(false);
        setShowSearch(true);
    })
    
    //this function is where the scope of the project ends. 
    const handleBuyTickets = (() => {
        console.log("You have succesfully navigated to the end of this project. Well done!")
    })
    //template
    return (
        <div>
            {showSearch && <SearchOptions onShowResultComponent={showResultComponent} />}
            {showResultList && <div className="wrapper space"><button onClick={resetPage}>Zoek opnieuw</button></div>}           
            {showResultList && <ResultList userChoices={userChoices} onHandleBuyTickets={handleBuyTickets} />}
            
        </div>
    );
}

export default Tickets;