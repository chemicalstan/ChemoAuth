let express = require('express');
let expressLayout = require('express-ejs-layouts');
let mongoose = require('mongoose')


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

// Setting Routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));

app.listen(PORT, ()=>{
    console.log(`Application is runnig at port ${PORT}`)
})