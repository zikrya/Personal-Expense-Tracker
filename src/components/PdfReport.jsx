import React, { useState, useEffect } from 'react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { getTransactionFromDB } from '../utils/firebase-config';

const PdfReport = ({ currentUser }) => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    if (currentUser) {
      getTransactions();
    }
  }, [currentUser]);

  const getTransactions = async () => {
    const userTransactions = await getTransactionFromDB(currentUser.uid);
    setTransactions(userTransactions);
  };

  const generatePdf = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.setTextColor(255, 255, 255);
    doc.setFillColor(76, 175, 80);
    doc.rect(0, 0, 210, 20, 'F');
    doc.text('WiseWallet', 105, 14, null, null, 'center');


    const transactionRows = transactions.map(t => [
      t.description,
      `$${parseFloat(t.amount).toFixed(2)}`,
      new Date(t.date).toLocaleDateString()
    ]);

    doc.autoTable({
      startY: 30,
      head: [['Description', 'Amount', 'Date']],
      body: transactionRows,
      theme: 'striped',
      headStyles: { fillColor: [76, 175, 80] }
    });

    // Save the PDF
    doc.save(`report-${currentUser.uid}.pdf`);
  };

  return (
    <div>
<button
  className="w-full h-20 text-blue-600 hover:text-blue-700 font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
  onClick={generatePdf}
>
  Generate Monthly Report
</button>

    </div>
  );
};

export default PdfReport;



