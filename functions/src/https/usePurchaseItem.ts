import { router } from "expo-router";
import { useEffect, useState } from "react";
import { FB_AUTH, FB_DB, GOOGLE } from "../../../firebaseConfig.js";
import { useUser } from "../../../app/appprovider";

import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  increment,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

export default function usePurchaseItem() {
  const { user } = useUser();
  const [shopItems, setItems] = useState<any[]>([]);
  const [inventory, setInventory] = useState<any[]>([]);

  const usersCollection = collection(FB_DB, "users");
  const shopCollection = collection(FB_DB, "shopItems");

  useEffect(() => {
    fetchShopItems();
    fetchInventory();
  }, [user]);

  const fetchShopItems = async () => {
    const data = await getDocs(shopCollection);

    const shopItems = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    setItems(shopItems);
  };

  const fetchInventory = async () => {
    if (user) {
      const clothing = user.profile.closet.clothing || [];
      const decor = user.profile.closet.decor || [];

      const combined = [...clothing, ...decor];

      setInventory(combined);
    } else {
      console.log("No user information found, not logged in");
    }
  };

  const purchaseItem = async (item: any) => {
    if (inventory.includes(item.id)) {
      console.log("Already owned");
      return;
    }

    if (user.balance < item.price) {
      console.log("Not enough coins");
      alert("Not enough coins!");
      return;
    }

    const userRef = doc(usersCollection, user.email);

    // update inventory in firestore
    await updateDoc(userRef, {
      balance: increment(-item.price),
      inventory: [...inventory, item.id],
    });

    console.log(user.balance)
    console.log(item.price)
    user.balance -= item.price;
    setInventory((prev) => [...prev, item.id]);

    console.log(`Purchased: ${item.id}`);
  };

  return {
    shopItems,
    inventory,
    purchaseItem,
  };
}
