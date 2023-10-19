import express from "express"
import dotenv from "dotenv"
import {initdb} from "./utils/dbutils"
import authUserRoute from "./routes/auth-user-routes";
import taskRoutes from "./routes/task-routes";
import cors from "cors";
// import swaggerdocs from "swagger-jsdoc"
import swaggerui from "swagger-ui-express"

dotenv.config();

const PORT= process.env.PORT || 9999

initdb()
const app=express();
// const options = {
//     definition:{
//         openapi:"1.0.0",
//         servers:[
//             {
//                 url:"http://localhost:4011/",
//             },
//         ],
//     },
//     apis:["./routes/*.ts"],
// }
// const spacs = swaggerdocs(options)
app.use(cors())
app.use(express.json())

app.get("/",(req,res)=>{
    res.status(200).send(`hello`)
})

app.use("/task",taskRoutes)
app.use("/user",authUserRoute)
app.use(
    "/api-docs",
    swaggerui.serve,
    swaggerui.setup(require("../swagger.json")),
  );

app.listen(PORT,()=>{
    console.log("server is listening on port",PORT)
})