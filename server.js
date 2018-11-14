import express from 'express';
import bodyParser from 'body-parser';

import userController from './controllers/user';
import parcelController from './controllers/parcel';


const PORT = 3000;

const app = express();
app.set('json spaces', 4);
app.use(bodyParser.json({ type: 'application/json' }));
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', (req, res) => {
  res.json({ message: 'Welcome to sendIt application' });
});

// create user account
app.post('/auth/signup', (req, res) => {
  userController.create(req, res);
});

// login user
app.post('/auth/login', (req, res) => {
  userController.login(req, res);
});

// get all parcels in the app
app.get('/api/v1/parcels', (req, res) => {
  parcelController.getParcels(req, res);
});

app.listen(PORT, () => {
  console.log(`App is running on Port -- ${PORT}`);
});
