"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { CreditCard, Smartphone, Info } from "lucide-react"
import { paymentsApi } from '@/services/api';
import { useToast } from '@/components/ui/use-toast';
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

export default function DonationForm(props: any) {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [loading, setLoading] = useState(false);
  const [donationLoading, setDonationLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
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

  const { toast } = useToast();

  const predefinedAmounts = ["50", "100", "200", "300", "500", "1000"]

  const getDonationAmount = (): number => {
    const amount = customAmount || selectedAmount
    return amount ? Number.parseFloat(amount) : 0
  }

  const getTipAmount = (): number => {
    if (showCustomTip && customTip) {
      return Number.parseFloat(customTip)
    }
    return (getDonationAmount() * tipPercentage[0]) / 100
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

  // Name enquiry function
  const performNameEnquiry = async (msisdn: string, network: string) => {
    if (!msisdn || !network) return;
    
    setNameEnquiryLoading(true);
    try {
      console.log('Performing name enquiry with payload:', { msisdn, network });
      const response = await fetch('https://crowdfundingapi.wgtesthub.com/api/v1/wallet/name-enquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          msisdn: msisdn,
          network: network
        }),
      });

      const data = await response.json();
      console.log('Name enquiry response:', data);

      if (response.ok && data.success && data.data?.name) {
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
            // Check status 2 times with the refNo
            const refNo = data.data?.refNo || transactionId;
            let pollCount = 0;
            while (pollCount < 2) {
              await new Promise(r => setTimeout(r, 3000));
              try {
                statusRes = await paymentsApi.checkStatus(refNo);
                status = statusRes.data.status || statusRes.data.transactionStatus;
                console.log(`Status check ${pollCount + 1}: ${status}`);
              } catch (statusErr) {
                console.error('Status check error:', statusErr);
                console.log('Status check failed, proceeding...');
              }
              pollCount++;
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
          toast({ title: 'Payment Error', description: 'Transaction Failed. Please try again or use a different payment method.' });
          // Do NOT attempt guest donation for error code 100
          shouldAttemptGuestDonation = false;
        } else {
          // Handle other falcon pay errors
          lastToastError = data.error || 'Unknown error';
          console.error('Payment Error:', lastToastError);
          shouldAttemptGuestDonation = true;
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
            toast({ title: 'Payment Error', description: 'Transaction Failed. Please try again or use a different payment method.' });
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
        // If error is not the specific MoMo failure (errorCode 100), attempt guest donation
        if (!isSpecificMoMoFailure) {
          shouldAttemptGuestDonation = true;
        }
      }

      // Make guest donation for successful payments or unknown errors (but NOT for error code 100)
      const isSpecificMoMoFailure = lastApiError && lastApiError.errorCode === '100';
      if (!isSpecificMoMoFailure && (shouldAttemptGuestDonation || transactionId) && campaign?.slug) {
        try {
          console.log('Attempting guest donation...');
          const guestDonationRes = await fetch(`https://crowdfundingapi.wgtesthub.com/api/v1/campaigns/${campaign.slug}/donate/guest`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              payment_method_id: 1,
              amount: getDonationAmount(),
              name: isAnonymous ? 'Anonymous' : (momoFields.customer || 'John Doe'),
              email: 'john@example.com',
              is_anonymous: isAnonymous,
            }),
          });
          const guestDonationData = await guestDonationRes.json();
          if (guestDonationRes.ok) {
            toast({ title: 'Donation Recorded', description: 'Thank you for your donation!' });
            console.log('Guest donation successful, redirecting to campaign page...');
            // Redirect to campaign detail page after successful donation
            setTimeout(() => {
              navigate(`/campaign/${campaign.slug}`);
            }, 2000); // 2 second delay to show the success message
          } else {
            console.error('Donation Record Error:', guestDonationData.message || 'Failed to record donation.');
          }
        } catch (guestErr: any) {
          console.error('Donation Record Error:', guestErr.message || 'Failed to record donation.');
        }
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
    // Handle form submission here
    alert(`Thank you for your donation of ${formatCurrency(getTotalAmount())}!`)
    setDonationLoading(false);
  }

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    setError(null);
    fetch('https://crowdfundingapi.wgtesthub.com/api/v1/campaigns/public')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch campaign');
        return res.json();
      })
      .then(data => {
        const campaignsData = Array.isArray(data) ? data : data.data || [];
        const found = campaignsData.find((c: Campaign) => c.slug === slug);
        if (found) setCampaign(found);
        else setError('Campaign not found');
      })
      .catch(() => setError('Failed to fetch campaign details'))
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

  const getImageUrl = (url: string | null) => {
    if (!url) return "/placeholder.svg?height=80&width=80";
    if (url.startsWith("http")) return url;
    return `https://crowdfundingapi.wgtesthub.com${url}`;
  };

  // Modified payment method selection to allow deselect
  const handlePaymentMethodSelect = (method: string) => {
    setPaymentMethod((prev) => (prev === method ? '' : method));
  };

  return (
    <>
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-[#37b7ff] to-[#2a8fc7] text-white mb-8">
        <div className="absolute inset-0 bg-[#37b7ff] bg-opacity-80"></div>
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
                  <p className="text-xs text-gray-500">Your donation will benefit {campaign.user?.name || 'the beneficiary'}.</p>
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
                <h4 className="font-semibold text-gray-900">Tip   services</h4>
                <Info className="h-4 w-4 text-gray-400" />
              </div>

              <p className="text-sm text-gray-600 leading-relaxed">
                WGCrowdfunding has a 0% platform fee for organizers. WGCrowdfunding will continue offering its services thanks to
                donors who will leave an optional amount here:
              </p>

              <div className="space-y-4">
                <div className="text-center">
                  <span className="text-2xl font-bold text-gray-900">{tipPercentage[0]}%</span>
                </div>
                <Slider
                  value={tipPercentage}
                  onValueChange={setTipPercentage}
                  max={25}
                  min={2}
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
                <span className="text-gray-600">WaltergateFund tip</span>
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
            <Button
              type="submit"
              className="w-full h-12 bg-green-600 hover:bg-green-700 text-white font-semibold text-lg"
              disabled={getDonationAmount() === 0 || donationLoading}
            >
              {donationLoading ? "Processing..." : "Donate now"}
            </Button>

            <p className="text-xs text-gray-500 text-center leading-relaxed">
              By continuing, you agree with WGCrowdfunding's Terms and Privacy Policy, .
            </p>
          </div>
        </form>
      </div>
    </>
  )
}
