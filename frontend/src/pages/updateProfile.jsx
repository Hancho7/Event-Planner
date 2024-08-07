import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { getUserPaymentsAction } from "../features/payments/getUserPayments";
import { ClipLoader } from "react-spinners";
import { deletePaymentRequestAction } from "../features/payments/deletePaymentRequest";
import TableSkeleton from "../components/skeleton";
import { logOut } from "../features/auth/loginSlice";
import { useNavigate } from "react-router-dom";
import Tabs from "../components/tabs"
const UserProfile = () => {
  const { data, loading, error } = useSelector((state) => state.login);
  const navigate = useNavigate();
  const { loading: deleteLoading, success: deleteSuccess } = useSelector(
    (state) => state.deletePaymentRequest
  );
  const {
    data: paymentsData,
    loading: paymentsLoading,
    error: paymentsError,
  } = useSelector((state) => state.getUserPayments);
  const dispatch = useDispatch();
  const [editing, setEditing] = useState(false);
  const [localPaymentsData, setLocalPaymentsData] = useState([]);
  const [activeTab, setActiveTab] = useState(0);

  const handleEditClick = () => {
    setEditing(!editing);
  };
  useEffect(() => {
    setLocalPaymentsData(paymentsData);
  }, [paymentsData]);

  const formik = useFormik({
    initialValues: {
      name: data.name,
      email: data.email,
      phone: data.phone,
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const handleSave = () => {
    setEditing(false);
    // Save the changes (e.g., send to backend)
  };

  const handleClick = (authorization_url) => {
    window.open(authorization_url, "_blank");
  };

  const handleDelete = (id) => {
    dispatch(deletePaymentRequestAction({ id, userID: data.id }));
    setLocalPaymentsData(
      localPaymentsData.filter((payment) => payment.id !== id)
    );
  };

  useEffect(() => {
    dispatch(getUserPaymentsAction(data.id));
  }, [dispatch, data]);

  useEffect(() => {
    console.log("paymentsData", paymentsData);
  }, [paymentsData]);

  const handleLogout = () => {
    dispatch(logOut());
    navigate("/login");
  };

  const tabs = [
    { title: 'Update Profile' },
    { title: 'Payment History' },
  ];

  return (
    <div className="flex flex-col bg-gray-100 py-6">
      <div className=" mr-6 self-end">
        {" "}
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white hover:bg-red-300 py-2 px-3 rounded-md font-semibold"
        >
          Logout
        </button>
      </div>

      <div className="container mx-auto">
        <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
        {activeTab === 0 && (
          <div className="md:flex flex-col md:flex-row items-center justify-around px-6 gap-8 py-10 min-h-screen">
            {loading ? (
              <div className="flex items-center justify-center">
                <TableSkeleton />
              </div>
            ) : error ? (
              <div className="text-red-500">{paymentsError}</div>
            ) : data ? (
              <div className="md:w-[43%] bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="sm:flex sm:items-center px-6 py-4">
                  <img
                    className="block mx-auto sm:mx-0 sm:flex-shrink-0 h-24 w-24 rounded-full object-cover"
                    src={data.pic}
                    alt={`${data.name[0]}`}
                  />
                  <div className="mt-4 sm:mt-0 sm:ml-4 text-center sm:text-left">
                    <p className="text-xl leading-tight">{data.name}</p>
                    <p className="text-sm leading-tight text-gray-600">
                      {data.email}
                    </p>
                    <p className="text-sm leading-tight text-gray-600">
                      {data.phone}
                    </p>
                  </div>
                </div>
                <div className="px-6 py-4">
                  <div className="flex items-center space-x-4">
                    {!editing && (
                      <button
                        onClick={handleEditClick}
                        className="bg-[#1F2937] text-white px-4 py-2 rounded shadow hover:bg-[#4f6380]"
                      >
                        Edit Profile
                      </button>
                    )}
                  </div>

                  {editing && (
                    <div className="mt-4 px-8 ">
                      <label className="block text-sm font-medium text-gray-700 mt-4">
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        placeholder={`${data.name}`}
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                      <label className="block text-sm font-medium text-gray-700 mt-4">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formik.values.email}
                        placeholder={`${data.email}`}
                        onChange={formik.handleChange}
                        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                      <label className="block text-sm font-medium text-gray-700 mt-4">
                        Phone
                      </label>
                      <input
                        type="text"
                        name="phone"
                        value={formik.values.phone}
                        placeholder={`${data.phone}`}
                        onChange={formik.handleChange}
                        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                      {editing && (
                        <div className="flex items-center justify-between my-4">
                          <button
                            onClick={handleSave}
                            className="bg-[#1F2937] text-white px-4 py-2 rounded shadow hover:bg-green-400"
                          >
                            Save
                          </button>
                          <button
                            onClick={handleEditClick}
                            className="bg-red-500 text-white px-4 py-2 rounded shadow hover:bg-red-400"
                          >
                            Cancel
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div>You have not yet been signed in</div>
            )}
          </div>
        )}
        {activeTab === 1 && (
          <div className=" mt-6 md:mt-0 md:flex-1">
            <h1 className="text-2xl mb-4 text-center">
              Payments History{" "}
              {deleteLoading && <ClipLoader size={15} color="black" />}
            </h1>
            {paymentsLoading ? (
              <div className="flex items-center justify-center">
                <ClipLoader />
              </div>
            ) : paymentsError ? (
              <div className="text-red-500">{paymentsError}</div>
            ) : localPaymentsData?.length > 0 ? (
              <div className="overflow-auto h-64">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {paymentsData?.map((payment) => (
                      <tr key={payment.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {payment.type}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {payment.paid ? "Paid" : "Not Paid"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {payment.eventName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {!payment.paid && (
                            <>
                              <button
                                onClick={() => handleClick(payment.paystack)}
                                className="text-green-600 hover:text-green-900"
                              >
                                Pay
                              </button>
                              <button
                                onClick={() => handleDelete(payment.id)}
                                className="ml-2 text-red-600 hover:text-red-900"
                              >
                                Delete
                              </button>
                            </>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div>No payments found.</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
