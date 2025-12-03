import * as functions from "firebase-functions/v1";
import * as admin from "firebase-admin";

import { defaultAvatar } from "../types/Avatar";

import { FB_DB } from "../../../firebaseConfig.js";

export const createUserProfile = functions.auth
  .user()
  .onCreate(async (user) => {
    const userRef = FB_DB.collection("users").doc(user.uid);

    const newUser = {
      email: user.email,
      username: user.displayName,
      coins: 0,
      inventory: [],
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      avatar: defaultAvatar,
    };

    try {
      await userRef.set(newUser);
      console.log(`Created profile for ${user.uid}`);
    } catch (error) {
      console.error("Error creating user profile", error);
    }
  });
