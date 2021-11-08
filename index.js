let express = require('express')
//const mongo = require('./mongo')

let apiRoutes = require('./routes/api-routes')

const app = express();
const port = 3001;
//mongo.connect();

app.use(express.json());


app.use((req,res,next) => {
    console.log("Middleware  Api Called")
    //res.send("Hall Booking Api");
    next();
})

app.use('/api',apiRoutes)

app.listen(port,() => console.log(`server running at port ${port}`));