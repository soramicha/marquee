import { signInWithCustomToken } from "firebase/auth";
import { auth } from "@/config/firebase-config";

export async function authenticateWithFirebase(customToken) {
  try {
    await signInWithCustomToken(auth, customToken);
  } catch (error) {
    console.error("Firebase authentication error:", error);
    throw error;
  }
}