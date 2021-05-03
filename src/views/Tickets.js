import { useEffect, useState } from "react";
const Tickets = () => {
    //variable
    const [country, setCountry] = useState(null);

    // const handleClickSearch = (e) => {
    //     setName('Jael');
    // }
    useEffect(() => {
        console.log('ran useEffect');
        fetch('https://api.transavia.com/v2/airports/')
        .then(res=>{
            return res.json()
        }).then((data)=>{
            console.log(data)
        })
    }, []);


    return (
        <div className="tickets">
            <h1>Tickets</h1>
            <p>Selecteer hieronder uw bestemming en filter tickets op datum en aantal personen.</p>



        </div>
    );
}

export default Tickets;