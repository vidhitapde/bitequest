import "../global.css"
import { View } from "react-native";
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { Textarea } from "@/components/ui/textarea"
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';

 
export default function LogIn() {
  return (
    <View className = "flex-1 bg-[#FEFAE0]">
        <View className="mt-20 w-5/6 mx-auto">
            <View className="flex-row items-center mx-auto border-b-2 py-6 border-[#723D46]">
                <MaterialIcons name="restaurant" size={36} color="black" className="bg-blue-400 p-4 text-center rounded-full w-fit" />
                <Text className="ml-10 text-3xl font-baloo2 text-[#723D46]">Restaurant name</Text>
            </View>
            <Text className="text-center font-baloo2 text-2xl mt-8 mb-2">Leave a rating</Text>
            <View className="flex-row justify-center gap-4">
                <AntDesign name="star" size={26} color="gray" />
                <AntDesign name="star" size={26} color="gray" />
                <AntDesign name="star" size={26} color="gray" />
                <AntDesign name="star" size={26} color="gray" />
                <AntDesign name="star" size={26} color="gray" />
            </View>
            <Text className="text-center font-baloo2 text-2xl mt-12 mb-2">Write a review</Text>
            <Textarea
                placeholder="Type your review here..."
                numberOfLines={8}
                className="border-2 border-gray-400 bg-white rounded-md p-2"
            />
            <Button>
                <Text className ="bg-[#723D46] m-6 mt-12 text-xl text-[#FEFAE0] p-2 px-10 rounded-full">Post</Text>
            </Button>
        </View>
    </View>
  );
}