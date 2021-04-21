importScripts('ngsw-worker.js');
importScripts('firebase-config.js');
importScripts('https://www.gstatic.com/firebasejs/7.13.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.13.1/firebase-messaging.js');

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler((payload) => {
    const notificationOptions = {
        body: payload.message,
        icon: 'assets/img/mstile-150x150.png'
    };
    return self.registration.showNotification("Morphistic", notificationOptions);
});