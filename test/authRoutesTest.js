import request from 'supertest';
import assert from 'assert';
import app from '../index.js';

describe('POST /register', () => {
    it('Deve adicionar novo usuário no banco de dados', (done) => {
        const newUser = {
            name: "Dora, A Aventureira",
            email: "dora@gmail.com",
            password: "123456"
        }

        request(app)
            .post('/register')
            .send(newUser)
            .expect(201, done);
    })

    it('Deve retornar status 500 quando usuário ja existir no banco de dados', (done) => {
         const knownUser = {
            name: "Coco, The Coconut",
            email: "coconut@coco.com",
            password: "coco"
        }

        request(app)
            .post('/register')
            .send(knownUser)
            .expect(500, done);
    })
})

describe('POST /login', () => {
    it('Deve retornar 200 quando o login e senha forem corretos', (done) => {
        const newLogin = {
            email: "coconut@coco.com",
            password: "coco"
        }

        request(app)
            .post('/login')
            .send(newLogin)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                assert.strictEqual(res.body.message, "Login realizado com sucesso");
                done();
              });
    })
})