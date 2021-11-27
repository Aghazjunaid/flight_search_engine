const Flight = require("../models/flight");


module.exports = () => {

    //================Add Password=======================================================
    async function addFlight(req,res){
        var return_response = { "status": null, "message": null, "data": {} } 
        try {
            let opt = req.body;
            const flight = new Flight(opt);
            const doc = await flight.save();

            return_response.status = 200;
            return_response.message = "Flight Details added successfully";
            return_response.data = doc;
        } catch (error) {
            return_response.status = 400;
            return_response.message = String(error);
        }
        res.json(return_response);
    }

    async function oneWayFlight(req,res){
        var return_response = { "status": null, "message": null, "data": {} } 
        try {
            let flightData = req.body 

            let con = {
                origin : flightData.origin,
                destination : flightData.destination,
                seatsAvailable : { $gt : flightData.passengers}
            }
    
            if(flightData.departureDate){
                newDate = new Date(flightData.departureDate);
    
                starTime = newDate.setHours(0,0,0,0)
                endTime = newDate.setHours(23,59,59,999)    
    
                con["flightDate"] = {
                    $gte: new Date(starTime)
                    , $lt: new Date(endTime)
                }
            }

            if(flightData.price){
                con["price"] = {
                    $lte: flightData.price
                }
            }
    
            let doc =  await Flight.find(
                con, {},
                ).sort({'createdAt':1})

            return_response.status = 200;
            return_response.message = "Get One Way Flight Details successfully";
            return_response.data = doc;
        } catch (error) {
            return_response.status = 400;
            return_response.message = String(error);
        }
        res.json(return_response);
    }


    async function returnFlight(req,res){
        var return_response = { "status": null, "message": null, "data": {} } 
        try {
            let flightData = req.body 

            let con = {
                origin : flightData.origin,
                destination : flightData.destination,
                seatsAvailable : { $gt : flightData.passengers}
            }

            let con1 ={
                origin : flightData.destination,
                destination : flightData.origin,
                seatsAvailable : { $gt : flightData.passengers}
            }
    
            if(flightData.departureDate){
                newDate = new Date(flightData.departureDate);
    
                starTime = newDate.setHours(0,0,0,0)
                endTime = newDate.setHours(23,59,59,999)    
    
                con["flightDate"] = {
                    $gte: new Date(starTime)
                    , $lt: new Date(endTime)
                }
            }

            if(flightData.price){
                con["price"] = {
                    $lte: flightData.price
                },
                con1["price"] = {
                    $lte: flightData.price
                }
            }
                    
            if(flightData.returnDate){
                newDate = new Date(flightData.returnDate);
    
                starTime = newDate.setHours(0,0,0,0)
                endTime = newDate.setHours(23,59,59,999)    
    
                con1["flightDate"] = {
                    $gte: new Date(starTime)
                    , $lt: new Date(endTime)
                }
            }

            let doc =  await Flight.find(
                con, {},
                ).sort({'createdAt':1})

            let doc1 =  await Flight.find(
                con1, {},
                ).sort({'createdAt':1})
    
            let data = {
                departure : doc,
                returning : doc1
            }


            return_response.status = 200;
            return_response.message = "Get Return Flight Details successfully";
            return_response.data = data;
        } catch (error) {
            return_response.status = 400;
            return_response.message = String(error);
        }
        res.json(return_response);
    }

    return {
        addFlight,
        oneWayFlight,
        returnFlight
    }

}