import "dotenv/config";
import express from 'express';
import connectToDb from "./Config/connectToDb.js";
import cors from "cors";
import fieldRoutes from "./routes/fieldRoutes.js";
//Create an express app
const app = express();
 
connectToDb();
app.use(express.json());

const corsOptions = {
    origin: 'https://easy-net-frontend.vercel.app',
    optionsSuccessStatus: 200, 
    methods: ['GET', 'POST', 'Patch', 'DELETE'],
    allowedHeaders: 'Content-Type,Authorization'
  };
  
  app.use(cors(corsOptions));
  

//routing
app.get('/',(req, res) => { 
    res.json({hello:"ABEL"});
});
//middleware

app.use('/api/fields',fieldRoutes);


//start our server
app.listen(process.env.PORT );
