import { number, object, string } from "yup";

export default object({
  body: object({
    name: string().required("Name is required"),
    description: string().required("Description is required"),
    price: number().required("Price is required"),
    currency: string().required("Currency is required"),
    stock: number().required("Stock is required"),
    unit: string().required("Unit is required"),
  }),
});
