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
    
            if(flightData.flightDate){
                newDate = new Date(flightData.flightDate);
    
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
                )    

            return_response.status = 200;
            return_response.message = "Get One Way Flight Details successfully";
            return_response.data = doc;
        } catch (error) {
            return_response.status = 400;
            return_response.message = String(error);
        }
        res.json(return_response);
    }






    return {
        addFlight,
        oneWayFlight
    }

}