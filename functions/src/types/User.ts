import { doc, getDoc, setDoc } from "firebase/firestore";
import { FB_DB } from "../../../firebaseConfig";
import { Profile } from "./Profile";

export class User {
  constructor(
    public uid: string,
    public email: string,
    public name: string,
    public balance: number = 50,
    public profile: Profile = new Profile(name),
    public locations: Map<string, Location> = new Map(),
    public inventory: string[] = [
      "default-hair",
      "default-shirt",
      "default-pants",
      "default-rug",
    ],
  ) {}

  static fromFirestore(raw: any): User {
    const balance = raw.balance ?? 50;
    const defaultInventory = [
      "default-hair",
      "default-shirt",
      "default-pants",
      "default-rug",
    ];
    
    return new User(
      raw.uid,
      raw.email,
      raw.name,
      balance,
      Profile.fromObject(raw.profile),
      new Map(Object.entries(raw.locations ?? {})),
      raw.inventory && raw.inventory.length > 0
        ? raw.inventory
        : defaultInventory,
    );
  }

  toFirestore() {
    return {
      uid: this.uid,
      email: this.email,
      name: this.name,
      balance: this.balance,
      profile: this.profile.serialize(),
      locations: Object.fromEntries(this.locations),
      inventory: this.inventory,
    };
  }
}

export class UserRepo {
  static async load(uid: string): Promise<User | null> {
    const snap = await getDoc(doc(FB_DB, "users", uid));
    if (!snap.exists()) {
      console.error("NO USER DATA FETCHED :(((((");
      return null;
    }

    return User.fromFirestore(snap.data());
  }

  static async save(user: User): Promise<void> {
    await setDoc(doc(FB_DB, "users", user.uid), user.toFirestore());
  }
}