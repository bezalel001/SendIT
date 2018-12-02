import moment from 'moment';
import querySendItDb from '../db';
import transporter from '../user/email';


const parcelController = {


  // Create parcel delivery order
  async createParcel(req, res) {
    const queryText = 'INSERT INTO parcel_order(placed_by,  sender, receiver, sent_on) VALUES($1, $2, $3, $4) RETURNING *';
    const values = [
      req.user.userId,
      req.body.sender,
      req.body.receiver,
      moment((new Date())),
    ];
    try {
      const { rows } = await querySendItDb(queryText, values);
      if (!rows[0]) {
        return res.status(412).json({ status: res.statusCode, message: 'Could not create parcel order' });
      }
      return res.status(201).json({ status: res.statusCode, data: rows[0], Message: 'Parcel created' });
    } catch (error) {
      return res.status(400).json({ status: res.statusCode, error: error.message });
    }
  },

  // Activate parcel
  async activateParcel(req, res) {
    if (!req.user.isAdmin) {
      return res.status(403).json({ status: res.statusCode, message: 'Unauthorized access' });
    }
    const queryText = "SELECT * FROM parcel_order WHERE parcel_id = $1 AND placed_by = $2 AND active = true AND (status <> '') IS NOT TRUE";
    const patchQuery = 'UPDATE parcel_order SET weight = $1, weight_metric = $2, current_location = $3, status = $4  WHERE parcel_id = $5 AND placed_by = $6 returning *';

    if (!req.body.weight || !req.body.weightMetric || !req.body.currentLocation || !req.body.status) {
      return res.status(412).json({ status: res.statusCode, message: 'Incomplete data. Fill in the missing value(s)' });
    }

    const values = [
      req.body.weight,
      req.body.weightMetric,
      req.body.currentLocation,
      req.body.status,
      req.params.parcelId,
      req.params.userId,
    ];
    try {
      const { rows } = await querySendItDb(queryText, [req.params.parcelId, req.params.userId]);
      if (!rows[0]) {
        return res.status(404).json({ status: res.statusCode, message: 'Parcel delivery order not found' });
      }

      const response = await querySendItDb(patchQuery, values);
      if (!response.rows[0]) {
        return res.status(412).json({ status: res.statusCode, message: 'Parcel delivery order could not be processed' });
      }

      return res.status(202).json({ status: res.statusCode, data: response.rows[0], message: 'This parcel is now being processed!' });
    } catch (error) {
      return res.status(400).json({ status: res.statusCode, error });
    }
  },

  // Get all parcels in the app
  async getParcels(req, res) {
    if (!req.user.isAdmin) {
      return res.status(403).json({ status: res.statusCode, message: 'Unauthorized access' });
    }
    const queryText = 'SELECT * FROM parcel_order WHERE active = true';
    try {
      const { rows, rowCount } = await querySendItDb(queryText);
      return res.status(200).json({ status: res.statusCode, data: rows, message: `Number of active Parcel orders: ${rowCount}` });
    } catch (error) {
      return res.status(412).json({ status: res.statusCode, error: error.message });
    }
  },

  // Get a specific parcel delivery order
  async getParcel(req, res) {
    if (!req.user.isAdmin) {
      return res.status(403).json({ status: res.statusCode, message: 'Unauthorized access' });
    }
    const queryText = 'SELECT * FROM parcel_order WHERE parcel_id = $1';
    try {
      const { rows } = await querySendItDb(queryText, [req.params.parcelId]);
      if (!rows[0]) {
        return res.status(404).json({ status: res.statusCode, message: 'Parcel delivery order not found' });
      }
      return res.status(200).json({ status: res.statusCode, data: rows[0] });
    } catch (error) {
      return res.status(400).json({ status: res.statusCode, error: error.message });
    }
  },

  // Get a specific parcel delivery order
  async getParcelBySpecificUser(req, res) {
    if (!req.user.isAdmin || req.params.userId !== req.user.userId) {
      return res.status(403).json({ status: res.statusCode, message: 'Unauthorized access' });
    }// confirm that the logged in user created the parcel orders

    const queryText = 'SELECT * FROM parcel_order WHERE parcel_id = $1 AND placed_by = $2';

    const values = [
      req.params.parcelId,
      req.user.userId,
    ];
    try {
      const { rows } = await querySendItDb(queryText, values);
      if (!rows[0]) {
        return res.status(404).json({ status: res.statusCode, message: 'Parcel delivery order not found' });
      }
      return res.status(200).json({ status: res.statusCode, data: rows[0] });
    } catch (error) {
      return res.status(400).json({ status: res.statusCode, error: error.message });
    }
  },

  // Cancel a specific parcel delivery order
  async cancelParcel(req, res) {
    const queryText = 'SELECT * FROM parcel_order WHERE parcel_id = $1 AND active = $2 AND status != $3 AND placed_by = $4';
    const patchQuery = 'UPDATE parcel_order SET active = $1 WHERE parcel_id = $2 AND placed_by = $3 returning *';
    const values = [
      req.params.parcelId,
      true,
      'delivered',
      req.user.userId,
    ];

    try {
      const { rows } = await querySendItDb(queryText, values);
      if (!rows[0]) {
        return res.status(404).json({ message: 'Parcel delivery order not found' });
      }
      // confirm that the logged in user actually created this parcel delivery order
      if (rows[0].placed_by !== req.user.userId) {
        return res.status(403).json({ status: res.statusCode, message: 'Operation prohibited!Unauthorised access!' });
      }

      const response = await querySendItDb(patchQuery, [req.body.active, req.params.parcelId, req.user.userId]);

      return res.status(200).json({ status: res.statusCode, data: response.rows[0], message: 'Order canceled' });
    } catch (error) {
      return res.status(400).json({ status: res.statusCode, error: error.message });
    }
  },

  // Change the destination of a specific parcel delivery order.
  async changeParcelDestination(req, res) {
    const queryText = 'SELECT * FROM parcel_order WHERE parcel_id = $1 AND active = $2 AND status != $3';
    const patchQuery = 'UPDATE parcel_order SET receiver = $1 WHERE parcel_id = $2 returning *';
    const values = [
      req.params.parcelId,
      true,
      'delivered',
    ];

    try {
      const { rows } = await querySendItDb(queryText, values);
      if (!rows[0]) {
        return res.status(403).json({ status: res.statusCode, message: 'Change of destination not allowed!Unauthorised access!' });
      }
      // confirm that the logged in user actually created this parcel delivery order
      if (rows[0].placed_by !== req.user.userId) {
        return res.status(403).json({ status: res.statusCode, message: 'Operation not allowed. Unauthorised access!' });
      }

      const response = await querySendItDb(patchQuery, [req.body.receiver, req.params.parcelId]);

      return res.status(200).json({
        status: res.statusCode,
        id: response.rows[0].parcel_id,
        to: response.rows[0].receiver,
        message: 'Parcel destination updated',
      });
    } catch (error) {
      return res.status(412).json({ status: res.statusCode, error: error.message });
    }
  },

  // Fetch all parcel delivery order by a specific user.
  async getParcelsBySpecificUser(req, res) {
    // confirm that the logged in user created the parcel orders
    if (!req.user.isAdmin || parseInt(req.params.userId, 10) !== parseInt(req.user.userId, 10)) {
      return res.status(403).json({ status: res.statusCode, message: 'Unauthorized access' });
    }
    const queryText = 'SELECT * FROM parcel_order WHERE placed_by = $1';
    const values = [
      req.params.userId,
    ];
    try {
      const { rows, rowCount } = await querySendItDb(queryText, values);
      if (!rows[0]) {
        return res.status(404).json({ status: res.statusCode, message: 'There is no parcel for this user' });
      }
      console.log('Rows: ', rows);
      return res.status(200).json({ status: res.statusCode, data: rows, maessage: `Number of active Parcel orders created by this user: ${rowCount}` });
    } catch (error) {
      return res.status(412).json({ status: res.statusCode, error: error.message });
    }
  },

  // Change the status of a specific parcel delivery order.
  // Only the Admin is allowed to access this endpoint.
  async changeParcelStatus(req, res) {
    if (!req.user.isAdmin) {
      return res.status(403).json({ status: res.statusCode, message: 'Operation not allowed. Unauthorised access!' });
    }
    const queryText = 'SELECT * FROM parcel_order WHERE parcel_id = $1 AND active = $2';
    const patchQuery = 'UPDATE parcel_order SET status = $1 WHERE parcel_id = $2 returning *';
    const patchStatusAndDate = 'UPDATE parcel_order SET status = $1, delivered_on = $2  WHERE parcel_id = $3 returning *';
    const values = [
      req.params.parcelId,
      true,
    ];

    try {
      const { rows } = await querySendItDb(queryText, values);
      if (!rows[0]) {
        return res.status(404).json({ status: res.statusCode, message: 'Parcel delivery order not dound' });
      }
      let response;
      if (req.body.status === 'delivered') {
        response = await querySendItDb(patchStatusAndDate, [req.body.status, moment((new Date())), req.params.parcelId]);
      } else {
        response = await querySendItDb(patchQuery, [req.body.status, req.params.parcelId]);
      }

      // Send email notification to parcel owner
      const findOwner = 'SELECT * FROM user_account WHERE user_id = $1';
      const result = await querySendItDb(findOwner, [rows[0].placed_by]);

      const statusNotification = `
        <h2>Parcel Status Change</h2>
        <p>Your parcel status has changed</p>
        <p>Status: <strong>${req.body.status}</p>
      `;
      const mailOptions = {
        from: process.env.EMAIL,
        to: result.rows[0].email,
        subject: 'Your Parcel Delivery Order Status',
        html: statusNotification,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(`Could not send email: ${error}`);
        } else {
          console.log(`Email sent: ${info.response}`);
        }
      });
      console.log('Sender: ', process.env.EMAIL);
      console.log('Recipient: ', result.rows[0].email);

      return res.status(200).json({
        status: res.statusCode,
        id: response.rows[0].parcel_id,
        currentStatus: response.rows[0].status,
        message: 'Parcel status updated',
      });
    } catch (error) {
      return res.status(412).json({ status: res.statusCode, error: error.message });
    }
  },

  // Change the present location of a specific parcel delivery order.
  // Only the Admin is allowed to access this endpoint.
  async changeParcelCurrentLocation(req, res) {
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: 'Operation not allowed. Unauthorised access!' });
    }
    const queryText = 'SELECT * FROM parcel_order WHERE parcel_id = $1 AND active = $2';
    const patchQuery = 'UPDATE parcel_order SET current_location = $1 WHERE parcel_id = $2 returning *';
    const values = [
      req.params.parcelId,
      true,
    ];

    try {
      const { rows } = await querySendItDb(queryText, values);
      if (!rows[0]) {
        return res.status(404).json({ status: res.statusCode, message: 'Parcel delivery order not found' });
      }

      const response = await querySendItDb(patchQuery, [req.body.currentLocation, req.params.parcelId]);

      // send email notification to parcel owner
      const findOwner = 'SELECT * FROM user_account WHERE user_id = $1';
      const result = await querySendItDb(findOwner, [rows[0].placed_by]);

      const locationNotification = `
      <h2>Parcel Location Change</h2>
      <p>Your parcel location has changed</p>
      <p>Current Location: <strong>${req.body.currentLocation}<></p>
      `;
      const mailOptions = {
        from: process.env.EMAIL,
        to: result.rows[0].email,
        subject: 'Your Parcel Delivery Order Location',
        html: locationNotification,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(`Could not send email: ${error}`);
        } else {
          console.log(`Email sent: ${info.response}`);
        }
      });
      console.log('Sender: ', process.env.EMAIL);
      console.log('Recipient: ', result.rows[0].email);

      return res.status(200).json({
        status: res.statusCode,
        id: response.rows[0].parcel_id,
        currentLocation: response.rows[0].current_location,
        message: 'Parcel location updated',
      });
    } catch (error) {
      return res.status(412).json({ status: res.statusCode, error: error.message });
    }
  },

  // delete a parcel delivery order
  async deleteParcel(req, res) {
    const findParcel = 'SELECT * FROM parcel_order WHERE parcel_id = $1';

    try {
      const { rows } = await querySendItDb(findParcel, [req.params.parcelId]);
      if (!rows[0]) {
        return res.status(404).json({ status: res.statusCode, message: 'Could not find parcel' });
      }
      // Ensure that the user who wants to delete this parcel is the owner
      if (rows[0].placed_by !== req.user.userId) {
        return res.status(403).json({ status: res.statusCode, message: 'Operation not allowed. Unauthorised access!' });
      }
      const delQueryText = 'DELETE FROM parcel_order WHERE parcel_id = $1';
      const delResponse = await querySendItDb(delQueryText, [req.params.parcelId]);
      if (!delResponse.rows[0]) {
        return res.status(404).json({ status: res.statusCode, message: 'Parcel not found' });
      }
      const findOwner = 'SELECT * FROM user_account WHERE user_id = 1$';
      const parcelOwner = await querySendItDb(findOwner, [delResponse.rows[0].placed_by]);
      if (!parcelOwner.rows[0]) {
        return res.status(400).json({ status: res.statusCode, messaage: 'Invalid request' });
      }
      return res.status(204).json({
        status: res.statusCode,
        messaage: `Parcel delivery order placed by: ${parcelOwner.rows[0].first_name} ${parcelOwner.rows[0].last_name} has been deleted`,
      });
    } catch (error) {
      return res.status(412).json({ status: res.statusCode, error: error.message });
    }
  },
};

export default parcelController;
