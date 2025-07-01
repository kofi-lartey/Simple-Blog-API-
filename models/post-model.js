import { model,Schema } from "mongoose";
import normalize  from "normalize-mongoose";

export const postModel = new Schema({
    title:{
        type: String,
        required: true
    },
    content:{
        type: String,
        required: true
    },
    author:{
        type: String,
        required: true
    }
},{timestamps: true});

postModel.plugin(normalize);
export const Post = model('Post',postModel)