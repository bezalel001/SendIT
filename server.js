import express from 'express';
import bodyParser from 'body-parser';

import userController from './controllers/user';
import parcelController from './controllers/parcel';


const app = express();
app.set('json spaces', 4);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = 3000;

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to sendit!' });
});

// create user account
app.post('/auth/signup', (req, res) => {
  userController.create(req, res);
});

// login user
app.post('/auth/login', (req, res) => {
  userController.login(req, res);
});

// create parcel
app.post('/api/v1/parcels', (req, res) => {
  parcelController.create(req, res);
});

// get all parcel delivery orders
app.get('/api/v1/parcels', (req, res) => {
  parcelController.getParcels(req, res);
});

// get a specific parcel delivery order
app.get('/api/v1/parcels/:parcelId', (req, res) => {
  parcelController.getParcel(req, res);
});

// Cancel a specific parcel delivery order
app.patch('/api/v1/parcels/:parcelId/cancel', (req, res) => {
  parcelController.cancelParcel(req, res);
});

// Change the destination of a specific parcel delivery order.
app.patch('/api/v1/parcels/:parcelId/destination', (req, res) => {
  parcelController.changeParcelDestination(req, res);
});

// Fetch all parcel delivery order by a specific user
// Only the user that created the order is allowed to access this endpoint
app.get('/api/v1/users/:userId/parcels', (req, res) => {
  parcelController.getParcelsBySpecificUser(req, res);
});

// Change the status of a specific parcel delivery order.
// Only the Admin is allowed to access this endpoint.
app.patch('/api/v1/parcels/:parcelId/status', (req, res) => {
  parcelController.changeParcelStatus(req, res);
});

// Change the present location of a specific parcel delivery order.
// Only the Admin is allowed to access this endpoint.
app.patch('/api/v1/parcels/:parcelId/currentLocation', (req, res) => {
  parcelController.changeParcelCurrentLocation(req, res);
});

app.listen(PORT, () => {
  console.log(`App is running on Port -- ${PORT} `);
});
