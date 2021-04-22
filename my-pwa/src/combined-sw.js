importScripts('ngsw-worker.js');
importScripts('firebase-config.js');
importScripts('https://www.gstatic.com/firebasejs/7.13.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.13.1/firebase-messaging.js');

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

//Call only on "data messages", not on "notification messages", i.e., notification payload needs to be empty
//Show the desktop alert (if closed / in background)
messaging.setBackgroundMessageHandler((payload) => {
  console.log(payload);
  //We could define notificationOptions.data to data but this function is not called while in foreground.
  const data = JSON.parse(payload.data.data);
  console.log(data);
  const notificationOptions = {
    badge: 'assets/icons/icon-144x144.png',
    body: data.body,
    data: payload.data,
    icon: 'assets/icons/icon-512x512.png',
    image: 'assets/icons/icon-512x512.png'
  };
  //Trigger swPush.messages
  return self.registration.showNotification(data.title, notificationOptions);
});

//Called as the same time as swPush.notificationClicks
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
      const data = JSON.parse(event.notification.data.data);
      return clients.openWindow(data.route || "/");
    })
  );
});