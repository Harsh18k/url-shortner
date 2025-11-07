const express = require('express');
const path = require('path');
const {connectToMongoDB} = require('./connect');
const app = express();


const urlRoutes = require('./routes/url');
const staticRouter = require('./routes/staticRouter');
const userRoute = require('./routes/user');


const port = 8001;
connectToMongoDB('mongodb://localhost:27017/urlShortenerDB')
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('Failed to connect to MongoDB', err);
    });
app.set('view engine', 'ejs');
app.set('views', path.resolve("./views"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

app.use('/user', userRoute);
app.use('/url', urlRoutes);
app.use('/', staticRouter);


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
