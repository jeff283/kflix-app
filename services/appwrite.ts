import { Client, Databases, ID, Query } from "react-native-appwrite";

// Appwrite configuration
const APPWRITE_PROJECT_ID = process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!;
const APPWRITE_ENDPOINT = process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!;
const APPWRITE_PLATFORM = process.env.EXPO_PUBLIC_APPWRITE_PLATFORM!;

const DB_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!;

const client = new Client()
  .setEndpoint(APPWRITE_ENDPOINT)
  .setProject(APPWRITE_PROJECT_ID)
  .setPlatform(APPWRITE_PLATFORM);

// Initialize the database
const database = new Databases(client);

// track searches made by a user
export const updateSearchCount = async (query: string, movie: Movie) => {
  if (!query || !movie) {
    console.error("Query or movie is undefined");
    return;
  }
  try {
    const results = await database.listDocuments(DB_ID, COLLECTION_ID, [
      Query.equal("searchTerm", query),
    ]);

    // console.log(results);

    if (results.documents.length > 0) {
      const exisitingMovie = results.documents[0];

      await database.updateDocument(
        DB_ID,
         COLLECTION_ID,
          exisitingMovie.$id, 
          {
          count: exisitingMovie.count + 1,
          }
    );
    } else {
      await database.createDocument(DB_ID, COLLECTION_ID, ID.unique(), {
        searchTerm: query,
        count: 1,
        poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        movie_id: movie.id,
        title: movie.title,
      });
    }
  } catch (error) {
    console.error("Error updating search count:", error);
    throw error;
  }
};
