import { Rule } from "postcss";
import { defineField, defineType } from "sanity";

export const MineType = defineType({
  name: "minedata",
  type: "document",
  title: "Mine Data",
  fields: [
    defineField({
      name: "mineNo",
      title: "Mine Number",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "mineAddress",
      title: "Mine Address",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "startBlock",
      title: "Start Block Number",
      type: "number",
    }),

    defineField({
      name: "endBlock",
      title: "End Block Number",
      type: "number",
    }),

    defineField({
      name: "startTime",
      title: "Start Time",
      type: "datetime",
    }),

    defineField({
      name: "endTime",
      title: "End Time",
      type: "datetime",
    }),

    defineField({
      name: "isActive",
      title: "Is Mining Open ?",
      type: "boolean",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "mineUrl",
      title: "Freecity Mine Url",
      type: "string",
    }),
  ],
});
