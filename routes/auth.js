const express = require('express');
const router = express.Router();
const controllerAuth = require('../controllers/auth');
const middlewareAuth = require('../middlewares/auth');

const isAuth = middlewareAuth.isAuth;

router.post('/register', controllerAuth.register); //username, password
router.post('/login', controllerAuth.login); //username, password

// Tets thử API khi gửi kèm jwt
// Set header: bearer token...
router.get('/test-login', isAuth, (req, res) => {
    res.send(req.user);
})

module.exports = router;