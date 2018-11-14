import moment from 'moment';
import querySendItDb from '../db';

const parcelController = {

  // create parcel
  async create(req, res) {
    const queryText = `
      INSERT INTO parcel_order(placed_by, weight, weight_metric, sender, receiver, current_location, sent_on, delivered_on)
      VALUES($1, $2, $3, $4, $5, $6, $7, $8) returning *`;
    const values = [
      req.body.placedBy, // to be replaced with req.user.id
      req.body.weight,
      req.body.weightMetric,
      req.body.sender,
      req.body.receiver,
      req.body.currentLocation,
      req.body.sentOn,
      req.body.deliveredOn,
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
    const queryText = 'SELECT * FROM parcel_order';
    try {
      const { rows } = await querySendItDb(queryText);
      return res.status(200).json({ rows });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },
};

export default parcelController;
