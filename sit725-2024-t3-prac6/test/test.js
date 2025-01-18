const express = require("express");
const app = express();
const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
let should = chai.should();
const { describe, it } = require("mocha");
require("dotenv").config();

const api = `http://localhost:${process.env.port}/api`;
chai.use(chaiHttp);

describe("Get requests for dog cards", () => {
  it("returns 200 status code for success get all dog cards", (done) => {
    chai
      .request(api)
      .get("/cards")
      .end((error, response) => {
        const responseBody = response.body;
        expect(responseBody.status).to.equal(200);
        done();
      });
  });

  it("returns an array with 0 or more objects", (done) => {
    chai
      .request(api)
      .get("/cards")
      .end((error, response) => {
        const responseBody = response.body;
        responseBody.data.should.be.a("array");
        done();
      });
  });
});

describe("Create dog card", () => {
  it("returns 201 status code for success creation", (done) => {
    let newCard = {
      title: "Doggie test",
      image: "images/dog3.jpeg",
      link: "About Dog test",
      desciption: "Demo desciption about Dog test",
    };
    chai
      .request(api)
      .post("/cards")
      .send(newCard)
      .end((error, response, body) => {
        const responseBody = response.body;
        expect(responseBody.status).to.equal(201);
        done();
      });
  });

  it("returns 400 status code for incomplete card", (done) => {
    let newCard = {
      image: "images/dog3.jpeg",
      link: "About Dog test",
      desciption: "Demo desciption about Dog test",
    };
    chai
      .request(api)
      .post("/cards")
      .send(newCard)
      .end((error, response, body) => {
        const responseBody = response.body;
        expect(responseBody.status).to.equal(400);
        done();
      });
  });
});


describe("Get specific dog card by ID", () => {
  it("returns 200 status code and the correct card details when card exists", (done) => {
    const validCardId = "1";  // Replace with a valid card ID
    chai
      .request(api)
      .get(`/cards/${validCardId}`)
      .end((error, response) => {
        const responseBody = response.body;
        expect(responseBody.status).to.equal(200);
        expect(responseBody.data).to.be.an("object");
        expect(responseBody.data).to.have.property("title");
        expect(responseBody.data).to.have.property("image");
        done();
      });
  });

  it("returns 404 status code if card does not exist", (done) => {
    const invalidCardId = "999";  // Replace with a non-existing card ID
    chai
      .request(api)
      .get(`/cards/${invalidCardId}`)
      .end((error, response) => {
        const responseBody = response.body;
        expect(responseBody.status).to.equal(404);
        done();
      });
  });
});

describe("Update dog card", () => {
  it("returns 200 status code and updated details for successful update", (done) => {
    const validCardId = "1";  // Replace with a valid card ID
    const updatedCard = {
      title: "Updated Dog Test",
      image: "images/updated_dog.jpeg",
      link: "Updated About Dog",
      desciption: "Updated description about Dog",
    };
    chai
      .request(api)
      .put(`/cards/${validCardId}`)
      .send(updatedCard)
      .end((error, response) => {
        const responseBody = response.body;
        expect(responseBody.status).to.equal(200);
        expect(responseBody.data.title).to.equal(updatedCard.title);
        done();
      });
  });

  it("returns 400 status code for invalid card ID", (done) => {
    const invalidCardId = "999";  // Replace with a non-existing card ID
    const updatedCard = {
      title: "Invalid Card Update",
      image: "images/invalid_dog.jpeg",
      link: "Invalid About Dog",
      desciption: "Invalid description about Dog",
    };
    chai
      .request(api)
      .put(`/cards/${invalidCardId}`)
      .send(updatedCard)
      .end((error, response) => {
        const responseBody = response.body;
        expect(responseBody.status).to.equal(404);
        done();
      });
  });
});


describe("Delete dog card", () => {
  it("returns 200 status code and a success message for successful deletion", (done) => {
    const validCardId = "1";  // Replace with a valid card ID
    chai
      .request(api)
      .delete(`/cards/${validCardId}`)
      .end((error, response) => {
        const responseBody = response.body;
        expect(responseBody.status).to.equal(200);
        expect(responseBody.message).to.equal("Card successfully deleted.");
        done();
      });
  });

  it("returns 404 status code if card does not exist", (done) => {
    const invalidCardId = "999";  // Replace with a non-existing card ID
    chai
      .request(api)
      .delete(`/cards/${invalidCardId}`)
      .end((error, response) => {
        const responseBody = response.body;
        expect(responseBody.status).to.equal(404);
        done();
      });
  });
});


describe("Edge case for no dog cards", () => {
  it("returns empty array for no dog cards", (done) => {
    chai
      .request(api)
      .get("/cards")
      .end((error, response) => {
        const responseBody = response.body;
        responseBody.data.should.be.an("array").that.is.empty;
        done();
      });
  });
});


describe("Create dog card with missing required fields", () => {
  it("returns 400 for missing title field", (done) => {
    const newCard = {
      image: "images/dog4.jpeg",
      link: "About Dog Test 2",
      desciption: "Description for missing title",
    };
    chai
      .request(api)
      .post("/cards")
      .send(newCard)
      .end((error, response) => {
        const responseBody = response.body;
        expect(responseBody.status).to.equal(400);
        expect(responseBody.message).to.equal("Title is required.");
        done();
      });
  });
});
