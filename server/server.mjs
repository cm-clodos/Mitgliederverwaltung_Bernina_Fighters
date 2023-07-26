import express from 'express';
import cors from 'cors';
import * as dotenv from "dotenv";
dotenv.config();

import membersRoute from './routes/members.mjs';
import trikotsRoute from './routes/trikots.mjs';
import apiDocRoute from './routes/apiDocs.mjs';
import ApiError from "./model/ApiError.mjs";

const app = express();
const port = process.env.SERVER_PORT || 3000;
const hostname = process.env.SERVER_HOSTNAME || 'localhost';

// * only for development purposes, remove in production environment and define allowed origins
let corsOptions = {
    origin: "*",
    credentials: true,
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/',  function (req, res) {
    res.send('Hello World!')
})

app.use('/members', membersRoute);
app.use('/trikots', trikotsRoute);
app.use('/api-docs', apiDocRoute);

app.use((req, res) => {
    res.status(404).send(new ApiError("ee-404"));
});

app.listen(port, hostname,() => {
    console.log(`Server running at http://${hostname}:${port}/`)
    console.log(`Server started on port ${port}`);
});

export {app};