import { defineField, defineType } from "sanity";

export const nftCollectionType = defineType({
  name: "collection",
  title: "NFT Collection",
  type: "document",
  fields: [
    defineField({
      name: "collectionName",
      title: "Collection Name",
      type: "string",
    }),

    defineField({
      name: "button",
      title: "Button Name",
      type: "string",
    }),

    defineField({
      name: "address",
      title: "NFT Contract Address",
      type: "string",
    }),

    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),

    defineField({
      name: "image",
      title: "Thumnail Image or Logo Image or Avatar Image",
      type: "image",
    }),

    defineField({
      name: "mine",
      title: "Available Mine",
      type: "array",
      of: [{ type: "reference", to: [{ type: "mine" }] }],
    }),

    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "collectionName",
      },
    }),

    defineField({
      name: "active",
      title: "isActive",
      type: "boolean",
      initialValue: true,
    }),
  ],
});
