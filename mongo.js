const {MongoClient} = require("mongodb");
const { connect } = require("./routes/api-routes");


const url = "mongodb://localhost:27017";
const db_name = "test";
const client = MongoClient(url);

module.exports = {
    db: null,

    async connect() {
        await client.connect();




        this.db = client.db(db_name);

        console.log("Selected Database" , db_name);
    }

    
}