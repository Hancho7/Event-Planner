import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { updatePasswordAction } from "../features/auth/updatePassword";
import { useEffect, useState } from "react";

const UpdatePassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userID, tokenLink } = useParams();
  const { loading, success, error } = useSelector(
    (state) => state.updatePassword
  );
  const [confirmPassword, setConfirmPassword] = useState("");

  const formik = useFormik({
    initialValues: {
      password: "",
    },
    validate: (values) => {
      const errors = {};
      if (values.password !== confirmPassword) {
        errors.password = "Passwords do not match";
      }
      return errors;
    },
    onSubmit: (values) => {
      dispatch(updatePasswordAction({ userID, tokenLink, values }));
      console.log(values);
    },
  });

  useEffect(() => {
    if (success) {
      navigate("/login");
    }
  }, [success, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl text-center font-semibold mb-4">
          Update Password
        </h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="password"
            >
              New Password
            </label>
            <input
              type="password"
              id="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#45556b] focus:border-[#45556b] sm:text-sm"
              placeholder="Enter your new password"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="confirm-password"
            >
              Confirm New Password
            </label>
            <input
              type="password"
              id="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#45556b] focus:border-[#45556b] sm:text-sm"
              placeholder="Confirm your new password"
              required
            />
          </div>
          {formik.errors.password && (
            <p className="text-red-500 text-sm mb-4 text-center">
              {formik.errors.password}
            </p>
          )}
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <button
            type="submit"
            className="w-full bg-[#1F2937] text-white px-4 py-2 rounded shadow hover:bg-[#45556b]"
          >
            Update Password {loading && <ClipLoader size={20} color="white" />}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdatePassword;