import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { APISource } from "../../data/source-api";
import Swal from 'sweetalert2';  // SweetAlert2 import
import { FaSpinner, FaTimes } from "react-icons/fa";
import PropTypes from "prop-types";
export const GetRequestItem = ({ isDarkMode }) => {
  const { id } = useParams();
  const [requestItems, setRequestItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for donation
  const [description, setDescription] = useState("");
  const [donationItems, setDonationItems] = useState([]);
  const [donationLoading, setDonationLoading] = useState(false);
  const [donationSuccess, setDonationSuccess] = useState(null);

  // Fetch request items on initial render
  const fetchRequestItems = async () => {
    try {
      setLoading(true);
      const response = await APISource.getRequestItems(id);
      if (response.data && response.data.requestItems) {
        setRequestItems(response.data.requestItems);
        const initialDonationItems = response.data.requestItems.map(item => ({
          requestItemId: item.id,
          description: item.description,
          quantity: 1
        }));
        setDonationItems(initialDonationItems);
      } else {
        throw new Error("Data request items tidak ditemukan.");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequestItems(); // Fetch request items when component mounts
  }, [id]);

  const handleDonationItemChange = (index, field, value) => {
    const updatedItems = [...donationItems];
    updatedItems[index][field] = value;
    setDonationItems(updatedItems);
  };

  const handleDonationSubmit = async (e) => {
    e.preventDefault();
    setDonationLoading(true);
    setDonationSuccess(null);
    setError(null);
  
    // Validasi item donasi
    const invalidItems = donationItems.filter(item => item.quantity <= 0);
    if (invalidItems.length > 0) {
      setDonationLoading(false);
      return;
    }
  
    // Membuat payload dengan format yang benar
    const payload = {
      requestId: id, // ID request yang sudah ada di params
      descriptions: description, // Deskripsi donasi (string)
      donationItems: donationItems.map(item => ({
        requestItemId: item.requestItemId, // Menggunakan requestItemId sesuai format API
        descriptions: item.descriptions, // Menggunakan field descriptions untuk deskripsi item
        quantity: parseInt(item.quantity, 10) // Pastikan kuantitas adalah integer
      }))
    };
  
    console.log("Payload being sent:", JSON.stringify(payload, null, 2)); // Debug payload
  
    try {
      // Menampilkan SweetAlert konfirmasi sebelum submit
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: "You are about to submit the donation.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, submit it!',
        cancelButtonText: 'Cancel'
      });
  
      if (result.isConfirmed) {
        // Jika user mengonfirmasi, kirim donasi ke API
        await APISource.postDonation(id, description, donationItems);
        setDescription(""); // Reset deskripsi
        setDonationItems(donationItems.map(item => ({ ...item, quantity: 0 }))); // Reset kuantitas
  
        // Tampilkan SweetAlert untuk sukses
        await Swal.fire({
          title: 'Success!',
          text: 'Donation successfully submitted!',
          icon: 'success',
          confirmButtonText: 'OK'
        });
  
        // Re-fetch request items to reflect the donation
        fetchRequestItems();
      } else {
        // Tampilkan SweetAlert untuk pembatalan
        await Swal.fire({
          title: 'Cancelled',
          text: 'Donation was not submitted.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    } catch (err) {
      // Check if error response from the API exists
      const errorMessage = err.response?.data?.message || err.message || 'Failed to submit donation.';
      // Tampilkan SweetAlert untuk gagal
      await Swal.fire({
        title: 'Error',
        text: errorMessage, // Display the error message from the backend
        icon: 'error',
        confirmButtonText: 'OK'
      });
    } finally {
      setDonationLoading(false);
    }
  };
  

  // Dark mode styling
  const bgClass = isDarkMode ? "bg-gray-900 text-gray-200" : "bg-gray-100 text-gray-900";
  const cardClass = isDarkMode ? "bg-gray-800 text-gray-300" : "bg-white text-gray-900";

  if (loading) {
    return (
      <div className="flex pt-20 justify-center items-center space-x-3">
        <FaSpinner className="animate-spin text-gray-500 text-3xl" />
        <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Loading...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`flex flex-col items-center justify-center pt-20 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
        <div className={`bg-${isDarkMode ? 'red-600' : 'red-500'} rounded-full p-4 mb-4`}>
          <FaTimes className="text-white text-3xl" />
        </div>
        <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Error</h2>
        <p className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Error: {error}</p>
      </div>
    );
  }

      return (
        <div className={`min-h-screen p-8 pt-20 ${bgClass}`}>
          <div className={`max-w-4xl mx-auto rounded-lg shadow-lg p-6 ${cardClass}`}>
            {/* Request Items Section */}
            <h1 className="text-2xl font-bold mb-4">Request Items</h1>
            {requestItems.length > 0 ? (
              <ul className="space-y-4">
                {requestItems.map((item) => (
                  <li
                    key={item.id}
                    className={`p-4 rounded-lg shadow hover:shadow-md transition ${isDarkMode ? "bg-gray-700 text-gray-300" : "bg-gray-50 text-gray-800"}`}
                  >
                    <p><span className="font-medium">ID:</span> {item.id}</p>
                    <p><span className="font-medium">Category ID:</span> {item.category_id}</p>
                    <p><span className="font-medium">Quantity:</span> {item.quantity}</p>
                    <p><span className="font-medium">Unit ID:</span> {item.unit_id}</p>
                    <p><span className="font-medium">Description:</span> {item.description}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className={`text-gray-500 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>No request items found.</p>
            )}
      
            {/* Donation Form */}
            <div className="mt-6">
              <h2 className="text-xl font-bold mb-4">Submit Donation</h2>
              {donationSuccess && (
                <div className={`mb-4 font-semibold ${isDarkMode ? "text-green-400" : "text-green-600"}`}>{donationSuccess}</div>
              )}
              <form onSubmit={handleDonationSubmit}>
                <div className="mb-4">
                  <label
                    htmlFor="description"
                    className={`block font-medium ${isDarkMode ? "text-gray-300" : "text-gray-800"}`}
                  >
                    Donation Description
                  </label>
                  <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className={`w-full p-2 border rounded-lg ${isDarkMode ? "bg-gray-700 text-gray-300 border-gray-600" : "bg-white text-gray-800 border-gray-300"}`}
                    rows="3"
                    required
                  />
                </div>
                {donationItems.map((item, index) => (
                  <div key={index} className="mb-4 flex items-center space-x-4">
                    <div className="flex-1">
                      <label className={`block font-medium ${isDarkMode ? "text-gray-300" : "text-gray-800"}`}>
                        Item ID:
                      </label>
                      <input
                        type="text"
                        value={item.requestItemId}
                        disabled
                        className={`w-full p-2 border rounded-lg ${isDarkMode ? "bg-gray-700 text-gray-300 border-gray-600" : "bg-white text-gray-800 border-gray-300"}`}
                      />
                    </div>
                    <div className="flex-1">
                      <label className={`block font-medium ${isDarkMode ? "text-gray-300" : "text-gray-800"}`}>
                        Quantity
                      </label>
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => handleDonationItemChange(index, "quantity", e.target.value)}
                        className={`w-full p-2 border rounded-lg ${isDarkMode ? "bg-gray-700 text-gray-300 border-gray-600" : "bg-white text-gray-800 border-gray-300"}`}
                        required
                      />
                    </div>
                  </div>
                ))}
                <button
                  type="submit"
                  className={`w-full p-2 rounded-lg transition ${isDarkMode ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-blue-500 text-white hover:bg-blue-600"}`}
                  disabled={donationLoading}
                >
                  {donationLoading ? "Submitting..." : "Submit Donation"}
                </button>
              </form>
            </div>
          </div>
        </div>
      );
      
  };
GetRequestItem.propTypes = {
  isDarkMode: PropTypes.bool.isRequired,
}