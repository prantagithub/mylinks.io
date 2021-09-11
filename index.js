const express = require('express');
const fs = require('fs');
const {MongoClient} = require('mongodb');

const { url } = require('inspector');
const { idGenerate } = require('./functions');
var functions = require('./functions');
const app = express();
let urlSet = []
let idArray = 0;
app.set('view engine', 'ejs');
app.use(express.urlencoded());
app.use('/public', express.static("public"));
//--------------------database connection--------------------------------
const uri = "mongodb+srv://pran123:pran123@devconnector.oddkc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
const client = new MongoClient(uri,{ useNewUrlParser: true, useUnifiedTopology: true });
async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();
 
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};
async function updateData(urlArr){
    let dbo = client.db('customdb101').collection('mylist-app');
    dbo.updateOne({id: 0},{
        $set: {
          urlArr: urlArr
        }
      });
}
async function returnData(){
    await createConnection()
    let dbo = client.db('customdb101').collection('mylist-app');
    dbo.findOne({id: 0}).then(function(doc) {
        if(!doc)
            throw new Error('No record found.');
      urlSet = doc.urlArr;//else case
    //   console.log(doc);
  });
}
async function insertData(){
    await createConnection();
    let dbo = client.db('customdb101').collection('mylist-app');
    let myobj = { id: 0, urlArr: [] };
    dbo.insertOne(myobj);
}
async function createConnection(){
    try {
        // Connect to the MongoDB cluster
        await client.connect();
 
        // // Make the appropriate DB calls
        // await  listDatabases(client);
 
    } catch (e) {
        console.error(e);
    }
}
returnData()
//---------------------------------------------------------------------
app.get('/', (req, res) => {
    res.render('index',{ urlSet: urlSet, functions: functions});
})
app.get("/delete/:id",(req,res)=>{
    urlSet = functions.deleteOne(urlSet,req.params.id);
    updateData(urlSet);
    res.redirect('/');
})
app.get('/deleteAll', (req, res) => {
    urlSet = functions.resetArray(urlSet);
    updateData(urlSet);
    res.redirect('/');
})
app.post('/', (req, res) => {
    const message = req.body;
    idArray = functions.messageAppend(urlSet,message,idArray);
    updateData(urlSet);
    res.redirect('/');
})
app.listen(process.env.PORT || 3000, () => { console.log('started') });
