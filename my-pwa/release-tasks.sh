#!/bin/bash

cat > src/environments/environment.prod.ts <<EOF
export const environment = {
  api: "https://free-sons-backend.herokuapp.com/",
  production: true,
  api_token: "$BACKEND_API_TOKEN",
  firebaseConfig: {
    apiKey: "$FIREBASE_API_TOKEN",
    authDomain: "test-pushnotif-58b2d.firebaseapp.com",
    databaseURL: "https://test-pushnotif-58b2d.firebaseio.com/",
    projectId: "test-pushnotif-58b2d",
    storageBucket: "test-pushnotif-58b2d.appspot.com",
    messagingSenderId: "734454521373",
    appId: "1:734454521373:web:50a48b2d47a0c59206f0f4"
  }
}
EOF
cat > src/environments/environment.ts <<EOF
export const environment = {
  api: "https://free-sons-backend.herokuapp.com/",
  production: true,
  api_token: "$BACKEND_API_TOKEN",
  firebaseConfig: {
    apiKey: "$FIREBASE_API_TOKEN",
    authDomain: "test-pushnotif-58b2d.firebaseapp.com",
    databaseURL: "https://test-pushnotif-58b2d.firebaseio.com/",
    projectId: "test-pushnotif-58b2d",
    storageBucket: "test-pushnotif-58b2d.appspot.com",
    messagingSenderId: "734454521373",
    appId: "1:734454521373:web:50a48b2d47a0c59206f0f4"
  }
}
EOF
cat > src/firebase-config.js <<EOF
const firebaseConfig = {
  apiKey: "$FIREBASE_API_TOKEN",
  authDomain: "test-pushnotif-58b2d.firebaseapp.com",
  databaseURL: "https://test-pushnotif-58b2d.firebaseio.com/",
  projectId: "test-pushnotif-58b2d",
  storageBucket: "test-pushnotif-58b2d.appspot.com",
  messagingSenderId: "734454521373",
  appId: "1:734454521373:web:50a48b2d47a0c59206f0f4"
};
EOF
exit 0