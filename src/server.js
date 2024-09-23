require("express-async-errors");
require("dotenv/config");

const uploadConfig = require("./configs/upload");

const cors = require("cors");
const express = require("express");
const routes = require("./routes");
const cookieParser  = require("cookie-parser");
const AppError = require("./utils/AppError");

const app = express();
app.use(express.json());
app.use(cookieParser()); 
app.use(cors({
  origin: ["http://localhost:5173", "http://127.0.0.1:5173/",  "https://dapper-phoenix-9bf0cb.netlify.app"],
  credentials: true
}));
app.use("/files",express.static(uploadConfig.UPLOADS_FOLDER));
app.use(routes);

app.use((err, request, response, next) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        status: "error",
        message: err.message,
      });
    }
  
    console.error(err);
  
    return response.status(500).json({
      status: "error",
      message: "Internal server error",
    });
});


const PORT = process.env.SERVER_PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`));