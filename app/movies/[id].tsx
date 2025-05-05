import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

const MovieDetails = () => {
  const { id } = useLocalSearchParams();
  return (
    <View className="flex-1 items-center justify-center ">
      <Text className="font-semibold text-3xl text-primary">
        MovieDetails: {id}
      </Text>
    </View>
  );
};

export default MovieDetails;
