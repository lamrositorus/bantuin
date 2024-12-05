import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { APISource } from '../../data/source-api';
import { PlusCircleIcon, TrashIcon } from '@heroicons/react/24/outline';

const CATEGORIES = [
  { id: 'category-1', label: 'Makanan' },
  { id: 'category-2', label: 'Minuman' },
  { id: 'category-3', label: 'Pakaian' },
  { id: 'category-4', label: 'Obat-obatan' },
  { id: 'category-5', label: 'Perlengkapan Bayi' },
  { id: 'category-6', label: 'Perlengkapan Kebersihan' },
  { id: 'category-7', label: 'Perlengkapan Tidur' },
  { id: 'category-8', label: 'Perlengkapan Dapur' },
  { id: 'category-9', label: 'Perlengkapan Medis' },
  { id: 'category-10', label: 'Alat Tulis' },
  { id: 'category-11', label: 'Lainnya' },
];

const DISASTERS = [
  { id: 'disaster-1', name: 'Gempa Bumi' },
  { id: 'disaster-2', name: 'Letusan Gunung Api' },
  { id: 'disaster-3', name: 'Tsunami' },
  { id: 'disaster-4', name: 'Tanah Longsor' },
  { id: 'disaster-5', name: 'Banjir' },
  { id: 'disaster-6', name: 'Banjir Bandang' },
  { id: 'disaster-7', name: 'Kekeringan' },
  { id: 'disaster-8', name: 'Kebakaran' },
  { id: 'disaster-9', name: 'Kebakaran Hutan' },
  { id: 'disaster-10', name: 'Angin Puting Beliung' },
  { id: 'disaster-11', name: 'Gelombang Pasang atau Badai' },
  { id: 'disaster-12', name: 'Kecelakaan Transportasi' },
  { id: 'disaster-13', name: 'Kecelakaan Industri' },
  { id: 'disaster-14', name: 'Konflik Sosial' },
  { id: 'disaster-15', name: 'Aksi Teror' },
  { id: 'disaster-16', name: 'Sabotase' },
  { id: 'disaster-17', name: 'Lainnya' },
];

const UNITS = [
  { id: 'unit-1', label: 'Pcs' },
  { id: 'unit-2', label: 'Kg' },
  { id: 'unit-3', label: 'Liter' },
  { id: 'unit-4', label: 'Gram' },
  { id: 'unit-5', label: 'Box' },
  { id: 'unit-6', label: 'Karton' },
  { id: 'unit-7', label: 'Pack' },
  { id: 'unit-8', label: 'Lusin' },
  { id: 'unit-9', label: 'Set' },
  { id: 'unit-10', label: 'Lainnya' },
];

export const GetDetail = () => {
  const { id } = useParams();
  const [requestDetail, setRequestDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(false);
  const [updatedDescription, setUpdatedDescription] = useState('');
  const [updatedItems, setUpdatedItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRequestDetail = async () => {
      try {
        const data = await APISource.getRequestById(id);
        console.log('Fetched Data:', data);
        const items = data.data.request.items || [];
        setRequestDetail(data.data.request);
        setUpdatedDescription(data.data.request.description);
        setUpdatedItems(items);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRequestDetail();
  }, [id]);

  const handleUpdate = async () => {
    try {
      const response = await APISource.updateRequest(id, requestDetail.disaster_id, updatedDescription, updatedItems);
      console.log('Update Response:', response);
  
      // If the response is successful, but does not contain the expected request data
      if (response.data && response.data.status === 'success') {
        setEditing(false);  // Close the edit mode or update UI
        alert(response.data.message); // Show success message from the response
      } else {
        console.error('Response does not contain expected data:', response);
        setError('Failed to update request. No request data returned.');
      }
    } catch (err) {
      console.error('Error updating request:', err.message);
      setError(err.message);
    }
  };
  
  
  

  const handleAddItem = () => {
    setUpdatedItems([...updatedItems, { categoryId: '', quantity: 1, unitId: '', description: '' }]);
  };

  const handleRemoveItem = (index) => {
    const newItems = updatedItems.filter((_, i) => i !== index);
    setUpdatedItems(newItems);
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...updatedItems];
    newItems[index][field] = field === 'quantity' ? parseInt(value) : value;
    setUpdatedItems(newItems);
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this request?');
    if (confirmDelete) {
      try {
        await APISource.deleteRequest(id);
        navigate('/request');
      } catch (err) {
        setError(err.message);
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen pt-20 bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">{editing ? 'Edit Permintaan Bantuan' : 'Detail Permintaan Bantuan'}</h2>
        <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">ID Bencana</label>
            <select
              value={requestDetail.disaster_id}
              disabled={!editing}
              className="mt-1 block bg-white w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              {DISASTERS.map(disaster => (
                <option key={disaster.id} value={disaster.id}>
                  {disaster.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Deskripsi Umum</label>
            <textarea
              value={updatedDescription}
              onChange={(e) => setUpdatedDescription(e.target.value)}
              rows={3}
              disabled={!editing}
              className="mt-1 block w-full bg-white rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">Daftar Barang yang Dibutuhkan</h3>
              {editing && (
                <button
                  type="button"
                  onClick={handleAddItem}
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-800"
                >
                  <PlusCircleIcon className="h-5 w-5 mr-2" />
                  Tambah Barang
                </button>
              )}
            </div>

            {updatedItems.map((item, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Kategori</label>
                    <select
                      value={item.categoryId}
                      onChange={(e) => handleItemChange(index, 'categoryId', e.target.value)}
                      disabled={!editing}
                      className="mt-1 block w-full bg-white rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    >
                      {CATEGORIES.map(category => (
                        <option key={category.id} value={category.id}>
                          {category.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Jumlah</label>
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                      disabled={!editing}
                      className="mt-1 block w-full bg-white rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Satuan</label>
                    <select
                      value={item.unitId}
                      onChange={(e) => handleItemChange(index, 'unitId', e.target.value)}
                      disabled={!editing}
                      className="mt-1 block w-full bg-white rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    >
                      {UNITS.map(unit => (
                        <option key={unit.id} value={unit.id}>
                          {unit.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">Deskripsi</label>
                    <textarea
                      value={item.description}
                      onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                      disabled={!editing}
                      rows={2}
                      className="mt-1 block w-full bg-white rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>
                {editing && (
                  <button
                    type="button"
                    onClick={() => handleRemoveItem(index)}
                    className="mt-2 inline-flex items-center px-4 py-2 text-sm font-medium text-red-600 hover:text-red-800"
                  >
                    <TrashIcon className="h-5 w-5 mr-2" />
                    Hapus Barang
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="flex justify-end space-x-4">
            {editing ? (
              <>
                <button
                  type="button"
                  onClick={handleUpdate}
                  className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md"
                >
                  Simpan
                </button>
                <button
                  type="button"
                  onClick={() => setEditing(false)}
                  className="px-4 py-2 text-white bg-gray-600 hover:bg-gray-700 rounded-md"
                >
                  Batal
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => setEditing(true)}
                className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md"
              >
                Edit
              </button>
            )}

            {!editing && (
              <button
                type="button"
                onClick={handleDelete}
                className="px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded-md"
              >
                Hapus
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
