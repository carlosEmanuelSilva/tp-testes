import request from 'supertest';
import assert from 'assert';
import app from '../index.js';

describe('POST /firends', () => {
    it('Deve retornar 201 e mensagem "Amigos Listados"', (done) => {
        const newFriend = {
            userId : '2'
        }

        request(app)
            .post('/friends')
            .send(newFriend)
            .expect(201)
            .end((err, res) => {
                if(err) return done(err)
                assert.strictEqual(res.body.message,  "Amigos listados")
                done();
            })
    })
})

describe('POST /addFriend', () => {
    it('Deve adicionar um amigo', (done) => {
        const newInvite = {
            userId: 2,
            friendId: 3
        }
        
        request(app)
            .post('/addFriend')
            .send(newInvite)
            .expect(201)
            .end((err, res) => {
                if(err) return done(err)
                assert.strictEqual(res.body.message, "Pedido de amizade enviado")
                done();
            })
    });
})


describe('POST /declineFriendship', () => {
    it('Deve recusar o pedido', (done) => {
        const newDecline = {
            userId: 2,
            friendId: 3
        }
        
        request(app)
            .post('/declineFriendship')
            .send(newDecline)
            .expect(201)
            .end((err, res) => {
                if(err) return done(err)
                assert.strictEqual(res.body.message, "Pedido de amizade recusado")
                done();
            })
    });
})