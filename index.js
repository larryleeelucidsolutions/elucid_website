var express     = require ('express');
var application = express ();
var mongoClient = require ('mongodb').MongoClient;

// Select the default request body parsers.
var bodyParser = require ('body-parser');
var multer     = require ('multer');

application.use (bodyParser.json ());
application.use (multer ()); // for parsing multipart/form-data

// Configuration Parameters.
var serverPort = 3001;
var databaseURL = 'mongodb://localhost:27017/elucid_website';
var maxNumContactsPerEmail = 2;

// Process Cross-Origin Resource Sharing (CORS) OPTION requests.
application.all ('*', function (request, response, next) {
  // console.log ('[*] request: ' + JSON.stringify (request.body)); // For debugging.
  response.set ({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'content-type',
    'Access-Control-Max-Age': 10
  });
  if (request.method === 'OPTIONS') {
    response.sendStatus (204);
  } else {
    next ();
  }
});

// Creates new Contact records.
application.post ('/contact', function (request, response) {
  // console.log ('[/contact] request: ' + JSON.stringify (request.body)); // For Debugging.
  if (request.body.title) {
    response.status (409).send ('A hidden field has been submitted. It appears that this request has been submitted by a bot.');
  } else {
    mongoClient.connect (databaseURL, function (error, database) {
      if (error === null) {
        var collection = database.collection ('contact');
        collection.find ({email: request.body.email}).count (function (error, numContacts) {
          if (numContacts <= maxNumContactsPerEmail) {
            collection.insert (request.body, function (error, result) {
              if (error === null) {
                response.sendStatus (201);
              } else {
                response.sendStatus (500);
                console.error (error);
              }
              database.close ();
            });
          } else {
            response.status (409).send ('We have recieved too many contact requests with the same email as the one you gave (' + request.body.email + '). We have recieved your previous contact requests and will reply as soon as possible. Thank you.');
            database.close ();
          }  
        });
      }
      else {
        response.sendStatus (500);
        console.log (error);
        database.close ();
      }
    });
  }
});

// Returns a paginated list of those labor rates that satisfy the given search parameters.
application.get ('/rates/search', function (request, response) {
  // console.log ('[/rates/search] request: ' + JSON.stringify (request.query)); // For debugging.
  mongoClient.connect (databaseURL, function (error, database) {
    if (error === null) {
      search (database, request.query, function (cursor) {
        cursor
        .sort ({ laborCategory: request.query.pageSort === 'ascending' ? 1 : -1 })
        .skip (request.query.pageIndex * request.query.pageSize)
        .limit (parseInt (request.query.pageSize)) // The integer conversion is required.
        .toArray (function (error, rates) {
          if (error) {
            response.sendStatus (500);
            console.error (error);
          } else {
            response.json (rates);
            // console.log ('rates: ' + JSON.stringify (rates)); // For debugging.
          }
          database.close ();
        });
      },
      function (e) {
        response.sendStatus (500);
        console.error ('[/rates/search] error.')
        database.close ();
      });
    } else {
      response.sendStatus (500);
      console.error (error);
      database.close ();
    }
  }); 
});

// Returns a count of the number of labor rates that satisfy the given search parameters.
application.get ('/rates/count', function (request, response) {
  // console.log ('[/rates/count] request: ' + JSON.stringify (request.query)); // For debugging.
  mongoClient.connect (databaseURL, function (error, database) {
    if (error === null) {
      search (database, request.query, function (cursor) {
        cursor.count (function (error, numRates) {
          if (error) {
            response.sendStatus (500);
            console.error (error);
          } else {
            response.send ('' + numRates); // The string conversion is necessary to prevent Express from treating numRates as an HTTP status code. 
            // console.log ('[/rates/count] sent new response: "' + numRates + '".'); // For debugging.
          }
          database.close ();
        });
      },
      function (e) {
        response.sendStatus (500);
        console.error ('[/rates/count] error.')
        database.close ();
      });
    } else {
      response.sendStatus (500);
      console.error (error);
      database.close ();
    }
  });
});

application.listen (serverPort);

/**
  Accepts four arguments: database, a MongoDB
  interface object; query, a Rate Query object;
  success, a function that accepts a Cursor object
  representing the search results set; and error,
  a function that processes any exceptions that
  occured while executing the query; and finds the
  labor rates in database that matched query and
  passes them to success.

  Note: The Rate Query object must have the
  following structure:
    {searchTerm: <regexp string>,
     contractType: <string>,
     workLocation: <string>}
*/
var search = function (database, query, success, error) {
  // console.log ('[search] query: ' + JSON.stringify (query)); // For debugging.
  try {
    var dbQuery = {
      laborCategory: {$regex: new RegExp (query.searchTerm), $options: 'i'},
      contractType: query.contractType,
      workLocation: query.workLocation,
    };
    // console.log ('[search] db query: ' + JSON.stringify (dbQuery)); // For debugging.
    success (database.collection ('rates').find (dbQuery));
  } catch (e) {
    console.error ('[search] Error: ' + e.message);
    error (e);
  }
}
