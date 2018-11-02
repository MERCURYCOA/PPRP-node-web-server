var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var  expressValidator = require('express-validator');

const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3030;
// const formidable = require('formidable');
// const fileUpload = require('express-fileupload');

var app = express();
// var logger = function(req, res, next) {
//     console.log('Logging...');
//     next();
// }
//
// app.use(logger);

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

//Global var
app.use((req, res) => {
    res.locals.errors = null;
});
app.use(expressValidator());
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
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname, 'public')));





app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
var users = [
    {
        id: 1,
        first_name: 'John',
        last_name: 'Doe',
        email: 'johndoe@gmail.com'
    },
    {
        id: 2,
        first_name: 'Bob',
        last_name: 'Smith',
        email: 'bobsmith@gmail.com'
    },
    {
        id: 3,
        first_name: 'Jill',
        last_name: 'Jackson',
        email: 'jjackson@gmail.com'
    }
]

app.get('/',(req, res) => {
    res.render('home', {
        pageTitle: 'Public Peer Review Platform',
    });
});

app.get('/upload', (req, res) => {
    res.render('upload.hbs', {
        pageTitle: 'Upload Page'
    });
});

app.get('/login', (req, res) => {
    res.render('login.hbs', {
        pageTitle: 'Login Page'
    });
});
// app.get('/account', (req, res) => {
//     res.render('account.hbs', {
//         pageTitle: 'Account Page'
//     });
// });
app.get('/about', (req, res) => {
    res.render('about', {
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

app.post('/users/add', (req,res) => {
    req.checkBody('first_name', 'First Name is Required').notEmpty();
    req.checkBody('last_name', 'Last Name is Required').notEmpty();
    req.checkBody('email', 'Email is Required').notEmpty();
    var errors = req.validationErrors();

    if(errors) {
        res.render('login.hbs', {
            pageTitle: 'Login Page',
            errors: errors
        });
    } else {
        var newUser = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email
        };
        console.log('success');
    }
});
app.listen(port);
