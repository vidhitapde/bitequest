import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

import React from "react";

import "../../global.css";

export default function Profile() {
  return (
    <ScrollView className="flex-grow bg-[#EEF9F9] overflow-visible" >
      <View className="mt-20 relative" style={{ alignSelf: 'center' }}>
        <Image 
          source={require('../../assets/images/profile-pic.png')}
        />
        <TouchableOpacity 
          onPress={() => console.log("Edit button pressed")}
          className="absolute top-48 left-44"
        >
          <Image
            source={require("../../assets/images/editButton.png")}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
      <Text className="text-lg mt-4 text-center text-[#723D46] font-balooregular">
        Location:
      </Text>
    <View className="px-12 mt-8 justify-center space-y-3 pb-10">
      <Text className="text-4xl justify-left text-[#723D46] font-balooregular leading-tight" >
        Reviews
      </Text>
      <Image 
        source={require('../../assets/images/reviews.png')}
        style={{ alignSelf: 'center' }}
        resizeMode="contain"
      />
      <Image 
      className="mt-4"
        source={require('../../assets/images/reviews.png')}
        style={{ alignSelf: 'center' }}
        resizeMode="contain"
      />
      <Image 
      className="mt-4"
        source={require('../../assets/images/reviews.png')}
        style={{ alignSelf: 'center' }}
        resizeMode="contain"
      />
      <View className="flex-row justify-end mt-2">
        <Text className="text-lg text-[#723D46] font-balooregular">
          view all →
        </Text>
      </View>
      {/* badges is being cut off how to fix? */}
    
      <View className="flex-grow">
      <Text className="text-4xl mt-10 justify-left text-[#723D46] font-balooregular leading-tight">
        Badges
      </Text>
     </View>
      
     
      <Image 
        source={require('../../assets/images/badges.png')}
        style={{ alignSelf: 'center' }}
      />
       <Image className="mt-4"
        source={require('../../assets/images/badges.png')}
        style={{ alignSelf: 'center' }}
      />
       <Image className="mt-4"
        source={require('../../assets/images/badges.png')}
        style={{ alignSelf: 'center' }}
      />
      <View className="flex-row justify-end mt-2">
        <Text className="text-lg text-[#723D46] font-balooregular">
          view all →
        </Text>
        <Image
          source={require("../../assets/images/badges.png")}
          style={{ alignSelf: "center" }}
        />
        <Image
          className="mt-4"
          source={require("../../assets/images/badges.png")}
          style={{ alignSelf: "center" }}
        />
        <Image
          className="mt-4"
          source={require("../../assets/images/badges.png")}
          style={{ alignSelf: "center" }}
        />
        <View className="flex-row justify-end mt-2">
          <Text className="text-lg text-[#723D46] font-balooregular">
            view all →
          </Text>
        </View>
      </View>
      </View>
    </ScrollView>
  );
}
