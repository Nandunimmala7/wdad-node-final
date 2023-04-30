const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://nimmalanandakishore:Sv55H3Hqp$kFyFJ@cluster0.hqgspsu.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log(err));
    
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Database connected successfully');
});