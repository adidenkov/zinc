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


// Initialize the FirebaseUI Widget using Firebase
var ui = new firebaseui.auth.AuthUI(firebase.auth());

var uiConfig = {
    callbacks: {
        signInSuccessWithAuthResult: function(authResult, redirectUrl) {
            // User successfully signed in.
            // Return type determines whether we continue the redirect automatically
            // or whether we leave that to developer to handle.
            return true;
        },
        uiShown: function() {
            // The widget is rendered.
            // Hide the loader.
            document.getElementById('loader').style.display = 'none';
        }
    },
    // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
    signInFlow: 'popup',
    signInSuccessUrl: 'profile',
    signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        firebase.auth.GoogleAuthProvider.PROVIDER_ID
    ]
};

// The start method will wait until the DOM is loaded.
ui.start('#firebaseui-auth-container', uiConfig);