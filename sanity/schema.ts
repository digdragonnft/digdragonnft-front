import { type SchemaTypeDefinition } from "sanity";
import { MineType } from "./schema/Mine";
import { nftCollectionType } from "./schema/NFTCollection";
import { rewardType } from "./schema/Reward";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [MineType, nftCollectionType, rewardType],
};
