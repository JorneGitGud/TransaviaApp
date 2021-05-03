const ResultList = (props) => {
    const tickets = props.tickets
    return ( 
        <div className="Results">
        {tickets.map((ticket) => (
            <div className="tickets-result" key={ticket.Id}>
                <h1>Optie: {ticket.Id}</h1>
                <h2>prijs: {ticket.Price}</h2>
                <h2>Vetrek om: {ticket.TimeDepature}</h2>
                <h2>Aankomst om: {ticket.TimeArrival}</h2>
                <h2>overstappen: {ticket.Stops} x </h2>
                <button onClick={() => props.myFunction(ticket.Id)}>Kopen</button>
            </div>
            
        ))}
        </div>
     );
}
 
export default  ResultList;