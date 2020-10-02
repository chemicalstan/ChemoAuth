let express = require('express');
let expressLayout = require('express-ejs-layouts');
let mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');


// App initialization
let app = express();
//DB CONFIG
let db = require('./config/keys').MongoURI;

// Connect to Mongobd
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(()=>console.log('Mongodb connected....'))
        .catch(err=>console.log(err))

// Setting Default port
let PORT = process.env.PORT || 5000;

// EJS
// Setting Middlewares
app.use(expressLayout);
// Setting default view engine
app.set('view engine', 'ejs');

// Body parser *** This parses data from the form
app.use(express.urlencoded({ extended: false}));
// Express session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
}))
// Connect flash
app.use(flash())
// Global variables
app.use((req, res, next)=>{
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('errror_msg');
    next();
})

// Setting Routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));

app.listen(PORT, ()=>{
    console.log(`Application is runnig at port ${PORT}`)
})