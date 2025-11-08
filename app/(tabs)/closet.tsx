import { Image, ScrollView, View } from "react-native";

import React from "react";

import "../../global.css";

export default function Closet() {
  return (
    <ScrollView className="flex-grow bg-[#E9EDC9] overflow-visible" >
        <View className = "flex-row">
            <Image 
                source={require('../../assets/images/closet.png')}
                style={{
                    width:'100%',
                    height:undefined,
                    resizeMode:"contain",
                    marginLeft:-102,
                    aspectRatio:1.1
                }}
            />
            <Image 
                source={require('../../assets/images/window.png')}
                style={{
                    resizeMode:"contain",
                    aspectRatio:1,
                    marginTop:85,
                    marginLeft:-40
                }}
            />
        </View>
        <View className="flex-row justify-center items-center" style = {{width: '100%'}}>
            <Image 
                source={require('../../assets/images/wood.png')}
                style={{
                    width:'100%',
                    height:undefined,
                    resizeMode:"contain",
                    aspectRatio: 1.3,
                    marginTop:-53
                }}
            />
        </View>
    </ScrollView>
    
  );
}
