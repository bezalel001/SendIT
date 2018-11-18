import moment from 'moment';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import querySendItDb from '../db';

dotenv.config();

const userController = {

  // create a user account
  async create(req, res) {
    if (!req.body.firstName || !req.body.lastName) {
      return res.status(400).json({ message: 'Missing name' });
    }
    if (!req.body.username || !req.body.password) {
      return res.status(400).json({ message: 'Missing username or password' });
    }
    if (!req.body.email) {
      return res.status(400).json({ message: 'Missing email' });
    }

    // TODO: validate email
    // TODO: hash password


    const queryText = `
      INSERT INTO user_account(first_name, last_name, other_names, email, password, username, registered, is_admin)
      VALUES($1, $2, $3, $4, $5, $6, $7, $8) returning * `;

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    const values = [
      req.body.firstName,
      req.body.lastName,
      req.body.otherNames,
      req.body.email,
      hashPassword, // hash(req.body.password)
      req.body.username,
      moment((new Date())),
      req.body.isAdmin,
    ];

    try {
      const { rows } = await querySendItDb(queryText, values);
      // TODO: define token here
      return res.status(201).json({ status: res.statusCode, data: rows[0], message: 'User created' });
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return res.status(400).json({ status: res.statusCode, message: 'User with that email or username already exists' });
      }

      return res.status(400).json({ status: res.statusCode, error });
    }
  },

  // login user
  async login(req, res) {
    console.log('Req.body: ', req.body);
    console.log('Email: ', req.body.email);
    console.log('Password: ', req.body.password);
    if (!req.body.email) {
      return res.status(400).json({ status: res.statusCode, message: 'Missing email' });
    }
    if (!req.body.password) {
      return res.status(400).json({ status: res.statusCode, message: 'Password missing!' });
    }
    // check if email is valid
    const queryText = 'SELECT * FROM user_account WHERE email = $1';

    try {
      const { rows } = await querySendItDb(queryText, [req.body.email]);
      if (!rows[0]) {
        return res.status(400).json({ status: res.statusCode, message: 'No account with the email you provided!' });
      }
      // compare password:TODO hash and compare
      const match = await bcrypt.compare(req.body.password, rows[0].password);
      if (match) {
        return res.status(401).json({ status: res.statusCode, message: 'Invalid password' });
      }
      // TODO: generrate token
      const payload = {
        id: rows[0].user_id,
        isAdmin: rows[0].is_admin,
      };
      console.log('Payload id: ', rows[0].user_id);
      console.log('Payload id: ', rows[0].is_admin);
      const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '5d' });

      return res.status(200).json({ status: res.statusCode, token, messsage: 'Login successful' });
    } catch (error) {
      return res.status(400).json({ status: res.statusCode, error: error.message });
    }
  },

  async verifyToken(req, res, next) {
    let userToken = req.headers['x-access-token'] || req.headers.authorization;
    if (!userToken) {
      return res.status(401).json({ status: res.statusCode, message: 'Authorization failed!' });
    }
    if (userToken.startsWith('Bearer ')) {
      userToken = userToken.slice(7, userToken.length);
    }

    try {
      console.log(' Before Verify token: ', userToken);
      const token = await jwt.verify(userToken, process.env.JWT_SECRET_KEY);
      console.log('After Verify token: ', token);
      if (!token) {
        return res.status(400).json({ status: res.statusCode, messaage: 'Could not verify token' });
      }

      const queryText = 'SELECT * FROM user_account WHERE user_id = $1';
      const { rows } = await querySendItDb(queryText, [token.id]);
      if (!rows[0]) {
        return res.status(404).json({ status: res.statusCode, messaage: 'User with token not found' });
      }
      req.user = { userId: token.id, isAdmin: token.isAdmin };
      console.log('req.user.userId: ', req.user.userId);
      return next();
    } catch (error) {
      return res.status(400).json({ status: res.statusCode, error });
    }
  },

};

export default userController;
