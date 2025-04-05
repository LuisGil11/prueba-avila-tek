import { object, string } from "yup";

export default object({
  body: object({
    name: string().required(),
    email: string().email("email must be a valid email").required(),
    password: string().required(),
  }),
});
