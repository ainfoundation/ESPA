import { initializeApp, FirebaseApp } from "firebase/app";
import { getFirestore, Firestore } from "firebase/firestore";
import { getAuth, Auth } from "firebase/auth";

let app: FirebaseApp;
let db: Firestore;
let auth: Auth;

export const initFirebase = async () => {
    if (app) return { app, db, auth };
    try {
        const response = await fetch('/__firebase/config');
        if (!response.ok) {
            throw new Error('Failed to fetch Firebase config');
        }
        const config = await response.json();
        app = initializeApp(config);
        db = getFirestore(app);
        auth = getAuth(app);
        return { app, db, auth };
    } catch (error) {
        console.error("Error initializing Firebase:", error);
        throw error;
    }
};

export { app, db, auth };
