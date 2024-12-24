"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_js_1 = __importDefault(require("./server.js"));
//import mongodb from 'mongodb';
const mongodb = require('mongodb');
const reviewsDAO_js_1 = __importDefault(require("./dao/reviewsDAO.js")); // DAO: Data Access Object
// process of connecting to database
const MongoClient = mongodb.MongoClient;
const mongo_username = process.env['MONGO_USERNAME']; //.MONGO_USERNAME;
const mongo_password = process.env['MONGO_PASSWORD'];
const uri = `mongodb+srv://${mongo_username}:${mongo_password}@cluster0.u9g0g.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
//  Connect - Driver :
const port = 8000;
MongoClient.connect(uri, {
    maxPoolSize: 50,
    wtimeoutMS: 2500 /*, //ms
    useNewUrlParser: true*/
}).catch(err => {
    console.error(err.stack);
    process.exit(1);
})
    .then((client) => __awaiter(void 0, void 0, void 0, function* () {
    yield reviewsDAO_js_1.default.injectDB(client); // send our DB connects to reviewsDAO
    server_js_1.default.listen(port, () => {
        console.log(`listening on port ${port}`);
    });
}));
