import { createBareServer } from '@tomphttp/bare-server-node';
import express from 'express';
import http from 'node:http';
import path from "node:path";


const app = express();
const bare = createBareServer("/bare/");
const server = http.createServer();
const __dirname = process.cwd();
const PORT = 8080;

app.use(express.static("img")) // IMGS GET PROIRITY BI

app.use(express.static(path.join(__dirname, "static")));

app.get('*', function(req, res) {res.sendFile(path.join(__dirname, "static/404.html"))})

server.on("request", (req, res) => {
if (bare.shouldRoute(req)) {bare.routeRequest(req, res)} else {app(req, res)}})
server.listen({port: PORT}, () => {console.log("listening on port " + PORT)})
