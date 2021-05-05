import { useContext, useEffect, useState } from "react";
import Select from 'react-select'
import axios from '../Components/AxiosFactory';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const Tickets = () => {
    //variable
    const [airports, setAirports] = useState([]);
    const [selectedAirport, setSelectedAirport] = useState('')
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const timeOptions = ([2, 4, 6, 8, 12, 16, 24, 48])
    const [selectTimeOption, setSelectTimeOptions] = useState([])
    const [overnights, setOvernights] = useState(0)



    //methods
    useEffect(() => {
        getAirports();
        setTimeVariables();

    }, []);

    const setTimeVariables = () => {
        const options = timeOptions.map(time => ({
            "value": time,
            "label": time + " uur."
        }))
        setSelectTimeOptions(options)
    }

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
                if (airports) console.log('fetched data')
            }
            ).catch((e) => {
                console.log('Something went wrong fetching the data.  ' + e);
            })
    })

    

    const handleSelectAirport = (choice) => {
        setSelectedAirport(choice.value.toString());
        console.log('selected airport is now: ' + choice.value.toString())
    }
    const handleChangeOvernights = (nights) =>{
        console.log(nights)
    }


    //template
    return (
        <div className="tickets">
            <h1>Tickets</h1>
            <p>Selecteer hieronder uw bestemming, datum en aantal personen waarme u op reis wilt.</p>

            <form>            
                <Select options={airports} onChange={handleSelectAirport.bind(this)}></Select>
                <h2>Vroegste datum heenreis:</h2>
                <DatePicker selected={startDate} onChange={date => setStartDate(date)} />
                <h2>Laatste datum terugreis:</h2>
                <DatePicker selected={endDate} onChange={date => setEndDate(date)} />
                <h2>Kies de maximale reistijd:</h2>
                <Select options={selectTimeOption} onChange={handleSelectAirport.bind(this)}></Select>           
                
                <label>
                   <h2>Vul het aantal overnachtingen in:</h2>
                   <input 
                   type="number"
                   required
                   />
               </label>
               <div className="space">
               <p>Ben je klaar met invullen? klik op de button hier onder.</p>
               <p><button className='form-button'>Vind tickets</button></p>
               </div>
           </form>


        </div>
    );
}

export default Tickets;