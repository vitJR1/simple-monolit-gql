import express from "express";
import morgan from "morgan";
import morganJson from "morgan-json";
import cookieParser from "cookie-parser";

const app = express();

app.use(morgan(morganJson({
	short: ':method :url :status',
	length: ':res[content-length]',
	'response-time': ':response-time ms'
})));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

export default app
