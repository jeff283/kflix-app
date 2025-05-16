import { icons } from '@/constants/icons'
import React from 'react'
import { Image, Text, View } from 'react-native'

const saved = () => {
  return (
      <View className="flex-1  bg-primary px-10">
        <View className="flex justify-center items-center flex-1 flex-col gap-5">
          <Image source={icons.save} className="size-10" tintColor={"#fff"} />
          <Text className="font-semibold text-3xl text-gray-500">Save</Text>
        </View>
      </View>
  )
}

export default saved