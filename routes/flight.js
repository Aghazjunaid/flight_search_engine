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

    





    return {
        addFlight,
    }

}