var express = require('express'),
      bodyParser = require('body-parser'),
      cors = require('cors');

const app = express();
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(cors());

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://pradeep:pradeep@first-cluster-nrwpn.mongodb.net/currency-data?retryWrites=true";
var db = null
MongoClient.connect(uri, { useNewUrlParser: true }, function(err, client) {
    if(err) {
      console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
      client.close()
    } else {
      console.log('Connected...');
      db = client.db("currency-data")
    }
});

var router = express.Router();

router.route('/currency/data').get((req, res) => {
    db.collection("currency-data").find({"currency": req.crrency }, (err, data) =>{
        if(err){
          console.log(err);
        }
        else {
            res.json(data);
        }
    });
});

router.route('/currency/data/data').get((req, res) => {
    db.collection("currency-data").find({$and: [
        {"currency": req.currency},
        {"date": req.date}
        ]}, (err, data) =>{
        if(err){
            console.log(err);
        }
        else {
            res.json(data);
        }
    });
});

var port = process.env.PORT || 4000;

app.listen( ()=>{
    console.log('Listening on port ' + port);
});