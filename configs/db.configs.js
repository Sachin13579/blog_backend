import mongoose from "mongoose";

const connectDatabase = () => {

    mongoose.connect(process.env.DBURL)
        .then((res) => console.log("connected"))
        .catch((err) => console.log("err in connection", err));
}
export default connectDatabase