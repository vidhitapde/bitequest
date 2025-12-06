import { getDoc, setDoc } from "firebase/firestore";
import { User, UserRepo } from "../functions/src/types/User";

jest.mock("firebase/firestore", () => ({
  getDoc: jest.fn(),
  doc: jest.fn().mockReturnValue({}),
  setDoc: jest.fn(),
}));

jest.mock("../firebaseConfig.js", () => ({
  FB_DB: {},
}));

describe("User Class", () => {
  test("create a user with correct params", () => {
    const userData = {
      uid: "user1",
      email: "user@email.com",
      name: "username",
    };

    const user = new User(userData.uid, userData.email, userData.name);

    expect(user.uid).toBe(userData.uid);
    expect(user.email).toBe(userData.email);
    expect(user.name).toEqual(userData.name);
  });

  test("fromFirestore uses default inventory when missing", () => {
    const rawData = {
      uid: "user1",
      email: "user@email.com",
      name: "username",
      profile: {
        displayName: "username",
        avatar: {},
        reviews: [],
      },
    };

    const user = User.fromFirestore(rawData);

    expect(user.inventory).toEqual([
      "default-hair",
      "default-shirt",
      "default-pants",
      "default-rug",
    ]);
  });

  test("toFirestore returns correct object", () => {
    const userData = {
      uid: "user1",
      email: "user@email.com",
      name: "username",
    };

    const user = new User(userData.uid, userData.email, userData.name);
    const firestoreData = user.toFirestore();

    expect(firestoreData.uid).toBe(userData.uid);
    expect(firestoreData.email).toBe(userData.email);
    expect(firestoreData.name).toBe(userData.name);
  });

  test("error when loading non-existent user", async () => {
    (getDoc as jest.Mock).mockResolvedValue({
      exists: () => false,
    });

    const user = await UserRepo.load("notUid");
    expect(user).toBeNull();
  });

  test("saves user to firestore", async () => {
    (setDoc as jest.Mock).mockResolvedValue(undefined);

    const userData = {
      uid: "user1",
      email: "user@email.com",
      name: "username",
    };

    const user = new User(userData.uid, userData.email, userData.name);
    const firestoreData = user.toFirestore();

    await UserRepo.save(user);

    expect(setDoc).toHaveBeenCalledWith(expect.anything(), firestoreData);
  });
});
