const request = require('supertest');

const app = require('../../app');
const { User } = require('../../database/models/relations');
const { GenerateSalt, GeneratePassword } = require('../../utils/tokens');

let token;
let postId;
let commentId;

beforeAll(async () => {
    const salt = await GenerateSalt();
    const password = await GeneratePassword("password", salt);
    await User.create({ userName: "mazenr", email: "test@email.com", password, salt, verified: true });
    const res = await request(app).post('/users/login')
    .send({
        email: "test@email.com",
        password: "password"
    });
    token = res.body.token

    const res2 = await request(app).post('/posts/create')
    .send({
        title: "amazing post",
        description: "isn't is amazing?"
    })
    .set(
        'Authorization', `Bearer ${token}`
    );
    postId = res2.body.data.postId
});

afterAll(async () => {
    const res = await request(app).delete('/users/delete')
    .set(
        'Authorization', `Bearer ${token}`
    )

    const res2 = await request(app).delete(`/posts/delete/${postId}`)
    .set(
        'Authorization', `Bearer ${token}`
    );
});

describe("Create Comment", () => {


    test("It should return 403 status code when no token is provided", async () => {
        const res = await request(app).post('/comments/create');
        expect(res.status).toEqual(403);
    });

    test("It should return 403 status code when no token is provided or user isn't verified", async () => {
        const res = await request(app).post('/comments/create');
        expect(res.status).toEqual(403);
    });

    test("It should return 400 status code when invalid data is provided", async () => {
        const res = await request(app).post('/comments/create')
        .set(
            'Authorization', `Bearer ${token}`
        );
        console.log(token, postId)
        expect(res.status).toEqual(400);
    });

    test("It should create a comment when provided data is valid", async () => {
        const res = await request(app).post('/comments/create')
        .set(
            'Authorization', `Bearer ${token}`
        )
        .send({
            postId: postId,
            description: "sheeesh!"
        });
        commentId = res.body.data.commentId
        expect(res.status).toEqual(200);
    });    
});

describe("Get comment", () => {
    test("it should return 404 status code if post doesn't exist", async () => {
        const res = await request(app).get('/comments/post/999')
        expect(res.status).toEqual(404);
    });
    
    test("it should return 200 status code if comments exist", async () => {
        const res = await request(app).get(`/comments/post/${postId}`)
        expect(res.status).toEqual(200);
    });
});

describe("Update comment", () => {
    test("it should return 404 status code if comment doesn't exist", async () => {
        const res = await request(app).put('/comments/update/999}')
        .set(
            'Authorization', `Bearer ${token}`
        )
        .send({
            description: "updated sheeesh!"
        });                    
        expect(res.status).toEqual(404);
    });
    
    test("it should update comment if comment exists with a valid token", async () => {
        const res = await request(app).put(`/comments/update/${commentId}`)
        .set(
            'Authorization', `Bearer ${token}`
        )
        .send({
            description: "updated sheeesh!"
        });        
        expect(res.status).toEqual(200);
        expect(res.body.data.description).toEqual("updated sheeesh!");
    });
});

describe("Delete comment", () => {
    test("it should return 404 status code if comment doesn't exist", async () => {
        const res = await request(app).delete('/comments/delete/999')
        .set(
            'Authorization', `Bearer ${token}`
        )              
        expect(res.status).toEqual(404);
    });
    
    test("it should delete comment if comment exists with a valid token", async () => {
        const res = await request(app).delete(`/comments/delete/${commentId}`)
        .set(
            'Authorization', `Bearer ${token}`
        )      
        expect(res.status).toEqual(200);
    });
});
