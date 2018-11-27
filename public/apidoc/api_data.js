define({ "api": [
  {
    "type": "post",
    "url": "/auth/login",
    "title": "Login user",
    "group": "Credentials",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>User email</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>User password</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n  \"email\": \"jondoe@yahoo.com\",\n  \"password\": \"jd1234\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Token of the authenticated user</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n  status: 200\n  token : \"header.payload.signature\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Authentication error",
          "content": "HTTP/1.1 401 Unauthorised\n{\"message\": \"Invalid credentials\"}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./server.js",
    "groupTitle": "Credentials",
    "name": "PostAuthLogin"
  },
  {
    "type": "post",
    "url": "/auth/signup",
    "title": "Register a new user",
    "group": "Credentials",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "firstName",
            "description": "<p>User first name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "lastName",
            "description": "<p>User last name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "otherNames",
            "description": "<p>User other names (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>User email</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>User password</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>User username</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "isAdmin",
            "description": "<p>User type</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n  \"firstName\": \"Jon\",\n  \"lastName\": \"Doe\",\n  \"otherNames\": \"Foo\",\n  \"email\": \"jd@yahoo.com\",\n  \"password\": \"some12345\",\n  \"username\": \"jondoe002\",\n  \"isAdmin\": false\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "user_id",
            "description": "<p>User id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "first_name",
            "description": "<p>User first name</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "last_name",
            "description": "<p>User last name</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "other_names",
            "description": "<p>User other name(s)</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>User email</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>User hashed password</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "is_admin",
            "description": "<p>User type</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "registered",
            "description": "<p>Registration date</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": " HTTP/1.1 201 CREATED\n{\n  status: 200\n  data: {\n   \"user_id\": 7,\n   \"first_name\": \"Jon\",\n   \"last_name\": \"Doe\",\n   \"other_names\": \"Foo\",\n   \"email\": \"jd@yahoo.com\",\n   \"password\": \"$2b$10$csx8rFTsCbac2RBLouyD7.aSLxvbF.yRw8SjkL6a9gPavGRJsbPge\",\n   \"username\": \"jondoe\",\n   \"registered\": \"2018-11-20T08:15:44.632Z\",\n   \"is_admin\": false\n  }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Sign up error",
          "content": "HTTP/1.1 412 Precondition Failed",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./server.js",
    "groupTitle": "Credentials",
    "name": "PostAuthSignup"
  },
  {
    "type": "delete",
    "url": "/api/v1/parcels/:parcelId",
    "title": "Deletes a parcel order",
    "group": "Parcel",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorisation",
            "description": "<p>Token of authenticated user</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header",
          "content": "{\"Authorisation\": \"Bearer thehre.hsdkj08.hjhkkr0\"}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 204 No Content",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Delete error",
          "content": "HTTP/1.1 412 Precondition Failed",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./server.js",
    "groupTitle": "Parcel",
    "name": "DeleteApiV1ParcelsParcelid"
  },
  {
    "type": "get",
    "url": "/api/v1/parcels",
    "title": "Return a list of parcel delivery order",
    "group": "Parcel",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorisation",
            "description": "<p>Token of authenticated user</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header",
          "content": "{\"Authorisation\": \"Bearer thehre.hsdkj08.hjhkkr0\"}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "parcel_id",
            "description": "<p>Parcel id</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "placed_by",
            "description": "<p>Parcel order creator id</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "weight",
            "description": "<p>Parcel weight</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "weight_metric",
            "description": "<p>Parcel weight unit of measurement</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "sender",
            "description": "<p>Parcel pickup location (sender's address)</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "receiver",
            "description": "<p>Parcel final destination (receiver's addresss)</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "current_location",
            "description": "<p>Parcel current location</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Parcel current status ('placed', 'transiting', 'delivered')</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "active",
            "description": "<p>Determines whether parcel should be processed</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "sent_on",
            "description": "<p>Parcel leaves pickup location on this date</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "delivered_on",
            "description": "<p>Parcel arrives at its final destination on this date</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": " HTTP/1.1 200\n {\n   status\n   data: [\n    {\n     \"parcel_id\": 6,\n     \"placed_by\": 4,\n     \"weight\": 2.1,\n     \"weight_metric\": \"kg\",\n     \"sender\": \"Victoria Fellowship Church, Lekki\",\n     \"receiver\": \"University of Sheffield, S1 2ER, UK\",\n     \"current_location\": \"Lagos airport\",\n     \"status\": \"transiting\",\n     \"active\": true\n     \"sent_on\": \"2018-11-18T15:09:07.031Z\",\n     \"delivered_on\": \"\"\n    },\n   ...\n   ]\n  message: Number of active Parcel orders: 4\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "List error",
          "content": "HTTP/1.1 412 Precondition Failed",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./server.js",
    "groupTitle": "Parcel",
    "name": "GetApiV1Parcels"
  },
  {
    "type": "get",
    "url": "/api/v1/parcels/:parcelId",
    "title": "Return a parcel delivery order",
    "group": "Parcel",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorisation",
            "description": "<p>Token of authenticated user</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header",
          "content": "{\"Authorisation\": \"Bearer thehre.hsdkj08.hjhkkr0\"}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "NUMBER",
            "optional": false,
            "field": "parcelId",
            "description": "<p>Parcel id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n  \"parcelId\": 1,\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "parcel_id",
            "description": "<p>Parcel id</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "placed_by",
            "description": "<p>Parcel order creator id</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "weight",
            "description": "<p>Parcel weight</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "weight_metric",
            "description": "<p>Parcel weight unit of measurement</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "sender",
            "description": "<p>Parcel pickup location (sender's address)</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "receiver",
            "description": "<p>Parcel final destination (receiver's addresss)</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "current_location",
            "description": "<p>Parcel current location</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Parcel current status ('placed', 'transiting', 'delivered')</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "active",
            "description": "<p>Determines whether parcel should be processed</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "sent_on",
            "description": "<p>Parcel leaves pickup location on this date</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "delivered_on",
            "description": "<p>Parcel arrives at its final destination on this date</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n  status: 200\n  data: {\n    \"parcel_id\": 1,\n    \"placed_by\": 2,\n    \"weight\": ,\n    \"weight_metric\": \"\",\n    \"sender\": \"Victoria Fellowship Church, Lekki\",\n    \"receiver\": \"University of Sheffield, S1 2ER, UK\",\n    \"current_location\": \"\",\n    \"status\": \"\",\n    \"active\": true\n    \"sent_on\": \"2018-11-18T15:09:07.031Z\",\n    \"delivered_on\": \"\"\n  }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Find error",
          "content": "HTTP/1.1 412 Precondition Failed",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./server.js",
    "groupTitle": "Parcel",
    "name": "GetApiV1ParcelsParcelid"
  },
  {
    "type": "get",
    "url": "/api/v1/users/:userId/parcels",
    "title": "Return a list of parcel delivery order by a specific user",
    "group": "Parcel",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorisation",
            "description": "<p>Token of authenticated user</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header",
          "content": "{\"Authorisation\": \"Bearer thehre.hsdkj08.hjhkkr0\"}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "NUMBER",
            "optional": false,
            "field": "userId",
            "description": "<p>User id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n  \"userId\": 2\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "parcel_id",
            "description": "<p>Parcel id</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "placed_by",
            "description": "<p>Parcel order creator id</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "weight",
            "description": "<p>Parcel weight</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "weight_metric",
            "description": "<p>Parcel weight unit of measurement</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "sender",
            "description": "<p>Parcel pickup location (sender's address)</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "receiver",
            "description": "<p>Parcel final destination (receiver's addresss)</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "current_location",
            "description": "<p>Parcel current location</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Parcel current status ('placed', 'transiting', 'delivered')</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "active",
            "description": "<p>Determines whether parcel should be processed</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "sent_on",
            "description": "<p>Parcel leaves pickup location on this date</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "delivered_on",
            "description": "<p>Parcel arrives at its final destination on this date</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": " HTTP/1.1 200\n {\n   status\n   data: [\n    {\n     \"parcel_id\": 6,\n     \"placed_by\": 4,\n     \"weight\": 2.1,\n     \"weight_metric\": \"kg\",\n     \"sender\": \"Victoria Fellowship Church, Lekki\",\n     \"receiver\": \"University of Sheffield, S1 2ER, UK\",\n     \"current_location\": \"Lagos airport\",\n     \"status\": \"transiting\",\n     \"active\": true\n     \"sent_on\": \"2018-11-18T15:09:07.031Z\",\n     \"delivered_on\": \"\"\n    },\n   ...\n   ]\n  message: \"Number of active Parcel orders created by this user: 2\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "List error",
          "content": "HTTP/1.1 412 Precondition Failed",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./server.js",
    "groupTitle": "Parcel",
    "name": "GetApiV1UsersUseridParcels"
  },
  {
    "type": "get",
    "url": "/api/v1/users/:userId/parcels/:parcelId",
    "title": "Return a parcel delivery order by specific user",
    "group": "Parcel",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorisation",
            "description": "<p>Token of authenticated user</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header",
          "content": "{\"Authorisation\": \"Bearer thehre.hsdkj08.hjhkkr0\"}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "NUMBER",
            "optional": false,
            "field": "parcelId",
            "description": "<p>Parcel id</p>"
          },
          {
            "group": "Parameter",
            "type": "NUMBER",
            "optional": false,
            "field": "userId",
            "description": "<p>User id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n  \"parcelId\": 1,\n  \"userId\": 2\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "parcel_id",
            "description": "<p>Parcel id</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "placed_by",
            "description": "<p>Parcel order creator id</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "weight",
            "description": "<p>Parcel weight</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "weight_metric",
            "description": "<p>Parcel weight unit of measurement</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "sender",
            "description": "<p>Parcel pickup location (sender's address)</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "receiver",
            "description": "<p>Parcel final destination (receiver's addresss)</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "current_location",
            "description": "<p>Parcel current location</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Parcel current status ('placed', 'transiting', 'delivered')</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "active",
            "description": "<p>Determines whether parcel should be processed</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "sent_on",
            "description": "<p>Parcel leaves pickup location on this date</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "delivered_on",
            "description": "<p>Parcel arrives at its final destination on this date</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n  status: 200\n  data: {\n    \"parcel_id\": 1,\n    \"placed_by\": 2,\n    \"weight\": ,\n    \"weight_metric\": \"\",\n    \"sender\": \"Victoria Fellowship Church, Lekki\",\n    \"receiver\": \"University of Sheffield, S1 2ER, UK\",\n    \"current_location\": \"\",\n    \"status\": \"\",\n    \"active\": true\n    \"sent_on\": \"2018-11-18T15:09:07.031Z\",\n    \"delivered_on\": \"\"\n  }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Find error",
          "content": "HTTP/1.1 412 Precondition Failed",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./server.js",
    "groupTitle": "Parcel",
    "name": "GetApiV1UsersUseridParcelsParcelid"
  },
  {
    "type": "patch",
    "url": "/api/v1/parcels/:parcelId/cancel",
    "title": "Cancel a specific parcel delivery order.",
    "group": "Parcel",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorisation",
            "description": "<p>Token of authenticated user</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header",
          "content": "{\"Authorisation\": \"Bearer thehre.hsdkj08.hjhkkr0\"}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "parcelId",
            "description": "<p>Parcel id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n  \"parcelId\": 1,\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "parcel_id",
            "description": "<p>Parcel id</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "placed_by",
            "description": "<p>Parcel order creator id</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "weight",
            "description": "<p>Parcel weight</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "weight_metric",
            "description": "<p>Parcel weight unit of measurement</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "sender",
            "description": "<p>Parcel pickup location (sender's address)</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "receiver",
            "description": "<p>Parcel final destination (receiver's addresss)</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "current_location",
            "description": "<p>Parcel current location</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Parcel current status ('placed', 'transiting', 'delivered')</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "active",
            "description": "<p>Determines whether parcel should be processed</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "sent_on",
            "description": "<p>Parcel leaves pickup location on this date</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "delivered_on",
            "description": "<p>Parcel arrives at its final destination on this date</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 202 ACCEPTED\n{\n  status: 202\n  data: {\n    \"parcel_id\": 1,\n    \"placed_by\": 2,\n    \"weight\": 1.3,\n    \"weight_metric\": \"Kilogramme\",\n    \"sender\": \"Victoria Fellowship Church, Lekki\",\n    \"receiver\": \"University of Sheffield, S1 2ER, UK\",\n    \"current_location\": \"MM Airport, Ikeja, Lagos\",\n    \"status\": \"placed\",\n    \"active\": false,\n    \"sent_on\": \"2018-11-18T15:09:07.031Z\",\n    \"delivered_on\": \"\"\n  },\n  message: \"Order cancelled\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "List error",
          "content": "HTTP/1.1 412 Precondition Failed",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./server.js",
    "groupTitle": "Parcel",
    "name": "PatchApiV1ParcelsParcelidCancel"
  },
  {
    "type": "patch",
    "url": "/api/v1/parcels/:parcelId/currentLocation",
    "title": "Change the present location of a specific parcel delivery order.",
    "group": "Parcel",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorisation",
            "description": "<p>Token of authenticated user</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header",
          "content": "{\"Authorisation\": \"Bearer thehre.hsdkj08.hjhkkr0\"}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "parcelId",
            "description": "<p>Parcel id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "currentLocation",
            "description": "<p>Parcel new location</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n  \"parcelId\": 1,\n  \"currentLocation\": \"London Heathrow Terminal 5\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "parcel_id",
            "description": "<p>Parcel id</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "placed_by",
            "description": "<p>Parcel order creator id</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "weight",
            "description": "<p>Parcel weight</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "weight_metric",
            "description": "<p>Parcel weight unit of measurement</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "sender",
            "description": "<p>Parcel pickup location (sender's address)</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "receiver",
            "description": "<p>Parcel final destination (receiver's addresss)</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "current_location",
            "description": "<p>Parcel current location</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Parcel current status ('placed', 'transiting', 'delivered')</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "active",
            "description": "<p>Determines whether parcel should be processed</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "sent_on",
            "description": "<p>Parcel leaves pickup location on this date</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "delivered_on",
            "description": "<p>Parcel arrives at its final destination on this date</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 202 ACCEPTED\n{\n  status: 202\n  data: {\n    \"parcel_id\": 1,\n    \"placed_by\": 2,\n    \"weight\": 1.3,\n    \"weight_metric\": \"Kilogramme\",\n    \"sender\": \"Victoria Fellowship Church, Lekki\",\n    \"receiver\": \"10 Oakholme road,Encliffe Village, Sheffield S10 4 ES, UK\",\n    \"current_location\": \"London Heathrow Terminal 5\",\n    \"status\": \"transiting\",\n    \"active\": true,\n    \"sent_on\": \"2018-11-18T15:09:07.031Z\",\n    \"delivered_on\": \"\"\n  },\n  message: \"Parcel location updated\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "List error",
          "content": "HTTP/1.1 412 Precondition Failed",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./server.js",
    "groupTitle": "Parcel",
    "name": "PatchApiV1ParcelsParcelidCurrentlocation"
  },
  {
    "type": "patch",
    "url": "/api/v1/parcels/:parcelId/destination",
    "title": "Change the destination of a specific parcel delivery order.",
    "group": "Parcel",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorisation",
            "description": "<p>Token of authenticated user</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header",
          "content": "{\"Authorisation\": \"Bearer thehre.hsdkj08.hjhkkr0\"}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "parcelId",
            "description": "<p>Parcel id</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "receiver",
            "description": "<p>Parcel new destination</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n  \"parcelId\": 1,\n  \"receiver\": \"10 Oakholme road,Encliffe Village, Sheffield S10 4 ES, UK\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "parcel_id",
            "description": "<p>Parcel id</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "placed_by",
            "description": "<p>Parcel order creator id</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "weight",
            "description": "<p>Parcel weight</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "weight_metric",
            "description": "<p>Parcel weight unit of measurement</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "sender",
            "description": "<p>Parcel pickup location (sender's address)</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "receiver",
            "description": "<p>Parcel final destination (receiver's addresss)</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "current_location",
            "description": "<p>Parcel current location</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Parcel current status ('placed', 'transiting', 'delivered')</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "active",
            "description": "<p>Determines whether parcel should be processed</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "sent_on",
            "description": "<p>Parcel leaves pickup location on this date</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "delivered_on",
            "description": "<p>Parcel arrives at its final destination on this date</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 202 ACCEPTED\n{\n  status: 202\n  data: {\n    \"parcel_id\": 1,\n    \"placed_by\": 2,\n    \"weight\": 1.3,\n    \"weight_metric\": \"Kilogramme\",\n    \"sender\": \"Victoria Fellowship Church, Lekki\",\n    \"receiver\": \"10 Oakholme road,Encliffe Village, Sheffield S10 4 ES, UK\",\n    \"current_location\": \"MM Airport, Ikeja, Lagos\",\n    \"status\": \"placed\",\n    \"active\": true,\n    \"sent_on\": \"2018-11-18T15:09:07.031Z\",\n    \"delivered_on\": \"\"\n  },\n  message: \"Parcel destination updated\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "List error",
          "content": "HTTP/1.1 412 Precondition Failed",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./server.js",
    "groupTitle": "Parcel",
    "name": "PatchApiV1ParcelsParcelidDestination"
  },
  {
    "type": "patch",
    "url": "/api/v1/parcels/:parcelId/status",
    "title": "Change the status of a specific parcel delivery order",
    "group": "Parcel",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorisation",
            "description": "<p>Token of authenticated user</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header",
          "content": "{\"Authorisation\": \"Bearer thehre.hsdkj08.hjhkkr0\"}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "parcelId",
            "description": "<p>Parcel id</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>Parcel new status</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n  \"parcelId\": 1,\n  \"status\": \"transiting\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "parcel_id",
            "description": "<p>Parcel id</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "placed_by",
            "description": "<p>Parcel order creator id</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "weight",
            "description": "<p>Parcel weight</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "weight_metric",
            "description": "<p>Parcel weight unit of measurement</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "sender",
            "description": "<p>Parcel pickup location (sender's address)</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "receiver",
            "description": "<p>Parcel final destination (receiver's addresss)</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "current_location",
            "description": "<p>Parcel current location</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Parcel current status ('placed', 'transiting', 'delivered')</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "active",
            "description": "<p>Determines whether parcel should be processed</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "sent_on",
            "description": "<p>Parcel leaves pickup location on this date</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "delivered_on",
            "description": "<p>Parcel arrives at its final destination on this date</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 202 ACCEPTED\n{\n  status: 202\n  data: {\n    \"parcel_id\": 1,\n    \"placed_by\": 2,\n    \"weight\": 1.3,\n    \"weight_metric\": \"Kilogramme\",\n    \"sender\": \"Victoria Fellowship Church, Lekki\",\n    \"receiver\": \"10 Oakholme road,Encliffe Village, Sheffield S10 4 ES, UK\",\n    \"current_location\": \"MM Airport, Ikeja, Lagos\",\n    \"status\": \"transiting\",\n    \"active\": true,\n    \"sent_on\": \"2018-11-18T15:09:07.031Z\",\n    \"delivered_on\": \"\"\n  },\n  message: \"Parcel status updated\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "List error",
          "content": "HTTP/1.1 412 Precondition Failed",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./server.js",
    "groupTitle": "Parcel",
    "name": "PatchApiV1ParcelsParcelidStatus"
  },
  {
    "type": "patch",
    "url": "/api/v1/users/:userId/parcels/:parcelId",
    "title": "Activate and return a parcel delivery order",
    "group": "Parcel",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorisation",
            "description": "<p>Token of authenticated user</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header",
          "content": "{\"Authorisation\": \"Bearer thehre.hsdkj08.hjhkkr0\"}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "parcelId",
            "description": "<p>Parcel ID</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "placed_by",
            "description": "<p>Parcel Owner Id</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "weight",
            "description": "<p>Parcel weight</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "weightMetric",
            "description": "<p>Parcel weight unit of measurement</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "currentLocation",
            "description": "<p>Parcel current location</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Parcel current status (==='placed')</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n  \"parcelId\": 1,\n  \"placed_by\": 2,\n  \"weight\": 1.3,\n  \"weightMetric\": \"Kilogramme\",\n  \"currentLocation\": \"MM Airport, Ikeja, Lagos\",\n  \"status\": \"placed\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "parcel_id",
            "description": "<p>Parcel id</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "placed_by",
            "description": "<p>Parcel order creator id</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "weight",
            "description": "<p>Parcel weight</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "weight_metric",
            "description": "<p>Parcel weight unit of measurement</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "sender",
            "description": "<p>Parcel pickup location (sender's address)</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "receiver",
            "description": "<p>Parcel final destination (receiver's addresss)</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "current_location",
            "description": "<p>Parcel current location</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Parcel current status ('placed', 'transiting', 'delivered')</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "active",
            "description": "<p>Determines whether parcel should be processed</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "sent_on",
            "description": "<p>Parcel leaves pickup location on this date</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "delivered_on",
            "description": "<p>Parcel arrives at its final destination on this date</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 202 ACCEPTED\n{\n  status: 202\n  data: {\n    \"parcel_id\": 1,\n    \"placed_by\": 2,\n    \"weight\": 1.3,\n    \"weight_metric\": \"Kilogramme\",\n    \"sender\": \"Victoria Fellowship Church, Lekki\",\n    \"receiver\": \"University of Sheffield, S1 2ER, UK\",\n    \"current_location\": \"MM Airport, Ikeja, Lagos\",\n    \"status\": \"placed\",\n    \"active\": true\n    \"sent_on\": \"2018-11-18T15:09:07.031Z\",\n    \"delivered_on\": \"\"\n  },\n  message: \"This parcel is now being processed\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "List error",
          "content": "HTTP/1.1 412 Precondition Failed",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./server.js",
    "groupTitle": "Parcel",
    "name": "PatchApiV1UsersUseridParcelsParcelid"
  },
  {
    "type": "post",
    "url": "/api/v1/parcels",
    "title": "Create and returns a parcel delivery order",
    "group": "Parcel",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorisation",
            "description": "<p>Token of authenticated user</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header",
          "content": "{\"Authorisation\": \"Bearer thehre.hsdkj08.hjhkkr0\"}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "sender",
            "description": "<p>Parcel pickup location (sender's address)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "receiver",
            "description": "<p>Parcel final destination (receiver's addresss)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n  \"sender\": \"Victoria Fellowship Church, Lekki\",\n  \"receiver\": \"University of Sheffield, S1 2ER, UK\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "parcel_id",
            "description": "<p>Parcel id</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "placed_by",
            "description": "<p>Parcel order creator id</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "weight",
            "description": "<p>Parcel weight</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "weight_metric",
            "description": "<p>Parcel weight unit of measurement</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "sender",
            "description": "<p>Parcel pickup location (sender's address)</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "receiver",
            "description": "<p>Parcel final destination (receiver's addresss)</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "current_location",
            "description": "<p>Parcel current location</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Parcel current status ('placed', 'transiting', 'delivered')</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "active",
            "description": "<p>Determines whether parcel should be processed</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "sent_on",
            "description": "<p>Parcel leaves pickup location on this date</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "delivered_on",
            "description": "<p>Parcel arrives at its final destination on this date</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 201 CREATED\n{\n  status: 201\n  data: {\n    \"parcel_id\": 1,\n    \"placed_by\": 2,\n    \"weight\": ,\n    \"weight_metric\": \"\",\n    \"sender\": \"Victoria Fellowship Church, Lekki\",\n    \"receiver\": \"University of Sheffield, S1 2ER, UK\",\n    \"current_location\": \"\",\n    \"status\": \"\",\n    \"active\": true\n    \"sent_on\": \"2018-11-18T15:09:07.031Z\",\n    \"delivered_on\": \"\"\n  },\n  message: \"Parcel created\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "List error",
          "content": "HTTP/1.1 412 Precondition Failed",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./server.js",
    "groupTitle": "Parcel",
    "name": "PostApiV1Parcels"
  },
  {
    "type": "get",
    "url": "/API",
    "title": "Status",
    "group": "Status",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>API Status message</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\"message\": \"Welcome to sendit\"}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./server.js",
    "groupTitle": "Status",
    "name": "GetApi"
  },
  {
    "type": "delete",
    "url": "/api/v1/users/:userId",
    "title": "Deletes an authenticated user",
    "group": "User",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorisation",
            "description": "<p>Token of authenticated user</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header",
          "content": "{\"Authorisation\": \"Bearer thehre.hsdkj08.hjhkkr0\"}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 204 No Content",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Delete error",
          "content": "HTTP/1.1 412 Precondition Failed",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./server.js",
    "groupTitle": "User",
    "name": "DeleteApiV1UsersUserid"
  },
  {
    "type": "get",
    "url": "/api/v1/users",
    "title": "Return a list of users",
    "group": "User",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorisation",
            "description": "<p>Token of authenticated user</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header",
          "content": "{\"Authorisation\": \"Bearer thehre.hsdkj08.hjhkkr0\"}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "user_id",
            "description": "<p>User id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "first_name",
            "description": "<p>User first name</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "last_name",
            "description": "<p>User last name</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "other_names",
            "description": "<p>User other name(s)</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>User email</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>User hashed password</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "is_admin",
            "description": "<p>User type</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "registered",
            "description": "<p>Registration date</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n  status: 200\n  data: [\n   {\n    \"user_id\": 7,\n    \"first_name\": \"Jon\",\n    \"last_name\": \"Doe\",\n    \"other_names\": \"Foo\",\n    \"email\": \"jd@yahoo.com\",\n    \"password\": \"$2b$10$csx8rFTsCbac2RBLouyD7.aSLxvbF.yRw8SjkL6a9gPavGRJsbPge\",\n    \"username\": \"jondoe\",\n    \"registered\": \"2018-11-20T08:15:44.632Z\",\n    \"is_admin\": false\n  },\n   ...\n ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Find error",
          "content": "HTTP/1.1 404 Not Found",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./server.js",
    "groupTitle": "User",
    "name": "GetApiV1Users"
  },
  {
    "type": "get",
    "url": "/api/v1/users/:userId",
    "title": "Return a valid user's data",
    "group": "User",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorisation",
            "description": "<p>Token of authenticated user</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header",
          "content": "{\"Authorisation\": \"Bearer thehre.hsdkj08.hjhkkr0\"}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "user_id",
            "description": "<p>User id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "first_name",
            "description": "<p>User first name</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "last_name",
            "description": "<p>User last name</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "other_names",
            "description": "<p>User other name(s)</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>User email</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>User hashed password</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "is_admin",
            "description": "<p>User type</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "registered",
            "description": "<p>Registration date</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n  status: 200\n  data: {\n    \"user_id\": 7,\n    \"first_name\": \"Jon\",\n    \"last_name\": \"Doe\",\n    \"other_names\": \"Foo\",\n    \"email\": \"jd@yahoo.com\",\n    \"password\": \"$2b$10$csx8rFTsCbac2RBLouyD7.aSLxvbF.yRw8SjkL6a9gPavGRJsbPge\",\n    \"username\": \"jondoe\",\n    \"registered\": \"2018-11-20T08:15:44.632Z\",\n    \"is_admin\": false\n  }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Find error",
          "content": "HTTP/1.1 404 Not Found",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./server.js",
    "groupTitle": "User",
    "name": "GetApiV1UsersUserid"
  }
] });
