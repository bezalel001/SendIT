import moment from 'moment';
import querySendItDb from '../db';

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

    const values = [
      req.body.firstName,
      req.body.lastName,
      req.body.otherNames,
      req.body.email,
      req.body.password, // hash(req.body.password)
      req.body.username,
      moment((new Date())),
      req.body.isAdmin,
    ];

    try {
      const { rows } = await querySendItDb(queryText, values);
      // TODO: define token here
      return res.status(201).json({ message: 'User created' });
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return res.status(400).json({ message: 'User with that email or username already exists' });
      }

      return res.status(400).json({ error: error.message });
    }
  },

  // login user
  async login(req, res) {
    console.log('Req.body: ', req.body);
    console.log('Email: ', req.body.email);
    console.log('Password: ', req.body.password);
    if (!req.body.email) {
      return res.status(400).json({ message: 'Missing email' });
    }
    if (!req.body.password) {
      return res.status(400).json({ message: 'Password missing!' });
    }
    // check if email is valid
    const queryText = 'SELECT * FROM user_account WHERE email = $1';

    try {
      const { rows } = await querySendItDb(queryText, [req.body.email]);
      if (!rows[0]) {
        return res.status(400).json({ message: 'No account with the email you provided!' });
      }
      // compare password:TODO hash and compare
      if (rows[0].password !== req.body.password) {
        return res.status(400).json({ message: 'Invalid password' });
      }
      // TODO: generrate token
      return res.status(200).json({ messsage: 'Login successful' });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },

};

export default userController;
