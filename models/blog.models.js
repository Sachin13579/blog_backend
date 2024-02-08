import mongoose from "mongoose";

const blogPostSchema = new mongoose.Schema({
    title: {
        type: String,
        default: ""
    },
    description: {
        type: String,
        default: ""
    },
    imageURI: {
        type: String,
        default: "",
    },
    tagsId: [
        {
            type: mongoose.Types.ObjectId,
            ref: "tags"
        }
    ],

}, {
    timestamps: true
}
)
const blogsModel = mongoose.model('blogs', blogPostSchema)
export default blogsModel;