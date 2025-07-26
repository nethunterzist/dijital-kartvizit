'use client';

import { useState, useRef } from 'react';

interface InvoiceData {
  invoiceNumber: string;
  date: string;
  dueDate: string;
  customerName: string;
  customerEmail: string;
  customerAddress: string;
  customerPhone: string;
  items: InvoiceItem[];
  notes: string;
  companyName: string;
  companyAddress: string;
  companyPhone: string;
  companyEmail: string;
  taxRate: number;
}

interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  price: number;
  total: number;
}

export default function InvoicePage() {
  const printRef = useRef<HTMLDivElement>(null);
  const [invoiceData, setInvoiceData] = useState<InvoiceData>({
    invoiceNumber: `INV-${Date.now()}`,
    date: new Date().toISOString().split('T')[0],
    dueDate: '',
    customerName: '',
    customerEmail: '',
    customerAddress: '',
    customerPhone: '',
    items: [{ id: '1', description: '', quantity: 1, price: 0, total: 0 }],
    notes: '',
    companyName: 'Dijital Kartvizit',
    companyAddress: 'İstanbul, Türkiye',
    companyPhone: '+90 555 123 45 67',
    companyEmail: 'info@dijitalkartvizit.com',
    taxRate: 20
  });

  const addItem = () => {
    const newId = (invoiceData.items.length + 1).toString();
    setInvoiceData({
      ...invoiceData,
      items: [...invoiceData.items, { id: newId, description: '', quantity: 1, price: 0, total: 0 }]
    });
  };

  const removeItem = (id: string) => {
    setInvoiceData({
      ...invoiceData,
      items: invoiceData.items.filter(item => item.id !== id)
    });
  };

  const updateItem = (id: string, field: keyof InvoiceItem, value: string | number) => {
    const updatedItems = invoiceData.items.map(item => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: value };
        if (field === 'quantity' || field === 'price') {
          updatedItem.total = updatedItem.quantity * updatedItem.price;
        }
        return updatedItem;
      }
      return item;
    });
    setInvoiceData({ ...invoiceData, items: updatedItems });
  };

  const calculateSubtotal = () => {
    return invoiceData.items.reduce((sum, item) => sum + item.total, 0);
  };

  const calculateTax = () => {
    return calculateSubtotal() * (invoiceData.taxRate / 100);
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax();
  };

  const handlePrint = () => {
    window.print();
  };

  const exportToPDF = () => {
    import('../../lib/pdfExport').then(({ exportInvoiceToPDF }) => {
      exportInvoiceToPDF(invoiceData);
    });
  };

  const saveInvoice = () => {
    import('../../lib/pdfExport').then(({ saveInvoiceData }) => {
      saveInvoiceData(invoiceData);
    });
  };

  const loadInvoice = async () => {
    const { loadInvoiceData } = await import('../../lib/pdfExport');
    const data = await loadInvoiceData();
    if (data) {
      setInvoiceData(data);
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Form Panel */}
        <div className="lg:w-1/2 space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Fatura Oluştur</h1>
              <div className="flex space-x-2">
                <button
                  onClick={loadInvoice}
                  className="px-3 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center space-x-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <span>Yükle</span>
                </button>
                <button
                  onClick={saveInvoice}
                  className="px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                  </svg>
                  <span>Kaydet</span>
                </button>
                <button
                  onClick={handlePrint}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                  </svg>
                  <span>Yazdır</span>
                </button>
                <button
                  onClick={exportToPDF}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                  </svg>
                  <span>PDF</span>
                </button>
              </div>
            </div>

            {/* Company Information */}
            <div className="space-y-4 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Şirket Bilgileri</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Şirket Adı"
                  value={invoiceData.companyName}
                  onChange={(e) => setInvoiceData({...invoiceData, companyName: e.target.value})}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                <input
                  type="email"
                  placeholder="E-posta"
                  value={invoiceData.companyEmail}
                  onChange={(e) => setInvoiceData({...invoiceData, companyEmail: e.target.value})}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                <input
                  type="text"
                  placeholder="Telefon"
                  value={invoiceData.companyPhone}
                  onChange={(e) => setInvoiceData({...invoiceData, companyPhone: e.target.value})}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                <input
                  type="text"
                  placeholder="Adres"
                  value={invoiceData.companyAddress}
                  onChange={(e) => setInvoiceData({...invoiceData, companyAddress: e.target.value})}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
            </div>

            {/* Invoice Details */}
            <div className="space-y-4 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Fatura Detayları</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                  type="text"
                  placeholder="Fatura No"
                  value={invoiceData.invoiceNumber}
                  onChange={(e) => setInvoiceData({...invoiceData, invoiceNumber: e.target.value})}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                <input
                  type="date"
                  value={invoiceData.date}
                  onChange={(e) => setInvoiceData({...invoiceData, date: e.target.value})}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                <input
                  type="date"
                  placeholder="Son Ödeme Tarihi"
                  value={invoiceData.dueDate}
                  onChange={(e) => setInvoiceData({...invoiceData, dueDate: e.target.value})}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
            </div>

            {/* Customer Information */}
            <div className="space-y-4 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Müşteri Bilgileri</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Müşteri Adı"
                  value={invoiceData.customerName}
                  onChange={(e) => setInvoiceData({...invoiceData, customerName: e.target.value})}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                <input
                  type="email"
                  placeholder="E-posta"
                  value={invoiceData.customerEmail}
                  onChange={(e) => setInvoiceData({...invoiceData, customerEmail: e.target.value})}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                <input
                  type="text"
                  placeholder="Telefon"
                  value={invoiceData.customerPhone}
                  onChange={(e) => setInvoiceData({...invoiceData, customerPhone: e.target.value})}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                <input
                  type="text"
                  placeholder="Adres"
                  value={invoiceData.customerAddress}
                  onChange={(e) => setInvoiceData({...invoiceData, customerAddress: e.target.value})}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
            </div>

            {/* Items */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Ürün/Hizmetler</h3>
                <button
                  onClick={addItem}
                  className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm flex items-center space-x-1"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <span>Ekle</span>
                </button>
              </div>
              
              <div className="space-y-2">
                {invoiceData.items.map((item, index) => (
                  <div key={item.id} className="grid grid-cols-12 gap-2 items-center">
                    <input
                      type="text"
                      placeholder="Açıklama"
                      value={item.description}
                      onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                      className="col-span-6 px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded focus:ring-1 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                    <input
                      type="number"
                      placeholder="Miktar"
                      value={item.quantity}
                      onChange={(e) => updateItem(item.id, 'quantity', parseInt(e.target.value) || 0)}
                      className="col-span-2 px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded focus:ring-1 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                    <input
                      type="number"
                      placeholder="Birim Fiyat"
                      step="0.01"
                      value={item.price}
                      onChange={(e) => updateItem(item.id, 'price', parseFloat(e.target.value) || 0)}
                      className="col-span-2 px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded focus:ring-1 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                    <span className="col-span-1 text-sm text-gray-600 dark:text-gray-300 text-right">
                      {item.total.toFixed(2)} ₺
                    </span>
                    <button
                      onClick={() => removeItem(item.id)}
                      disabled={invoiceData.items.length === 1}
                      className="col-span-1 p-1 text-red-500 hover:text-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Tax Rate */}
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                KDV Oranı (%)
              </label>
              <input
                type="number"
                value={invoiceData.taxRate}
                onChange={(e) => setInvoiceData({...invoiceData, taxRate: parseFloat(e.target.value) || 0})}
                className="w-24 px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded focus:ring-1 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            {/* Notes */}
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Notlar
              </label>
              <textarea
                rows={3}
                placeholder="Ek notlar..."
                value={invoiceData.notes}
                onChange={(e) => setInvoiceData({...invoiceData, notes: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
          </div>
        </div>

        {/* Preview Panel */}
        <div className="lg:w-1/2">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 sticky top-4" ref={printRef}>
            {/* Invoice Header */}
            <div className="flex justify-between items-start mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">FATURA</h1>
                <div className="text-gray-600">
                  <p className="font-semibold">{invoiceData.companyName}</p>
                  <p>{invoiceData.companyAddress}</p>
                  <p>{invoiceData.companyPhone}</p>
                  <p>{invoiceData.companyEmail}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-gray-600">
                  <p><span className="font-semibold">Fatura No:</span> {invoiceData.invoiceNumber}</p>
                  <p><span className="font-semibold">Tarih:</span> {invoiceData.date}</p>
                  {invoiceData.dueDate && (
                    <p><span className="font-semibold">Son Ödeme:</span> {invoiceData.dueDate}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Customer Info */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Fatura Edilecek:</h3>
              <div className="text-gray-600">
                {invoiceData.customerName && <p className="font-semibold">{invoiceData.customerName}</p>}
                {invoiceData.customerAddress && <p>{invoiceData.customerAddress}</p>}
                {invoiceData.customerPhone && <p>{invoiceData.customerPhone}</p>}
                {invoiceData.customerEmail && <p>{invoiceData.customerEmail}</p>}
              </div>
            </div>

            {/* Items Table */}
            <div className="mb-8">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-300">
                    <th className="text-left py-2 text-gray-900">Açıklama</th>
                    <th className="text-center py-2 text-gray-900">Miktar</th>
                    <th className="text-right py-2 text-gray-900">Birim Fiyat</th>
                    <th className="text-right py-2 text-gray-900">Toplam</th>
                  </tr>
                </thead>
                <tbody>
                  {invoiceData.items.map((item) => (
                    <tr key={item.id} className="border-b border-gray-200">
                      <td className="py-2 text-gray-700">{item.description}</td>
                      <td className="py-2 text-center text-gray-700">{item.quantity}</td>
                      <td className="py-2 text-right text-gray-700">{item.price.toFixed(2)} ₺</td>
                      <td className="py-2 text-right text-gray-700">{item.total.toFixed(2)} ₺</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Totals */}
            <div className="flex justify-end">
              <div className="w-64">
                <div className="flex justify-between py-1">
                  <span className="text-gray-600">Ara Toplam:</span>
                  <span className="text-gray-900">{calculateSubtotal().toFixed(2)} ₺</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-gray-600">KDV (%{invoiceData.taxRate}):</span>
                  <span className="text-gray-900">{calculateTax().toFixed(2)} ₺</span>
                </div>
                <div className="flex justify-between py-2 border-t border-gray-300 font-bold text-lg">
                  <span className="text-gray-900">Toplam:</span>
                  <span className="text-gray-900">{calculateTotal().toFixed(2)} ₺</span>
                </div>
              </div>
            </div>

            {/* Notes */}
            {invoiceData.notes && (
              <div className="mt-8 pt-4 border-t border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-2">Notlar:</h4>
                <p className="text-gray-600 whitespace-pre-wrap">{invoiceData.notes}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .print-area, .print-area * {
            visibility: visible;
          }
          .print-area {
            position: absolute;
            left: 0;
            top: 0;
          }
        }
      `}</style>
    </div>
  );
}