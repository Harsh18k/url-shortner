const { nanoid } = require('nanoid');
const URL = require('../models/url');

async function handleGenerateNewShortUrl(req, res) {
    const body = req.body;
    if (!body.url) {
        return res.status(400).json({ error: 'URL is required' });
    }

    const shortId = nanoid(8);
    await URL.create({
        originalUrl: body.url,
        shortUrl: shortId,
        visitHistory: [],
    });

    res.redirect('/?new=' + shortId);
}


async function handleRedirectUrl(req, res) {
    const shortId = req.params.shortId;

    const urlEntry = await URL.findOne({ shortUrl: shortId });
    if (!urlEntry) {
        return res.status(404).json({ error: 'Short URL not found' });
    }

    // Add timestamp to visitHistory
    urlEntry.visitHistory.push({ timestamp: Date.now() });
    await urlEntry.save();

    // Redirect to the original URL
    return res.redirect(urlEntry.originalUrl);
}



async function handleGetAnalytics(req, res) {
    const shortId = req.params.shortId;
    const result = await URL.findOne({ shortUrl: shortId });
    return res.json({totalClicks : result.visitHistory.length , analytics: result.visitHistory});
}

module.exports = { handleGenerateNewShortUrl, handleRedirectUrl ,handleGetAnalytics };