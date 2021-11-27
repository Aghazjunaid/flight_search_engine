let express = require('express'),
apiRouter = express.Router();

flight = require('./flight')();

apiRouter.get('', (req, res) => {
    res.status(200).send("Node api demo")
})

//===============Flight api===================
apiRouter.post('/insertFlight', flight.addFlight);
apiRouter.post('/oneWayFlight', flight.oneWayFlight);
apiRouter.post('/returnFlight', flight.returnFlight);

module.exports = apiRouter;
