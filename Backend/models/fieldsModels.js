import mongoose  from "mongoose";
const fieldSchema = new mongoose.Schema(
    {
        portNumber:{
            type:String,
            required:true,
            unique:true
          
        },
        typeOfDevice:{
            type:String,
            required:true
        },
        status:{
            type:String,
            enum:["Active","Inactive"],
            required:true
        },
        user:{
            type:String,
            required:true, 
        },
        officeNo:{
            type:Number,
            required:true
        },
        department:{
            type:String,
            enum:["ICT","HR","TAS","MRPD","REG","Director","Finance","Security"],
            required:true
        }
    },
    {
        timestamps:true
    }
);
const Field = mongoose.model("Field",fieldSchema)

 export default Field;
