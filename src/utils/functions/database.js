const { connect, connection } = require("mongoose");

(async function database() {
    const uri = process.env.mongo_URL;
    try {
        await connect(uri, {
            useCreateIndex: true,
            useFindAndModify: false,
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("[DATABASE]: connected to mongodb");
    } catch (e) {
        console.log(e);
    }


    connection.on('error', () => {
        console.error('connection error:' + this.error)
    })   
    connection.on("disconnected", () => {
        console.error("Disconnected from mongoDB");
    });
})();