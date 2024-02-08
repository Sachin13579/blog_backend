import mongoose from "mongoose";

const tagsSchema = new mongoose.Schema({
    tagName: {
        type: String,
        default: ""
    }
}, {
    timestamps: true,
})
const tagsModel = mongoose.model("tags", tagsSchema)
export default tagsModel;