'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

require('babel-polyfill');

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _auth = require('./controllers/auth');

var _auth2 = _interopRequireDefault(_auth);

var _user = require('./controllers/user');

var _user2 = _interopRequireDefault(_user);

var _parcel = require('./controllers/parcel');

var _parcel2 = _interopRequireDefault(_parcel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
app.set('json spaces', 4);

// app.use(express.static('public'));
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use((0, _cors2.default)());

var PORT = process.env.PORT || 3000;

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
 * @apiGroup Credentials
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
 *   HTTP/1.1 201 CREATED
 *  {
 *    status: 200
 *    data: {
 *     "user_id": 7,
 *     "first_name": "Jon",
 *     "last_name": "Doe",
 *     "other_names": "Foo",
 *     "email": "jd@yahoo.com",
 *     "password": "$2b$10$csx8rFTsCbac2RBLouyD7.aSLxvbF.yRw8SjkL6a9gPavGRJsbPge",
 *     "username": "jondoe",
 *     "registered": "2018-11-20T08:15:44.632Z",
 *     "is_admin": false
 *    }
 *  }
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
 *   {
 *     status: 200
 *     token : "header.payload.signature"
 *   }
 * @apiErrorExample {json} Authentication error
 *   HTTP/1.1 401 Unauthorised
 *   {"message": "Invalid credentials"}
 */
app.post('/auth/login', function (req, res) {
  _auth2.default.login(req, res);
});

/**
 * @api {get} /api/v1/users Return a list of users
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
 *     status: 200
 *     data: [
 *      {
 *       "user_id": 7,
 *       "first_name": "Jon",
 *       "last_name": "Doe",
 *       "other_names": "Foo",
 *       "email": "jd@yahoo.com",
 *       "password": "$2b$10$csx8rFTsCbac2RBLouyD7.aSLxvbF.yRw8SjkL6a9gPavGRJsbPge",
 *       "username": "jondoe",
 *       "registered": "2018-11-20T08:15:44.632Z",
 *       "is_admin": false
 *     },
 *      ...
 *    ]
 *   }
 * @apiErrorExample {json} Find error
 *   HTTP/1.1 404 Not Found
 */
app.get('/api/v1/users', _auth2.default.verifyToken, function (req, res) {
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
 *     status: 200
 *     data: {
 *       "user_id": 7,
 *       "first_name": "Jon",
 *       "last_name": "Doe",
 *       "other_names": "Foo",
 *       "email": "jd@yahoo.com",
 *       "password": "$2b$10$csx8rFTsCbac2RBLouyD7.aSLxvbF.yRw8SjkL6a9gPavGRJsbPge",
 *       "username": "jondoe",
 *       "registered": "2018-11-20T08:15:44.632Z",
 *       "is_admin": false
 *     }
 *   }
 * @apiErrorExample {json} Find error
 *   HTTP/1.1 404 Not Found
 */
app.get('/api/v1/users/:userId', _auth2.default.verifyToken, function (req, res) {
  _user2.default.getUser(req, res);
});

/**
 * @api {delete} /api/v1/users/:userId Deletes an authenticated user
 * @apiGroup User
 * @apiHeader {String} Authorisation Token of authenticated user
 * @apiHeaderExample {json}  Header
 *   {"Authorisation": "Bearer thehre.hsdkj08.hjhkkr0"}
 * @apiSuccessExample {json} Success
 *   HTTP/1.1 204 No Content
 * @apiErrorExample {json} Delete error
 *   HTTP/1.1 412 Precondition Failed
 */
app.delete('/api/v1/users/:userId', _auth2.default.verifyToken, function (req, res) {
  _user2.default.delete(req, res);
});

/**
 * @api {post} /api/v1/parcels Create and returns a parcel delivery order
 * @apiGroup Parcel
 * @apiHeader {String} Authorisation Token of authenticated user
 * @apiHeaderExample {json}  Header
 *   {"Authorisation": "Bearer thehre.hsdkj08.hjhkkr0"}
 * @apiParam {String} sender Parcel pickup location (sender's address)
 * @apiParam {String} receiver Parcel final destination (receiver's addresss)
 * @apiParamExample {json} Input
 *   {
 *     "sender": "Victoria Fellowship Church, Lekki",
 *     "receiver": "University of Sheffield, S1 2ER, UK",
 *   }
 * @apiSuccess {Number} parcel_id Parcel id
 * @apiSuccess {Number} placed_by Parcel order creator id
 * @apiSuccess {Number} weight Parcel weight
 * @apiSuccess {String} weight_metric Parcel weight unit of measurement
 * @apiSuccess {String} sender Parcel pickup location (sender's address)
 * @apiSuccess {String} receiver Parcel final destination (receiver's addresss)
 * @apiSuccess {String} current_location Parcel current location
 * @apiSuccess {String} status Parcel current status ('placed', 'transiting', 'delivered')
 * @apiSuccess {Boolean} active Determines whether parcel should be processed
 * @apiSuccess {Date} sent_on Parcel leaves pickup location on this date
 * @apiSuccess {Date} delivered_on Parcel arrives at its final destination on this date
 * @apiSuccessExample {json} Success
 *   HTTP/1.1 201 CREATED
 *   {
 *     status: 201
 *     data: {
 *       "parcel_id": 1,
 *       "placed_by": 2,
 *       "weight": ,
 *       "weight_metric": "",
 *       "sender": "Victoria Fellowship Church, Lekki",
 *       "receiver": "University of Sheffield, S1 2ER, UK",
 *       "current_location": "",
 *       "status": "",
 *       "active": true
 *       "sent_on": "2018-11-18T15:09:07.031Z",
 *       "delivered_on": ""
 *     },
 *     message: "Parcel created"
 *   }
 * @apiErrorExample {json} List error
 *   HTTP/1.1 412 Precondition Failed
 */
app.post('/api/v1/parcels', _auth2.default.verifyToken, function (req, res) {
  _parcel2.default.createParcel(req, res);
});

/**
 * @api {patch} /api/v1/users/:userId/parcels/:parcelId Activate and return a parcel delivery order
 * @apiGroup Parcel
 * @apiHeader {String} Authorisation Token of authenticated user
 * @apiHeaderExample {json}  Header
 *   {"Authorisation": "Bearer thehre.hsdkj08.hjhkkr0"}
 * @apiParam {Number} parcelId Parcel ID
 * @apiParam {Number} placed_by Parcel Owner Id
 * @apiParam {Number} weight Parcel weight
 * @apiParam {String} weightMetric Parcel weight unit of measurement
 * @apiParam {String} currentLocation Parcel current location
 * @apiParam {String} status Parcel current status (==='placed')
 * @apiParamExample {json} Input
 *   {
 *     "parcelId": 1,
 *     "placed_by": 2,
 *     "weight": 1.3,
 *     "weightMetric": "Kilogramme",
 *     "currentLocation": "MM Airport, Ikeja, Lagos",
 *     "status": "placed"
 *   }
 * @apiSuccess {Number} parcel_id Parcel id
 * @apiSuccess {Number} placed_by Parcel order creator id
 * @apiSuccess {Number} weight Parcel weight
 * @apiSuccess {String} weight_metric Parcel weight unit of measurement
 * @apiSuccess {String} sender Parcel pickup location (sender's address)
 * @apiSuccess {String} receiver Parcel final destination (receiver's addresss)
 * @apiSuccess {String} current_location Parcel current location
 * @apiSuccess {String} status Parcel current status ('placed', 'transiting', 'delivered')
 * @apiSuccess {Boolean} active Determines whether parcel should be processed
 * @apiSuccess {Date} sent_on Parcel leaves pickup location on this date
 * @apiSuccess {Date} delivered_on Parcel arrives at its final destination on this date
 * @apiSuccessExample {json} Success
 *   HTTP/1.1 202 ACCEPTED
 *   {
 *     status: 202
 *     data: {
 *       "parcel_id": 1,
 *       "placed_by": 2,
 *       "weight": 1.3,
 *       "weight_metric": "Kilogramme",
 *       "sender": "Victoria Fellowship Church, Lekki",
 *       "receiver": "University of Sheffield, S1 2ER, UK",
 *       "current_location": "MM Airport, Ikeja, Lagos",
 *       "status": "placed",
 *       "active": true
 *       "sent_on": "2018-11-18T15:09:07.031Z",
 *       "delivered_on": ""
 *     },
 *     message: "This parcel is now being processed"
 *   }
 * @apiErrorExample {json} List error
 *   HTTP/1.1 412 Precondition Failed
 */
app.patch('/api/v1/users/:userId/parcels/:parcelId', _auth2.default.verifyToken, function (req, res) {
  _parcel2.default.activateParcel(req, res);
});

/**
 * @api {get} /api/v1/parcels Return a list of parcel delivery order
 * @apiGroup Parcel
 * @apiHeader {String} Authorisation Token of authenticated user
 * @apiHeaderExample {json}  Header
 *   {"Authorisation": "Bearer thehre.hsdkj08.hjhkkr0"}
 * @apiSuccess {Number} parcel_id Parcel id
 * @apiSuccess {Number} placed_by Parcel order creator id
 * @apiSuccess {Number} weight Parcel weight
 * @apiSuccess {String} weight_metric Parcel weight unit of measurement
 * @apiSuccess {String} sender Parcel pickup location (sender's address)
 * @apiSuccess {String} receiver Parcel final destination (receiver's addresss)
 * @apiSuccess {String} current_location Parcel current location
 * @apiSuccess {String} status Parcel current status ('placed', 'transiting', 'delivered')
 * @apiSuccess {Boolean} active Determines whether parcel should be processed
 * @apiSuccess {Date} sent_on Parcel leaves pickup location on this date
 * @apiSuccess {Date} delivered_on Parcel arrives at its final destination on this date
 * @apiSuccessExample {json} Success
 *   HTTP/1.1 200
 *   {
 *     status
 *     data: [
 *      {
 *       "parcel_id": 6,
 *       "placed_by": 4,
 *       "weight": 2.1,
 *       "weight_metric": "kg",
 *       "sender": "Victoria Fellowship Church, Lekki",
 *       "receiver": "University of Sheffield, S1 2ER, UK",
 *       "current_location": "Lagos airport",
 *       "status": "transiting",
 *       "active": true
 *       "sent_on": "2018-11-18T15:09:07.031Z",
 *       "delivered_on": ""
 *      },
 *     ...
 *     ]
 *    message: Number of active Parcel orders: 4
 *  }
 * @apiErrorExample {json} List error
 *   HTTP/1.1 412 Precondition Failed
 */
app.get('/api/v1/parcels', _auth2.default.verifyToken, function (req, res) {
  _parcel2.default.getParcels(req, res);
});

/**
 * @api {get} /api/v1/parcels/:parcelId Return a parcel delivery order
 * @apiGroup Parcel
 * @apiHeader {String} Authorisation Token of authenticated user
 * @apiHeaderExample {json}  Header
 *   {"Authorisation": "Bearer thehre.hsdkj08.hjhkkr0"}
 * @apiParam {NUMBER} parcelId Parcel id
 * @apiParamExample {json} Input
 *   {
 *     "parcelId": 1,
 *   }
 * @apiSuccess {Number} parcel_id Parcel id
 * @apiSuccess {Number} placed_by Parcel order creator id
 * @apiSuccess {Number} weight Parcel weight
 * @apiSuccess {String} weight_metric Parcel weight unit of measurement
 * @apiSuccess {String} sender Parcel pickup location (sender's address)
 * @apiSuccess {String} receiver Parcel final destination (receiver's addresss)
 * @apiSuccess {String} current_location Parcel current location
 * @apiSuccess {String} status Parcel current status ('placed', 'transiting', 'delivered')
 * @apiSuccess {Boolean} active Determines whether parcel should be processed
 * @apiSuccess {Date} sent_on Parcel leaves pickup location on this date
 * @apiSuccess {Date} delivered_on Parcel arrives at its final destination on this date
 * @apiSuccessExample {json} Success
 *   HTTP/1.1 200 OK
 *   {
 *     status: 200
 *     data: {
 *       "parcel_id": 1,
 *       "placed_by": 2,
 *       "weight": ,
 *       "weight_metric": "",
 *       "sender": "Victoria Fellowship Church, Lekki",
 *       "receiver": "University of Sheffield, S1 2ER, UK",
 *       "current_location": "",
 *       "status": "",
 *       "active": true
 *       "sent_on": "2018-11-18T15:09:07.031Z",
 *       "delivered_on": ""
 *     }
 *   }
 * @apiErrorExample {json} Find error
 *   HTTP/1.1 412 Precondition Failed
 */
app.get('/api/v1/parcels/:parcelId', _auth2.default.verifyToken, function (req, res) {
  _parcel2.default.getParcel(req, res);
});

/**
 * @api {patch} /api/v1/parcels/:parcelId/cancel Cancel a specific parcel delivery order.
 * @apiGroup Parcel
 * @apiHeader {String} Authorisation Token of authenticated user
 * @apiHeaderExample {json}  Header
 *   {"Authorisation": "Bearer thehre.hsdkj08.hjhkkr0"}
 * @apiParam {Number} parcelId Parcel id
 * @apiParamExample {json} Input
 *   {
 *     "parcelId": 1,
 *   }
 * @apiSuccess {Number} parcel_id Parcel id
 * @apiSuccess {Number} placed_by Parcel order creator id
 * @apiSuccess {Number} weight Parcel weight
 * @apiSuccess {String} weight_metric Parcel weight unit of measurement
 * @apiSuccess {String} sender Parcel pickup location (sender's address)
 * @apiSuccess {String} receiver Parcel final destination (receiver's addresss)
 * @apiSuccess {String} current_location Parcel current location
 * @apiSuccess {String} status Parcel current status ('placed', 'transiting', 'delivered')
 * @apiSuccess {Boolean} active Determines whether parcel should be processed
 * @apiSuccess {Date} sent_on Parcel leaves pickup location on this date
 * @apiSuccess {Date} delivered_on Parcel arrives at its final destination on this date
 * @apiSuccessExample {json} Success
 *   HTTP/1.1 202 ACCEPTED
 *   {
 *     status: 202
 *     data: {
 *       "parcel_id": 1,
 *       "placed_by": 2,
 *       "weight": 1.3,
 *       "weight_metric": "Kilogramme",
 *       "sender": "Victoria Fellowship Church, Lekki",
 *       "receiver": "University of Sheffield, S1 2ER, UK",
 *       "current_location": "MM Airport, Ikeja, Lagos",
 *       "status": "placed",
 *       "active": false,
 *       "sent_on": "2018-11-18T15:09:07.031Z",
 *       "delivered_on": ""
 *     },
 *     message: "Order cancelled"
 *   }
 * @apiErrorExample {json} List error
 *   HTTP/1.1 412 Precondition Failed
 */
app.patch('/api/v1/parcels/:parcelId/cancel', _auth2.default.verifyToken, function (req, res) {
  _parcel2.default.cancelParcel(req, res);
});

/**
 * @api {patch} /api/v1/parcels/:parcelId/destination Change the destination of a specific parcel delivery order.
 * @apiGroup Parcel
 * @apiHeader {String} Authorisation Token of authenticated user
 * @apiHeaderExample {json}  Header
 *   {"Authorisation": "Bearer thehre.hsdkj08.hjhkkr0"}
 * @apiParam {Number} parcelId Parcel id
 * @apiParam {Number} receiver Parcel new destination
 * @apiParamExample {json} Input
 *   {
 *     "parcelId": 1,
 *     "receiver": "10 Oakholme road,Encliffe Village, Sheffield S10 4 ES, UK",
 *   }
 * @apiSuccess {Number} parcel_id Parcel id
 * @apiSuccess {Number} placed_by Parcel order creator id
 * @apiSuccess {Number} weight Parcel weight
 * @apiSuccess {String} weight_metric Parcel weight unit of measurement
 * @apiSuccess {String} sender Parcel pickup location (sender's address)
 * @apiSuccess {String} receiver Parcel final destination (receiver's addresss)
 * @apiSuccess {String} current_location Parcel current location
 * @apiSuccess {String} status Parcel current status ('placed', 'transiting', 'delivered')
 * @apiSuccess {Boolean} active Determines whether parcel should be processed
 * @apiSuccess {Date} sent_on Parcel leaves pickup location on this date
 * @apiSuccess {Date} delivered_on Parcel arrives at its final destination on this date
 * @apiSuccessExample {json} Success
 *   HTTP/1.1 202 ACCEPTED
 *   {
 *     status: 202
 *     data: {
 *       "parcel_id": 1,
 *       "placed_by": 2,
 *       "weight": 1.3,
 *       "weight_metric": "Kilogramme",
 *       "sender": "Victoria Fellowship Church, Lekki",
 *       "receiver": "10 Oakholme road,Encliffe Village, Sheffield S10 4 ES, UK",
 *       "current_location": "MM Airport, Ikeja, Lagos",
 *       "status": "placed",
 *       "active": true,
 *       "sent_on": "2018-11-18T15:09:07.031Z",
 *       "delivered_on": ""
 *     },
 *     message: "Parcel destination updated"
 *   }
 * @apiErrorExample {json} List error
 *   HTTP/1.1 412 Precondition Failed
 */
app.patch('/api/v1/parcels/:parcelId/destination', _auth2.default.verifyToken, function (req, res) {
  _parcel2.default.changeParcelDestination(req, res);
});

/**
 * @api {get} /api/v1/users/:userId/parcels/:parcelId Return a parcel delivery order by specific user
 * @apiGroup Parcel
 * @apiHeader {String} Authorisation Token of authenticated user
 * @apiHeaderExample {json}  Header
 *   {"Authorisation": "Bearer thehre.hsdkj08.hjhkkr0"}
 * @apiParam {NUMBER} parcelId Parcel id
 * @apiParam {NUMBER} userId User id
 * @apiParamExample {json} Input
 *   {
 *     "parcelId": 1,
 *     "userId": 2
 *   }
 * @apiSuccess {Number} parcel_id Parcel id
 * @apiSuccess {Number} placed_by Parcel order creator id
 * @apiSuccess {Number} weight Parcel weight
 * @apiSuccess {String} weight_metric Parcel weight unit of measurement
 * @apiSuccess {String} sender Parcel pickup location (sender's address)
 * @apiSuccess {String} receiver Parcel final destination (receiver's addresss)
 * @apiSuccess {String} current_location Parcel current location
 * @apiSuccess {String} status Parcel current status ('placed', 'transiting', 'delivered')
 * @apiSuccess {Boolean} active Determines whether parcel should be processed
 * @apiSuccess {Date} sent_on Parcel leaves pickup location on this date
 * @apiSuccess {Date} delivered_on Parcel arrives at its final destination on this date
 * @apiSuccessExample {json} Success
 *   HTTP/1.1 200 OK
 *   {
 *     status: 200
 *     data: {
 *       "parcel_id": 1,
 *       "placed_by": 2,
 *       "weight": ,
 *       "weight_metric": "",
 *       "sender": "Victoria Fellowship Church, Lekki",
 *       "receiver": "University of Sheffield, S1 2ER, UK",
 *       "current_location": "",
 *       "status": "",
 *       "active": true
 *       "sent_on": "2018-11-18T15:09:07.031Z",
 *       "delivered_on": ""
 *     }
 *   }
 * @apiErrorExample {json} Find error
 *   HTTP/1.1 412 Precondition Failed
 */
app.get('/api/v1/users/:userId/parcels/:parcelId', _auth2.default.verifyToken, function (req, res) {
  _parcel2.default.getParcelBySpecificUser(req, res);
});

// Fetch all parcel delivery order by a specific user
/**
 * @api {get} /api/v1/users/:userId/parcels Return a list of parcel delivery order by a specific user
 * @apiGroup Parcel
 * @apiHeader {String} Authorisation Token of authenticated user
 * @apiHeaderExample {json}  Header
 *   {"Authorisation": "Bearer thehre.hsdkj08.hjhkkr0"}
 * @apiParam {NUMBER} userId User id
 * @apiParamExample {json} Input
 *   {
 *     "userId": 2
 *   }
 * @apiSuccess {Number} parcel_id Parcel id
 * @apiSuccess {Number} placed_by Parcel order creator id
 * @apiSuccess {Number} weight Parcel weight
 * @apiSuccess {String} weight_metric Parcel weight unit of measurement
 * @apiSuccess {String} sender Parcel pickup location (sender's address)
 * @apiSuccess {String} receiver Parcel final destination (receiver's addresss)
 * @apiSuccess {String} current_location Parcel current location
 * @apiSuccess {String} status Parcel current status ('placed', 'transiting', 'delivered')
 * @apiSuccess {Boolean} active Determines whether parcel should be processed
 * @apiSuccess {Date} sent_on Parcel leaves pickup location on this date
 * @apiSuccess {Date} delivered_on Parcel arrives at its final destination on this date
 * @apiSuccessExample {json} Success
 *   HTTP/1.1 200
 *   {
 *     status
 *     data: [
 *      {
 *       "parcel_id": 6,
 *       "placed_by": 4,
 *       "weight": 2.1,
 *       "weight_metric": "kg",
 *       "sender": "Victoria Fellowship Church, Lekki",
 *       "receiver": "University of Sheffield, S1 2ER, UK",
 *       "current_location": "Lagos airport",
 *       "status": "transiting",
 *       "active": true
 *       "sent_on": "2018-11-18T15:09:07.031Z",
 *       "delivered_on": ""
 *      },
 *     ...
 *     ]
 *    message: "Number of active Parcel orders created by this user: 2"
 *  }
 * @apiErrorExample {json} List error
 *   HTTP/1.1 412 Precondition Failed
 */
app.get('/api/v1/users/:userId/parcels', _auth2.default.verifyToken, function (req, res) {
  _parcel2.default.getParcelsBySpecificUser(req, res);
});

/**
 * @api {patch} /api/v1/parcels/:parcelId/status Change the status of a specific parcel delivery order
 * @apiGroup Parcel
 * @apiHeader {String} Authorisation Token of authenticated user
 * @apiHeaderExample {json}  Header
 *   {"Authorisation": "Bearer thehre.hsdkj08.hjhkkr0"}
 * @apiParam {Number} parcelId Parcel id
 * @apiParam {Number} status Parcel new status
 * @apiParamExample {json} Input
 *   {
 *     "parcelId": 1,
 *     "status": "transiting",
 *   }
 * @apiSuccess {Number} parcel_id Parcel id
 * @apiSuccess {Number} placed_by Parcel order creator id
 * @apiSuccess {Number} weight Parcel weight
 * @apiSuccess {String} weight_metric Parcel weight unit of measurement
 * @apiSuccess {String} sender Parcel pickup location (sender's address)
 * @apiSuccess {String} receiver Parcel final destination (receiver's addresss)
 * @apiSuccess {String} current_location Parcel current location
 * @apiSuccess {String} status Parcel current status ('placed', 'transiting', 'delivered')
 * @apiSuccess {Boolean} active Determines whether parcel should be processed
 * @apiSuccess {Date} sent_on Parcel leaves pickup location on this date
 * @apiSuccess {Date} delivered_on Parcel arrives at its final destination on this date
 * @apiSuccessExample {json} Success
 *   HTTP/1.1 202 ACCEPTED
 *   {
 *     status: 202
 *     data: {
 *       "parcel_id": 1,
 *       "placed_by": 2,
 *       "weight": 1.3,
 *       "weight_metric": "Kilogramme",
 *       "sender": "Victoria Fellowship Church, Lekki",
 *       "receiver": "10 Oakholme road,Encliffe Village, Sheffield S10 4 ES, UK",
 *       "current_location": "MM Airport, Ikeja, Lagos",
 *       "status": "transiting",
 *       "active": true,
 *       "sent_on": "2018-11-18T15:09:07.031Z",
 *       "delivered_on": ""
 *     },
 *     message: "Parcel status updated"
 *   }
 * @apiErrorExample {json} List error
 *   HTTP/1.1 412 Precondition Failed
 */
app.patch('/api/v1/parcels/:parcelId/status', _auth2.default.verifyToken, function (req, res) {
  _parcel2.default.changeParcelStatus(req, res);
});

/**
 * @api {patch} /api/v1/parcels/:parcelId/currentLocation Change the present location of a specific parcel delivery order.
 * @apiGroup Parcel
 * @apiHeader {String} Authorisation Token of authenticated user
 * @apiHeaderExample {json}  Header
 *   {"Authorisation": "Bearer thehre.hsdkj08.hjhkkr0"}
 * @apiParam {Number} parcelId Parcel id
 * @apiParam {String} currentLocation Parcel new location
 * @apiParamExample {json} Input
 *   {
 *     "parcelId": 1,
 *     "currentLocation": "London Heathrow Terminal 5",
 *   }
 * @apiSuccess {Number} parcel_id Parcel id
 * @apiSuccess {Number} placed_by Parcel order creator id
 * @apiSuccess {Number} weight Parcel weight
 * @apiSuccess {String} weight_metric Parcel weight unit of measurement
 * @apiSuccess {String} sender Parcel pickup location (sender's address)
 * @apiSuccess {String} receiver Parcel final destination (receiver's addresss)
 * @apiSuccess {String} current_location Parcel current location
 * @apiSuccess {String} status Parcel current status ('placed', 'transiting', 'delivered')
 * @apiSuccess {Boolean} active Determines whether parcel should be processed
 * @apiSuccess {Date} sent_on Parcel leaves pickup location on this date
 * @apiSuccess {Date} delivered_on Parcel arrives at its final destination on this date
 * @apiSuccessExample {json} Success
 *   HTTP/1.1 202 ACCEPTED
 *   {
 *     status: 202
 *     data: {
 *       "parcel_id": 1,
 *       "placed_by": 2,
 *       "weight": 1.3,
 *       "weight_metric": "Kilogramme",
 *       "sender": "Victoria Fellowship Church, Lekki",
 *       "receiver": "10 Oakholme road,Encliffe Village, Sheffield S10 4 ES, UK",
 *       "current_location": "London Heathrow Terminal 5",
 *       "status": "transiting",
 *       "active": true,
 *       "sent_on": "2018-11-18T15:09:07.031Z",
 *       "delivered_on": ""
 *     },
 *     message: "Parcel location updated"
 *   }
 * @apiErrorExample {json} List error
 *   HTTP/1.1 412 Precondition Failed
 */
app.patch('/api/v1/parcels/:parcelId/currentLocation', _auth2.default.verifyToken, function (req, res) {
  _parcel2.default.changeParcelCurrentLocation(req, res);
});

/**
 * @api {delete} /api/v1/parcels/:parcelId Deletes a parcel order
 * @apiGroup Parcel
 * @apiHeader {String} Authorisation Token of authenticated user
 * @apiHeaderExample {json}  Header
 *   {"Authorisation": "Bearer thehre.hsdkj08.hjhkkr0"}
 * @apiSuccessExample {json} Success
 *   HTTP/1.1 204 No Content
 * @apiErrorExample {json} Delete error
 *   HTTP/1.1 412 Precondition Failed
 */
app.delete('/api/v1/parcels/:parcelId', _auth2.default.verifyToken, function (req, res) {
  _user2.default.delete(req, res);
});

app.listen(PORT, function () {
  console.log('App is running on Port -- ' + PORT + ' ');
});

exports.default = app;