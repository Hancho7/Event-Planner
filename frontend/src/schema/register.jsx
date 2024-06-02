import { object, string, ref } from "yup";

const userSchema = object({
  username: string()
    .required("Username is required")
    .min(6, "Username must be at least 6 characters")
    .matches(
      /^[a-zA-Z_]+$/,
      "Username can only contain letters, and underscores"
    ),

  phoneNumber: string()
    .required("Phone number is required")
    .matches(/^[0-9]{10}$/, "Phone number must be  10"),

  email: string().email("Invalid email format").required("Email is required"),

  password: string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character"
    ),

  confirmPassword: string()
    .required("You need to confirm your password")
    .oneOf([ref("password"), null], "Passwords must match"),
});

export default userSchema;
