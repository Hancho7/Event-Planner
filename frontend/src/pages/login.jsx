import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { FaEnvelope, FaLock } from "react-icons/fa";
import userSchema from "../schema/register";
import { Link } from "react-router-dom";
import { loginAction } from "../features/auth/loginSlice";

function LoginPage() {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: userSchema,
    onSubmit: (values) => {
      dispatch(loginAction(values));
      console.log(values);
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md border border-gray-300">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Log in to your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={formik.handleSubmit}>
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <div className="flex flex-col">
                <div className="flex items-center  py-2">
                  <FaEnvelope className="text-gray-500 mr-3" />
                  <input
                    id="email"
                    name="email"
                    type="text"
                    className="block w-full px-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>
                <span className=" font-semibold text-sm text-red-600 hover:text-red-500">
                  {formik.errors.email &&
                    formik.touched.email &&
                    formik.errors.email}
                </span>
              </div>
            </div>
            <div className="my-4"></div>
            <div>
              <div className="flex flex-col">
                <div className="flex items-center py-2">
                  <FaLock className=" text-gray-400 mr-3" />
                  <input
                    id="password"
                    name="password"
                    type="password"
                    className="block w-full px-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="Password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>
                <span className=" font-semibold text-sm text-red-600 hover:text-red-500">
                  {formik.errors.password &&
                    formik.touched.password &&
                    formik.errors.password}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <Link
                to="/forgot-password"
                className="font-semibold text-indigo-600 hover:text-indigo-500"
              >
                Forgot your password?
              </Link>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign in
            </button>
          </div>
        </form>
        <div className="text-sm text-center mt-4">
          Not a member?{" "}
          <Link
            to="/register"
            className="font-semibold text-indigo-600 hover:text-indigo-500"
          >
            Register here
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
