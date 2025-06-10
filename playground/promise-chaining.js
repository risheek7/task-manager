require("../src/db/mongoose.js");

const User = require("../src/models/users");

User.findByIdAndUpdate("683463ac1d364a5f1d933f54", {age: 26}).then((user) => { 
    console.log(user);
    return User.countDocuments({age: 26});
 }).then(result => console.log(result))
 .catch(e => console.log(e));