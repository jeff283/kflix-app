import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
import useFetch from "@/services/useFetch";
import { useRouter } from "expo-router";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  Text,
  View,
} from "react-native";

export default function Index() {
  const router = useRouter();

  const onPress = () => {
    router.push("/search");
  };

  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
  } = useFetch(() =>
    fetchMovies({
      query: "",
    })
  );

  return (
    <View className="flex-1 bg-primary ">
      <Image source={images.bg} className=" absolute w-full z-0" />

      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          minHeight: "100%",
          paddingBottom: 10,
        }}
      >
        {/* Logo */}
        <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />

        {/* Movies List */}

        {moviesLoading ? (
          <ActivityIndicator
            size="large"
            color="#0000ff"
            className="mt-10 self-center"
          />
        ) : moviesError ? (
          <Text> Error: {moviesError.message}</Text>
        ) : (
          <View className=" flex-1 mt-5 ">
            {/* Search Bar */}
            <SearchBar onPress={onPress} placeholder="Search for a movie" />

            <>
              <Text className="text-lg text-white font-bold mt-5 mb-3">
                Latest Movies{" "}
              </Text>
            </>

            <FlatList
              data={movies}
              keyExtractor={(item) => item.id.toString()}
              numColumns={3}
              scrollEnabled={false}
              className="mt-2 pb-32"
              columnWrapperStyle={{
                justifyContent: "flex-start",
                marginBottom: 10,
                paddingRight: 5,
                gap: 20,
              }}
              renderItem={({ item }) => (
                <Text className="text-white text-sm">{item.title}</Text>
              )}
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
}
