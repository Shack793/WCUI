import React, { useRef } from 'react';
import QRCode from 'react-qr-code';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface QRCodeModalProps {
  url: string;
  open: boolean;
  onClose: () => void;
  onToast?: (msg: string) => void;
}

const QRCodeModal: React.FC<QRCodeModalProps> = ({ url, open, onClose, onToast }) => {
  const qrRef = useRef<HTMLDivElement>(null);

  const handleDownloadPNG = async () => {
    if (!qrRef.current) return;
    const canvas = await html2canvas(qrRef.current);
    const imgData = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = imgData;
    link.download = 'campaign-qr.png';
    link.click();
    onToast && onToast('QR code downloaded as PNG!');
  };

  const handleDownloadPDF = async () => {
    if (!qrRef.current) return;
    const canvas = await html2canvas(qrRef.current);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF();
    const width = pdf.internal.pageSize.getWidth();
    pdf.addImage(imgData, 'PNG', 10, 10, width - 20, width - 20);
    pdf.save('campaign-qr.pdf');
    onToast && onToast('QR code downloaded as PDF!');
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share via QR Code</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center space-y-4">
          <div ref={qrRef} className="bg-white p-4 rounded-lg shadow">
            <QRCode value={url} size={180} />
          </div>
          <div className="flex space-x-2">
            <Button onClick={handleDownloadPNG} variant="outline">Download as PNG</Button>
            <Button onClick={handleDownloadPDF} variant="outline">Download as PDF</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QRCodeModal;
