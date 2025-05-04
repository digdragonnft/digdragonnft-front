import { groq } from "next-sanity";
import { client } from "../client";

export const getCollections = async () => {
  try {
    const query = groq`*[_type == "collection"]`;
    const collections = await client.fetch(query);
    return collections as any[];
  } catch (error) {
    console.log(error);
    return [];
  }
};
