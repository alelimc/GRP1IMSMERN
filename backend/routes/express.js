import express from 'express';
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compress from "compression";
import cors from "cors";
import helmet from "helmet";
import Template from '../template.js'
import routes from './index.js'

const app = express()
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/",routes);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compress());
app.use(helmet());

app.use((err, req, res, next) => { 
	if(err.name === 'UnauthorizedError'){
		res.status(401).json({"error" : err.name + ": " + err.message});
	} else if(err) {
		res.status(400).json({"error" : err.name + ": " + err.message});
		console.log(err);
	};
});
export default app;