import { defineType, defineField } from "sanity";

export const jibjibRewardType = defineType({
  title: "JIBJIBClaimer",
  name: "jibjib",
  type: "document",
  fields: [
    defineField({
      title: "Wallet",
      name: "wallet",
      type: "string",
    }),
    defineField({
      title: "Claiming TokenIds",
      name: "tokenIds",
      type: "string",
    }),
    defineField({
      title: "isApproved",
      name: "approved",
      type: "boolean",
      initialValue: false,
    }),
  ],
});
