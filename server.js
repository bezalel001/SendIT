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

app.listen(PORT, () => {
  console.log(`App is running on Port -- ${PORT} `);
});
