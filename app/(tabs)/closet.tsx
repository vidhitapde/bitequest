import { Image, ScrollView, View, TouchableOpacity, Text } from "react-native";
import React, { useState, useEffect } from "react";
import { imageMap } from "@/data/closet";

import usePurchaseItem from "@/functions/src/https/usePurchaseItem";

import "../../global.css";

export default function Closet() {
  const { inventory } = usePurchaseItem();
  const [selectedHair, setSelectedHair] = useState("default-hair");
  const [selectedShirt, setSelectedShirt] = useState("default-shirt");
  const [selectedPants, setSelectedPants] = useState("default-pants");
  const [selectedRug, setSelectedRug] = useState("default-rug");

  // decide which setter to call
  const handleEquip = (id: string) => {
    if (id.includes("hair")) setSelectedHair(id);
    else if (id.includes("shirt")) setSelectedShirt(id);
    else if (id.includes("pants")) setSelectedPants(id);
    else if (id.includes("rug")) setSelectedRug(id);
  };

  const hairImage = imageMap[selectedHair];
  const shirtImage = imageMap[selectedShirt];
  const pantsImage = imageMap[selectedPants];
  const rugImage = imageMap[selectedRug];

  return (
    <View className="bg-[#E9EDC9]">
      <View className="flex-row">
        <Image
          source={require("../../assets/images/closet.png")}
          style={{
            width: "100%",
            height: undefined,
            resizeMode: "contain",
            marginLeft: -110,
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
      <Image
        source={require("../../assets/images/wood.png")}
        style={{
          width: "100%",
          marginTop: -8,
          height: undefined,
          resizeMode: "contain",
          aspectRatio: 1.99,
        }}
      />
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
              <TouchableOpacity onPress={() => handleEquip(id)}>
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
      <View
        style={{
          marginTop: -970,
          width: 380,
          height: 600,
          position: "relative",
          alignSelf: "center",
        }}
      >
        <Image
          source={rugImage}
          style={{
            width: "70%",
            height: undefined,
            resizeMode: "contain",
            aspectRatio: 1,
            position: "absolute",
            top: "-5%",
            left: "14%",
          }}
        />
        <Image
          source={hairImage}
          style={{
            width: "61%",
            height: undefined,
            resizeMode: "contain",
            aspectRatio: 1,
            position: "absolute",
            top: "-45%",
            left: "19%",
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
          source={shirtImage}
          style={{
            width: "39%",
            height: undefined,
            resizeMode: "contain",
            aspectRatio: 1,
            position: "absolute",
            top: "-13.3%",
            left: "30%",
          }}
        />
        <Image
          source={pantsImage}
          style={{
            marginTop: -160,
            width: "30%",
            height: undefined,
            resizeMode: "contain",
            aspectRatio: 1,
            position: "absolute",
            top: "28.7%",
            left: "34.5%",
          }}
        />
      </View>
    </View>
  );
}
