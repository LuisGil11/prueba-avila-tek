import { number, object } from "yup";

export default object({
  query: object({
    limit: number().optional().typeError("limit must be a number"),
    offset: number().optional().typeError("offset must be a number"),
  }),
});
