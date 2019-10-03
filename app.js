const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const hbs = require('express-handlebars');

// create the express app
const app = express();

require('./server/locals')(app);

app.use(bodyParser.urlencoded({ extended: true }));

// pull in our routes file
app.use('/', require('./server/routes'));

// set the template engine
app.engine('hbs', hbs({extname: 'hbs'}));
app.set('view engine', 'hbs');

// tell express where our views folder is
app.set('views', path.join(__dirname, 'server/views'));

// tell express where our public static folder is
app.use(express.static(path.join(__dirname, 'client/dist')));

// start our app
app.listen(3000, () => {
    console.log('App running on port 3000'); // eslint-disable-line no-console
});