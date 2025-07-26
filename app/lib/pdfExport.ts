import { logger } from './logger';

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

export const exportInvoiceToPDF = (invoiceData: InvoiceData) => {
  // Create a new window for PDF generation
  const printWindow = window.open('', '_blank');
  
  if (!printWindow) {
    alert('Pop-up engelleyicinizi devre dışı bırakın ve tekrar deneyin.');
    return;
  }

  const calculateSubtotal = () => {
    return invoiceData.items.reduce((sum, item) => sum + item.total, 0);
  };

  const calculateTax = () => {
    return calculateSubtotal() * (invoiceData.taxRate / 100);
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax();
  };

  // Generate HTML content for PDF
  const htmlContent = `
    <!DOCTYPE html>
    <html lang="tr">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Fatura - ${invoiceData.invoiceNumber}</title>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
        }
        
        .header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 30px;
          border-bottom: 2px solid #333;
          padding-bottom: 10px;
        }
        
        .company-info h1 {
          font-size: 28px;
          color: #333;
          margin-bottom: 10px;
        }
        
        .company-info p {
          margin-bottom: 5px;
          color: #666;
        }
        
        .invoice-details {
          text-align: right;
        }
        
        .invoice-details p {
          margin-bottom: 5px;
        }
        
        .customer-section {
          margin: 30px 0;
        }
        
        .customer-section h3 {
          font-size: 18px;
          margin-bottom: 10px;
          color: #333;
        }
        
        .customer-info p {
          margin-bottom: 5px;
          color: #666;
        }
        
        .items-table {
          width: 100%;
          border-collapse: collapse;
          margin: 30px 0;
        }
        
        .items-table th {
          background-color: #f8f9fa;
          border: 1px solid #ddd;
          padding: 12px;
          text-align: left;
          font-weight: bold;
        }
        
        .items-table td {
          border: 1px solid #ddd;
          padding: 12px;
        }
        
        .items-table tr:nth-child(even) {
          background-color: #f9f9f9;
        }
        
        .text-right {
          text-align: right;
        }
        
        .text-center {
          text-align: center;
        }
        
        .totals {
          width: 300px;
          margin-left: auto;
          margin-top: 20px;
        }
        
        .totals-row {
          display: flex;
          justify-content: space-between;
          padding: 8px 0;
          border-bottom: 1px solid #eee;
        }
        
        .totals-row.total {
          border-top: 2px solid #333;
          border-bottom: 2px solid #333;
          font-weight: bold;
          font-size: 18px;
          margin-top: 10px;
        }
        
        .notes {
          margin-top: 30px;
          padding-top: 20px;
          border-top: 1px solid #ddd;
        }
        
        .notes h4 {
          margin-bottom: 10px;
          color: #333;
        }
        
        .notes p {
          color: #666;
          white-space: pre-wrap;
        }
        
        @media print {
          body {
            margin: 0;
            padding: 0;
          }
        }
      </style>
    </head>
    <body>
      <div class="header">
        <div class="company-info">
          <h1>FATURA</h1>
          <p><strong>${invoiceData.companyName}</strong></p>
          <p>${invoiceData.companyAddress}</p>
          <p>${invoiceData.companyPhone}</p>
          <p>${invoiceData.companyEmail}</p>
        </div>
        <div class="invoice-details">
          <p><strong>Fatura No:</strong> ${invoiceData.invoiceNumber}</p>
          <p><strong>Tarih:</strong> ${invoiceData.date}</p>
          ${invoiceData.dueDate ? `<p><strong>Son Ödeme:</strong> ${invoiceData.dueDate}</p>` : ''}
        </div>
      </div>
      
      <div class="customer-section">
        <h3>Fatura Edilecek:</h3>
        <div class="customer-info">
          ${invoiceData.customerName ? `<p><strong>${invoiceData.customerName}</strong></p>` : ''}
          ${invoiceData.customerAddress ? `<p>${invoiceData.customerAddress}</p>` : ''}
          ${invoiceData.customerPhone ? `<p>${invoiceData.customerPhone}</p>` : ''}
          ${invoiceData.customerEmail ? `<p>${invoiceData.customerEmail}</p>` : ''}
        </div>
      </div>
      
      <table class="items-table">
        <thead>
          <tr>
            <th>Açıklama</th>
            <th class="text-center">Miktar</th>
            <th class="text-right">Birim Fiyat</th>
            <th class="text-right">Toplam</th>
          </tr>
        </thead>
        <tbody>
          ${invoiceData.items.map(item => `
            <tr>
              <td>${item.description}</td>
              <td class="text-center">${item.quantity}</td>
              <td class="text-right">${item.price.toFixed(2)} ₺</td>
              <td class="text-right">${item.total.toFixed(2)} ₺</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
      
      <div class="totals">
        <div class="totals-row">
          <span>Ara Toplam:</span>
          <span>${calculateSubtotal().toFixed(2)} ₺</span>
        </div>
        <div class="totals-row">
          <span>KDV (%${invoiceData.taxRate}):</span>
          <span>${calculateTax().toFixed(2)} ₺</span>
        </div>
        <div class="totals-row total">
          <span>Toplam:</span>
          <span>${calculateTotal().toFixed(2)} ₺</span>
        </div>
      </div>
      
      ${invoiceData.notes ? `
        <div class="notes">
          <h4>Notlar:</h4>
          <p>${invoiceData.notes}</p>
        </div>
      ` : ''}
      
      <script>
        window.onload = function() {
          setTimeout(() => {
            window.print();
            window.onafterprint = function() {
              window.close();
            };
          }, 500);
        };
      </script>
    </body>
    </html>
  `;

  printWindow.document.write(htmlContent);
  printWindow.document.close();
};

// Enhanced save functionality
export const saveInvoiceData = (invoiceData: InvoiceData) => {
  const dataStr = JSON.stringify(invoiceData, null, 2);
  const blob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = `fatura-${invoiceData.invoiceNumber}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

// Load invoice data from file
export const loadInvoiceData = (): Promise<InvoiceData | null> => {
  return new Promise((resolve) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    
    input.onchange = (event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (!file) {
        resolve(null);
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target?.result as string);
          resolve(data);
        } catch (error) {
          logger.error('Fatura verisi yüklenirken hata', { error, fileName: file.name });
          alert('Dosya formatı geçersiz!');
          resolve(null);
        }
      };
      reader.readAsText(file);
    };
    
    input.click();
  });
};