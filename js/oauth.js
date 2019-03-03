// Initialize Firebase
var config = {
    apiKey: "AIzaSyCtXNOTZ3sijhthix2zi3-4xBXrS19tR_c",    // oof not hidden
    authDomain: "zinc-e9f9c.firebaseapp.com",
    databaseURL: "https://zinc-e9f9c.firebaseio.com",
    projectId: "zinc-e9f9c",
    storageBucket: "zinc-e9f9c.appspot.com",
    messagingSenderId: "99803564144",
};
firebase.initializeApp(config);


// Login Persistance
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
.then(function() {
    // Existing and future Auth states are now persisted in the current
    // session only. Closing the window would clear any existing state even
    // if a user forgets to sign out.
    // ...
    // New sign-in will be persisted with session persistence.
    return firebase.auth().signInWithEmailAndPassword(email, password);
})
.catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
});

// Login listener
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        // User is signed in.
        var displayName = user.displayName;
        console.log(displayName + " is logged in");
        var email = user.email;
        var emailVerified = user.emailVerified;
        var photoURL = user.photoURL;
        var isAnonymous = user.isAnonymous;
        var uid = user.uid;
        var providerData = user.providerData;
    } else {
        // User is signed out.
        console.log("No login");
        window.location = "profile#login";
    }
});