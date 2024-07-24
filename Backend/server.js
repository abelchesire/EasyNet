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
    origin: ['http://localhost:5173' ],
    optionsSuccessStatus: 200, 
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS']
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