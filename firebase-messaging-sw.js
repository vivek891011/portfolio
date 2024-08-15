// Scripts for firebase and firebase messaging
importScripts("https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js");

// Notification click event listener
self.addEventListener("notificationclick", (e) => {
  console.log("click event", e);
  const origin = e.currentTarget.origin;
  console.log("location", origin);
  const alarm_id = e.notification.data.alarm_id;
  let path = "";
  if (alarm_id) {
    path = "/alarms?show_info=" + alarm_id;
  }

  const url = origin + path;
  // Close the notification popout
  e.notification.close();

  // Get all the Window clients
  e.waitUntil(
    clients.matchAll({ type: "window" }).then((clientsArr) => {
      // If a Window tab matching the targeted URL already exists, focus that;
      const hadWindowToFocus = clientsArr.some((windowClient) =>
        windowClient.url === url ? (windowClient.focus(), true) : false,
      );
      // Otherwise, open a new tab to the applicable URL and focus it.
      if (!hadWindowToFocus)
        clients.openWindow(url).then((windowClient) => (windowClient ? windowClient.focus() : null));
    }),
  );
});

const firebaseConfig = {
  apiKey: "AIzaSyCT4fTEcb6B4NxvFmroNm2v9YM6r-1cbHs",
  authDomain: "rdpms-edge.firebaseapp.com",
  projectId: "rdpms-edge",
  storageBucket: "rdpms-edge.appspot.com",
  messagingSenderId: "599946883383",
  appId: "1:599946883383:web:3c5d7fcf5e1541c505aab2",
  measurementId: "G-141NQ8FF2R",
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
// const messaging = firebase.messaging.isSupported() ? firebase.messaging() : null;

const messaging = (async () => {
  try {
    const isSupportedBrowser = await firebase.messaging.isSupported();
    if (isSupportedBrowser) {
      return firebase.messaging();
    }
    console.log("Firebase not supported this browser");
    return null;
  } catch (err) {
    console.log(err);
    return null;
  }
})();

async function handleBackgroundMessage() {
  const isMessaging = await messaging;
  isMessaging?.onBackgroundMessage(function (payload) {
    console.log("Received background message ", payload);

    const notificationTitle = payload.notification.title;
    const notificationOptions = {
      body: payload.notification.body,
      data: { alarm_id: payload?.data?.alarm_id || "" },
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
  });
}
handleBackgroundMessage();
