//Node.js framework
import express from "express"
//Process request body
import bodyParser from "body-parser"
//Cross-origin Resource Sharing
import cors from "cors"
//Environment variables
import dotenv from "dotenv"
//Request safety
import helmet from "helmet"
//Log middleware
import morgan from "morgan"
//Project path
import path from "path"
import { fileURLToPath } from "url"

/* GENERAL CONFIG */
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
dotenv.config()
const app = express()
app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }))
app.use(morgan("common"))
app.use(bodyParser.json({ limit: "30mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))
app.use(cors())
//app.use("/assets", express.static(path.join(__dirname, 'public/assets')))

/* Local imports */
import { register, login } from "./controllers/auth.js"  // Authentication functions
import { getInvites, getFriendRequests } from "./controllers/notifications.js" // Notification functions
import { getUsers, entrarNaSala, createUserAsPlayer, changeName, changePicture } from "./controllers/users.js"
import { getMovies, insertMovie } from "./controllers/movies.js" //Movies menagement functions
import { getRules, insertRules } from "./controllers/movieRules.js"
import { addPlayer, expulsarJogador, getPlayersByRoomCode, getPlayerByUserId, deletePlayer } from "./controllers/player.js"
import { getFriends, addFriend, declineFriendship } from "./controllers/friendship.js"
import { deleteRoomInvites, sendInvite } from "./controllers/invite.js"
import { getPictures, getPicture } from "./controllers/picture.js"
import { getPoints, addPoints } from "./controllers/score.js"

/* ROUTES */
app.get("/", function (req, res) {
    res.sendFile("landing.html", { root: __dirname })
})
app.post("/register", register)
app.post("/login", login)
app.post("/invites", getInvites)
app.post("/friendRequests", getFriendRequests)
app.get("/users", getUsers)
app.post("/friends", getFriends)
app.post("/entrarNaSala", entrarNaSala)
app.post("/createUserAsPlayer", createUserAsPlayer)
app.get("/getMovies", getMovies)
app.post("/insertMovies", insertMovie)
app.get("/getMovieRules", getRules)
app.post("/insertRule", insertRules)
app.post("/expulsarJogadores", expulsarJogador)
app.post("/addPlayer", addPlayer)
app.post("/roomPlayers", getPlayersByRoomCode)
app.post("/getUser", getPlayerByUserId)
app.post("/deletePlayer", deletePlayer)
// Adicionado dia 21/06
app.post("/addFriend", addFriend)
app.post("/declineFriendship", declineFriendship)
app.post("/sendInvite", sendInvite)
app.post("/clearRoomInvites", deleteRoomInvites)
app.get("/profilePictures", getPictures)
app.post("/getPicture", getPicture)
app.post("/getPlayerPoints", getPoints)
app.post("/addPoints", addPoints)
app.post("/changeName", changeName)
// Adicionado dia 23/06
app.post("/changePicture", changePicture)

/* SERVER CONFIG */
const PORT = process.env.PORT || 3303
app.listen(PORT, () => console.log(`Server Port ${PORT} running.`))

 export default app; 