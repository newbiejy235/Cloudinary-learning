import express from "express";
import authRotes from "./routes/auth/auth.route"
import postRouter from "./routes/post/post.routes"

const app = express()
const PORT = 5000
app.use(express.json())
app.use("/api/v1/auth",authRotes)
app.use("/api/v1/post",postRouter)

app.get("/", (req, res) => {
    res.send("helllo")
})

app.listen(PORT, () => {
    console.log(`Server running at  http://localhost:${PORT}/ see changes`);
    
})