import React, { useState } from 'react';
import { APISource } from '../../data/source-api';
import { PlusCircleIcon, TrashIcon } from '@heroicons/react/24/outline';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
export const Request = () => {
  const [disasterId, setDisasterId] = useState('');
  const [description, setDescription] = useState('');
  const [requestItems, setRequestItems] = useState([{
    categoryId: '',
    quantity: 1,
    unitId: '',
    description: ''
  }]);

  const clearForm = () => {
    setDisasterId('');
    setDescription('');
    setRequestItems([{
      categoryId: '',
      quantity: 1,
      unitId: '',
      description: ''
    }]);
  };

  const handleAddItem = () => {
    setRequestItems([...requestItems, {
      categoryId: '',
      quantity: 1,
      unitId: '',
      description: ''
    }]);
  };

  const handleRemoveItem = (index) => {
    const newItems = requestItems.filter((_, i) => i !== index);
    setRequestItems(newItems);
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...requestItems];
    newItems[index][field] = field === 'quantity' ? parseInt(value) : value;
    setRequestItems(newItems);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    // Menggunakan SweetAlert2 untuk konfirmasi
    const result = await Swal.fire({
      title: 'Apakah Anda yakin?',
      text: 'Anda akan mengirim permintaan ini.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ya, kirim!',
      cancelButtonText: 'Batal',
    });
  
    if (!result.isConfirmed) {
      return; // Hentikan pengiriman jika tidak disetujui
    }
  
    if (!disasterId || !description || requestItems.some(item => !item.categoryId || !item.unitId || !item.description || item.quantity <= 0)) {
      toast.error("Silakan lengkapi semua field yang diperlukan.");
      return;
    }
  
    try {
      const response = await APISource.addNewRequest(disasterId, description, requestItems);
      console.log('response api: ', response);
      clearForm();
      toast.success('Permintaan berhasil dikirim!');
    } catch (error) {
      console.error(error);
      toast.error('Terjadi kesalahan saat mengirim permintaan.');
    }
  };
  

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
    { id: 'disaster-12', name: 'Kecelakaan transportasi' },
    { id: 'disaster-13', name: 'Kecelakaan Industri' },
    { id: 'disaster-14', name: 'Konflik Sosial' },
    { id: 'disaster-15', name: 'Aksi Teror' },
    { id: 'disaster-16', name: 'Sabotase' },
    { id: 'disaster-17', name: 'Lainnya' }
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

  return (
    <div className="min-h-screen pt-20 bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Buat Permintaan Bantuan</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">ID Bencana</label>
            <select
              value={disasterId}
              onChange={(e) => setDisasterId(e.target.value)}
              className="mt-1 block bg-white w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="" disabled>Pilih Bencana</option>
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
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="mt-1 block w-full bg-white rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">Daftar Barang yang Dibutuhkan</h3>
              <button
                type="button"
                onClick={handleAddItem}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-800"
              >
                <PlusCircleIcon className="h-5 w-5 mr-2" />
                Tambah Barang
              </button>
            </div>

            {requestItems.map((item, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Kategori</label>
                    <select
                      value={item.categoryId}
                      onChange={(e) => handleItemChange(index, 'categoryId', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white"
                    >
                      <option value="" disabled>Pilih Kategori</option>
                      {CATEGORIES.map(category => (
                        <option key={category.id} value={category.id}>
                          {category.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Jumlah</label>
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                        className="mt-1 block bg-white w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">Unit</label>
                      <select
                        value={item.unitId}
                        onChange={(e) => handleItemChange(index, 'unitId', e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white"
                      >
                        <option value="" disabled>Pilih Unit</option>
                        {UNITS.map(unit => (
                          <option key={unit.id} value={unit.id}>
                            {unit.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Deskripsi Barang</label>
                    <input
                      type="text"
                      value={item.description}
                      onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                      className="mt-1 block bg-white w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => handleRemoveItem(index)}
                    className="absolute top-0 right-0 mt-2 mr-2 text-red-600"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Kirim Permintaan
          </button>
        </form>
      </div>

      <ToastContainer />
    </div>
  );
};
