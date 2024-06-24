import request from 'supertest';
import assert from 'assert';
import app from '../index.js';

describe('POST /invites', () => {
    it('Deve listar os convites do usuario e retornar 201', (done) => {
        const newInvite = {
            userId: '2'
        }

        request(app)
            .post('/invites')
            .send(newInvite)
            .expect(201, done);
    })
});

describe('POST /friendRequests', (done) => {
    it('Deve retornar os pedidos de amizade e retornar o código de status http 201', (done) => {
        const newFriendResquest = {
            userId: '3'
        }

        request(app)
            .post('/friendRequests')
            .send(newFriendResquest)
            .expect(201, done);
    })
})