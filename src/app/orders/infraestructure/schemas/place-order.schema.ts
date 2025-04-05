import { array, number, object, string } from "yup";

export default object({
  body: object({
    items: array(
      object({
        id: string()
          .uuid("id must be a valid uuid")
          .required("Item id is required"),
        quantity: number().integer("Quantity must be an integer").required(),
      })
    ),
    currency: string().oneOf(["Bs", "USD", "EUR"]).optional(),
  }),
});
