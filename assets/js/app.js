
var config = {
	    apiKey: "AIzaSyA_FOCLr4c-XjBO08pR454CcNg4Mcrp4TI",
	    authDomain: "onlinestoreapp-3067c.firebaseapp.com",
	    databaseURL: "https://onlinestoreapp-3067c.firebaseio.com",
	    storageBucket: "onlinestoreapp-3067c.appspot.com",
	    messagingSenderId: "704874372950"
	  };
	  firebase.initializeApp(config);
var storage = firebase.storage();
var storageRef = storage.ref();

var tangRef = storageRef.child('images/Tang.png');

        tangRef.getDownloadURL().then(function(url) 
        {
        	console.log('Got download URL');
            var test = url
            document.querySelector('img').src = test;
        }).catch(function(error) 
        {
            switch (error.code) 
            {
                case 'storage/object_not_found':
                    break;

                case 'storage/unauthorized':
                    break;

                case 'storage/canceled':
                    break;

                case 'storage/unknown':
                    break;
            }
        });

        var test = 'firebase_url';
        document.querySelector('img').src = test;


console.log('Before requesting download URL');
tangRef.getDownloadURL().then(function(url) {
    console.log('Got download URL');
});
console.log('After requesting download URL');

/*
firebase.auth().createUserWithEmailAndPassword(email, password)
    .catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  if (errorCode == 'auth/weak-password') {
    alert('The password is too weak.');
  } else {
    alert(errorMessage);
  }
  return(error);
}); 

*/


/*var ref = new Firebase(firebaseRoot); 
ref.onAuth(function(authData)
{
	if(!authData)
	{
		//do nothing
		console.log('logged out');
	}
	else
	{
		console.log('user has been authenticate',authData);
	}
});


var email = "bob@bob.com",
password = "bob";
ref.createUser({
	email: email, password: password
},  function(err, userData){
	if (err){
		console.log('cannot create user',err);
	}
	else
	{
			console.log('user data',userData);
	}

	ref.authWithPassword({
		email: email, password: password
	}, function(err,authData){
		console.log('user logged in after created');
	})
})

setTimeout(function(){
ref.unauth();
},2000) */

/*ref.authWithPassword({
	email: 'akinrelesimi@gmail.com',
	password:'akinreleSimi'
}, function (err,authData)
{
	if(err)
	{
		console.warn(err);
	}
	else
	{
		console.log('user logged in with password');
	}

});*/
