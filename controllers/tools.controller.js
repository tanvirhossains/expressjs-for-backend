// const exp = require("constants");
// const viewCount = require("../middleware/viewCount");

const tools = [
    { id: 1, name: "hammer1" },
    { id: 2, name: "hammer2" },
    { id: 3, name: "hammer3" },
]


getingFile = (req, res)=>{
    res.sendFile(__dirname + "/") // diractory is not working 
}


getAllTools = (req, res) => {

    // console.log(req);
    // res.download("D:/projectJS/Backend project/milestone-1/module-3/express-mvc-acc/controllers/ols.controller.js")
    /*    res.download(__dirname + '/single_gfg.txt', function (err) {
           if (err) {
               console.log(err);
           }
       }) */
    // res.redirect('/foo/bar')


    console.log("file send to dowload");
    const { limit, name } = req.query;
    console.log(limit, name);
    res.send(tools.slice(0, limit))
}


/* post request */
saveAllTools = (req, res) => {
    // viewCount()


    // const id = req.body.id++;
    req.body.id = tools.length + 1; // every time it will incease id number 
    req.body.name = `hammer${req.body.id}` // every time it will increas hammer number  
    tools.push(req.body)
    console.log(req.body);
    console.log(req.query);
    res.send(tools)
}

/* get requst by id */
getToolsDetails = (req, res) => {
    // viewCount()
    const { id, test } = req.params;
    console.log(id, test);

    // const foundTool = tools.find(tool => tool.id == id) // here id actually a string that is why it does not match with tool.id 
    const foundTool = tools.find(tool => tool.id === Number(id))
    res.send(foundTool)
}


/* delete request by id */

deleteTool = (req, res) => {
    const toolId = req.params.id
    const foundAndDelete = tools.filter(tool => tool.id != toolId);
    res.send(foundAndDelete)
    console.log("deleted ");

}
putTool = (req, res) => {
    const { id } = req.params;
    const filter = { _id: id }

    const newData = tools.find(tool => tool.id === Number(id))

    newData.id = id;
    // newData.name = `hello ${id}`
    newData.name = req.body.name


    console.log(newData);
    res.send(newData)


}
patchTool = (req, res) => {
    const { id } = req.params;
    const filter = { _id: id }

    const newData = tools.find(tool => tool.id === Number(id))


    newData.id = id;
    // newData.name = `hello ${id}`

    // res.send(newData)


    newData.name = req.body.name


    console.log(newData);
    res.send(newData)
}

module.exports = {
    getingFile,
    getAllTools,
    saveAllTools,
    getToolsDetails,
    deleteTool,
    putTool,
    patchTool
};
