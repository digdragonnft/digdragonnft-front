import { defineField, defineType } from "sanity";

export const MineType = defineType({
  name: "minedata",
  type: "document",
  title: "Mine Data",
  fields: [
    defineField({
      name: "pair",
      title: "Mine Pairs",
      type: "string",
    }),

    defineField({
      name: "rewardImage",
      title: "Reward Image",
      type: "image",
    }),

    defineField({
      name: "nftImage",
      title: "Nft Image",
      type: "image",
    }),

    defineField({
      name: "mineAddress",
      title: "Mine Address",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "nftAddress",
      title: "NFT address",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "mineDescription",
      title: "Mine Description",
      type: "string",
    }),

    defineField({
      name: "isActive",
      title: "Is Mining Open ?",
      type: "boolean",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "pair",
      },
    }),
  ],
});
