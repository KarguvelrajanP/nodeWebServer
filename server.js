const express = require('express');
const hbs = require('hbs');
var app = express();
const fs = require('fs');

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now} : ${req.method} ${req.url}`;
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append the logs to server.log');
        }
    })
    console.log(log);
    next();
});

// app.use( (req, res, next) => {
//     res.render('maintain.hbs');
// });

hbs.registerHelper('getCurrentYear', () => {
    return 'Testing'; //new Date().getFullYear();
})

hbs.registerHelper('toUpper', (msg) => {
    return msg.toUpperCase();
})

app.get('/', (req, res) => {
    // res.send({
    //     name: 'Karguvelrajan',
    //     like: [
    //         'Gaming',
    //         'Cricket'
    //     ]
    // })
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        currentYear: new Date().getFullYear(),
        message: 'Welcome to my website'
    });
})

app.get('/about', (req, res) => {
    //res.send('About Page');
    res.render('about.hbs', {
        pageTitle: 'About Page',
        currentYear: new Date().getFullYear()
    });
})

app.get('/bad', (req, res) => {
    res.send({ Error: 'Bad request' })
})

app.listen(3000, () => {
    console.log('Server is runnig in 3000 port');
});