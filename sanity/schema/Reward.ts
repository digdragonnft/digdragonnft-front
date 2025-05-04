import { defineField, defineType } from "sanity";

export const rewardType = defineType({
  name: "reward",
  title: "Reward Token",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Reward Name",
      type: "string",
    }),

    defineField({
      name: "address",
      title: "Reward Address",
      type: "string",
    }),

    defineField({
      name: "description",
      title: "Description",
      type: "string",
    }),

    defineField({
      name: "image",
      title: "Thumnail Image, Logo Image or Avatar Image",
      type: "image",
    }),
  ],
});
