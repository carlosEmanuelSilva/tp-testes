import request from 'supertest';
import assert from 'assert';
import app from '../index.js';

describe('GET /getMovie', () => {
    it('Deve retornar um filme específico quando um id válido é fornecido', (done) => {
      const userId = '2';
      request(app)
        .get(`/getMovies?id=${userId}`)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          assert.notEqual(res.body.data, null);
          done();
        });
    });

    it('Deve retornar um erro 404 quando um id inválido é fornecido', (done) => {
        const userId = '*';
        request(app)
          .get(`/getMovie?id=${userId}`)
          .expect(404, done);
    });
});

describe('POST /insertMovies', () => {
    it('Deve inserir um novo filme', (done) => {
      const newMovie = {
        userId: '8',
        movieName: 'Dois Caras Legais',
      };
      request(app)
        .post('/insertMovies')
        .send(newMovie)
        .expect(201, done);
    });
});

describe('GET /getRules', () => {
    it('Deve retornar as regras de um filme quando o id válido é fornecido', (done) => {
        const movieId = '2';
        request(app)
            .get(`/getMovieRules?movieId=${movieId}`)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                assert.notEqual(res.body.data, null);
                done();
            })
    })
})

describe('POST /insertRule', () => {
  it('Deve inserir uma nova regra para um filmes específico', (done) => {
    const newRule = {
      movieId : '6',
      rule : 'Beber quando o Ryan Gosling aparecer (ele merece)' 
    }

    request(app)
      .post('/insertRule')
      .send(newRule)
      .expect(201, done);
  })
})