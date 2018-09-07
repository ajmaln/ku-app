// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js');
import logo from './logo.svg';

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.
firebase.initializeApp({
  'messagingSenderId': '77378557282'
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.usePublicVapidKey("BDDNlVdwUP39dJEu9rfD7kBEOUvaUXhJkuQqC4Nc4B0P3HtpVl0E_9EXjgCqYp0N0UvO3pqDvCoE8qzoEUdRo_U");


messaging.setBackgroundMessageHandler(function(payload) {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    // Customize notification here
    var notificationTitle = 'New Updates';
    var notificationOptions = {
      body: payload.message,
      icon: logo
    };
  
    return self.registration.showNotification(notificationTitle,
      notificationOptions);
});


function sendTokenToServer(tooken) {

}

function setTokenSentToServer(val) {

}


messaging.requestPermission().then(function () {
    console.log('Notification permission granted.');
    messaging.getToken().then(function (currentToken) {
        if (currentToken) {
            sendTokenToServer(currentToken);
            //updateUIForPushEnabled(currentToken);
            console.log('Token generated', currentToken)
        } else {
            // Show permission request.
            console.log('No Instance ID token available. Request permission to generate one.');
            // Show permission UI.
            //updateUIForPushPermissionRequired();
            setTokenSentToServer(false);
        }
    }).catch(function (err) {
        console.log('An error occurred while retrieving token. ', err);
        //showToken('Error retrieving Instance ID token. ', err);
        setTokenSentToServer(false);
    });
}).catch(function (err) {
    console.log('Unable to get permission to notify.', err);
});

messaging.onTokenRefresh(function () {
    messaging.getToken().then(function (refreshedToken) {
        console.log('Token refreshed.');
        // Indicate that the new Instance ID token has not yet been sent to the
        // app server.
        setTokenSentToServer(false);
        // Send Instance ID token to app server.
        sendTokenToServer(refreshedToken);
        // ...
    }).catch(function (err) {
        console.log('Unable to retrieve refreshed token ', err);
        //showToken('Unable to retrieve refreshed token ', err);
    });
});

messaging.onTokenRefresh(function () {
    messaging.getToken().then(function (refreshedToken) {
        console.log('Token refreshed.');
        // Indicate that the new Instance ID token has not yet been sent to the
        // app server.
        setTokenSentToServer(false);
        // Send Instance ID token to app server.
        sendTokenToServer(refreshedToken);
        // ...
    }).catch(function (err) {
        console.log('Unable to retrieve refreshed token ', err);
        //showToken('Unable to retrieve refreshed token ', err);
    });
});

messaging.onMessage(function (payload) {
    console.log('Message received. ', payload);
    var notificationTitle = "New Updates!";
    var notificationOptions = {
        body: payload.message,
        icon: logo
    };

    return self.registration.showNotification(notificationTitle,
        notificationOptions);
});

messaging.setBackgroundMessageHandler(function (payload) {
    console.log('Received background message ', payload);
    // Customize notification here
    var notificationTitle = "New Updates!";
    var notificationOptions = {
        body: payload.message,
        icon: logo
    };

    return self.registration.showNotification(notificationTitle,
        notificationOptions);
});