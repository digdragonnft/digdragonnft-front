import { type SchemaTypeDefinition } from "sanity";
import { MineType } from "./schema/Mine";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [MineType],
};
