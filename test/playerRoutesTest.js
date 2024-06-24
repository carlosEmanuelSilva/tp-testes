import request from 'supertest';
import assert from 'assert';
import app from '../index.js';

describe('POST /expulsasrJogadores', () => {
    it('Deve remover um jogador da sala e retornar o status 201', (done) => {
        const newKickedPlayer = {
            userId: '2'
        }

        request(app)
            .post('/expulsarJogadores')
            .send(newKickedPlayer)
            .expect(201)
             .end((err, res) => {
                if(err) return done(err)
                assert.strictEqual(res.body.message,  "Player expulso")
                done();
            })
    })

})

describe('POST /roomPlayers', () => {
    it('Deve retornar os jogadores de uma sala', (done) => {
        const newPlayerList = {
            roomCode: 'ABCDE'
        }

        request(app)
            .post('/roomPlayers')
            .send(newPlayerList)
            .expect(200)
            .end((err, res) => {
                if(err) return done(err)
                assert.strictEqual(res.body.message,  "Jogadores retornados com sucesso")
                done();
            })
    })
})

describe('POST /addPlayer', () => {
    it('Deve adicionar novo jogador à sala', (done) => {
        const newPlayerAdded = {
            userId: '3',
            roomCode: 'ABCDE'
        }
        
         request(app)
            .post('/addPlayer')
            .send(newPlayerAdded)
            .expect(200)
            .end((err, res) => {
                if(err) return done(err)
                assert.strictEqual(res.body.message,  "Jogador adicionado com sucesso")
                done();
            })
    })
})

describe('GET /getUser', () => {
    it('Deve retornar o jogador que corresponde ao usuário', (done) => {
        const newPlayerReturned = {
            userId: '3',
        }
        
         request(app)
            .post('/getUser')
            .send(newPlayerReturned)
            .expect(200)
            .end((err, res) => {
                if(err) return done(err)
                assert.strictEqual(res.body.message,  "Usuário retornado com sucesso");
                done();
            })
    })
})

describe('POST /deletePlayer', () => {
    it('Excluir player', (done) => {
        const newPlayerDeleted = {
            userId: '3',
        }
        
         request(app)
            .post('/deletePlayer')
            .send(newPlayerDeleted)
            .expect(200)
            .end((err, res) => {
                if(err) return done(err)
                assert.strictEqual(res.body.message,  "Jogador deletado com sucesso")
                done();
            })
    })
})