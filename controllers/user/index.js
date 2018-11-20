
import dotenv from 'dotenv';
import querySendItDb from '../db';

dotenv.config();

const userController = {

  // Get all users
  async getUsers(req, res) {
    // authenticated user must be admin
    if (!req.user.isAdmin) {
      return res.status(403).json({ status: res.statusCode, message: 'Access not allowed!' });
    }

    const queryText = 'SELECT * FROM user_account';

    try {
      const { rows, rowCount } = await querySendItDb(queryText);
      if (!rows[0]) {
        return res.status(404).json({ status: res.statusCode, message: 'No user found!' });
      }
      return res.status(200).json({ status: res.statusCode, data: rows, message: `${rowCount} users found` });
    } catch (error) {
      return res.status(400).json({ status: res.statusCode, error });
    }
  },

  // Get a specific
  async getUser(req, res) {
    // authenticated user must own the data or must be admin
    if (req.user.userId !== req.params.userId || !req.user.isAdmin) {
      return res.status(403).json({ status: res.statusCode, message: 'Access not allowed!' });
    }

    const queryText = 'SELECT * FROM user_account WHERE user_id = $1';
    try {
      const { rows } = await querySendItDb(queryText, [req.params.userId]);
      if (!rows[0]) {
        return res.status(404).json({ status: res.statusCode, message: 'Could not find user' });
      }
      return res.status(200).json({ status: res.statusCode, data: rows[0] });
    } catch (error) {
      return res.status(400).json({ status: res.statusCode, error: error.message });
    }
  },

  // Delete a user
  async delete(req, res) {
    if (req.user.userId !== req.params.userId) {
      return res.status(403).json({ status: res.statusCode, message: 'Operation not allowed. Unauthorised access!' });
    }
    const queryText = 'DELETE FROM user_account WHERE user_id=$1 returning *';
    try {
      const { rows } = await querySendItDb(queryText, [req.user.userId]);
      if (!rows[0]) {
        return res.status(404).json({ status: res.statusCode, message: 'User not found' });
      }
      return res.status(204).json({
        status: res.statusCode,
        messaage: `User account with name: ${rows[0].first_name} ${rows[0].last_name} has been deleted`,
      });
    } catch (error) {
      return res.status(400).json({ status: res.statusCode, error: error.message });
    }
  },

};

export default userController;
