const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api');



// const doThis = new Task({
//     description: "Fetch Water",
//     completed: true
// });

// doThis.save().then(()=> console.log(doThis)).catch(e => console.log(e));




// const me = new User({
//     name: 'Risheek',
//     age: 25,
//     password: "passme",
//     email: "RISHEEKGURNANI@GMAIL.COM   "
// });

// me.save().then((me) => console.log(me))
// .catch(e => console.log(e));