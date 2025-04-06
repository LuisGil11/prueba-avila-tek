import { object, string } from "yup";

export default object({
  params: object({
    id: string().uuid("id must be a valid uuid"),
  }),
  body: object({
    status: string()
      .required("status is required")
      .oneOf(["ORDERED", "PAID", "PROCESSING", "SHIPPED", "DELIVERED"]),
  }),
});
