const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc, getDocs } = require('firebase/firestore');
require('dotenv').config();

// Firebase configuration
const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function testFirestore() {
    try {
        // Add a test document
        const docRef = await addDoc(collection(db, 'testCollection'), {
            name: 'Test User',
            email: 'testuser@example.com'
        });
        console.log("Document written with ID: ", docRef.id);

        // Retrieve documents from the collection
        const querySnapshot = await getDocs(collection(db, 'testCollection'));
        querySnapshot.forEach((doc) => {
            console.log(`Document ID: ${doc.id}, Data: `, doc.data());
        });
    } catch (error) {
        console.error("Error connecting to Firestore:", error);
    }
}

testFirestore();
