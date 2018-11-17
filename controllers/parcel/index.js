import moment from 'moment';
import querySendItDb from '../db';

const parcelController = {

  // create parcel
  async create(req, res) {
    const queryText = `
      INSERT INTO parcel_order(placed_by, weight, weight_metric, sender, receiver, current_location, sent_on, delivered_on, status)
      VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) returning *`;
    const values = [
      req.body.placedBy, // to be replaced with req.user.id
      req.body.weight,
      req.body.weightMetric,
      req.body.sender,
      req.body.receiver,
      req.body.currentLocation,
      req.body.sentOn,
      req.body.deliveredOn,
      req.body.status,
    ];
    try {
      const { rows } = await querySendItDb(queryText, values);
      return res.status(201).json({ Message: 'parcel created' });
    } catch (error) {
      return res.status(400).json({ error: error.message, message: 'coul not create parcel order' });
    }
  },

  // Get all parcels in the app
  async getParcels(req, res) {
    const queryText = 'SELECT * FROM parcel_order WHERE active = true';
    try {
      const { rows } = await querySendItDb(queryText);
      return res.status(200).json({ rows });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },

  // Get a specific parcel delivery order
  async getParcel(req, res) {
    const queryText = 'SELECT * FROM parcel_order WHERE parcel_id = $1 AND active = $2';

    const values = [
      req.params.parcelId,
      true,
    ];
    try {
      const { rows } = await querySendItDb(queryText, values);
      if (!rows[0]) {
        return res.status(404).json({ message: 'Parcel delivery order not found' });
      }
      return res.status(200).json({ parcel: rows[0] });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },

  // Cancel a specific parcel delivery order
  async cancelParcel(req, res) {
    const queryText = 'SELECT * FROM parcel_order WHERE parcel_id = $1 AND active = $2 AND status != $3';
    const patchQuery = 'UPDATE parcel_order SET active = $1 WHERE parcel_id = $2 returning *';
    const values = [
      req.params.parcelId,
      true,
      'delivered',
    ];

    try {
      const { rows } = await querySendItDb(queryText, values);
      if (!rows[0]) {
        return res.status(404).json({ message: 'Parcel delivery order not found' });
      }

      const response = await querySendItDb(patchQuery, [req.body.active, req.params.parcelId]);

      return res.status(200).json({ id: response.rows[0].parcel_id, message: 'Order canceled' });
    } catch (error) {
      return res.status(400).json({ error: error.message });
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
        return res.status(401).json({ message: 'Change of destination not allowed!' });
      }

      const response = await querySendItDb(patchQuery, [req.body.receiver, req.params.parcelId]);

      return res.status(200).json({ id: response.rows[0].parcel_id, to: response.rows[0].receiver, message: 'Parcel destination updated' });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },

  // Fetch all parcel delivery order by a specific user.
  async getParcelsBySpecificUser(req, res) {
    const queryText = 'SELECT * FROM parcel_order WHERE placed_by = $1 AND active = true';
    const values = [
      req.params.userId,
    ];
    try {
      const { rows } = await querySendItDb(queryText, values);
      if (!rows[0]) {
        return res.status(404).json({ message: 'There is no active parcel for this user' });
      }
      return res.status(200).json({ rows });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },
};

export default parcelController;
