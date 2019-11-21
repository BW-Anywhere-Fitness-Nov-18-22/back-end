const request = require("supertest");
const server = require("../../api/server");

describe("Client Routes", () => {
    describe("Fetch created classes from end points", () => {
        it("Should return 400", () => {
            return request(server)
                .get("/api/client/class")
                .then(res => {
                    expect(res.status).toBe(400);
                });
        });
    });

    describe("Fetch reservations from endpoint", () => {
        it("Should return 400", () => {
            return request(server)
                .get("/api/client/reservations")
                .then(res => {
                    expect(res.status).toBe(400);
                });
        });
    });

    describe("register reservations", () => {
        it("middleware working okay", () => {
            return request(server)
                .post("/api/client/reservations")
                .expect(400)
                .expect({ message: "Please supply token!" });
        });
    });
});



