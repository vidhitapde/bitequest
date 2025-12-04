import { createContext, useContext, useState } from "react";
import { User } from "../functions/src/types/User";
import { doc, getDoc } from "firebase/firestore";
import { FB_DB } from "../firebaseConfig";

const UserContext = createContext<{
  user: User | null;
  setUser: (u: User | null) => void;
}>({
  user: null,
  setUser: () => {},
});

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const refreshUser = async () => {
    if (!user?.uid) return;

    const userRef = doc(FB_DB, "users", user.uid);
    const snap = await getDoc(userRef);

    if (snap.exists()) {
      const data = snap.data();
      setUser({ ...user, ...data });
      return data;
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, refreshUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
