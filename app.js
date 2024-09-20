//mongodb+srv://Daenerys:<db_password>@cluster0.rljh9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
// PMMAJAUGPpRYk7qk
//Daenerys

const express = require("express");
const config = require("config");
const mongoose = require("mongoose");

const app = express();

//чтобы парсить в формате json - чтобы request.body(в authRouter) был объект, а не undefined
app.use(express.json({ exxtended: true }));

app.use("/api/auth", require("./routes/authRoutes"));

const PORT = config.get("port") || 5000;

async function start() {
  try {
    //конектимся к базе монгуза
    await mongoose.connect(config.get("mongoURI"), {});
    app.listen(PORT, () => console.log(`App has been started on port ${PORT}`));
  } catch (error) {
    console.log("Server Error", error.message);
    process.exit(1);
  }
}

start();
