// Lambdas were not used for testing - https://mochajs.org/#arrow-functions

import "chai/register-should";
import {
    expect
} from "chai";
import request from "supertest";

const url = "http://localhost:4000";

describe("GraphQL", function() {
    let newUserId = "User _id is not saved";
    it("A new User has been created", function(done) {
        request(url)
            .post("/graphql")
            .send({
                query: `
                mutation {
                    createUser(username: "bob") {
                        _id
                        username
                    }
                }`
            })
            .expect(200)
            .end(function(err, res) {
                if (err) throw err;
                const newUser = res.body.data.createUser;
                newUserId = newUser._id;
                expect(res.body).to.have.property("data");
                expect(res.body.data).to.have.property("createUser");
                newUser.should.have.all.keys("_id", "username");
                newUser._id.should.be.a("String");
                newUser.should.have.property("username", "bob");
                done();
            });
    });
    it("Successfully update a User", function(done) {
        request(url)
            .post("/graphql")
            .send({
                query: `
                mutation {
                    updateUser(_id: "${newUserId}", username: "sara") {
                        _id
                        username
                    }
                }`
            })
            .expect(200)
            .end(function(err, res) {
                if (err) throw err;
                const updatedUser = res.body.data.updateUser;
                expect(res.body).to.have.property("data");
                expect(res.body.data).to.have.property("updateUser");
                updatedUser.should.have.all.keys("_id", "username");
                updatedUser._id.should.equal(newUserId);
                updatedUser.should.have.property("username", "sara");
                done();
            });
    });
    it("Successfully received an array of allUsers", function(done) {
        request(url)
            .post("/graphql")
            .send({
                query: `
                {
                    allUsers {
                        _id
                        username
                    }
                }`
            })
            .expect(200)
            .end(function(err, res) {
                if (err) throw err;
                const {
                    allUsers
                } = res.body.data;
                expect(res.body).to.have.property("data");
                expect(res.body.data).to.have.property("allUsers");
                expect(allUsers).to.be.an("array");
                allUsers.forEach(function(user) {
                    user.should.be.an("Object");
                    user.should.have.all.keys("_id", "username");
                });
                done();
            });
    });
    it("Successfully deleted a User", function(done) {
        request(url)
            .post("/graphql")
            .send({
                query: `
                mutation {
                    deleteUser(_id: "${newUserId}") {
                        _id
                        username
                    }
                }`
            })
            .expect(200)
            .end(function(err, res) {
                if (err) throw err;
                const deletedUser = res.body.data.deleteUser;
                expect(res.body).to.have.property("data");
                expect(res.body.data).to.have.property("deleteUser");
                deletedUser.should.have.all.keys("_id", "username");
                deletedUser._id.should.equal(newUserId);
                deletedUser.should.have.property("username", "sara");
                done();
            });
    });
});