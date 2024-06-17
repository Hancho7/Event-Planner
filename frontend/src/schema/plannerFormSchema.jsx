// src/schema/plannerFormSchema.js

import * as Yup from "yup";

const FILE_SIZE = 1024 * 1024; // 1MB
const SUPPORTED_IMAGE_FORMATS = ["image/jpg", "image/jpeg", "image/png"];
const SUPPORTED_ATTACHMENT_FORMATS = [
  ...SUPPORTED_IMAGE_FORMATS,
  "application/pdf",
];

const plannerFormSchema = Yup.object().shape({
  name: Yup.string().required("Full Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  phone: Yup.string()
    .matches(/^\+?\d{10,15}$/, "Phone number is not valid")
    .required("Phone number is required"),
  experience: Yup.string().required("Experience is required"),
  profilePicture: Yup.mixed()
    .required("Profile picture is required")
    .test(
      "fileSize",
      "File too large",
      (value) => !value || (value && value.size <= FILE_SIZE)
    )
    .test(
      "fileFormat",
      "Unsupported Format",
      (value) =>
        !value || (value && SUPPORTED_IMAGE_FORMATS.includes(value.type))
    ),
  attachment: Yup.mixed()
    .required("Attachment is required")
    .test(
      "fileSize",
      "File too large",
      (value) => !value || (value && value.size <= FILE_SIZE)
    )
    .test(
      "fileFormat",
      "Unsupported Format",
      (value) =>
        !value || (value && SUPPORTED_ATTACHMENT_FORMATS.includes(value.type))
    ),
});

export default plannerFormSchema;
