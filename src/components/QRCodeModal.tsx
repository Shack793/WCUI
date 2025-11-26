import React, { useRef, useState } from 'react';
import QRCode from 'react-qr-code';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface QRCodeModalProps {
  url: string;
  open: boolean;
  onClose: () => void;
  onToast?: (msg: string) => void;
  ussdCode?: string;
  ussdDialCode?: string;
  campaignName?: string;
  campaignImage?: string;
}

const QRCodeModal: React.FC<QRCodeModalProps> = ({
  url,
  open,
  onClose,
  onToast,
  ussdCode,
  campaignName,
  campaignImage
}) => {
  const qrRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleDownloadPNG = async () => {
    try {
      setIsLoading(true);
      if (!qrRef.current) return;
      
      const canvas = await html2canvas(qrRef.current, {
        scale: 3,
        backgroundColor: '#ffffff',
        useCORS: true,
        allowTaint: true,
        logging: false,
      });
      
      const imgData = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = imgData;
      link.download = `${campaignName || 'campaign'}-qr.png`;
      link.click();
      onToast && onToast('QR code downloaded as PNG!');
    } catch (error) {
      console.error('Error downloading PNG:', error);
      onToast && onToast('Failed to download PNG');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadPDF = async () => {
    try {
      setIsLoading(true);
      if (!qrRef.current) return;
      
      const canvas = await html2canvas(qrRef.current, {
        scale: 3,
        backgroundColor: '#ffffff',
        useCORS: true,
        allowTaint: true,
        logging: false,
      });
      
      // A5 dimensions in mm: 148 x 210
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a5'
      });
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const canvasAspectRatio = canvas.width / canvas.height;
      
      let imgWidth = pdfWidth;
      let imgHeight = pdfWidth / canvasAspectRatio;
      
      // Center the image if it doesn't fill the height
      let yPosition = 0;
      if (imgHeight > pdfHeight) {
        imgHeight = pdfHeight;
        imgWidth = pdfHeight * canvasAspectRatio;
        const xPosition = (pdfWidth - imgWidth) / 2;
        pdf.addImage(canvas.toDataURL('image/png'), 'PNG', xPosition, yPosition, imgWidth, imgHeight);
      } else {
        yPosition = (pdfHeight - imgHeight) / 2;
        const xPosition = (pdfWidth - imgWidth) / 2;
        pdf.addImage(canvas.toDataURL('image/png'), 'PNG', xPosition, yPosition, imgWidth, imgHeight);
      }
      
      pdf.save(`${campaignName || 'campaign'}-qr.pdf`);
      onToast && onToast('QR code downloaded as PDF (A5)!');
    } catch (error) {
      console.error('Error downloading PDF:', error);
      onToast && onToast('Failed to download PDF');
    } finally {
      setIsLoading(false);
    }
  };

  const fullImageUrl = campaignImage 
    ? (campaignImage.startsWith('http') ? campaignImage : `https://admin.myeasydonate.com${campaignImage}`)
    : null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-xl max-h-screen overflow-y-auto p-4 sm:p-6">
        <div className="flex flex-col items-center space-y-4">
          {/* QR Code Card - A5 Portrait Responsive (148mm x 210mm = 5.8" x 8.27") */}
          <div
            ref={qrRef}
            className="w-full max-w-sm bg-white rounded-lg shadow-2xl flex flex-col overflow-hidden border border-gray-200"
            style={{
              aspectRatio: '148 / 210', // A5 aspect ratio (portrait)
              maxWidth: '100%',
            }}
          >
            {/* Top: Campaign Image as Background Header */}
            <div
              className="relative bg-cover bg-center bg-no-repeat flex-shrink-0"
              style={{
                flex: '0 0 28%',
                backgroundImage: fullImageUrl ? `url('${fullImageUrl}')` : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              {/* Dark overlay for better contrast */}
              <div className="absolute inset-0 bg-black/20"></div>
              
              {/* Campaign Image as Logo/Badge - positioned over the background */}
              {fullImageUrl && (
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
                  <img
                    src={fullImageUrl}
                    alt={campaignName}
                    className="w-16 h-16 sm:w-24 sm:h-24 rounded-full border-4 border-white shadow-lg object-cover"
                  />
                </div>
              )}
            </div>
           
            {/* Middle: QR Code and Text Section */}
            <div className="flex-1 bg-white px-3 sm:px-5 py-3 sm:py-4 flex flex-col items-center justify-center overflow-visible">
              {/* Spacing from image logo - reduced to avoid overlapping */}
              <div className="h-6 sm:h-8"></div>
              
              {/* Campaign Name - Large and Responsive, no hiding */}
              <h2 className="text-gray-800 font-bold text-center mb-2 sm:mb-3 text-sm sm:text-base line-clamp-3 break-words px-1 leading-snug">
                {campaignName || 'Campaign'}
              </h2>
             
              {/* Instruction text - Responsive */}
              <p className="text-gray-600 uppercase text-xs font-semibold text-center mb-3 sm:mb-4 px-1 leading-tight">
                Scan to Donate
              </p>
             
              {/* QR Code - Responsive Size */}
              <div className="relative bg-gray-50 p-1.5 sm:p-2 rounded-lg border border-gray-200 flex-shrink-0">
                <QRCode 
                  value={url} 
                  size={window.innerWidth < 640 ? 65 : 80}
                  level="H" 
                />
              </div>

              {/* USSD Code if available - Responsive */}
              {ussdCode && (
                <div className="mt-2 sm:mt-3 text-center text-xs sm:text-sm flex-shrink-0">
                  <p className="text-gray-600 mb-0">Or Dial</p>
                  <p className="font-bold text-blue-600 text-xs sm:text-sm">*716*2#</p>
                </div>
              )}

              {/* Campaign Code Display - Using USSD Code as Reference Number */}
              {ussdCode && (
                <div className="mt-2 sm:mt-3 text-center text-xs sm:text-sm border-t border-gray-200 pt-2 flex-shrink-0">
                  <p className="text-gray-600 mb-0.5 text-xs">Add Code:</p>
                  <p className="font-bold text-lg sm:text-xl text-green-600 tracking-wider">{ussdCode}</p>
                </div>
              )}
            </div>
           
            {/* Bottom: Call to Action */}
            <div
              className="flex-shrink-0 bg-gradient-to-r from-blue-600 to-blue-700 text-white flex items-center justify-center p-2 sm:p-2.5 relative overflow-hidden"
              style={{
                flex: '0 0 10%',
                minHeight: '35px',
              }}
            >
              {/* Semi-transparent overlay pattern */}
              <div className="absolute inset-0 opacity-10" style={{
                backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
              }}></div>
             
              {/* Thank you text - Responsive */}
              <p className="text-white text-center z-10 px-2 font-semibold text-xs leading-tight">
                Thank You For Your Support!
              </p>
            </div>
          </div>
          
          {/* Download Buttons - Responsive */}
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 w-full max-w-sm">
            <Button 
              onClick={handleDownloadPNG} 
              variant="outline" 
              className="flex-1 text-xs sm:text-sm"
              disabled={isLoading}
            >
              {isLoading ? 'Downloading...' : 'Download PNG'}
            </Button>
            <Button 
              onClick={handleDownloadPDF} 
              variant="outline" 
              className="flex-1 text-xs sm:text-sm"
              disabled={isLoading}
            >
              {isLoading ? 'Downloading...' : 'Download PDF (A5)'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QRCodeModal;