import { useState } from "react";
import classnames from "classnames";
import { useSelector } from "react-redux";
import { useFormik } from "formik";

const UserProfile = () => {
  const { data } = useSelector((state) => state.login);
  const [editing, setEditing] = useState(false);

  const handleEditClick = () => {
    setEditing(!editing);
  };
  const formik = useFormik({
    initialValues: {
      name: data.name,
      email: data.email,
      phone: data.phone,
      },
     onSubmit:(values)=>{
      console.log(values)
     }

  })

 

  

  const handleSave = () => {
   
      setEditing(false);
      // Save the changes (e.g., send to backend)
    
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="sm:flex sm:items-center px-6 py-4">
          <img
            className="block mx-auto sm:mx-0 sm:flex-shrink-0 h-24 w-24 rounded-full object-cover"
            src={data.pic}
            alt={`${data.name[0]}`}
          />
          <div className="mt-4 sm:mt-0 sm:ml-4 text-center sm:text-left">
            <p className="text-xl leading-tight">{data.name}</p>
            <p className="text-sm leading-tight text-gray-600">{data.email}</p>
            <p className="text-sm leading-tight text-gray-600">{data.phone}</p>
          </div>
        </div>
        <div className="px-6 py-4">
          <button
            onClick={handleEditClick}
            className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-400"
          >
            {editing ? "Cancel" : "Edit Profile"}
          </button>
          {editing && (
            <div className="mt-4">
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
                className={classnames(
                  "mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm",
                  { "border-red-500": "" }
                )}
                
              />
              
              <button
                onClick={handleSave}
                className="mt-4 bg-green-500 text-white px-4 py-2 rounded shadow hover:bg-green-400"
              >
                Save Changes
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
