import React, { useState, useEffect } from "react";

function Flight() {
    const [origin, setOrign] = useState('')
    const [destination, setDestination] = useState('')
    const [departureDate, setDepartureDate] = useState('')
    const [passengers, setPassengers] = useState()
    const [data, setData] = useState([]);

    async function search(e){
        e.preventDefault();

        let userData = {origin, destination, departureDate, passengers}
        console.log(userData)
        let result = await fetch("http://localhost:5000/oneWayFlight",{
            method: 'POST',
            headers: {
                "Content-Type":"application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(userData)
        })
        result = await result.json();
        setData(result.data);
        console.log("result",result)
    }


    return (
        <>
            <div style={{display: "flex"}}>
                <div className="sidebar">
                    <span className="sidebar_heading">One way</span>
                    <form className="form" onSubmit={search}>
                        <input
                            type="text" 
                            placeholder="Enter Origin City"
                            value={origin} 
                            onChange={(e)=>setOrign(e.target.value)}
                        />
                        <input
                            type="text" 
                            placeholder="Enter Destination City"
                            value={destination} 
                            onChange={(e)=>setDestination(e.target.value)}

                        />
                        <input
                            type="text" 
                            placeholder="Departure Date"
                            value={departureDate} 
                            onChange={(e)=>setDepartureDate(e.target.value)}

                        />
                        <input
                            type="number" 
                            placeholder="Passengers"
                            value={passengers} 
                            onChange={(e)=>setPassengers(e.target.value)}
                        />
                        <button type="submit">Search</button>
                    </form>
                </div>
                <div>
                    {
                        data.length>0?
                        <div>
                            <div className="topBox">
                                <h2>{origin} - {destination}</h2>
                                <h4>Depart : {departureDate}</h4>
                            </div>
                        {
                            data.map((item, index) => (
                                <div className="card" key={index}>
                                    <div style={{padding: "10px"}}>
                                        <h1>Rs. {item.price}</h1>
                                        <span>{item.flightNumber}</span>
                                        <h3>{item.origin} - {item.destination}</h3>
                                        <div>Depart : {item.departTime}</div>
                                        <div>Arrive : {item.arrivalTime}</div>
                                    </div>
                                    <div>
                                        <button type="submit" className="cardbtn">Book this Flight</button>
                                    </div>
                                </div>
                            ))
                        }
                        </div>
                        :<h1>No Flights Found</h1>
                    }
                </div>
            </div>
        </>
    )
}

export default Flight
