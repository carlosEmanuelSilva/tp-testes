import request from 'supertest';
import assert from 'assert';
import app from '../index.js';

describe('POST /getPlayerPoints', () => {
    it('Deve retornar os pontos do jogador', (done) => {
        const newUserPoints = {
            userId: '2'
        }

        request(app)
            .post('/getPlayerPoints')
            .send(newUserPoints)
            .expect(201)
            .end((err, res) => {
                if(err) return done(err)
                assert.strictEqual(res.body.message, "Pontos retornados")
                done();
            })
    })
})


describe('POST /addPoints', () => {
    it('Deve alterar os pontos do jogador', (done) => {
        const newUserAddedPoints = {
            userId: '4',
            addedPoints: Number(5)
        }

        request(app)
            .post('/addPoints')
            .send(newUserAddedPoints)
            .expect(201)
            .end((err, res) => {
                if(err) return done(err)
                assert.strictEqual(res.body.message, "Pontos alterados")
                done();
            })
    })
})