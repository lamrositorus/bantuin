import { useEffect, useState } from "react";
import { APISource } from "../../data/source-api"; // Import the API function
import { FaSpinner, FaExclamationCircle } from "react-icons/fa"; // Import React Icons
import { AiOutlineIdcard, AiOutlineFieldTime } from "react-icons/ai"; // Icons for ID and time
import { BiComment } from "react-icons/bi"; // Icon for description
import { MdOutlineCategory } from "react-icons/md"; // Icon for category
import { BsFillCheckCircleFill, BsFillXCircleFill } from "react-icons/bs"; // Icons for status
import {MdFormatListNumbered  } from "react-icons/md";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export const DonationOwner = ({ isDarkMode }) => {
  const [donationData, setDonationData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDonationOwner = async () => {
      try {
        const data = await APISource.getDonationOwner(); // Call the API function
        console.log('api: ', data);
        setDonationData(data);
      } catch (err) {
        console.error('Error: ', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDonationOwner();
  }, []);

  if (loading) {
    return (
      <div className={`min-h-screen flex flex-col justify-center items-center ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="flex justify-center items-center space-x-3">
          <FaSpinner className="animate-spin text-gray-500 text-3xl" />
          <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`flex justify-center items-center min-h-screen ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
        <FaExclamationCircle className="text-red-500 text-3xl" />
        <p className="ml-2">{error}</p>
      </div>
    );
  }

  return (
    <div className={`min-h-screen pt-20 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} py-12 px-4 sm:px-6 lg:px-8`}>
      <div className={`max-w-3xl mx-auto ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
        <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'} mb-8`}>
          Donasi
        </h2>
        {donationData && donationData.data.donations.length > 0 ? (
          donationData.data.donations.map((donation, index) => (
            <div key={index} className={`mb-6 p-4 border rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'} shadow-md flex flex-col`}>
              <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                <Link to={`/donations/${donation.donation_id}`} className={`${isDarkMode ? 'text-blue-300 hover:text-blue-400' : 'text-blue-600 hover:text-blue-700'}`}>
                <AiOutlineIdcard className="inline-block mr-2" /> ID Donasi: {donation.donation_id}
                </Link>
              </h3>
              <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                <BiComment className="inline-block mr-2" /> Deskripsi: {donation.donation_description}
              </p>
              <div className="flex justify-between text-sm">
                <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  <AiOutlineFieldTime className="inline-block mr-2" /> Dibuat: {new Date(donation.donation_created_at).toLocaleString()}
                </p>
                <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  <AiOutlineFieldTime className="inline-block mr-2" /> Diperbarui: {new Date(donation.donation_updated_at).toLocaleString()}
                </p>
              </div>
              <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray -700'}`}>
                {donation.donation_status === "Pending" ? (
                  <BsFillXCircleFill className="inline-block mr-2 text-red-500" />
                ) : (
                  <BsFillCheckCircleFill className="inline-block mr-2 text-green-500" />
                )}
                Status: {donation.donation_status}
              </p>
              <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                <AiOutlineIdcard className="inline-block mr-2" /> ID Request: {donation.request_id}
              </p>
              <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                <BiComment className="inline-block mr-2" />Deskripsi Request: {donation.request_description}
              </p>
              <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                {donation.request_status === "Fulfilled" ? (
                  <BsFillCheckCircleFill className="inline-block mr-2 text-green-500" />
                ) : (
                  <BsFillXCircleFill className="inline-block mr-2 text-blue-500" />
                )}
                Request Status: {donation.request_status}
              </p>
              <h4 className={`text-md font-medium mt-4 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                <MdOutlineCategory className="inline-block mr-2" /> Items:
              </h4>
              <div className="grid grid-cols-1 gap-4">
                {donation.donation_items.map((item, itemIndex) => (
                  <div key={itemIndex} className={`p-4 border rounded-lg ${isDarkMode ? 'bg-gray-600' : 'bg-white'} shadow-md`}>
                    <h5 className={`font-semibold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                      <strong>{item.category_name}</strong>
                    </h5>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      <BiComment className="inline-block mr-2" /> Deskripsi: {item.description}
                    </p>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      <MdFormatListNumbered  className="inline-block mr-2" /> Quantity: {item.quantity}
                    </p>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p className={`text-lg ${isDarkMode ? 'text-white' : 'text-black'} `}>No donations found.</p>
        )}
      </div>
    </div>
  );
};

DonationOwner.propTypes = {
  isDarkMode: PropTypes.bool.isRequired,
};