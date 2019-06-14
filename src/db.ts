import { Collection, IS_NOT_NULL, MIN_LENGTH } from "@sugo/mongodb";

export const Cats = new Collection("cats", {
  name: {
    type: "string",
    validations: {
      IS_NOT_NULL,
      MIN_LENGTH: MIN_LENGTH(2)
    }
  }
});
