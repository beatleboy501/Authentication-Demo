var should = require('chai').should(),
    supertest = require('supertest'),
    api = supertest('https://authenticate-demo.herokuapp.com');

describe('Authentication', function() {

  it('errors if wrong basic auth', function(done) {
    api.get('/users')
        .set('x-access-token', '123myapikey')
        .auth('incorrect', 'credentials')
        .expect(404, done)
  });

  it('generates token with proper creds', function(done){
    api.post('/authenticate')
        .send('{"username": "xavi", "password": "xavi"}')
        .expect('Content-Type', /json/)
        .expect(200, done())
  });

});
