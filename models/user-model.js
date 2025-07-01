import { model,Schema } from "mongoose";
import normalize  from "normalize-mongoose";

export const userModel = new Schema({
    username:{
        type: String,
        unique: true,
        required: true
    },
    password:{
        type: String,
        required: true
    }

});

userModel.plugin(normalize);
export const User = model('User',userModel)