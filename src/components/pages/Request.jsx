import React, { useState } from 'react';
import { APISource } from '../../data/source-api';
import { PlusCircleIcon, TrashIcon } from '@heroicons/react/24/outline';

export const Request = () => {
  const [disasterId, setDisasterId] = useState('');
  const [description, setDescription] = useState('');
  const [requestItems, setRequestItems] = useState([{
    categoryId: '',
    quantity: 1,
    unitId: '',
    description: ''
  }]);

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
    try {
      const response = await APISource.addNewRequest(disasterId, description, requestItems);
      console.log(response);
      // Handle success - tambahkan toast notification
    } catch (error) {
      console.error(error);
      // Handle error - tambahkan toast notification
    }
  };
  const CATEGORIES = [
    { id: 'FOOD', label: 'Makanan' },
    { id: 'CLOTHES', label: 'Pakaian' },
    { id: 'MEDICAL', label: 'Obat-obatan' },
    { id: 'SHELTER', label: 'Tempat Berlindung' },
    { id: 'HYGIENE', label: 'Perlengkapan Kebersihan' },
    { id: 'BABY', label: 'Perlengkapan Bayi' },
    { id: 'ELDERLY', label: 'Perlengkapan Lansia' },
    { id: 'EDUCATION', label: 'Perlengkapan Pendidikan' }
  ];
  
  const UNITS = [
    { id: 'KG', label: 'Kilogram (kg)' },
    { id: 'PCS', label: 'Pieces (pcs)' },
    { id: 'BOX', label: 'Box' },
    { id: 'PACK', label: 'Pack' },
    { id: 'DOZEN', label: 'Lusin' },
    { id: 'SET', label: 'Set' },
    { id: 'LITER', label: 'Liter (L)' },
    { id: 'METER', label: 'Meter (m)' }
  ];
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Buat Permintaan Bantuan</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">ID Bencana</label>
            <input
              type="text"
              value={disasterId}
              onChange={(e) => setDisasterId(e.target.value)}
              className="mt-1 block bg-white w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
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
                      <label className="block text-sm font-medium  text-gray-700">Jumlah</label>
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                        className="mt-1 block w-full rounded-md bg-white border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">Satuan</label>
                      <select
                        value={item.unitId}
                        onChange={(e) => handleItemChange(index, 'unitId', e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white"
                      >
                        <option value="" disabled>Pilih Satuan</option>
                        {UNITS.map(unit => (
                          <option key={unit.id} value={unit.id}>
                            {unit.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">Deskripsi Barang</label>
                    <textarea
                      value={item.description}
                      onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                      rows={2}
                      className="mt-1 block w-full rounded-md bg-white border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {requestItems.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveItem(index)}
                    className="mt-2 inline-flex items-center text-sm text-red-600 hover:text-red-800"
                  >
                    <TrashIcon className="h-4 w-4 mr-1" />
                    Hapus
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Kirim Permintaan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
