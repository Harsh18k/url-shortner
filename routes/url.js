const express = require('express');
const {handleGenerateNewShortUrl ,handleRedirectUrl, handleGetAnalytics} = require('../controllers/url');
const router = express.Router();



router.post('/', handleGenerateNewShortUrl);

router.get('/analytics/:shortId',handleGetAnalytics);
router.get('/:shortId', handleRedirectUrl);

//server side renderieng for home page


    
module.exports = router;


