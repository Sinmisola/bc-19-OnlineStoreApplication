var express = require('express');
var app = express();
var session = require('express-session');
var bodyParser = require('body-parser'); //to get post information
var firebase = require("firebase");
 var storage = require("firebase/storage");
// ------ config
 var config = {
    projectId: '704874372950',
    apiKey: "AIzaSyA_FOCLr4c-XjBO08pR454CcNg4Mcrp4TI",
    authDomain: "onlinestoreapp-3067c.firebaseapp.com",
    databaseURL: "https://onlinestoreapp-3067c.firebaseio.com",
    storageBucket: "onlinestoreapp-3067c.appspot.com",
    messagingSenderId: "704874372950"
  };

var gcloud = require('gcloud')(config);
var gcs = gcloud.storage();
var bucket = gcs.bucket('onlinestoreapp-3067c.appspot.com');
var fileUpload = require('express-fileupload'); //for file upload

var admin = require("firebase-admin");
admin.initializeApp({
  credential: admin.credential.cert("sample-key.json"),
  databaseURL: "https://onlinestoreapp-3067c.firebaseio.com/"
});

 
  firebase.initializeApp(config);
// helps you get form data passed in request
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname + '/assets'));
app.use("/assets",express.static(__dirname + '/assets'));
 
app.use(session({secret:'simi'}));

 app.use(fileUpload());
//var storageRef = storage().ref();



/*
app.use(function(req, res, next) {
  if (req.session && req.session.user) {
    User.findOne({ email: req.session.user.email }, function(err, user) {
      if (user) {
        req.user = user;
        delete req.user.password; // delete the password from the session
        req.session.user = user;  //refresh the session value
        res.locals.user = user;
      }
      // finishing processing the middleware and run the route
      next();
    });
  } else {
    next();
  }
});*/

// configures express with ejs template engine
app.set('view engine', 'ejs');

// get reference to users node in firebase
var ref = admin.database().ref('/onlinestore');

app.get('/signup', function (req, res) {
  res.render('signup');
});



app.get('/', function (req, res) {
    res.render('login');
});

app.post('/', function (req, res) {
     
  if (firebase.auth().currentUser) {
    //  [START signout]
    firebase.auth().signOut();
    // [END signout]
  } else {
    var email = req.body.email;
    var password = req.body.password;
    if (email.length < 4) {
      res.send('Please enter an email address.');
      //res.send('Please enter an email address.','showAlert') 
      return;
    }
  }

  if (password.length < 4) {
    res.send('Please enter a password.');
    
    return;
  }

  // Sign in with email and password .
  // [START authwithemail]
  firebase.auth().signInWithEmailAndPassword(email, password).then(function(){

    // User is signed in.
    currentUser = email;
    ref.child("user").once("value", function(snapshot){
      data = snapshot.val();

      for (var key in data) {
        if(data[key].email == currentUser)
        {
           req.session.user = data[key].userid;
        }
      }
      res.redirect('/personalstore');
    } ,function(error) {
    // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // [START_EXCLUDE]
      if (errorCode === 'auth/wrong-password') {
        res.send('Wrong password.');
      } else {
        res.send(errorMessage);
      }
      console.log(error);
      // [END_EXCLUDE]
    });
  });
});

app.post('/signup', function (req, res) {
   

   var email = req.body.email;

    var newpassword = req.body.newpassword;

    var confirmpassword = req.body.confirmpassword;
      if (email.length < 4) {
        res.send('Please enter an email address.');
        return;
      }
      if (newpassword.length < 4) {
        res.send('Please enter a password.');
        return;
      }
       if (confirmpassword.length < 4) {
        res.send('Please enter a password.');
        return;
      }

      if(newpassword != confirmpassword)
      {
        res.send("Password do not match");
      }
      else
      {
        var password = newpassword;
      }
      // Sign in with email and pass.
      // [START createwithemail]
      firebase.auth().createUserWithEmailAndPassword(email, password).then(function(user)
      {
        ref.child('user').push({
        'email': email,
        'password': password,
        'userid': user.uid
        
        });

         currentUser = email;
        ref.child("user").once("value", function(snapshot){
        data = snapshot.val();

      for (var key in data) {
        if(data[key].email == currentUser)
        {
           req.session.user = data[key].userid;
        }
      }
      res.redirect('/personalstore');
      });    //res.redirect('/personalstore');
      },
        function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // [START_EXCLUDE]
        if (errorCode == 'auth/weak-password') {
          res.send('The password is too weak.');
        } else {
          res.send(errorMessage);
        }
        console.log(error);
        });
 

   
    //res.render('store', {email: email});
});


app.post('/addStock', function (req, res) {

    var productName = req.body.productName;

    var d = new Date();
    var filename = productName+d.getTime() + '.jpg';

    var imageName = filename;

    var descriptions = req.body.descriptions;

    var quantity = req.body.quantity;



   // console.log(req.files, productName);
    //check if a file has been uploaded

     if (!req.files) {
        //res.send('No files were uploaded.');
        return;
    }

    
    req.files.imageName.mv(__dirname + '/assets/productImage/' + filename, function(err) {
        if (err) {
            // res.status(500).send(err);
        }
        else {
            console.log('File uploaded!');
        }
    });


    var currentuser = req.session.user;

    if (currentuser===undefined || currentuser ===null) {
      res.redirect('/');
    } else {
          var data = {
            'productName': productName,
            'imageName': imageName,
            'descriptions': descriptions,
            'quantity': quantity,
            'currentUser':currentuser
          }
         // console.log(data)
          ref.child('inventory').push(data);

          //res.redirect('/personalstore');  
          res.redirect('/personalstore');
        
    }
});

app.post('/userstore', function (req,res){
  var storename = req.body.storename;
  var descriptions = req.body.descriptions;
  var ownersname =req.body.ownersname;
  var Address = req.body.Address;
  var phonenumber = req.body.phonenumber;
  var currentUser;
 
  var data;
 // var firebaseRef = firebase.database().ref();
  firebase.auth().onAuthStateChanged(function(user) {
       if (user) {
       // console.log('trying ')
    // User is signed in.
     currentUser = user.uid;
             ref.child("user").once("value", function(snapshot){
              data = snapshot.val();

             for (var key in data) {
                if(data[key].userid == currentUser)
                {
                  
                  ref.child('stores').push({
                    'storename': storename,
                    'descriptions': descriptions,
                    'ownersname': ownersname,
                    'Address': Address,
                    'phonenumber': phonenumber,
                    'currentUser': currentUser

                  });
        res.redirect('/addStock');

          }

        }}
        , function(error)
       {
      console.log("The read failed: "+ error.code);
    });
    
//res.redirect('/addStock');
   
    
  } else {
    // No user is signed in.
     res.redirect('/');
    console.log("No user signed in");
  }
});

  
});

//app.get('/store', function(req, res) {
   // res.render('store');
    // res.sendFile('./home.html');
//});

app.get('/personalstore', function(req, res) {
  var currentUser =req.session.user;
  var inventories = [];

  if(currentUser == null){
    res.redirect('/');
  }else{
    ref.child("inventory").once("value", function(snapshot){
      data = snapshot.val();

            for (var key in data) {
              if(data[key].currentUser == currentUser){
              //  ref.orderByChild("currentUser").equalTo(currentUser).once("value", function(snapshot){
                //  console.log(snapshot.val());
                //});
                inventories.push(data[key]);
              }
            }
     // console.log(inventories);
      if(!inventories){
        inventories = [];
      }
// for the public shared url
      ref.child("stores").once("value", function(snapshot){
      data = snapshot.val();
         var storename;
              for (var key in data) {
                if(data[key].currentUser == currentUser){
               
                 storename = data[key].storename;
                  break;
                }
              }
      res.render('personalstore', {inventories: inventories, storename: storename});
    });
      
      //console.log('done') 
    });
  }
});

// stores using common sharedurl 
app.get('/stores/:storename', function(req, res) {

 req.params.storename;

 var currentUser =req.session.user;
  var usersid;
  var inventories = [];


  if(!currentUser == null){
    res.redirect('/');
  }else{

       ref.child("stores").once("value",function(snapshot)
       {
        storedata = snapshot.val();
          for(var key in storedata)
          {
             if(storedata[key].storename == req.params.storename )
             {
                  usersid = storedata[key].currentUser;
             }
          }


           ref.child("inventory").once("value", function(snapshot){
           data = snapshot.val();

          for (var key in data) {
            if(data[key].currentUser == usersid){
            //  ref.orderByChild("currentUser").equalTo(currentUser).once("value", function(snapshot){
              //  console.log(snapshot.val());
              //});
              inventories.push(data[key]);
            }
          }
         // console.log(inventories);
          res.render('stores', {inventories: inventories});
          //console.log('done') 
        });
  });
       
}
});

app.get('/addStock', function(req, res) {
    res.render('addStock');
    // res.sendFile('./home.html');
});

app.get('/userstore', function(req, res) {
    res.render('userstore');
    // res.sendFile('./home.html');
});


app.get('/logout', function(req, res) {
  delete req.session.user
    res.redirect('/');
    // res.sendFile('./home.html');
});
app.listen(80, function () {
  console.log('Example app listening on port 8000!');
});