////////////////////////////////////////////////////////////////
// ENTRY POINT 
////////////////////////////////////////////////////////////////

// imports
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env'});

const app = require('./app');

const dbConnectionString = process.env.DATABASE.replace(
    '<DBPASSWORD>', 
    process.env.DATABASE_PASSWORD
);

dbConnect()
    .then(() => {
        console.log(`connection devfoyer-DB successful! ✅`)
    })
    .catch((err) => console.log(`There was an error connecting to the database ❌: ${err}`))

async function dbConnect() {
    await mongoose.connect(dbConnectionString);
};

// start the server
const port = 3001 || process.env.PORT;
const server = app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});

// safety net handler for all unhandled promise rejections - useful when working in async calls 
process.on('unhandledRejection', (err) => {
    console.log(err.name, err.message);
    console.log('UNHANDLED REJECTION!~ Shutting down...');
    // OPTIONAL: Ideal to close out application properly on this type of error handling
    server.close(() => { // shut down server, so ongoing requests can wrap up
        process.exit(1); // then total shutdown (too abrupt alone) - 0 is success, 1 error
    });
});

// handling uncaught exceptions - all else safety net & sync'd calls
process.on('uncaughtException', (err) => {
    console.log(err.name, err.message);
    console.log('UNCAUGHT EXCEPTION!~ Shutting down...');
    // IMPORTANT: need to close the application in this case - bc unclean state
    server.close(() => { // shut down server, so ongoing requests can wrap up
        process.exit(1); // then total shutdown (too abrupt alone) - 0 is success, 1 error
    });
});