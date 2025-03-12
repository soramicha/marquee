import { signInWithCustomToken } from "firebase/auth";
import { auth as firebaseAuth } from "@/config/firebase-config";

export async function authenticateWithFirebase(customToken) {

  try {
    await signInWithCustomToken(firebaseAuth, customToken);
  } catch (error) {
    console.error("Firebase authentication error:", error);
    throw error;
  }
}