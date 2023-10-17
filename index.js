import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import routes from './src/routes/crmRoutes';
import cors from 'cors';


const app = express();
const PORT = 3001;

//connection mongose
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0.0.1:27017/CRMdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('connexion à MongoDB réussie')
})
.catch((error) => {
    console.log('Erreur lors de la connexion à MongoDB : ', error)
});



//bodyparser
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(cors());
routes(app);


app.use(express.static('public'));

app.get('/', (req,res) => 
    res.send(`Serveur node et express port ${PORT}`)
);

app.listen(PORT, () => 
    console.log(`votre serveur est sur le port ${PORT}`)
);





