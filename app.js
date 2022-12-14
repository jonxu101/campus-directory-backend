const dbConnect = require("./db/dbConnect");
const User = require("./db/userModel");
const auth = require("./auth");
const Event = require("./db/eventModel")

const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const express = require("express");
const bcrypt = require("bcrypt");
const app = express();

// execute database connection
dbConnect();

// Curb Cores Error by adding a header here
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

// body parser configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (request, response, next) => {
  response.json({ message: "Hey! This is your server response!" });
  next();
});


// free endpoint
app.get("/free-endpoint", (request, response) => {
  response.json({ message: "You are free to access me anytime" });
});

// authentication endpoint
app.get("/auth-endpoint", auth, (request, response) => {
  response.send({ message: "You are authorized to access me" });
});

//CREATE EVENT
app.post("/createEvent", (request, response) => {

  // const dateTime = "05 October 2011 14:48 UTC";

  const event = new Event({
    title: request.body.title,
    details: request.body.details,
    host_email: request.body.host_email,
    is_invite_only: request.body.is_invite_only,
    max_attendees: request.body.max_attendees,
    location: request.body.location,
    start_time: request.body.start_time,
    end_time: request.body.end_time
  });

  event.save().then((result) => {
      response.status(201).json({
        message: 'Post saved successfully!',
        result,
      });
    }
  ).catch(
    (error) => {
      response.status(400).json({
        message: "Error creating event",
        error: error
      });
    }
  );

});

//DELETE EVENT
app.post("/deleteEvent", (request, response) => {

  Event.deleteOne(
    {_id: request.body.id},
    // {_host_email: request.body.host_email}
    // function (err, results) {}
  ).then((result) => {
      response.status(201).json({
        message: 'Deleted event successfully!',
        result,
      });
    }
  ).catch(
    (error) => {
      response.status(400).json({
        message: "Error creating event",
        error: error
      });
    }
  );

});

//UPDATE EVENT
app.post("/updateEvent", (request, response) => {
  Event.updateOne(
    {_id: request.body.id},
    {$set:{ 
      title: request.body.title,
      details: request.body.details,
      host_email: request.body.host_email,
      is_invite_only: request.body.is_invite_only,
      max_attendees: request.body.max_attendees,
      location: request.body.location,
      start_time: request.body.start_time,
      end_time: request.body.end_time,
    }
    },
    { upsert: true },
    // {_host_email: request.body.host_email}
    // function (err, results) {}
  ).then((result) => {
      response.status(201).json({
        message: 'Updated event successfully!',
        result,
      });
    }
  ).catch(
    (error) => {
      response.status(400).json({
        message: "Error creating event",
        error: error
      });
    }
  );

});

app.post("/addAttendee", (request, response) => {

  // Event.attendees.push(request.body.)
  Event.updateOne(
    {_id: request.body.id},
    {$push: {attendees: request.body.attendee_email}},
    // done
  ).then( (event) => {
    response.status(200).json(event);
    }
  ).catch(
    (error) => {
      response.status(400).json({
        error: error
      });
    }
  );

});

app.post("/deleteAttendee", (request, response) => {

  // Event.attendees.push(request.body.)
  Event.update(
    {_id: request.body.id},
    {$pullAll: {attendees: [request.body.attendee_email]}},
    // done
  ).then( (event) => {
    response.status(200).json(event);
    }
  ).catch(
    (error) => {
      response.status(400).json({
        error: error
      });
    }
  );

});

app.post("/addMaybe", (request, response) => {

  // Event.attendees.push(request.body.)
  Event.updateOne(
    {_id: request.body.id},
    {$push: {maybe: request.body.attendee_email}},
    // done
  ).then( (event) => {
    response.status(200).json(event);
    }
  ).catch(
    (error) => {
      response.status(400).json({
        error: error
      });
    }
  );

});

app.post("/deleteMaybe", (request, response) => {

  // Event.attendees.push(request.body.)
  Event.update(
    {_id: request.body.id},
    {$pullAll: {maybe: [request.body.attendee_email]}},
    // done
  ).then( (event) => {
    response.status(200).json(event);
    }
  ).catch(
    (error) => {
      response.status(400).json({
        error: error
      });
    }
  );

});

app.post("/addInvited", (request, response) => {

  // Event.attendees.push(request.body.)
  Event.updateOne(
    {_id: request.body.id},
    {$push: {invited: request.body.attendee_email}},
    // done
  ).then( (event) => {
    response.status(200).json(event);
    }
  ).catch(
    (error) => {
      response.status(400).json({
        error: error
      });
    }
  );

});

app.post("/deleteInvited", (request, response) => {

  // Event.attendees.push(request.body.)
  Event.update(
    {_id: request.body.id},
    {$pullAll: {invited: [request.body.attendee_email]}},
    // done
  ).then( (event) => {
    response.status(200).json(event);
    }
  ).catch(
    (error) => {
      response.status(400).json({
        error: error
      });
    }
  );

});

app.post("/returnJoinedEvent", (request, response) => {

  Event.find({attendees : request.body.user}).then( (event) => {
    response.status(200).json(event);
    }
  ).catch(
    (error) => {
      response.status(400).json({
        error: error
      });
    }
  );

});

app.post("/returnMaybeEvent", (request, response) => {

  Event.find({maybe : request.body.user}).then( (event) => {
    response.status(200).json(event);
    }
  ).catch(
    (error) => {
      response.status(400).json({
        error: error
      });
    }
  );

});

app.post("/returnInvitedEvent", (request, response) => {

  Event.find({invited : request.body.user}).then( (event) => {
    response.status(200).json(event);
    }
  ).catch(
    (error) => {
      response.status(400).json({
        error: error
      });
    }
  );

});

app.post("/returnOpenEvent", (request, response) => {

  Event.find({is_invite_only : false}).then( (event) => {
    response.status(208).json(event);
    }
  ).catch(
    (error) => {
      response.status(400).json({
        error: error
      });
    }
  );

});

app.post("/returnHostedEvent", (request, response) => {

  Event.find({host_email : request.body.user}).then( (event) => {
    response.status(208).json(event);
    }
  ).catch(
    (error) => {
      response.status(400).json({
        error: error
      });
    }
  );

});

app.post("/returnAllEvents", (request, response) => {

  Event.find({}).then( (event) => {
    response.status(200).json(event);
    }
  ).catch(
    (error) => {
      response.status(400).json({
        error: error
      });
    }
  );

});


// login endpoint
app.post("/login", (request, response) => {
  // check if email exists
  User.findOne({ email: request.body.email })

    // if email exists
    .then((user) => {
      // compare the password entered and the hashed password found
      bcrypt
        .compare(request.body.password, user.password)

        // if the passwords match
        .then((passwordCheck) => {

          // check if password matches
          if(!passwordCheck) {
            return response.status(400).send({
              message: "Passwords does not match",
              error,
            });
          }

          //   create JWT token
          const token = jwt.sign(
            {
              userId: user._id,
              userEmail: user.email,
            },
            "RANDOM-TOKEN",
            { expiresIn: "24h" }
          );

          //   return success response
          response.status(200).send({
            message: "Login Successful",
            email: user.email,
            usertype: user.usertype,
            token,
          });
        })
        // catch error if password do not match
        .catch((error) => {
          response.status(400).send({
            message: "Passwords does not match",
            error,
          });
        });
    })
    // catch error if email does not exist
    .catch((e) => {
      response.status(404).send({
        message: "Email not found",
        e,
      });
    });
});

// register endpoint
app.post("/register", (request, response) => {
  // hash the password
  bcrypt
    .hash(request.body.password, 10)
    .then((hashedPassword) => {
      // create a new user instance and collect the data
      const user = new User({
        email: request.body.email,
        password: hashedPassword,
        usertype: request.body.usertype,
      });

      // save the new user
      user
        .save()
        // return success if the new user is added to the database successfully
        .then((result) => {
          response.status(201).send({
            message: "User Created Successfully",
            result,
          });
        })
        // catch error if the new user wasn't added successfully to the database
        .catch((error) => {
          response.status(500).send({
            message: "Error creating user",
            error,
          });
        });
    })
    // catch error if the password hash isn't successful
    .catch((e) => {
      response.status(500).send({
        message: "Password was not hashed successfully",
        e,
      });
    });
});

module.exports = app;