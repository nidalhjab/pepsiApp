import * as ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

const downloadExcel = ({ transactionsData }: any) => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Transactions');
    const headers = Object.keys(transactionsData[0]);
    worksheet.addRow(headers);
    transactionsData.forEach((transaction: any) => {
        const row = headers.map((header) => transaction[header]);
        worksheet.addRow(row);
    });
    workbook.xlsx.writeBuffer().then((buffer) => {
        const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        saveAs(blob, 'transactions.xlsx');
    });
};

const ExcelDownloadButton = (transactionsData: any) => {
    const handleDownload = () => {
        downloadExcel(transactionsData);
    };

    return (
        <button onClick={handleDownload}>Download Excel</button>
    );
};

export default ExcelDownloadButton;
