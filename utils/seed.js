const connection = require('../config/connection');
const { Thought, User } = require('../models');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');

  // Drop existing users
  await User.deleteMany({});

  // Drop existing thoughts
  await Thought.deleteMany({});

  // users
  const users = [
    {
      username: "Leila",
      email: "leilamail@mail.com"
    },
    {
      username: "Lola",
      email: "lolamail@mail.com"
    },
    {
      username: "Gregorio",
      email: "gregmail@mail.com"
    },
    {
      username: "Lucas",
      email: "lucasmail@mail.com"
    },
    {
      username: "Ale",
      email: "aleale@mail.com"
    }
  ];

  // Add students to the collection and await the results
  await User.collection.insertMany(users);


  // Log out the seed data to indicate what should appear in the database
  console.table(users);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});
