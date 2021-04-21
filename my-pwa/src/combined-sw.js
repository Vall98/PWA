importScripts('ngsw-worker.js');
importScripts('firebase-config.js');
importScripts('https://www.gstatic.com/firebasejs/7.13.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.13.1/firebase-messaging.js');

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

var test = {};

messaging.onBackgroundMessage((payload) => {
    console.log(payload);
});

messaging.setBackgroundMessageHandler((payload) => {
    console.log(payload);
    test = payload;
    const notificationOptions = {
        badge: 'assets/icons/icon-144x144.png',
        body: payload.message.notification.body,
        data: payload.message.data,
        icon: 'assets/icons/icon-512x512.png',
        image: 'assets/icons/icon-512x512.png'
    };
    return self.registration.showNotification(payload.message.notification.title, notificationOptions);
});