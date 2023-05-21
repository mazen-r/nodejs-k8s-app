const request = require('supertest');

const app = require('../../app');

let validToken;

describe("Create a new user", () => {

    test("It should return 400 status code when no data provided", async () => {
        const res = await request(app).post('/users/register');
        expect(res.status).toEqual(400)
    });

    test("It should return 400 status code when data is invalid", async () => {
        const res = await request(app).post('/users/register')
        .send({
            userName: "mazenr",
            email: "invalidemail",
            password: "pass"
        });
        expect(res.status).toEqual(400)
    });

    test("It should return 200 status code if data is valid", async () => {
        const res = await request(app).post('/users/register')
        .send({
            userName: "mazenr",
            email: "test@email.com",
            password: "password"
        });
        expect(res.status).toEqual(200)
    });

    test("It should return 200 status code user already exists", async () => {
        const res = await request(app).post('/users/register')
        .send({
            userName: "mazenr",
            email: "test@email.com",
            password: "password"
        });
        expect(res.status).toEqual(400)
    });

    test("It should return 400 status code user already exists", async () => {
        const res = await request(app).post('/users/register')
        .send({
            userName: "mazenr",
            email: "test@email.com",
            password: "password"
        });
        expect(res.status).toEqual(400)
    });
});

describe("Login an existing user", () => {

    test("It should return 400 status code if invalid data is provided", async () => {
        const res = await request(app).post('/users/login')
        .send({
            email: "test@email.com",
            password: "wrongpassword"
        });
        expect(res.status).toEqual(400)
    });

    test("It should return 200 status if user exists", async () => {
        const res = await request(app).post('/users/login')
        .send({
            email: "test@email.com",
            password: "password"
        });
        expect(res.status).toEqual(200)
        validToken = res.body.token
    });
});

describe("Verify token", () => {

    test("It should return 404 status code if invalid token", async () => {
        const res = await request(app).post('/users/profile')
        .set(
            'Authorization', `Bearer invalid token`
        );
        expect(res.status).toEqual(404)
    });

    test("It should return 200 status if token is valid", async () => {
        const res = await request(app).get('/users/profile')
        .set(
            'Authorization', `Bearer ${validToken}`
        );
        expect(res.status).toEqual(200)
    });
});

describe("delete user", () => {

    test("It should delete a user when provide a valid token", async () => {
        const res = await request(app).delete('/users/delete')
        .set(
            'Authorization', `Bearer ${validToken}`
        );
        expect(res.status).toEqual(200)
    });
});