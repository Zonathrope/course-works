import express from 'express';
import cors from 'cors'
import path from 'path';
const __dirname = path.resolve();

import router from "./routers/router.js";

const app = express();
const PORT = process.env.PORT || 3000
const staticPath = __dirname + '/app/'

app.use(cors({
    origin: "*"
}))

app.use(express.json())
app.use('/api', router)

app.use(express.static(staticPath))


async function start() {
    try {
        app.listen(PORT, () => console.log('SERVER STARTED ON PORT ' + PORT))
    } catch (e) {
        console.log(e)
    }
}

start()
