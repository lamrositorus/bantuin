import { useEffect, useState } from "react";
import { APISource } from "../../data/source-api"; // Import the API function
import { FaSpinner, FaExclamationCircle } from "react-icons/fa"; // Import React Icons
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
export const GetDonationDetail = ({  isDarkMode }) => {
  const [donationDetail, setDonationDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { donationId } = useParams();

  useEffect(() => {
    const fetchDonationDetail = async () => {
      try {
        const data = await APISource.getDonationById(donationId); // Call the API function with the donation ID
        console.log('Detail data donasi: ', data);
        setDonationDetail(data);
      } catch (err) {
        console.error('Error: ', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDonationDetail();
  }, [donationId]); // Dependency array includes donationId

  if (loading) {
    return (
      <div className={`min-h-screen flex flex-col justify-center items-center ${isDarkMode ? 'bg-gray-900' : 'bg-transparent'}`}>
        <div className="flex justify-center items-center space-x-3">
          <FaSpinner className="animate-spin text-gray-500 text-3xl" />
          <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`min-h-screen flex flex-col justify-center items-center ${isDarkMode ? 'bg-gray-900' : 'bg-transparent'}`}>
        <FaExclamationCircle className="text-red-500 text-3xl" />
        <p className="ml-2">{error}</p>
      </div>
    );
  }

  return (
    <div className={`min-h-screen pt-20 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} py-12 px-4 sm:px-6 lg:px-8`}>
      <div className={`max-w-3xl mx-auto ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
        <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'} mb-4`}>
          Detail Donasi
        </h1>
        {donationDetail ? (
          <div>

            {/* Add more details as needed */}
          </div>
        ) : (
          <p className="text-lg">No donation details found.</p>
        )}
      </div>
    </div>
  );
};

GetDonationDetail.propTypes = {
  isDarkMode: PropTypes.bool.isRequired,
};