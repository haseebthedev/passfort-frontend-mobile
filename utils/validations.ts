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
  DOB: yup
    .date()
    .nullable()
    .max(new Date(), "Date of Birth cannot be in the future")
    .optional()
    .typeError("Invalid date format (YYYY-MM-DD)"),
  country: yup.string().min(3).optional().label("Country"),
});

export const createPasswordValidationSchema = yup.object().shape({
  type: yup.object().shape({
    id: yup.string().required("Please select a type.").label("Type"),
  }),
  platform: yup.string().optional().min(3).label("Platform"),
  siteAddress: yup
    .string()
    .required("Site Address is required!")
    .url("Please enter a valid URL starting with http:// or https://")
    .label("Site Address"),
  email: yup.string().optional().label("Email Address"),
  passwordText: yup
    .string()
    .required("Password is required!")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, and a Number "
    )
    .min(8)
    .label("passwordText"),
});

export const forgotPasswordValidation = yup.object().shape({
  email: yup.string().required("Email is required!").email(),
});

export const newPasswordValidation = yup.object().shape({
  newPassword: yup.string().required("New Password is required!").min(8, "Minimum 8 characters"),
  confirmPassword: yup
    .string()
    .equals([yup.ref("newPassword"), null], "Passwords does not match!")
    .required("Confirm new password is required!"),
});
