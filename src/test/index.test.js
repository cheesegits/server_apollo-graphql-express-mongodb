// Lambdas were not used for testing - https://mochajs.org/#arrow-functions

import "chai/register-should";
import {
    expect
} from "chai";
import request from "supertest";

const url = "http://localhost:4000";

describe("GraphQL", function() {
    let newPlayerId = "player _id is not saved";
    it("A new player has been created", function(done) {
        request(url)
            .post("/graphql")
            .send({
                query: `
                mutation {
                    createPlayer(username: "bob") {
                        _id
                        username
                    }
                }`
            })
            .expect(200)
            .end(function(err, res) {
                if (err) throw err;
                const newPlayer = res.body.data.createPlayer;
                newPlayerId = newPlayer._id;
                expect(res.body).to.have.property("data");
                expect(res.body.data).to.have.property("createPlayer");
                newPlayer.should.have.all.keys("_id", "username");
                newPlayer._id.should.be.a("String");
                newPlayer.should.have.property("username", "bob");
                done();
            });
    });
    it("Successfully update a Player", function(done) {
        request(url)
            .post("/graphql")
            .send({
                query: `
                mutation {
                    updatePlayer(_id: "${newPlayerId}", username: "sara") {
                        _id
                        username
                    }
                }`
            })
            .expect(200)
            .end(function(err, res) {
                if (err) throw err;
                const updatedPlayer = res.body.data.updatePlayer;
                expect(res.body).to.have.property("data");
                expect(res.body.data).to.have.property("updatePlayer");
                updatedPlayer.should.have.all.keys("_id", "username");
                updatedPlayer._id.should.equal(newPlayerId);
                updatedPlayer.should.have.property("username", "sara");
                done();
            });
    });
    it("Successfully received an array of allPlayers", function(done) {
        request(url)
            .post("/graphql")
            .send({
                query: `
                {
                    allPlayers {
                        _id
                        username
                    }
                }`
            })
            .expect(200)
            .end(function(err, res) {
                if (err) throw err;
                const {
                    allPlayers
                } = res.body.data;
                expect(res.body).to.have.property("data");
                expect(res.body.data).to.have.property("allPlayers");
                expect(allPlayers).to.be.an("array");
                allPlayers.forEach(function(player) {
                    player.should.be.an("Object");
                    player.should.have.all.keys("_id", "username");
                });
                done();
            });
    });
    it("Successfully deleted a Player", function(done) {
        request(url)
            .post("/graphql")
            .send({
                query: `
                mutation {
                    deletePlayer(_id: "${newPlayerId}") {
                        _id
                        username
                    }
                }`
            })
            .expect(200)
            .end(function(err, res) {
                if (err) throw err;
                const deletedPlayer = res.body.data.deletePlayer;
                expect(res.body).to.have.property("data");
                expect(res.body.data).to.have.property("deletePlayer");
                deletedPlayer.should.have.all.keys("_id", "username");
                deletedPlayer._id.should.equal(newPlayerId);
                deletedPlayer.should.have.property("username", "sara");
                done();
            });
    });
});