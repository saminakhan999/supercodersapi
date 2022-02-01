const request = require('supertest');
const router = require('../router');

describe('Blog posts', () => {
    test('responds to GET / with a 200 on success', function(done) {
        request(router)
            .get('/blog')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });


    test('retrieves a blog post by id', (done) => {
        request(router)
            .get('/blog/1')
            .expect(200)
            .expect([{"id":1,"blogtitle":"Ostriches don't exist","blogcontent":"Scientists recently discovered that ostriches are just a large form of pigeon....","date":"Sat, 29 Jan 2022 11:45:33 GMT","gif":"","comment":[{"id":1,"blogcomment":"Hiiii"},{"id":2,"blogcomment":"Yoooooo"}],"emoji":[{"id":1,"emojiCount":100},{"id":2,"emojiCount":33},{"id":3,"emojiCount":11}]}], done);
    });

    test('retrieves blog comments by id', (done) => {
        request(router)
            .get('/blog/2/comment')
            .expect(200)
            .expect({
                id:1,
                blogcomment: 'HAHAHAHAA'
            }, {
                id:2,
                blogcomment: 'GOOD ONE!!!'
            }, done);
    });

    test('retrieves a blog emoji reaction by id', (done) => {
        request(router)
            .get('/blog/2/emoji/1')
            .expect(200)
            .expect({eid:1, emojiCount: 67 }, done);
    });




    test('Create a blog post with POST /with status 201', (done) => {
        request(router)
        .post('/blog')
        .expect('Content-Type', /json/)
        .send({
            blogtitle: "blog titleeee",
            blogcontent: "blog contentttt",
        })
    
        .expect((res) => {
            res.body.blogtitle = "this is a blog title test",
            res.body.blogcontent = "this is a blog content test"
        })
        .expect(201, done)

    });

    test('Create a blog comment with POST /with status 201', (done) => {
        request(router)
        .post('/blog/3')
        .expect('Content-Type', /json/)
        .send({
            blogcomment: "this is a blog comment test",
        })
    
        .expect((res) => {
            res.body.blogcomment = 'this is a blog comment test'
        })
        .expect(201, done)

    });

    test('Increase the emoji count by 1', (done) => {
        request(router)
        .patch('/blog/1/emoji/1')
        .expect('Content-Type', /json/)
        .expect((res) => {
            res.body.emoji = {eid:1, emojiCount: 101}
        })
        .expect(200, done)

    });




    test('responds to DELETE / with status 204', (done) => {
        request(router)
            .delete('/blog/3')
            .expect(204, done);
    });
});
