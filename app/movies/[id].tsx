import { icons } from "@/constants/icons";
import { fetchMovieDetails } from "@/services/api";
import useFetch from "@/services/useFetch";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

const MovieDetails = () => {
  const { id } = useLocalSearchParams();

  const {
    data: movie,
    loading,
    error,
  } = useFetch(() => fetchMovieDetails(id as string));

  // const movie:Movie = {} as Movie;
  return (
    <View className="bg-primary flex-1">
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        <View>
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500/${movie?.poster_path}`,
            }}
            className="w-full h-[550px]"
            resizeMode="stretch"
          />

          <View className="flex-col items-start justify-center mt-5 px-5">
            {/* Title */}
            <Text className="text-white text-xl font-bold">{movie?.title}</Text>

            {/* Date and Runtime */}
            <View className="flex-row items-center gap-x-1 mt-2">
              <Text className="text-light-200 text-sm">
                {movie?.release_date?.split("-")[0]}
              </Text>
              <Text className="text-light-200 text-sm">
                {movie?.runtime} min
              </Text>
            </View>

            {/* Rating */}
            <View className="flex-row items-center bg-dark-100 px-2 py-1 rounded-md gap-x- mt-2">
              <Image source={icons.star} className="size-4" />
              <Text className="text-white font-bold text-sm">
                {Math.round(movie?.vote_average ?? 0)}/10
              </Text>
              <Text className="text-light-200 text-sm">
                ({movie?.vote_count} votes)
              </Text>
            </View>

            {/* Overview */}
            <MovieInfo label="Overview" value={movie?.overview} />
            {/* Genres */}
            <MovieInfo
              label="Genres"
              value={movie?.genres?.map((g) => g.name).join(", ") || "N/A"}
            />

            {/* Money */}
            <View className="flex flex-row justify-between w-1/2">
              {/* Budget */}
              <MovieInfo
                label="Budget"
                value={`${((movie?.budget ?? 0) / 1_000_000).toLocaleString(
                  "en-US",
                  {
                    style: "currency",
                    currency: "USD",
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 2,
                  }
                )} million`}
              />
              {/* Revenue */}
              <MovieInfo
                label="Revenue"
                value={`${((movie?.revenue ?? 0) / 1_000_000).toLocaleString(
                  "en-US",
                  {
                    style: "currency",
                    currency: "USD",
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 2,
                  }
                )} million`}
              />
            </View>

            {/* Production Companies */}
            <MovieInfo
              label="Production Companies"
              value={
                movie?.production_companies
                  ?.map((company) => company.name)
                  .join(", ") || "N/A"
              }
            />
          </View>
        </View>
      </ScrollView>
      {/* Back Button */}
      <TouchableOpacity className="absolute bottom-5 left-0 right-0 mx-5 bg-accent rounded-lg py-3.5 flex flex-row items-center justify-center"
      onPress={router.back}
      >
        <Image
          source={icons.arrow}
          className="size-5 mr-1 mt-0.5 rotate-180"
          tintColor={"#fff"}
        />
        <Text className="text-white font-semibold">Go Back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MovieDetails;

interface MovieInfoProps {
  label: string;
  value?: string | number | null;
}

const MovieInfo = ({ label, value }: MovieInfoProps) => (
  <View className="flex-col items-start justify-center mt-5">
    <Text className="text-light-200 font-normal text-sm">{label}</Text>
    <Text className="text-light-100 font-bold text-sm">{value || "N/A"}</Text>
  </View>
);
