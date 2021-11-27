let express = require('express'),
apiRouter = express.Router();

flight = require('./flight')();

apiRouter.get('', (req, res) => {
    res.status(200).send("Node api demo")
})

//===============Flight api===================
apiRouter.post('/insertFlight', flight.addFlight);
apiRouter.get('/oneWayFlight', user.oneWayFlight);

module.exports = apiRouter;
