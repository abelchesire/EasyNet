import "dotenv/config";
import express from 'express';
import connectToDb from "./Config/connectToDb.js";
import cors from "cors";
import fieldRoutes from "./routes/fieldRoutes.js";
//Create an express app
const app = express();
 
connectToDb();
app.use(express.json());
app.use(cors());

//routing
app.get('/',(req, res) => { 
    res.json({hello:"nyangweso"});
});
//middleware

app.use('/api/fields',fieldRoutes);


//start our server
app.listen(process.env.PORT );