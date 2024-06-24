import request from 'supertest';
import assert from 'assert';
import app from '../index.js';

describe('GET /profilePictures', () => {
    it('Deve retornar as fotos de perfil', (done) => {
        request(app)
            .get('/profilePictures')
            .expect(201)
            .end((err, res) => {
                if(err) return done(err)
                assert.strictEqual(res.body.message,  "Fotos de perfil listadas")
                done();
            })
    })
})

describe('POST /getPicture', () => {
    it('Deve retornar as fotos de perfil', (done) => {
        const newPictureRequest = {
            pictureId : '1'
        }
        request(app)
            .post('/getPicture')
            .send(newPictureRequest)
            .expect(201)
            .end((err, res) => {
                if(err) return done(err)
                assert.strictEqual(res.body.message,  "Foto de perfil retornada")
                done();
            })
    })
})

