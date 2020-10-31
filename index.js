//KtbSS8xmNWL2iLyb
const express = require("express");
require("dotenv").config();
const {dbConnection} = require("./config");
const cors = require("cors");

//crear el servidor de express
const app = express();

//base de datos
dbConnection();
//cors
app.use(cors())

//lectura y parseo del body
app.use(express.json());

//rutas
app.use("/admin", require("./routes/auth"))
app.use("/projects", require("./routes/projects"))

//escuchar peticiones
app.listen(process.env.PORT, () =>{
    console.log(`servidor corriendo en puerto ${process.env.PORT}`);
})