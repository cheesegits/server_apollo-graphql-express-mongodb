import express from "express";
import bodyParser from "body-parser";
import {
    graphqlExpress,
    graphiqlExpress
} from "apollo-server-express";
import mongoose from "mongoose";

import schema from "./data/schema";
import Player from "./data/model";

const app = express();

mongoose.connect("mongodb://localhost/botbchess-test");

app.use("/graphql", bodyParser.json(), graphqlExpress({
    schema,
    context: {
        Player
    }
}));
app.use("/graphiql", graphiqlExpress({
    endpointURL: "/graphql"
}));

app.listen(4000, () => console.log("Now browse to localhost:4000/graphiql"));

export default app;