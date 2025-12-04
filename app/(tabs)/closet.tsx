import { Image, ScrollView, View, TouchableOpacity, Text } from "react-native";
import React, { useState, useEffect } from "react";
import { imageMap } from "@/data/closet";

import usePurchaseItem from "@/functions/src/https/usePurchaseItem";

import "../../global.css";

export default function Closet() {
  const { inventory } = usePurchaseItem();

  return (
    <View className="bg-[#E9EDC9]">
      <View className="flex-row">
        <Image
          source={require("../../assets/images/closet.png")}
          style={{
            width: "100%",
            height: undefined,
            resizeMode: "contain",
            marginLeft: -102,
            aspectRatio: 1.1,
          }}
        />
        <Image
          source={require("../../assets/images/window.png")}
          style={{
            resizeMode: "contain",
            aspectRatio: 1,
            marginTop: 85,
            marginLeft: -40,
          }}
        />
      </View>
      <View className="" style={{ width: "100%" }}>
        <Image
          source={require("../../assets/images/wood.png")}
          style={{
            width: "100%",
            height: undefined,
            resizeMode: "contain",
            aspectRatio: 1.8,
            marginTop: -16,
            marginBottom: -12,
          }}
        />
        <Image
          source={require("../../assets/decor/default-rug.png")}
          style={{
            marginTop: -160,
            width: "70%",
            height: undefined,
            resizeMode: "contain",
            aspectRatio: 1,
            position: "absolute",
            left: 56,
            top: 126,
          }}
        />
        <Image
          source={require("../../assets/avatar/hair/default-hair.png")}
          style={{
            marginTop: -160,
            width: "61%",
            height: undefined,
            resizeMode: "contain",
            aspectRatio: 1,
            position: "absolute",
            left: 74,
            top: -105,
          }}
        />
        <Image
          source={require("../../assets/avatar/body.png")}
          style={{
            marginTop: -160,
            width: "100%",
            height: undefined,
            resizeMode: "contain",
            aspectRatio: 1.4,
            position: "absolute",
          }}
        />
        <Image
          source={require("../../assets/avatar/clothes/default-shirt.png")}
          style={{
            marginTop: -160,
            width: "39%",
            height: undefined,
            resizeMode: "contain",
            aspectRatio: 1,
            position: "absolute",
            left: 118,
            top: 83,
          }}
        />
        <Image
          source={require("../../assets/avatar/clothes/default-pants.png")}
          style={{
            marginTop: -160,
            width: "30%",
            height: undefined,
            resizeMode: "contain",
            aspectRatio: 1,
            position: "absolute",
            left: 136,
            top: 178,
          }}
        />
      </View>
      <ScrollView
        className="bg-[#C0D6DF]"
        contentContainerStyle={{ paddingBottom: 550 }}
        alwaysBounceVertical={true}
      >
        <View
          style={{
            marginTop: 24,
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
            padding: 6,
          }}
        >
          {inventory.map((id: string) => (
            <View
              key={id}
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
              <TouchableOpacity>
                <Image
                  source={imageMap[id]}
                  style={{
                    width: "100%",
                    height: undefined,
                    aspectRatio: 1,
                    resizeMode: "contain",
                  }}
                />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
