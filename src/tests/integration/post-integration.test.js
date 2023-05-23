const request = require('supertest');

const app = require('../../app');

let token;
let postId;

beforeAll(async () => {
    const res = await request(app).post('/users/register')
    .send({
        userName: "mazenr",
        email: "test@email.com",
        password: "password"
    });

    const res2 = await request(app).post('/users/login')
    .send({
        email: "test@email.com",
        password: "password"
    });
    token = res2.body.token
});

afterAll(async () => {
    const res = await request(app).delete('/users/delete')
    .set(
        'Authorization', `Bearer ${token}`
    )
});

describe("Create a new post", () => {

    test("It should return 403 status code when no token is provided", async () => {
        const res = await request(app).post('/posts/create');
        expect(res.status).toEqual(403);
    });

    test("It should return 400 status code when data is invalid ", async () => {
        const res = await request(app).post('/posts/create')
        .set(
            'Authorization', `Bearer ${token}`
        );
        expect(res.status).toEqual(400);
    });

    test("It should return 200 status code when data is valid ", async () => {
        const res = await request(app).post('/posts/create')
        .send({
            title: "amazing post",
            description: "isn't is amazing?"
        })
        .set(
            'Authorization', `Bearer ${token}`
        );
        postId = res.body.data.postId
        expect(res.status).toEqual(200);
    });
});

describe("Get post", () => {

    test("It should return 404 if post doesn't exist", async () => {
        const res = await request(app).get('/posts/999');
        expect(res.status).toEqual(404);
    });

    test("It should return 200 status code if post exists", async () => {
        const res = await request(app).get(`/posts/${postId}`);
        expect(res.status).toEqual(200);
    });
});

describe("Update post", () => {

    test("It should update post is data is valid and post exists", async () => {
        const res = await request(app).put(`/posts/update/${postId}`)
        .send({
            title: "updated amazing post",
            description: "updated amazing description"
        })
        .set(
            'Authorization', `Bearer ${token}`
        );
        expect(res.status).toEqual(200);
        expect(res.body.data.title).toEqual("updated amazing post");
    });
});

describe("Delete post", () => {

    test("It should return 403 if user isn't authrorized", async () => {
        const res = await request(app).delete(`/posts/delete/${postId}`)
        .set(
            'Authorization', `Bearer Invalid token`
        );
        expect(res.status).toEqual(403);
    });

    test("It should delete post if post exists", async () => {
        const res = await request(app).delete(`/posts/delete/${postId}`)
        .set(
            'Authorization', `Bearer ${token}`
        );
        expect(res.status).toEqual(200);
    });
});