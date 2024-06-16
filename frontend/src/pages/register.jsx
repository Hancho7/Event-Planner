import { BeatLoader } from "react-spinners";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock, FaPhoneAlt } from "react-icons/fa";
import userSchema from "../schema/register.jsx";
import { useDispatch, useSelector } from "react-redux";
import { registerAction } from "../features/auth/registerSlice.jsx";

function Register() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.register);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      phone_number: "",
      confirmPassword: "",
    },
    validationSchema: userSchema,
    onSubmit: (values) => {
      console.log(values);
      dispatch(registerAction(values));
    },
  });

  return (
    <div>
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
          <form onSubmit={formik.handleSubmit} className="space-y-4">
            <div className="flex flex-col">
              <div className="flex items-center border-b border-gray-300 py-2">
                <FaUser className="text-gray-500 mr-3" />
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                />
              </div>

              <span className=" text-red-500 text-sm">
                {formik.errors.name &&
                  formik.touched.name &&
                  formik.errors.name}
              </span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center border-b border-gray-300 py-2">
                <FaEnvelope className="text-gray-500 mr-3" />
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                />
              </div>

              <span className=" text-red-500 text-sm">
                {formik.errors.email &&
                  formik.touched.email &&
                  formik.errors.email}
              </span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center border-b border-gray-300 py-2 relative">
                <FaLock className="text-gray-500 mr-3" />
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                />
              </div>
              <span className="text-red-500 text-sm">
                {formik.errors.password &&
                  formik.touched.password &&
                  formik.errors.password}
              </span>
            </div>

            <div className="flex items-center border-b border-gray-300 py-2">
              <FaLock className="text-gray-500 mr-3" />
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                placeholder="Confirm Password"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
              />
            </div>
            <div>
              <span className=" text-red-500 text-sm">
                {formik.errors.confirmPassword &&
                  formik.touched.confirmPassword &&
                  formik.errors.confirmPassword}
              </span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center border-b border-gray-300 py-2">
                <FaPhoneAlt className="text-gray-500 mr-3" />
                <input
                  type="tel"
                  name="phone_number"
                  id="phone_number"
                  placeholder="Phone Number"
                  value={formik.values.phone_number}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                />
              </div>

              <span className=" text-red-500 text-sm">
                {formik.errors.phone_number &&
                  formik.touched.phone_number &&
                  formik.errors.phone_number}
              </span>
            </div>
            <div>
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Register {loading && <BeatLoader />}
              </button>
            </div>
          </form>
          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              I have an account,{" "}
              <Link to="/login" className="text-indigo-600 hover:underline">
                login here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
