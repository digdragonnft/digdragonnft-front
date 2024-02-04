import { defineField, defineType } from "sanity";

export const MineType = defineType({
  name: "mine",
  type: "document",
  title: "Mine Data",
  fields: [
    defineField({
      name: "name",
      title: "Mine Pairs",
      type: "string",
    }),

    defineField({
      name: "address",
      title: "Mine Contract Address",
      type: "string",
    }),

    defineField({
      name: "image",
      title: "Thumbnail Image or Logo Image or Avatar Image",
      type: "image",
    }),

    defineField({
      name: "description",
      title: "Description",
      type: "string",
    }),

    defineField({
      name: "specialFunctions",
      title: "Sepecial Functons List",
      type: "array",
      of: [{ type: "string" }],
    }),

    defineField({
      name: "nfts",
      title: "Available NFT of this mine",
      type: "array",
      of: [{ type: "reference", to: [{ type: "collection" }] }],
    }),

    defineField({
      name: "rewards",
      title: "Rewards Tokens",
      type: "array",
      of: [{ type: "reference", to: [{ type: "reward" }] }],
    }),

    defineField({
      name: "isActive",
      title: "Is Mining Open ?",
      type: "boolean",
      validation: (Rule) => Rule.required(),
    }),
  ],
});
