const mongoose = require("mongoose");

mongoose.connect(
    "mongodb://localhost:27017/usersExercici1", 
    { useNewUrlParser: true, useUnifiedTopology: true }
);
