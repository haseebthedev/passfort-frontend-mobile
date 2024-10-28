import * as yup from "yup";

export const signupValidationSchema = yup.object().shape({
  name: yup.string().min(3).required("Name is required!").label("Name"),
  email: yup.string().required("Email address is required!").email("Please enter a valid email").label("Email"),
  password: yup
    .string()
    .required("Password is required!")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, and a  Number "
    )
    .min(8)
    .label("Password"),
});

export const signinValidationSchema = yup.object().shape({
  email: yup.string().required("Email address is required!").email("Please enter a valid email").label("Email Address"),
  password: yup
    .string()
    .required("Password is required!")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, and a Number "
    )
    .min(8)
    .label("Password"),
});

export const editProfileValidationSchema = yup.object().shape({
  name: yup.string().min(3).required("Name is required!").label("Name"),
  email: yup.string().required("Email address is required!").email("Please enter a valid email").label("Email Address"),
  phoneNumber: yup
    .string()
    .optional()
    .required("Phone number is required!")
    .matches(
      /^\+?[\d\s()-]{7,15}$/,
      "Phone number must be between 7 and 15 digits, and can include spaces, dashes, or parentheses."
    )
    .label("Phone Number"),
});
