// src/components/PlannerForm.js

import React from "react";
import { useFormik } from "formik";
import plannerFormSchema from "../schema/plannerFormSchema";

const PlannerForm = ({ onClose }) => {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      experience: "",
      profilePicture: null,
      attachment: null,
    },
    validationSchema: plannerFormSchema,
    onSubmit: (values) => {
      console.log("Form data", values);
      // Handle form submission
      onClose();
    },
  });

  const handleFileChange = (event, fieldName) => {
    const file = event.currentTarget.files[0];
    formik.setFieldValue(fieldName, file);
  };

  return (
    <div className="bg-gray-800 text-white p-4 rounded-md shadow-md mx-auto max-w-xl mt-4">
      <h2 className="text-lg text-center font-semibold mb-4">
        Become a Planner
      </h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-300"
          >
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="mt-1 block text-black w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            {...formik.getFieldProps("name")}
          />
          {formik.touched.name && formik.errors.name ? (
            <div className="text-red-500 text-sm">{formik.errors.name}</div>
          ) : null}
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-300"
          >
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="mt-1 block text-black w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            {...formik.getFieldProps("email")}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="text-red-500 text-sm">{formik.errors.email}</div>
          ) : null}
        </div>
        <div className="mb-4">
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-300"
          >
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            className="mt-1 block text-black w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            {...formik.getFieldProps("phone")}
          />
          {formik.touched.phone && formik.errors.phone ? (
            <div className="text-red-500 text-sm">{formik.errors.phone}</div>
          ) : null}
        </div>
        <div className="mb-4">
          <label
            htmlFor="experience"
            className="block text-sm font-medium text-gray-300"
          >
            Experience
          </label>
          <textarea
            id="experience"
            name="experience"
            rows="3"
            className="mt-1 block text-black w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            {...formik.getFieldProps("experience")}
          ></textarea>
          {formik.touched.experience && formik.errors.experience ? (
            <div className="text-red-500 text-sm">
              {formik.errors.experience}
            </div>
          ) : null}
        </div>
        <div className="mb-4">
          <label
            htmlFor="profilePicture"
            className="block text-sm font-medium text-gray-300"
          >
            Profile Picture
          </label>
          <input
            type="file"
            id="profilePicture"
            name="profilePicture"
            accept="image/*"
            className="mt-1 block w-full text-white"
            onChange={(event) => handleFileChange(event, "profilePicture")}
          />
          {formik.touched.profilePicture && formik.errors.profilePicture ? (
            <div className="text-red-500 text-sm">
              {formik.errors.profilePicture}
            </div>
          ) : null}
        </div>
        <div className="mb-4">
          <label
            htmlFor="attachment"
            className="block text-sm font-medium text-gray-300"
          >
            Attachment (Resume or Portfolio)
          </label>
          <input
            type="file"
            id="attachment"
            name="attachment"
            accept=".pdf, image/*"
            className="mt-1 block w-full text-white"
            onChange={(event) => handleFileChange(event, "attachment")}
          />
          {formik.touched.attachment && formik.errors.attachment ? (
            <div className="text-red-500 text-sm">
              {formik.errors.attachment}
            </div>
          ) : null}
        </div>
        <div className="flex justify-between items-center">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Submit
          </button>
          <button
            type="button"
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </form>
    </div>
  );
};

export default PlannerForm;
