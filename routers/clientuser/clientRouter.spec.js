const db = require("../../config/dbConfig");
const Classes = require("./clientRouter");
const Users = require("../../helpers/dbModel");

beforeEach(async () => {
  await db("users").truncate();
});
describe("Users", () => {
 

  //     describe('Add new class', () => {
  //         it('Should be empty', async () => {
  //             let users = await db('classes');
  //             expect(users).toHaveLength(0);
  //         })
  //     });
  // });
  describe("User model", () => {
    describe("insert function", () => {
      let users;
      test("should insert a user", async () => {
        await Users.addUser({
          firstName: "Femi",
          lastName: "Olu",
          email: "asadadf@gmail.com",
          password: "abc123",
          role: "Instructor"
        });
        await Users.addUser({
          firstName: "Tola",
          lastName: "Fornicator",
          email: "augtvuyghb@gmail.com",
          password: "abc123",
          role: "Instructor"
        });
        users = await db("users");
        expect(users).toHaveLength(2);
        expect(users[0]).toHaveProperty("role");
        expect(users[0].id).toBe(1);
        expect(users[0].firstName).toBe("Femi");
        await Users.addUser({
          firstName: "Bola",
          lastName: "Adulterer",
          email: "almlkjom@gmail.com",
          password: "abc123",
          role: "Instructor"
        });
        users = await db("users");
        expect(users).toHaveLength(3);
      });
    });
  });
  describe("User model", () => {
    test("should be defined", () => {
      expect(Users).toBeDefined();
    });
  });
});
