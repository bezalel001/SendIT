'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

require('babel-polyfill');

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _auth = require('./controllers/auth');

var _auth2 = _interopRequireDefault(_auth);

var _user = require('./controllers/user');

var _user2 = _interopRequireDefault(_user);

var _parcel = require('./controllers/parcel');

var _parcel2 = _interopRequireDefault(_parcel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
app.set('json spaces', 4);
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: true }));

app.use(_express2.default.static('public'));

var PORT = 3000;

/**
 * @api {get} /API Status
 * @apiGroup Status
 * @apiSuccess {String} status API Status message
 * @apiSuccessExample {json} Success
 *      HTTP/1.1 200 OK
 *      {"message": "Welcome to sendit"}
 */
app.get('/', function (req, res) {
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
app.post('/auth/signup', function (req, res) {
  _auth2.default.createUserAccount(req, res);
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
app.post('/auth/login', function (req, res) {
  _auth2.default.login(req, res);
});

// get all users
app.get('/api/v1/users', function (req, res) {
  _user2.default.getUsers(req, res);
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
app.get('/api/v1/users/:userId', _auth2.default.verifyToken, function (req, res) {
  _user2.default.getUser(req, res);
});

// delete a user account
app.delete('/api/v1/users/:userId', _auth2.default.verifyToken, function (req, res) {
  _user2.default.delete(req, res);
});

// create parcel
app.post('/api/v1/parcels', _auth2.default.verifyToken, function (req, res) {
  _parcel2.default.createParcel(req, res);
});

// get all parcel delivery orders
app.get('/api/v1/parcels', _auth2.default.verifyToken, function (req, res) {
  _parcel2.default.getParcels(req, res);
});

// get a specific parcel delivery order
app.get('/api/v1/parcels/:parcelId', _auth2.default.verifyToken, function (req, res) {
  _parcel2.default.getParcel(req, res);
});

// Cancel a specific parcel delivery order
app.patch('/api/v1/parcels/:parcelId/cancel', _auth2.default.verifyToken, function (req, res) {
  _parcel2.default.cancelParcel(req, res);
});

// Change the destination of a specific parcel delivery order.
app.patch('/api/v1/parcels/:parcelId/destination', _auth2.default.verifyToken, function (req, res) {
  _parcel2.default.changeParcelDestination(req, res);
});

// Fetch all parcel delivery order by a specific user
// Only the user that created the order is allowed to access this endpoint
app.get('/api/v1/users/:userId/parcels', _auth2.default.verifyToken, function (req, res) {
  _parcel2.default.getParcelsBySpecificUser(req, res);
});

// Change the status of a specific parcel delivery order.
// Only the Admin is allowed to access this endpoint.
app.patch('/api/v1/parcels/:parcelId/status', _auth2.default.verifyToken, function (req, res) {
  _parcel2.default.changeParcelStatus(req, res);
});

// Change the present location of a specific parcel delivery order.
// Only the Admin is allowed to access this endpoint.
app.patch('/api/v1/parcels/:parcelId/currentLocation', _auth2.default.verifyToken, function (req, res) {
  _parcel2.default.changeParcelCurrentLocation(req, res);
});

app.listen(PORT, function () {
  console.log('App is running on Port -- ' + PORT + ' ');
});

exports.default = app;