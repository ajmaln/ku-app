// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.
firebase.initializeApp({
  'messagingSenderId': '77378557282'
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();



messaging.setBackgroundMessageHandler(function(payload) {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    console.log(payload)
    // Customize notification here
    var notificationTitle = payload.data.title;
    var notificationOptions = {
      //title: payload.data.title,
      body: payload.data.body,
      icon: 'https://ucekpc.uckdsc.in/static/media/kerala_logo_red.b3f80573.png',
      badge: 'https://ucekpc.uckdsc.in/static/media/kerala_logo_red.b3f80573.png',
      image: 'https://ucekpc.uckdsc.in/static/media/kerala_logo_red.b3f80573.png'
    };
  
    return self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener('notificationclick', function(event) {
  console.log('[Service Worker] Notification click Received.');

  event.notification.close();

  event.waitUntil(
    clients.openWindow('https://ajmaln.github.io/easyku')
  );
});