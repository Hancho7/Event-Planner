import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import {forgetPasswordAction} from "../features/auth/forgetPassword"

const ForgetPassword = () => {
  const dispatch = useDispatch();
  const { success, error, loading } = useSelector((state) => state.forgetPassword);

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: (values) => {
      console.log(values);
      dispatch(forgetPasswordAction(values))
    },
  });
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-center mb-4">
          Forgot Password
        </h2>
        {error && <p className="text-red-500 text-center text-sm mb-4">Email does not exist</p>}
        {success && <p className="text-green-500 text-center text-sm mb-4">Verify email to update password</p>}
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="email"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#45556b] focus:border-[#45556b]sm:text-sm"
              placeholder="Enter your email"
            />
          </div>
          
          
          <button
            type="submit"
            className="w-full flex justify-center items-center gap-2 bg-[#1F2937] text-white px-4 py-2 rounded shadow hover:bg-[#45556b]"
          >
            Send Reset Link {loading && <ClipLoader size={20} color="#fff"/>}
          </button>
        </form>
        <p className="mt-4 text-sm text-gray-600">
          Remembered your password?{" "}
          <Link to="/login" className="text-[#1F2937] font-semibold hover:underline">
            Back to Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgetPassword;
