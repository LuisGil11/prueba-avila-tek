import { array, number, object, string } from "yup";

export default object({
  body: object({
    items: array(
      object({
        id: string()
          .uuid("id must be a valid uuid")
          .required("Item id is required"),
        quantity: number()
          .integer("Quantity must be an integer")
          .required()
          .min(1, "Quantity must be greater than 0"),
      })
    ),
    currency: string().oneOf(["Bs", "USD", "EUR"]).optional(),
    status: string().oneOf(["ORDERED", "PAID"]).optional(),
  }),
});
