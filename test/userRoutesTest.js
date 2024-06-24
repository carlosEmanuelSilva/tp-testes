import request from 'supertest';
import assert, { throws } from 'assert';
import app from '../index.js';

describe('POST /users', () => {
    it('Deve retornar 201 e mensagem "Usuários listados"', (done) => {
        request(app)
            .get('/users')
            .expect(201)
            .end((err, res) => {
                if(err) return done(err)
                assert.strictEqual(res.body.message,  "Usuários listados")
                done();
            })
    })
})


describe('POST /entrarNaSala', () => {
    it('Deve retornar 200 e mensagem "Usuário entrou na sala"', (done) => {
        const newRoomReq = {
            user_id : '2',
            roomcode: '123'
        }

        request(app)
            .post('/entrarNaSala')
            .send(newRoomReq)
            .expect(200)
            .end((err, res) => {
                if(err) return done(err)
                assert.strictEqual(res.body.message,  "Usuário entrou na sala")
                done();
            })
    })
})

describe('POST /changeName', () => {
    it('Deve alterar o nome do usuário', (done) => {
        const newUserName = {
            userId : '5',
            name : 'Clodovil'
        }

        request(app)
            .post('/changeName')
            .send(newUserName)
            .expect(201)
            .end((err, res) => {
                if(err) return done(err)
                assert.strictEqual(res.body.message, "Nome alterado");
                done();
            })
    })
})

describe('POST /changePicture', () => {
    it('Deve alterar a foto de perfil do usuário', (done) => {
        const newUserPicture = {
            userId : '5',
            pictureId: '1'
        }

        request(app)
            .post('/changePicture')
            .send(newUserPicture)
            .expect(201)
            .end((err, res) => {
                if(err) return done(err)
                assert.strictEqual(res.body.message, "Foto alterada");
                done();
            })
    })
})

