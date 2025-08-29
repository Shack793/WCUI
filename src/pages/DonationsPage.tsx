"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { CreditCard, Smartphone, Info, Gift, Download, Printer } from "lucide-react"
import { paymentsApi, campaignApi, walletApi } from '@/services/api';
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import type { DebitWalletPayload } from '@/lib/types';

interface Campaign {
  id: number
  user_id: number
  category_id: number
  title: string
  slug: string
  description: string
  goal_amount: string
  current_amount: string
  start_date: string
  end_date: string
  status: string
  visibility: string
  thumbnail: string | null
  image_url: string | null
  created_at: string
  updated_at: string
  category: {
    id: number
    name: string
    description: string
  }
  user: {
    id: number
    name: string
    email: string
  }
}

interface ReceiptData {
  transactionId: string | undefined
  campaignTitle: string
  campaignOwner: string
  donorName: string
  amount: number
  tipAmount: number
  totalAmount: number
  paymentMethod: string
  network?: string
  date: string
  receiptNumber: string
}

// Fee structure based on donation amount
const FEE_STRUCTURE = {
  TIER1: {
    maxAmount: 2000,
    basePercentage: 2.5,
    maxPercentage: 25
  },
  TIER2: {
    minAmount: 2000,
    maxAmount: 5000,
    basePercentage: 2.0,
    maxPercentage: 25
  },
  TIER3: {
    minAmount: 5000,
    basePercentage: 1.8,
    maxPercentage: 25
  }
} as const;

export default function DonationForm(props: any) {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [loading, setLoading] = useState(false);
  const [donationLoading, setDonationLoading] = useState(false);
  const [checkingPaymentStatus, setCheckingPaymentStatus] = useState(false);
  const [statusCheckCancelled, setStatusCheckCancelled] = useState(false);
  const statusCheckCancelledRef = useRef(false);
  const [error, setError] = useState<string | null>(null);
  const [campaignNotFound, setCampaignNotFound] = useState(false);
  const [receiptData, setReceiptData] = useState<ReceiptData | null>(null);
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [notification, setNotification] = useState<{show: boolean, title: string, description: string, type: 'success' | 'error' | 'info'}>({
    show: false,
    title: '',
    description: '',
    type: 'info'
  });
  const [selectedAmount, setSelectedAmount] = useState<string>("")
  const [customAmount, setCustomAmount] = useState<string>("")
  const [tipPercentage, setTipPercentage] = useState<number[]>([2])
  const [paymentMethod, setPaymentMethod] = useState<string>("momo")
  const [isAnonymous, setIsAnonymous] = useState<boolean>(false)
  const [marketingUpdates, setMarketingUpdates] = useState<boolean>(true)
  const [showCustomTip, setShowCustomTip] = useState<boolean>(false)
  const [customTip, setCustomTip] = useState<string>("")
  const [momoFields, setMomoFields] = useState({
    customer: '',
    msisdn: '',
    network: '',
    narration: '',
  });
  const [nameEnquiryLoading, setNameEnquiryLoading] = useState(false);

  // Custom notification function to replace problematic toast
  const showNotification = (title: string, description: string, type: 'success' | 'error' | 'info' = 'info') => {
    setNotification({
      show: true,
      title,
      description,
      type
    });
  };

  const predefinedAmounts = ["50", "100", "200", "300", "500", "1000"]

  const getDonationAmount = (): number => {
    const amount = customAmount || selectedAmount
    return amount ? Number.parseFloat(amount) : 0
  }

  const getTipAmount = (): number => {
    if (showCustomTip && customTip) {
      return Number.parseFloat(customTip)
    }
    return (getDonationAmount() * Math.max(tipPercentage[0], calculateBaseFeePercentage(getDonationAmount()))) / 100
  }

  const getTotalAmount = (): number => {
    return getDonationAmount() + getTipAmount()
  }

  const handleAmountSelect = (amount: string) => {
    setSelectedAmount(amount)
    setCustomAmount(amount)
  }

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value)
    setSelectedAmount("")
  }

  const formatCurrency = (amount: number): string => {
    return `₵${amount.toFixed(2)}`
  }

  // Calculate base fee percentage based on amount
  const calculateBaseFeePercentage = (amount: number): number => {
    if (amount < FEE_STRUCTURE.TIER1.maxAmount) {
      return FEE_STRUCTURE.TIER1.basePercentage;
    } else if (amount <= FEE_STRUCTURE.TIER2.maxAmount) {
      return FEE_STRUCTURE.TIER2.basePercentage;
    } else {
      return FEE_STRUCTURE.TIER3.basePercentage;
    }
  };

  // Get fee tier information for tooltip
  const getFeeTierInfo = (amount: number): string => {
    if (amount < FEE_STRUCTURE.TIER1.maxAmount) {
      return `Base fee: ${FEE_STRUCTURE.TIER1.basePercentage}% (for amounts < ₵${FEE_STRUCTURE.TIER1.maxAmount})`;
    } else if (amount <= FEE_STRUCTURE.TIER2.maxAmount) {
      return `Base fee: ${FEE_STRUCTURE.TIER2.basePercentage}% (for amounts ₵${FEE_STRUCTURE.TIER2.minAmount}-${FEE_STRUCTURE.TIER2.maxAmount})`;
    } else {
      return `Base fee: ${FEE_STRUCTURE.TIER3.basePercentage}% (for amounts ≥ ₵${FEE_STRUCTURE.TIER3.minAmount})`;
    }
  };

  // Generate receipt data
  const generateReceiptData = (transactionId: string | undefined): ReceiptData => {
    const receiptNumber = `RCPT-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    return {
      transactionId,
      campaignTitle: campaign?.title || 'Unknown Campaign',
      campaignOwner: campaign?.user?.name || 'Unknown Owner',
      donorName: isAnonymous ? 'Anonymous' : (momoFields.customer || 'John Doe'),
      amount: getDonationAmount(),
      tipAmount: getTipAmount(),
      totalAmount: getTotalAmount(),
      paymentMethod: paymentMethod.toUpperCase(),
      network: paymentMethod === 'momo' ? momoFields.network : undefined,
      date: new Date().toLocaleString(),
      receiptNumber
    };
  };

  // Download receipt as PDF
  const downloadReceiptPDF = async () => {
    if (!receiptData) return;
    
    const receiptElement = document.getElementById('receipt-content');
    if (!receiptElement) return;

    try {
      const canvas = await html2canvas(receiptElement, {
        scale: 2,
        useCORS: true,
        allowTaint: true
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`donation-receipt-${receiptData.receiptNumber}.pdf`);
      showNotification('Success', 'Receipt downloaded successfully!', 'success');
    } catch (error) {
      console.error('Error generating PDF:', error);
      showNotification('Error', 'Failed to download receipt. Please try again.', 'error');
    }
  };

  // Print receipt
  const printReceipt = () => {
    const receiptElement = document.getElementById('receipt-content');
    if (!receiptElement) return;

    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    printWindow.document.write(`
      <html>
        <head>
          <title>Donation Receipt</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            .receipt { max-width: 600px; margin: 0 auto; }
            .header { text-align: center; margin-bottom: 30px; }
            .logo { font-size: 24px; font-weight: bold; color: #005da7; }
            .receipt-title { font-size: 18px; margin: 10px 0; }
            .receipt-info { margin: 20px 0; }
            .info-row { display: flex; justify-content: space-between; margin: 8px 0; }
            .label { font-weight: bold; }
            .divider { border-top: 1px solid #ccc; margin: 20px 0; }
            .total { font-size: 18px; font-weight: bold; }
            .footer { text-align: center; margin-top: 30px; color: #666; }
          </style>
        </head>
        <body>
          ${receiptElement.innerHTML}
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 250);
  };

  // Name enquiry function
  const performNameEnquiry = async (msisdn: string, network: string) => {
    if (!msisdn || !network) return;
    
    setNameEnquiryLoading(true);
    try {
      console.log('Performing name enquiry with payload:', { msisdn, network });
      const response = await walletApi.nameEnquiry({ msisdn, network });
      const data = response.data;
      console.log('Name enquiry response:', data);

      if (data.success && data.data?.name) {
        // Populate the customer name field and set narration to the customer's name
        setMomoFields(prev => ({
          ...prev,
          customer: data.data.name,
          narration: data.data.name
        }));
        console.log('Name enquiry successful, populated name:', data.data.name);
      } else {
        console.error('Name enquiry failed or no name returned:', data);
      }
    } catch (error) {
      console.error('Name enquiry error:', error);
    } finally {
      setNameEnquiryLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setDonationLoading(true);
    setStatusCheckCancelled(false); // Reset cancel state
    statusCheckCancelledRef.current = false; // Reset ref state

    if (paymentMethod === 'momo') {
      const momoPayload: DebitWalletPayload = {
        customer: momoFields.customer,
        msisdn: momoFields.msisdn,
        amount: getTotalAmount().toFixed(2),
        network: momoFields.network,
        narration: momoFields.narration,
      };
      let transactionId: string | undefined;
      let status: string = 'pending';
      let statusRes: any = null;
      let lastApiError: any = null;
      let lastToastError: string | undefined = undefined;
      let shouldAttemptGuestDonation = false;
      try {
        console.log('Sending MoMo payload:', momoPayload);
        const res = await paymentsApi.debitWallet(momoPayload);
        const data = res.data as any; // Using any to handle the actual API response structure
        console.log('MoMo API response:', data);
        
        // Check if the response indicates success (errorCode: "000")
        if (data.errorCode === "000" && data.error === null) {
          transactionId = data.data?.transactionId;
          if (transactionId) {
            console.log('Payment initiated successfully, checking phone for approval...');
            // Continue checking status with the refNo
            const refNo = data.data?.refNo || transactionId;
            console.log(`Starting continuous status check for refNo: ${refNo}`);
            console.log(`Status check URL: https://admin.myeasydonate.com/api/v1/payments/check-status/${refNo}`);
            
            setCheckingPaymentStatus(true);
            showNotification(
              'Checking Payment Status', 
              'Please wait while we verify your mobile money payment...', 
              'info'
            );
            
            let pollCount = 0;
            const maxPolls = 20; // Maximum 20 attempts (60 seconds)
            
            while (pollCount < maxPolls && !statusCheckCancelledRef.current) {
              await new Promise(r => setTimeout(r, 3000)); // Wait 3 seconds
              
              // Check if user cancelled the status checking
              if (statusCheckCancelledRef.current) {
                console.log('Status checking cancelled by user');
                break;
              }
              
              try {
                console.log(`Checking status attempt ${pollCount + 1}/${maxPolls} for refNo: ${refNo}`);
                statusRes = await paymentsApi.checkStatus(refNo);
                status = statusRes.data.data?.transactionStatus || statusRes.data.transactionStatus;
                console.log(`Status check ${pollCount + 1}: ${status}`);
                console.log('Full status response:', statusRes.data);
                
                // If we get a definitive status (SUCCESSFUL or FAILED), break the loop
                if (status === 'SUCCESSFUL' || status === 'SUCCESS' || status === 'FAILED') {
                  console.log(`Transaction ${status}, stopping status checks.`);
                  setCheckingPaymentStatus(false);
                  break;
                }
              } catch (statusErr) {
                console.error('Status check error:', statusErr);
                console.log('Status check failed, continuing...');
              }
              pollCount++;
            }
            
            // Handle different exit conditions
            if (statusCheckCancelledRef.current) {
              console.log('Status checking was cancelled by user');
              setCheckingPaymentStatus(false);
              setStatusCheckCancelled(true); // Set to true to prevent guest donation
              statusCheckCancelledRef.current = false;
              showNotification(
                'Transaction Cancelled', 
                'Status checking was cancelled. Please check your mobile money account manually.',
                'info'
              );
              // Ensure no guest donation happens for cancellations
              status = 'CANCELLED';
            } else if (pollCount >= maxPolls && (status === 'PENDING' || !status)) {
              console.log('Status check timeout: Transaction still PENDING after maximum attempts - considering as FAILED');
              setCheckingPaymentStatus(false);
              status = 'FAILED'; // Set status to FAILED after timeout
              showNotification(
                'Transaction Failed', 
                'Payment timed out. Please try again with a different payment method.',
                'error'
              );
            } else {
              setCheckingPaymentStatus(false);
            }
          } else {
            lastToastError = 'No transaction ID received';
            console.error('Payment Error:', lastToastError);
            shouldAttemptGuestDonation = true;
          }
        } else if (data.errorCode === "100") {
          // Handle error code 100 - Transaction Failed
          lastApiError = data;
          lastToastError = data.error || 'Transaction Failed';
          showNotification('Payment Error', 'Transaction Failed. Please try again or use a different payment method.', 'error');
          // Do NOT attempt guest donation for error code 100
          shouldAttemptGuestDonation = false;
        } else {
          // Handle other falcon pay errors
          lastToastError = data.error || 'Unknown error';
          console.error('Payment Error:', lastToastError);
          // Do NOT attempt guest donation for any errors
          shouldAttemptGuestDonation = false;
        }
      } catch (err: any) {
        lastApiError = err?.response?.data;
        let errorMsg = '';
        let isSpecificMoMoFailure = false;
        if (err.response) {
          const responseData = err.response.data;
          errorMsg = `API Error: ${JSON.stringify(responseData)}`;
          // Check for errorCode 100 Transaction Failed from falcon pay
          if (responseData && responseData.errorCode === '100') {
            isSpecificMoMoFailure = true;
            showNotification('Payment Error', 'Transaction Failed. Please try again or use a different payment method.', 'error');
          } else {
            console.error('Payment Error:', errorMsg);
          }
        } else if (err.request) {
          errorMsg = 'No response from server. Please check your network or server logs.';
          console.error('Payment Error:', errorMsg);
        } else {
          errorMsg = `Network Error: ${err.message}`;
          console.error('Payment Error:', errorMsg);
        }
        lastToastError = errorMsg;
        // Cache error for debugging
        try {
          localStorage.setItem('last_momo_error', JSON.stringify({ error: err, payload: momoPayload, time: new Date().toISOString() }));
        } catch (storageErr) {
          console.error('Failed to cache error:', storageErr);
        }
        // Never attempt guest donation on errors
        shouldAttemptGuestDonation = false;
      }

      // Make guest donation ONLY for SUCCESSFUL payments, not for failed or cancelled transactions
      const isSpecificMoMoFailure = lastApiError && lastApiError.errorCode === '100';
      const shouldProceedWithGuestDonation = !isSpecificMoMoFailure && !statusCheckCancelled && (
        status === 'SUCCESSFUL' || 
        status === 'SUCCESS'
        // Removed FAILED status - we don't want to record failed payments
      );
      
      if (shouldProceedWithGuestDonation && campaign?.slug) {
        try {
          console.log(`Attempting guest donation with transaction status: ${status}...`);
          const guestDonationRes = await campaignApi.donateGuest(campaign.slug, {
            payment_method_id: 1,
            amount: getDonationAmount(),
            name: isAnonymous ? 'Anonymous' : (momoFields.customer || 'John Doe'),
            email: 'john@example.com',
            is_anonymous: isAnonymous,
          });
          const guestDonationData = guestDonationRes.data;
          if (guestDonationRes.status === 200 || guestDonationRes.status === 201) {
            // Generate receipt data and show receipt modal ONLY for successful payments
            if (status === 'SUCCESSFUL' || status === 'SUCCESS') {
              const receipt = generateReceiptData(transactionId);
              setReceiptData(receipt);
              setShowReceiptModal(true);
              console.log('Guest donation successful, showing receipt...');
              
              showNotification(
                'Payment Successful!', 
                'Your donation was successful. You can now download or print your receipt.',
                'success'
              );
            } else {
              // Don't show receipt for non-successful payments
              console.log('Payment not successful, not showing receipt.');
              showNotification(
                'Donation Recorded', 
                'Your donation was recorded, but the payment was not successful.',
                'info'
              );
            }
          } else {
            console.error('Donation Record Error:', guestDonationData.message || 'Failed to record donation.');
            if (status === 'FAILED') {
              showNotification(
                'Payment Failed', 
                'Your payment was not successful. Please try again with a different payment method.',
                'error'
              );
            }
          }
        } catch (guestErr: any) {
          console.error('Donation Record Error:', guestErr.message || 'Failed to record donation.');
          showNotification(
            'Payment Error', 
            'There was an error processing your donation. Please try again later.',
            'error'
          );
        }
      } else if (status === 'PENDING') {
        console.log('Payment status is still PENDING, not attempting guest donation yet.');
        showNotification(
          'Payment Pending', 
          'Your payment is being processed. Please check your mobile money account or try again later.',
          'info'
        );
      } else if (status === 'FAILED') {
        console.log('Payment status is FAILED, showing error message.');
        showNotification(
          'Payment Failed', 
          'Your mobile money payment was declined. Please try again or use a different payment method.',
          'error'
        );
      } else {
        console.log(`Payment status is ${status || 'unknown'}, not attempting guest donation for non-final status.`);
        showNotification(
          'Payment Status Unknown', 
          'Unable to determine payment status. Please check your mobile money account or try again.',
          'info'
        );
      }

      // Store campaign ID and clear loading state
      if (campaign?.slug) {
        localStorage.setItem('last_campaign_slug', campaign.slug);
      }
      setDonationLoading(false);
      return;
    }

    // Default donation logic for other payment methods
    const donationData = {
      amount: getDonationAmount(),
      tip: getTipAmount(),
      total: getTotalAmount(),
      paymentMethod,
      isAnonymous,
      marketingUpdates,
    }

    console.log("Donation submitted:", donationData)
    
    // For card payments, simulate a successful payment
    // In a real implementation, you would process the card payment here
    // and only show the receipt on success
    const isCardPaymentSuccessful = true; // This would be determined by the card processor response
    
    if (isCardPaymentSuccessful) {
      // Generate receipt data and show receipt modal
      const receipt = generateReceiptData(undefined); // No transaction ID for card payments
      setReceiptData(receipt);
      setShowReceiptModal(true);
      showNotification(
        'Payment Successful!', 
        'Your donation was successful. You can now download or print your receipt.',
        'success'
      );
    } else {
      // Don't show receipt for failed card payments
      showNotification(
        'Payment Failed', 
        'Your card payment was not processed successfully. Please try again or use a different payment method.',
        'error'
      );
    }
    
    setDonationLoading(false);
  }

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    setError(null);
    setCampaignNotFound(false);
    campaignApi.getPublic()
      .then(res => {
        const data = res.data;
        const campaignsData = Array.isArray(data) ? data : data.data || [];
        const found = campaignsData.find((c: Campaign) => c.slug === slug);
        if (found) {
          setCampaign(found);
          setCampaignNotFound(false);
        } else {
          setError('Campaign not found');
          setCampaignNotFound(true);
        }
      })
      .catch(() => {
        setError('Failed to fetch campaign details');
        setCampaignNotFound(true);
      })
      .finally(() => setLoading(false));
  }, [slug]);

  useEffect(() => {
    if (error) {
      console.error('Campaign details error:', { error, campaign });
    }
  }, [error, campaign]);

  // Network auto-detection for MoMo and name enquiry
  useEffect(() => {
    const msisdn = momoFields.msisdn || "";
    let detectedNetwork = "";
    
    if (
      msisdn.startsWith("024") || msisdn.startsWith("025") || msisdn.startsWith("053") || msisdn.startsWith("054") || msisdn.startsWith("055") || msisdn.startsWith("059") ||
      msisdn.startsWith("+23324") || msisdn.startsWith("+23325") || msisdn.startsWith("+23353") || msisdn.startsWith("+23354") || msisdn.startsWith("+23355") || msisdn.startsWith("+23359")
    ) {
      detectedNetwork = "MTN";
    } else if (
      msisdn.startsWith("020") || msisdn.startsWith("050") ||
      msisdn.startsWith("+23320") || msisdn.startsWith("+23350")
    ) {
      detectedNetwork = "VODAFONE";
    } else if (
      msisdn.startsWith("027") || msisdn.startsWith("057") || msisdn.startsWith("026") ||
      msisdn.startsWith("+23327") || msisdn.startsWith("+23357") || msisdn.startsWith("+23326")
    ) {
      detectedNetwork = "ARTLTIGO";
    }

    // Update network field
    setMomoFields((prev) => ({ ...prev, network: detectedNetwork }));

    // Trigger name enquiry when number reaches 10 digits and network is detected
    const cleanNumber = msisdn.replace(/\+233/, '0'); // Convert +233 format to 0 format
    if (cleanNumber.length === 10 && detectedNetwork) {
      console.log('Number reached 10 digits, triggering name enquiry...');
      performNameEnquiry(cleanNumber, detectedNetwork);
    }
  }, [momoFields.msisdn]);

  // Auto-update narration when customer name changes
  useEffect(() => {
    if (momoFields.customer) {
      setMomoFields(prev => ({
        ...prev,
        narration: prev.customer
      }));
    }
  }, [momoFields.customer]);

  // Update tip percentage when donation amount changes to ensure it meets minimum fee
  useEffect(() => {
    const amount = getDonationAmount();
    const baseFee = calculateBaseFeePercentage(amount);
    if (tipPercentage[0] < baseFee) {
      setTipPercentage([baseFee]);
    }
  }, [customAmount, selectedAmount]);

  const getImageUrl = (url: string | null) => {
    if (!url) return "/placeholder.svg?height=80&width=80";
    if (url.startsWith("http")) return url;
    return `https://admin.myeasydonate.com${url}`;
  };

  // Modified payment method selection to allow deselect
  const handlePaymentMethodSelect = (method: string) => {
    setPaymentMethod((prev) => (prev === method ? '' : method));
  };

  return (
    <>
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-[#005da7] to-[#2a8fc7] text-white mb-8">
        <div className="absolute inset-0 bg-[#005da7] bg-opacity-80"></div>
        <div
          className="relative h-64 bg-cover bg-center flex items-center justify-center"
          style={{
            backgroundImage: "url('https://images.pexels.com/photos/6646917/pexels-photo-6646917.jpeg?auto=compress&cs=tinysrgb&w=1200')"
          }}
        >
          <div className="text-center z-10">
            <h1 className="text-5xl font-bold mb-4">Donations</h1>
            <nav className="text-white">
              <span className="hover:text-gray-200 cursor-pointer">Home</span>
            </nav>
          </div>
        </div>
      </div>

      {/* Conditional rendering based on campaign state */}
      {campaignNotFound ? (
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-8 text-center">
            <div className="flex justify-center mb-6">
              <Gift className="h-16 w-16 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Campaign Not Found
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              We're sorry, but we couldn't find the campaign you're looking for. 
              It may have been moved, deleted, or the link might be incorrect.
            </p>
            <div className="space-y-4">
              <Button
                onClick={() => navigate('/public-campaigns')}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                Browse All Campaigns
              </Button>
              <Button
                onClick={() => navigate('/')}
                variant="outline"
                className="w-full"
              >
                Go to Homepage
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <form onSubmit={handleSubmit}>
          {/* Campaign Details (inside form, always visible if campaign loaded) */}
          <div className="flex items-center p-4 border-b mb-4 min-h-[80px]">
            {error && (
              <div className="w-full text-center text-red-500">{error} <br />
                <span style={{ fontSize: '0.8em' }}>
                  {campaign === null ? 'campaign is null' : ''}
                  {campaign && !campaign.image_url ? 'image_url missing. ' : ''}
                  {campaign && !campaign.user ? 'user missing. ' : ''}
                  {campaign && campaign.user && !campaign.user.name ? 'user.name missing. ' : ''}
                </span>
              </div>
            )}
            {campaign ? (
              <>
                <img
                  src={getImageUrl(campaign.image_url)}
                  alt="Campaign"
                  className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                />
                <div className="ml-4 flex-1 min-w-0">
                  <p className="text-sm text-gray-600 mb-1">You're supporting</p>
                  <h3 className="font-semibold text-gray-900 text-sm leading-tight mb-2">{campaign.title}</h3>
                 {/* <p className="text-xs text-gray-500">Your donation will benefit {campaign.user?.name || 'the beneficiary'}.</p> */}
                </div>
              </>
            ) : (
              <div className="w-full text-center text-gray-400">Loading campaign info...</div>
            )}
          </div>

          <div className="p-6 space-y-6">
            {/* Donation Amount Section */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Enter your donation</h4>

              {/* Predefined Amounts */}
              <div className="grid grid-cols-3 gap-2 mb-4">
                {predefinedAmounts.map((amount) => (
                  <Button
                    key={amount}
                    type="button"
                    variant={selectedAmount === amount ? "default" : "outline"}
                    className={`h-10 text-sm ${
                      selectedAmount === amount
                        ? "bg-green-600 hover:bg-green-700 text-white"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                    onClick={() => handleAmountSelect(amount)}
                  >
                    ₵{amount}
                  </Button>
                ))}
              </div>

              {/* Custom Amount Input */}
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 flex items-center">
                  <span className="text-lg font-medium text-gray-700">₵</span>
                  <span className="text-xs text-gray-500 ml-1">GHS</span>
                </div>
                <Input
                  type="number"
                  placeholder="0.00"
                  value={customAmount}
                  onChange={(e) => handleCustomAmountChange(e.target.value)}
                  className="pl-16 pr-12 h-12 text-lg border-gray-300 focus:border-green-500 focus:ring-green-500"
                  min="1"
                  step="0.01"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <span className="text-2xl font-light text-gray-400">.00</span>
                </div>
              </div>
            </div>

            {/* Tip Section */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <h4 className="font-semibold text-gray-900">Service Fee</h4>
                <div className="relative group">
                  <Info className="h-4 w-4 text-gray-400 cursor-help" />
                  <div className="absolute left-0 bottom-full mb-2 hidden group-hover:block w-64 p-2 bg-gray-800 text-white text-xs rounded shadow-lg">
                    {getFeeTierInfo(getDonationAmount())}
                  </div>
                </div>
              </div>

              <p className="text-sm text-gray-600 leading-relaxed">
                This helps us maintain and improve our platform services. The base fee varies by donation amount, and you can choose to add more support:
              </p>

              <div className="space-y-4">
                <div className="text-center">
                  <span className="text-2xl font-bold text-gray-900">
                    {Math.max(tipPercentage[0], calculateBaseFeePercentage(getDonationAmount()))}%
                  </span>
                  <span className="text-sm text-gray-500 ml-2">
                    (Min: {calculateBaseFeePercentage(getDonationAmount())}%)
                  </span>
                </div>
                <Slider
                  value={tipPercentage}
                  onValueChange={(value: number[]) => {
                    const baseFee = calculateBaseFeePercentage(getDonationAmount());
                    setTipPercentage([Math.max(value[0], baseFee)]);
                  }}
                  max={FEE_STRUCTURE.TIER1.maxPercentage}
                  min={calculateBaseFeePercentage(getDonationAmount())}
                  step={0.5}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>2%</span>
                  <span>25%</span>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">Payment method</h4>

              <div className="space-y-3">
                <div
                  className={`flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer ${paymentMethod === 'momo' ? 'border-blue-500 bg-blue-50' : ''}`}
                  onClick={() => handlePaymentMethodSelect('momo')}
                  tabIndex={0}
                  role="button"
                  aria-pressed={paymentMethod === 'momo'}
                >
                  <RadioGroupItem value="momo" id="momo" checked={paymentMethod === 'momo'} readOnly />
                  <Smartphone className="h-5 w-5 text-blue-600" />
                  <Label htmlFor="momo" className="flex-1 cursor-pointer">
                    Mobile Money
                  </Label>
                </div>
                <div
                  className={`flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer ${paymentMethod === 'card' ? 'border-blue-500 bg-blue-50' : ''}`}
                  onClick={() => handlePaymentMethodSelect('card')}
                  tabIndex={0}
                  role="button"
                  aria-pressed={paymentMethod === 'card'}
                >
                  <RadioGroupItem value="card" id="card" checked={paymentMethod === 'card'} readOnly />
                  <CreditCard className="h-5 w-5 text-gray-600" />
                  <Label htmlFor="card" className="flex-1 cursor-pointer">
                    Credit or debit
                  </Label>
                </div>
              </div>
            </div>

            {/* MoMo Fields - only show if paymentMethod is momo */}
            {paymentMethod === 'momo' && (
              <div className="space-y-4 border rounded-lg p-4 bg-gray-50">
                <div>
                  <Label htmlFor="msisdn" className="block mb-1 font-medium">Phone Number</Label>
                  <Input
                    id="msisdn"
                    name="msisdn"
                    value={momoFields.msisdn}
                    onChange={e => setMomoFields(f => ({ ...f, msisdn: e.target.value }))}
                    placeholder="e.g. 0244123456"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="customer" className="block mb-1 font-medium">
                    Full Name {nameEnquiryLoading && <span className="text-blue-500">(Loading...)</span>}
                  </Label>
                  <Input
                    id="customer"
                    name="customer"
                    value={momoFields.customer}
                    onChange={e => setMomoFields(f => ({ ...f, customer: e.target.value }))}
                    placeholder="Full name will be auto-filled"
                    required
                    disabled={nameEnquiryLoading}
                  />
                </div>
                <div>
                  <Label htmlFor="network" className="block mb-1 font-medium">Network</Label>
                  <Input
                    id="network"
                    name="network"
                    value={momoFields.network}
                    readOnly
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="momo-amount" className="block mb-1 font-medium">Amount</Label>
                  <Input
                    id="momo-amount"
                    name="momo-amount"
                    value={formatCurrency(getTotalAmount())}
                    readOnly
                  />
                </div>
              </div>
            )}

            {/* Privacy Options */}
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <Checkbox id="anonymous" checked={isAnonymous} onChange={e => setIsAnonymous(e.target.checked)} className="mt-0.5" />
                <div className="flex items-center space-x-2">
                  <Label htmlFor="anonymous" className="text-sm text-gray-700 cursor-pointer">
                    Don't display my name publicly on the fundraiser.
                  </Label>
                  <Info className="h-4 w-4 text-gray-400" />
                </div>
              </div>

           
            </div>

            {/* Donation Summary */}
            <div className="border-t pt-4 space-y-2">
              <h4 className="font-semibold text-gray-900 mb-3">Your donation</h4>

              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Your donation</span>
                <span className="font-medium">{formatCurrency(getDonationAmount())}</span>
              </div>

            {/*  <div className="flex justify-between text-sm">
                <span className="text-gray-600">MyEasyDonate tip</span>
                <span className="font-medium">{formatCurrency(getTipAmount())}</span>
              </div>*/}

              <div className="border-t pt-2 mt-3">
                <div className="flex justify-between font-semibold">
                  <span>Total due today</span>
                  <span className="text-lg">{formatCurrency(getTotalAmount())}</span>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="space-y-3">
              <Button
                type="submit"
                className="w-full h-12 bg-green-600 hover:bg-green-700 text-white font-semibold text-lg"
                disabled={getDonationAmount() === 0 || donationLoading || checkingPaymentStatus}
              >
                {checkingPaymentStatus 
                  ? "Checking Payment Status..." 
                  : donationLoading 
                  ? "Processing..." 
                  : "Donate now"}
              </Button>
              
              {/* Cancel Button - only show when checking payment status */}
              {checkingPaymentStatus && (
                <Button
                  type="button"
                  variant="outline"
                  className="w-full h-10 border-red-300 text-red-600 hover:bg-red-50"
                  onClick={() => {
                    setStatusCheckCancelled(true);
                    statusCheckCancelledRef.current = true; // Set ref to immediately stop the loop
                    setCheckingPaymentStatus(false);
                    setDonationLoading(false);
                    showNotification(
                      'Transaction Cancelled', 
                      'Status checking cancelled. You can try again or check your mobile money account.',
                      'info'
                    );
                  }}
                >
                  Cancel Status Check
                </Button>
              )}
            </div>

            <p className="text-xs text-gray-500 text-center leading-relaxed">
              By continuing, you agree with MyEasyDonate's Terms and Privacy Policy, .
            </p>
          </div>
        </form>
        </div>
      )}

      {/* Receipt Modal */}
      {receiptData && (
        <Dialog open={showReceiptModal} onOpenChange={setShowReceiptModal}>
          <DialogContent className="sm:max-w-md max-w-[95vw] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Donation Receipt</DialogTitle>
            </DialogHeader>
            
            <div id="receipt-content" className="bg-white p-4 sm:p-6">
              {/* Receipt Header */}
              <div className="text-center mb-4 sm:mb-6">
                <div className="text-xl sm:text-2xl font-bold text-[#005da7] mb-2">MyEasyDonate</div>
                <div className="text-base sm:text-lg font-semibold text-gray-800">DONATION RECEIPT</div>
                <div className="text-xs sm:text-sm text-gray-600 mt-2">Receipt #: {receiptData.receiptNumber}</div>
                <div className="text-xs sm:text-sm text-gray-600">Date: {receiptData.date}</div>
              </div>

              {/* Receipt Details */}
              <div className="space-y-3 sm:space-y-4">
                <div className="border-t border-gray-200 pt-3 sm:pt-4">
                  <h3 className="font-semibold text-gray-800 mb-2 sm:mb-3 text-sm sm:text-base">Campaign Details</h3>
                  <div className="space-y-2 text-xs sm:text-sm">
                    <div className="flex flex-col sm:grid sm:grid-cols-2 gap-1 sm:gap-2">
                      <div className="text-gray-600">Campaign:</div>
                      <div className="text-gray-800 font-medium break-words">{receiptData.campaignTitle}</div>
                    </div>
                    <div className="flex flex-col sm:grid sm:grid-cols-2 gap-1 sm:gap-2">
                      <div className="text-gray-600">Organizer:</div>
                      <div className="text-gray-800 break-words">{receiptData.campaignOwner}</div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-3 sm:pt-4">
                  <h3 className="font-semibold text-gray-800 mb-2 sm:mb-3 text-sm sm:text-base">Donor Information</h3>
                  <div className="flex flex-col sm:grid sm:grid-cols-2 gap-1 sm:gap-2 text-xs sm:text-sm">
                    <div className="text-gray-600">Name:</div>
                    <div className="text-gray-800 break-words">{receiptData.donorName}</div>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-3 sm:pt-4">
                  <h3 className="font-semibold text-gray-800 mb-2 sm:mb-3 text-sm sm:text-base">Transaction Details</h3>
                  <div className="space-y-2 text-xs sm:text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Donation Amount:</span>
                      <span className="text-gray-800">{formatCurrency(receiptData.amount)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Platform Tip:</span>
                      <span className="text-gray-800">{formatCurrency(receiptData.tipAmount)}</span>
                    </div>
                    <div className="flex justify-between border-t pt-2 font-semibold text-sm sm:text-lg">
                      <span className="text-gray-800">Total Amount:</span>
                      <span className="text-[#005da7]">{formatCurrency(receiptData.totalAmount)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Receipt Footer */}
              <div className="text-center mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-gray-200">
                <div className="text-base sm:text-lg font-semibold text-green-600 mb-2">Thank you for your donation!</div>
                <div className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  Your contribution makes a difference and helps support this important cause.
                </div>
                <div className="text-xs text-gray-500 mt-2 sm:mt-3">
                  This is an official donation receipt from MyEasyDonate.
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col space-y-2 sm:space-y-3 mt-3 sm:mt-4">
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                <Button onClick={downloadReceiptPDF} className="w-full sm:flex-1 bg-[#005da7] hover:bg-blue-600 text-sm sm:text-base h-10 sm:h-auto">
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF
                </Button>
                <Button onClick={printReceipt} variant="outline" className="w-full sm:flex-1 text-sm sm:text-base h-10 sm:h-auto">
                  <Printer className="h-4 w-4 mr-2" />
                  Print
                </Button>
              </div>
              <Button 
                onClick={() => {
                  setShowReceiptModal(false);
                  // Redirect to campaign page after closing receipt
                  if (campaign?.slug) {
                    navigate(`/campaign/${campaign.slug}`);
                  }
                }}
                variant="outline" 
                className="w-full text-sm sm:text-base h-10 sm:h-auto"
              >
                Continue to Campaign
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Notification Dialog */}
      <AlertDialog open={notification.show} onOpenChange={(open) => setNotification(prev => ({...prev, show: open}))}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className={
              notification.type === 'success' ? 'text-green-600' :
              notification.type === 'error' ? 'text-red-600' :
              'text-blue-600'
            }>
              {notification.title}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {notification.description}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setNotification(prev => ({...prev, show: false}))}>
              OK
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
