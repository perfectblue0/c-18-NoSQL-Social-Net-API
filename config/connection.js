const { connect, connection } = require('mongoose');

// Define the MongoDB connection string.
const connectionString =
  process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/socialNetworkAPI';

// Connect to the MongoDB database 
connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Export the connection
module.exports = connection;
