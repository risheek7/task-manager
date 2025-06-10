require("../src/db/mongoose");
const Task = require("../src/models/tasks");

// Task.findByIdAndDelete("683467e5cf7e05ce3bda393e").then((task => {
//     console.log(task);

//     return Task.countDocuments({complete: false});
// })).then(result => console.log(result))
// .catch(e => console.log(e));


const deleteAndPrintCount = async (id, completed) => {

    const deletedUser = await Task.findByIdAndDelete(id);
    const count = await Task.countDocuments({completed});
    
    return count;

}

deleteAndPrintCount("6835f6573b23fe8f02c08aae", false).then((result) => console.log(result)).catch(e => console.log(e));