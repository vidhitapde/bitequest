import { Image, ScrollView, View, Text, TouchableOpacity } from "react-native";
import { imageMap } from "@/data/shopItem";
import { useRouter } from "expo-router";

import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { FB_AUTH } from "@/firebaseConfig";
import { FB_DB } from "@/firebaseConfig";

import usePurchaseItem from "@/functions/src/https/usePurchaseItem";

import "../../global.css";

export interface ShopItem {
  category: "clothing" | "decor" | "hair";
  id: string;
  name: string;
  price: number;
  image: string;
  type?: string;
  scale?: number;
}

export default function ShopScreen() {
  const [items, setItems] = useState<any>([]);
  const shopCollection = collection(FB_DB, "shopItems");
  const { shopItems, inventory, purchaseItem } = usePurchaseItem();
  const router = useRouter();

  useEffect(() => {
    fetchShopItems();
  }, []);

  const fetchShopItems = async () => {
    const data = await getDocs(shopCollection);

    const shopItems = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    setItems(shopItems);
  };

  return (
    <ScrollView className="flex-grow bg-[#D4A373] overflow-visible">
      <View className="self-center items-center" style={{ width: "100%" }}>
        <Image
          source={require("../../assets/images/top.png")}
          style={{
            width: "200%",
            height: undefined,
            resizeMode: "contain",
            aspectRatio: 3.27,
          }}
        />
        <View
          style={{
            marginTop: 36,
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
            padding: 6,
          }}
        >
          {items.map((item: ShopItem) => (
            <View
              key={item.name}
              style={{
                width: "32%", // roughly 3 items per row
                marginBottom: 24,
                backgroundColor: "#FAEDCD",
                borderWidth: 2,
                borderColor: "#723D46",
                borderRadius: 12,
                alignItems: "center",
                padding: 8,
              }}
            >
              <TouchableOpacity
                disabled={inventory.includes(item.id)}
                onPress={() => {
                  purchaseItem(item);
                  router.push("/(tabs)/shop");
                }}
              >
                <Image
                  source={imageMap[item.id]}
                  style={{
                    width: "100%",
                    height: undefined,
                    aspectRatio: 1,
                    resizeMode: "contain",
                  }}
                />
                <Text className="text-xl font-bold text-center">
                  {item.name}
                </Text>
                <Text className="text-lg tect-center">{item.price} coins</Text>
                {inventory.includes(item.id) && (
                  <Text style={{ color: "green" }}>Owned</Text>
                )}
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}
