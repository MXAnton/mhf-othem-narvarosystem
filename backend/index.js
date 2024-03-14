require("dotenv").config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const router = require("./routes");
const AppError = require("./utils/appError");
const errorHandler = require("./utils/errorHandler");

const app = express();

app.use(cookieParser());
// Allow only this domain to access api
app.use(
  cors({
    credentials: true,
    origin: process.env.WHITELISTED_ORIGIN,
  })
);
//Check origin of request here
app.use((req, res, next) => {
  const origin = req.get("origin");

  if (
    origin !== process.env.WHITELISTED_ORIGIN &&
    process.env.WHITELISTED_ORIGIN !== "*"
  ) {
    console.log(
      `Unauthorized origin: ${origin} Tried get access to: ${req.originalUrl}`
    );

    return next(new AppError("You are not authorized.", 401));
  }

  console.log(
    `Authorized origin: ${
      origin || process.env.WHITELISTED_ORIGIN
    } Gained access to: ${req.originalUrl}`
  );

  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

app.all("*", (req, res, next) => {
  next(new AppError(`The URL ${req.originalUrl} does not exists`, 404));
});
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
