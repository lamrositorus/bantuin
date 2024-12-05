import { useEffect, useState } from 'react';
import { FaSpinner, FaExclamationCircle } from 'react-icons/fa'; // Import React Icons
import { APISource } from '../../data/source-api'; // Import API function
import { Link } from 'react-router-dom';

// Main Component
export const GetAllRequest = () => {
const [requests, setRequests] = useState([]); // State to hold requests
const [loading, setLoading] = useState(true); // State for loading indicator
const [error, setError] = useState(null); // State for error handling

// Fetch requests data when the component mounts
useEffect(() => {
const fetchRequests = async () => {
try {
const data = await APISource.getAllRequests(); // API call
if (data && data.status === 'success') {
setRequests(data.data.requests); // Update state with requests
} else {
setError('No data available'); // Handle unexpected response
}
} catch (err) {
setError(err.message); // Handle error
} finally {
setLoading(false); // Set loading to false once the request is done
}
};

fetchRequests();
}, []); // Empty dependency array ensures this runs once when the component mounts

return (
<div className="bg-gray-50 pt-20 min-h-screen flex items-center justify-center p-4">
  <div className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-md">
    <h1 className="text-3xl font-semibold text-gray-800 text-center mb-6">All Requests</h1>

    {loading ? (
    <div className="flex justify-center items-center space-x-3">
      <FaSpinner className="animate-spin text-gray-500 text-3xl" />
      <span className="text-gray-600">Loading...</span>
    </div>
    ) : error ? (
    <div className="text-center text-red-600 flex justify-center items-center space-x-2">
      <FaExclamationCircle className="text-red-600 text-3xl" />
      <p className="text-lg">{error}</p>
    </div>
    ) : (
    <div>
      {requests.length > 0 ? (
      <ul className="space-y-4">
        {requests.map((request) => (
        <li key={request.id}
          className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-medium text-gray-800">{request.description}</h2>
            <span className={`px-3 py-1 text-sm rounded-full ${ request.request_status==='Awaiting Donation'
              ? 'bg-yellow-100 text-yellow-600' : 'bg-green-100 text-green-600' }`}>
              {request.request_status}
            </span>
          </div>
          <p className="text-sm text-gray-500 mt-1">Disaster: {request.disaster_name}</p>

          <div className="mt-3">
            <h3 className="text-lg font-medium text-gray-700">Items:</h3>
            <ul className="space-y-2 mt-2">
              {request.items.map((item, index) => (
              <li key={index} className="flex justify-between text-gray-700">
                <span>{item.description}</span>
                <span className="font-semibold">{item.quantity} {item.unitId}</span>
              </li>
              ))}
            </ul>
          </div>

          {/* Link menuju halaman detail dengan ID request */}
          <div className="mt-4 text-center">
            <Link to={`/getRequest/${request.id}`} className="text-blue-600 hover:text-blue-800">
            View Details
            </Link>
          </div>
        </li>
        ))}
      </ul>
      ) : (
      <p className="text-center text-lg text-gray-600">No requests available.</p>
      )}
    </div>
    )}
  </div>
</div>
);
};