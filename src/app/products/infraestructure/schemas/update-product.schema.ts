import { number, object, string } from "yup";

export default object({
  params: object({
    id: string().uuid("id must be a valid uuid"),
  }),
  body: object({
    name: string().optional(),
    description: string().optional(),
    price: number().optional(),
    currency: string().optional(),
    stock: number().optional(),
    unit: string().optional(),
  }),
});
