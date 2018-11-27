import express from 'express';
import 'babel-polyfill';
import bodyParser from 'body-parser';
import authController from './controllers/auth';
import userController from './controllers/user';
import parcelController from './controllers/parcel';

const app = express();
app.set('json spaces', 4);


// app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const PORT = process.env.PORT || 3000;

/**
 * @api {get} /API Status
 * @apiGroup Status
 * @apiSuccess {String} status API Status message
 * @apiSuccessExample {json} Success
 *      HTTP/1.1 200 OK
 *      {"message": "Welcome to sendit"}
 */
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to sendit!' });
});

/**
 * @api {post} /auth/signup Register a new user
 * @apiGroup User
 * @apiParam {String} firstName User first name
 * @apiParam {String} lastName User last name
 * @apiParam {String} otherNames User other names (optional)
 * @apiParam {String} email User email
 * @apiParam {String} password User password
 * @apiParam {String} username User username
 * @apiParam {Boolean} isAdmin User type
 * @apiParamExample {json} Input
 *   {
 *     "firstName": "Jon",
 *     "lastName": "Doe",
 *     "otherNames": "Foo",
 *     "email": "jd@yahoo.com",
 *     "password": "some12345",
 *     "username": "jondoe002",
 *     "isAdmin": false
 *   }
 * @apiSuccess {Number} user_id User id
 * @apiSuccess {String} first_name User first name
 * @apiSuccess {String} last_name User last name
 * @apiSuccess {String} other_names User other name(s)
 * @apiSuccess {String} email User email
 * @apiSuccess {String} password User hashed password
 * @apiSuccess {Boolean} is_admin User type
 * @apiSuccess {Date} registered Registration date
 * @apiSuccessExample {json} Success
 *   HTTP/1.1 200 OK
 *   {
 *     "user_id": 7,
 *     "first_name": "Jon",
 *     "last_name": "Doe",
 *     "other_names": "Foo",
 *     "email": "jd@yahoo.com",
 *     "password": "$2b$10$csx8rFTsCbac2RBLouyD7.aSLxvbF.yRw8SjkL6a9gPavGRJsbPge",
 *     "username": "jondoe",
 *     "registered": "2018-11-20T08:15:44.632Z",
 *     "is_admin": false
 *   }
 * @apiErrorExample {json} Sign up error
 *   HTTP/1.1 412 Precondition Failed
 */
app.post('/auth/signup', (req, res) => {
  authController.createUserAccount(req, res);
});

/**
 * @api {post} /auth/login Login user
 * @apiGroup Credentials
 * @apiParam {String} email User email
 * @apiParam {string} password User password
 * @apiParamExample {json} Input
 *   {
 *     "email": "jondoe@yahoo.com",
 *     "password": "jd1234"
 *   }
 * @apiSuccess {String} token Token of the authenticated user
 * @apiSuccessExample {json} Success
 *   HTTP/1.1 200 OK
 *   {"token": "header.payload.signature"}
 * @apiErrorExample {json} Authentication error
 *   HTTP/1.1 401 Unauthorised
 *   {"message": "Invalid credentials"}
 */
app.post('/auth/login', (req, res) => {
  authController.login(req, res);
});

// get all users
app.get('/api/v1/users', (req, res) => {
  userController.getUsers(req, res);
});

/**
 * @api {get} /api/v1/users/:userId Return a valid user's data
 * @apiGroup User
 * @apiHeader {String} Authorisation Token of authenticated user
 * @apiHeaderExample {json}  Header
 *   {"Authorisation": "Bearer thehre.hsdkj08.hjhkkr0"}
 * @apiSuccess {Number} user_id User id
 * @apiSuccess {String} first_name User first name
 * @apiSuccess {String} last_name User last name
 * @apiSuccess {String} other_names User other name(s)
 * @apiSuccess {String} email User email
 * @apiSuccess {String} password User hashed password
 * @apiSuccess {Boolean} is_admin User type
 * @apiSuccess {Date} registered Registration date
 * @apiSuccessExample {json} Success
 *   HTTP/1.1 200 OK
 *   {
 *     "user_id": 7,
 *     "first_name": "Jon",
 *     "last_name": "Doe",
 *     "other_names": "Foo",
 *     "email": "jd@yahoo.com",
 *     "password": "$2b$10$csx8rFTsCbac2RBLouyD7.aSLxvbF.yRw8SjkL6a9gPavGRJsbPge",
 *     "username": "jondoe",
 *     "registered": "2018-11-20T08:15:44.632Z",
 *     "is_admin": false
 *   }
 * @apiErrorExample {json} Find error
 *   HTTP/1.1 404 Not Found
 */
app.get('/api/v1/users/:userId', authController.verifyToken, (req, res) => {
  userController.getUser(req, res);
});


// delete a user account
app.delete('/api/v1/users/:userId', authController.verifyToken, (req, res) => {
  userController.delete(req, res);
});

// create parcel
app.post('/api/v1/parcels', authController.verifyToken, (req, res) => {
  parcelController.createParcel(req, res);
});

// get all parcel delivery orders
app.get('/api/v1/parcels', authController.verifyToken, (req, res) => {
  parcelController.getParcels(req, res);
});

// get a specific parcel delivery order
app.get('/api/v1/parcels/:parcelId', authController.verifyToken, (req, res) => {
  parcelController.getParcel(req, res);
});

// Cancel a specific parcel delivery order
app.patch('/api/v1/parcels/:parcelId/cancel', authController.verifyToken, (req, res) => {
  parcelController.cancelParcel(req, res);
});

// Change the destination of a specific parcel delivery order.
app.patch('/api/v1/parcels/:parcelId/destination', authController.verifyToken, (req, res) => {
  parcelController.changeParcelDestination(req, res);
});

// Fetch all parcel delivery order by a specific user
// Only the user that created the order is allowed to access this endpoint
app.get('/api/v1/users/:userId/parcels', authController.verifyToken, (req, res) => {
  parcelController.getParcelsBySpecificUser(req, res);
});

// Change the status of a specific parcel delivery order.
// Only the Admin is allowed to access this endpoint.
app.patch('/api/v1/parcels/:parcelId/status', authController.verifyToken, (req, res) => {
  parcelController.changeParcelStatus(req, res);
});

// Change the present location of a specific parcel delivery order.
// Only the Admin is allowed to access this endpoint.
app.patch('/api/v1/parcels/:parcelId/currentLocation', authController.verifyToken, (req, res) => {
  parcelController.changeParcelCurrentLocation(req, res);
});


app.listen(PORT, () => {
  console.log(`App is running on Port -- ${PORT} `);
});

export default app;
