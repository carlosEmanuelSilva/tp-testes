import request from 'supertest';
import assert from 'assert';
import app from '../index.js';

describe('POST /sendInvite', () => {
    it('Deve adicionar novo convite para a sala', (done) => {
        const newRoomInvite = {
            senderId : '2',
            invitedId: '8',
            roomCode: '123'
        }

        request(app)
            .post('/sendInvite')
            .send(newRoomInvite)
            .expect(201)
            .end((err, res) => {
                if(err) return done(err)
                assert.strictEqual(res.body.message,  "Convite para a sala enviado")
                done();
            })
    })
})


describe('POST /clearRoomInvites', () => {
    it('Deve deletar convites para uma sala', (done) => {
        const newRoomClearOperation = {
            roomCode: '123'
        }

        request(app)
            .post('/clearRoomInvites')
            .send(newRoomClearOperation)
            .expect(201)
            .end((err, res) => {
                if(err) return done(err)
                assert.strictEqual(res.body.message,  "Convites da sala limpados")
                done();
            })
    })
})