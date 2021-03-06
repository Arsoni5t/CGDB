const express = require("express");
const app = express();
const mongoose = require('mongoose');
const db = require('./config/keys').mongoURI;

const users = require("./routes/api/users");
const questions = require("./routes/api/questions");

// const User = require("./models/User");
const Question = require('./models/Question');
const bodyParser = require('body-parser');
const passport = require('passport');


const path = require('path');

mongoose
.connect(db, { useNewUrlParser: true })
// .then(() => console.log("Connected to MongoDB successfully")) brad commented out 10/22
// .catch(err => console.log(err));

app.use(bodyParser.urlencoded({ extended: false })); //allows postman
app.use(bodyParser.json());





// app.get("/", (req, res) => {
//   //console.log(res) 
//   // const user = new User({
//   //   handle: 'bobo',
//   //   email: 'aasdfasd@google.com',
//   //   password: 'asdfjkl'
//   // })
//   // user.save()
//   res.send("Hello WWWWasdfsdaorld")});




app.use(passport.initialize());
require('./config/passport')(passport);

app.use("/api/users", users);
app.use("/api/questions", questions);


const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`)); 





if (process.env.NODE_ENV === 'production') {
    app.use(express.static('frontend/build'));
    app.get('/', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
    })
  }