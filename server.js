import express from "express";
import morgan from "morgan";
import cors from "cors";
import bodyParser from "body-parser";
import env from "dotenv";
import signinupRouter from "./routes/signinup.js";
import donationRouter from "./routes/donation.js";
import accountRouter from "./routes/account.js";
import callfordonationRouter from "./routes/callfordonation.js";
import connectDB from "./database/connect.js";

const app = express();
env.config();
const PORT = process.env.PORT || 3001;

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

var allowList = ["https://jolly-pike-1d2221.netlify.app"];
app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(signinupRouter);
app.use(donationRouter);
app.use(accountRouter);
app.use(callfordonationRouter);

const startServer = async () => {
  try {
    connectDB(process.env.MONGO_URI);
    app.listen(
      PORT,
      console.log(
        `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
      )
    );
  } catch (err) {
    console.log(err);
  }
};

startServer();
