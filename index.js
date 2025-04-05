import web from './src/app/web.js'
import dotenv from "dotenv";
dotenv.config();


const PORT = process.env.PORT || 1000;
web.listen(PORT, () => console.log("server is listening at http://localhost:" + PORT));