import supertest from 'supertest';
import {
  describe, beforeEach, after, it,
} from 'mocha';
import { expect } from 'chai';

import moment from 'moment';
import bcrypt from 'bcrypt';

import app from '../../server';
import querySendItDb from '../../controllers/db';

const request = supertest(app);

// helper functions
async function createOneValidUser() {
  const queryText = `
      INSERT INTO user_account(first_name, last_name, other_names, email, password, username, registered, is_admin)
      VALUES($1, $2, $3, $4, $5, $6, $7, $8)`;
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash('misha001', salt);
  const values = ['Mike', 'Ogu', 'F', 'mickeybezalel@gmail.com', hashPassword, 'micky', moment((new Date())), true];

  try {
    await querySendItDb(queryText, values);
  } catch (error) {
    console.log('Error', error.message);
  }
}

async function clearUserTable() {
  const query = 'DELETE FROM user_account';
  try {
    await querySendItDb(query);
  } catch (error) {
    console.log('Error', error.message);
  }
}

describe('User account', () => {
  describe('POST /auth/signup', () => {
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync('misha', salt);
    const user = {
      firstName: 'Mike',
      lastName: 'Ogu',
      otherNames: 'F',
      email: 'mikkyfred@yahoo.com',
      password: hashPassword,
      username: 'micky',
      isAdmin: true,
    };
    beforeEach(() => {
      clearUserTable();
    });
    after(() => {
      clearUserTable();
    });

    describe('Status 201: Create user account', () => {
      it('should return created user data', (done) => {
        request.post('/auth/signup')
          .send(user)
          .expect(201)
          .end((error, res) => {
            expect(res.body).to.include.keys('data');

            done(error);
          });
      });
    });
    describe('Status code 400: Invalid request', () => {
      it('should throw error when user first name is missing', (done) => {
        // const { firstName, ...data } = user;
        const data = {
          lastName: 'Ogu',
          otherNames: 'F',
          email: 'mikkyfred@yahoo.com',
          password: 'misha001',
          username: 'micky',
          isAdmin: true,
        };

        request.post('/auth/signup')
          .send(data)
          .expect(400)
          // eslint-disable-next-line no-unused-vars
          .end((error, res) => {
            done(error);
          });
      });
      it('should throw error when email is missing', (done) => {
        const data = {
          firstName: 'Mike',
          lastName: 'Ogu',
          otherNames: 'F',
          password: 'misha001',
          username: 'micky',
          isAdmin: true,
        };

        request.post('/auth/signup')
          .send(data)
          .expect(400)
          // eslint-disable-next-line no-unused-vars
          .end((error, res) => {
            done(error);
          });
      });
      it('should throw error when password is missing', (done) => {
        const data = {
          firstName: 'Mike',
          lastName: 'Ogu',
          otherNames: 'F',
          username: 'micky',
          isAdmin: true,
        };

        request.post('/auth/signup')
          .send(data)
          .expect(400)
          // eslint-disable-next-line no-unused-vars
          .end((error, res) => {
            done(error);
          });
      });
    });
  });
  describe('POST /auth/login', () => {
    beforeEach(async () => {
      await clearUserTable();
      await createOneValidUser();
    });

    describe('Status 200', () => {
      it('should return authenticated user token', (done) => {
        request.post('/auth/login')
          .send({
            email: 'mickeybezalel@gmail.com',
            password: 'misha001',
          })
          .expect(200)
          .end((error, res) => {
            expect(res.body).to.include.keys('token');

            done(error);
          });
      });
    });
    describe('Status 401: Invalid login credentials', () => {
      it('should throw error `Invalid password` when the password is incorrect', (done) => {
        request.post('/auth/login')
          .send({
            email: 'mickeybezalel@gmail.com',
            password: 'wrongPassword',
          })
          .expect(401)
          .end((error, res) => {
            expect(res.body.message).to.equal('Invalid password!');
            done(error);
          });
      });
      it('should throw error `Email does not exist!` when email does not exist', (done) => {
        request.post('/auth/login')
          .send({
            email: 'wrong@mail.ru',
            password: 'mishka009',
          })
          .expect(401)
          .end((error, res) => {
            expect(res.body.message).to.equal('Email does not exist!');
            done(error);
          });
      });
      it('should throw error `Misssing email` when email is blank', (done) => {
        request.post('/auth/login')
          .send({
            email: '',
            password: 'somePassword',
          })
          .expect(401)
          .end((error, res) => {
            expect(res.body.message).to.equal('Missing email!');
            done(error);
          });
      });
      it('should through error `Password missing` when password is blank', (done) => {
        request.post('/auth/login')
          .send({
            email: 'mickeybezalel@gmail.com',
            password: '',
          })
          .expect(401)
          .end((error, res) => {
            expect(res.body.message).to.equal('Password missing!');
            done(error);
          });
      });
    });
  });
  describe('DELETE /api/v1/users/:userId', () => {

  });
});
