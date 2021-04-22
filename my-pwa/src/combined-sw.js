importScripts('ngsw-worker.js');
importScripts('firebase-config.js');
importScripts('https://www.gstatic.com/firebasejs/7.13.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.13.1/firebase-messaging.js');

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

//call only on "data messages", not on "notification messages", i.e., notification payload needs to be empty
messaging.setBackgroundMessageHandler((payload) => {
    console.log(payload);
    const notificationOptions = {
        badge: 'assets/icons/icon-144x144.png',
        body: payload.data.body,
        data: payload.data.data,
        icon: 'assets/icons/icon-512x512.png',
        image: 'assets/icons/icon-512x512.png'
    };
    return self.registration.showNotification(payload.data.title, notificationOptions);
});

self.addEventListener('notificationclick', event => {
    const rootUrl = new URL('/', location).href;
    event.notification.close();
    // Enumerate windows, and call window.focus(), or open a new one.
    event.waitUntil(
      clients.matchAll().then(matchedClients => {
        for (let client of matchedClients) {
          if (client.url === rootUrl) {
            return client.focus();
          }
        }
        return clients.openWindow("/");
      })
    );
});