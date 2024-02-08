import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import router from './routes/index.js';
import cors from 'cors';
import connectDatabase from './configs/db.configs.js';
import dbSchema from './models/index.models.js';
const app = express();
global.Models = dbSchema;
connectDatabase()
app.use(cors({
    origin: "*"
}))
app.use(morgan("tiny"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use('/api/v1', router)

app.get('/healthCheck', (req, res) => {
    try {
        return res.status(200).json({
            status: true,
            message: "server is lookin healthy"
        });
    } catch (error) {
        return res.sendStatus(200).json({
            status: true,
            message: "server is lookin healthy"
        });
    }
})
app.listen(8080, () => {
    console.log("listening on port 8080")
}
)