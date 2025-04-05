import { object, string } from "yup";

export default object({
  body: object({
    email: string().email("email must be a valid email").required(),
    password: string().required(),
  }),
});
