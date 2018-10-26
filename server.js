const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3030;
// const formidable = require('formidable');
// const fileUpload = require('express-fileupload');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
});
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});
// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// });
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = now + ":" + req.method + req.url;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
       if(err) {
           console.log('Unable to append to server.log.')
       }
    });
    next();
});
// app.use(fileUpload());






app.set('view engine', 'hbs');

app.get('/',(req, res) => {
    // res.send('<h1>Hello Express</h1>');
    res.render('home.hbs', {
        pageTitle: 'Public Peer Review Platform',
        // welcomeMessage: 'Go go!'
    });
});





// app.get('/upload', (req, res) => {
//     res.render('upload.hbs', {
//         pageTitle: 'Upload Page'
//     });
// });



app.get('/upload', (req, res) => {
    res.render('upload.hbs', {
        pageTitle: 'Upload Page'
    });
});


app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page'
    });
});

app.get('/projects', (req, res) => {
    res.render('projects.hbs', {
        pageTitle: 'Projects'
    })
});

app.get('/physics', (req, res) => {
    res.render('physics.hbs', {
        pageTitle: 'Physics Page'
    });
});
app.get('/math', (req, res) => {
    res.render('math.hbs', {
        pageTitle: 'Math Page'
    });
});
app.get('/cs', (req, res) => {
    res.render('cs.hbs', {
        pageTitle: 'CS Page'
    });
});
app.get('/econ', (req, res) => {
    res.render('econ.hbs', {
        pageTitle: 'Economics Page'
    });
});

app.get('/material', (req, res) => {
    res.render('material.hbs', {
        pageTitle: 'Material Page'
    });
});

app.get('/donation', (req, res) => {
    res.render('donation.hbs', {
        pageTitle: 'Donation Page'
    });
});
app.get('/help', (req, res) => {
    res.render('help.hbs', {
        pageTitle: 'Help Page'
    });
});
app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Error handling request'
    });
});
app.listen(port);