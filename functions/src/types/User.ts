import { doc, getDoc, setDoc } from "firebase/firestore";
import { FB_DB } from "../../../firebaseConfig";
import { Closet } from "./Closet";
import { Clothing } from "./Clothing";
import { Decor } from "./Decor";
import { Profile } from "./Profile";

export class User {
  constructor(
    public uid: string,
    public email: string,
    public name: string,
    public balance: number = 0,
    public profile: Profile = new Profile(name),
    public ownedClothing: Map<string, Clothing> = new Map(),
    public ownedDecor: Map<string, Decor> = new Map(),
    public closet: Closet = { clothing: [], decor: []},
    public locations: Map<string, Location> = new Map(),
  ) {}

  static fromFirestore(raw: any): User {
    return new User(
      raw.uid,
      raw.email,
      raw.name,
      raw.balance,
      Profile.fromObject(raw.profile),
      new Map(Object.entries(raw.ownedClothing ?? {})),
      new Map(Object.entries(raw.ownedDecor ?? {})),
      raw.closet,
      new Map(Object.entries(raw.locations ?? {})),
    )
  }

  toFirestore() {
    return {
      uid: this.uid,
      email: this.email,
      name: this.name,
      balance: this.balance,
      profile: this.profile.serialize(),
      ownedClothing: Object.fromEntries(this.ownedClothing),
      ownedDecor: Object.fromEntries(this.ownedDecor),
      closet: this.closet,
      locations: Object.fromEntries(this.locations),
    }
  }
}

export class UserRepo {
  static async load(uid: string): Promise<User | null> {
    const snap = await getDoc(doc(FB_DB, "users", uid));
    if (!snap.exists()) return null;

    return User.fromFirestore(snap.data());
  }

  static async save(user: User): Promise<void> {
    await setDoc(doc(FB_DB, "users", user.email), user.toFirestore());
  }
}