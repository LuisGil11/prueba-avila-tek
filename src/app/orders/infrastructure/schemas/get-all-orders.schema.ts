import { number, object, string } from "yup";

export default object({
  query: object({
    limit: number().optional().typeError("limit must be a number"),
    offset: number().optional().typeError("offset must be a number"),
    status: string()
      .optional()
      .typeError("status must be a string")
      .oneOf(["PAID", "PROCESSING", "SHIPPED", "DELIVERED"]),
  }),
});
