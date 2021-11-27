let express = require('express'),
apiRouter = express.Router();

flight = require('./flight')();

apiRouter.get('', (req, res) => {
    res.status(200).send("Node api demo")
})

//===============User api===================
// apiRouter.post('/register', user.registerUser);
// apiRouter.get('/login', user.loginUser);

module.exports = apiRouter;
