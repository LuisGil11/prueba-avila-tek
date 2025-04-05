import { number, object, string } from "yup";

export default object({
  query: object({
    limit: string().optional(),
    offset: string().optional(),
  }),
});
