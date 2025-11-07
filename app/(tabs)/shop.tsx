import { Image, ScrollView, View } from "react-native";

import React from "react";

import "../../global.css";

export default function ShopScreen() {
  return (
    <ScrollView className="flex-grow bg-[#D4A373] overflow-visible" >
      <View className ="self-center" style = {{width: '200%'}}>
        <Image
        source = {require("../../assets/images/top.png")}
        style = {{
          width:'100%',
          height:undefined,
          resizeMode: 'contain',
          aspectRatio: 3.27,
        }}
        />
      </View>
    <View className="flex-row items-center justify-center mt-12">
      <Image 
        source={require('../../assets/images/shopitem.png')}
        resizeMode="contain"
      />
      <Image 
      className="ml-4"
        source={require('../../assets/images/shopitem.png')}
        resizeMode="contain"
      />
      <Image 
      className="ml-4"
        source={require('../../assets/images/shopitem.png')}
        resizeMode="contain"
      />
    </View>

    <View className="flex-row items-center justify-center mt-11">
      <Image 
        source={require('../../assets/images/shopitem.png')}
        resizeMode="contain"
      />
      <Image 
      className="ml-4"
        source={require('../../assets/images/shopitem.png')}
        resizeMode="contain"
      />
      <Image 
      className="ml-4"
        source={require('../../assets/images/shopitem.png')}
        resizeMode="contain"
      />
    </View> 
    
    </ScrollView>
  );
}
