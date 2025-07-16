"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { CreditCard, Smartphone, Info } from "lucide-react"

interface DonationFormProps {
  campaignTitle?: string
  beneficiaryName?: string
  campaignImage?: string
}

export default function DonationForm({
  campaignTitle = "Support Gentry and Baby After Geoffrey's Passing",
  beneficiaryName = "Simon Andrews",
  campaignImage = "/placeholder.svg?height=80&width=80",
}: DonationFormProps) {
  const [selectedAmount, setSelectedAmount] = useState<string>("")
  const [customAmount, setCustomAmount] = useState<string>("")
  const [tipPercentage, setTipPercentage] = useState<number[]>([17.5])
  const [paymentMethod, setPaymentMethod] = useState<string>("momo")
  const [isAnonymous, setIsAnonymous] = useState<boolean>(false)
  const [marketingUpdates, setMarketingUpdates] = useState<boolean>(true)
  const [showCustomTip, setShowCustomTip] = useState<boolean>(false)
  const [customTip, setCustomTip] = useState<string>("")

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
    setCustomAmount("")
  }

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value)
    setSelectedAmount("")
  }

  const formatCurrency = (amount: number): string => {
    return `₵${amount.toFixed(2)}`
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

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
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      <form onSubmit={handleSubmit}>
        {/* Header Section */}
        <div className="p-6 border-b">
          <div className="flex items-start space-x-4">
            <img
              src={campaignImage || "/placeholder.svg"}
              alt="Campaign"
              className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-600 mb-1">You're supporting</p>
              <h3 className="font-semibold text-gray-900 text-sm leading-tight mb-2">{campaignTitle}</h3>
              <p className="text-xs text-gray-500">Your donation will benefit {beneficiaryName}</p>
            </div>
          </div>
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
              <h4 className="font-semibold text-gray-900">Tip GoFundMe services</h4>
              <Info className="h-4 w-4 text-gray-400" />
            </div>

            <p className="text-sm text-gray-600 leading-relaxed">
              GoFundMe has a 0% platform fee for organizers. GoFundMe will continue offering its services thanks to
              donors who will leave an optional amount here:
            </p>

            {!showCustomTip ? (
              <div className="space-y-4">
                <div className="text-center">
                  <span className="text-2xl font-bold text-gray-900">{tipPercentage[0]}%</span>
                </div>

                <Slider
                  value={tipPercentage}
                  onValueChange={setTipPercentage}
                  max={25}
                  min={0}
                  step={0.5}
                  className="w-full"
                />

                <div className="flex justify-between text-xs text-gray-500">
                  <span>0%</span>
                  <span>25%</span>
                </div>
              </div>
            ) : (
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-lg font-medium text-gray-700">
                  ₵
                </span>
                <Input
                  type="number"
                  placeholder="0.00"
                  value={customTip}
                  onChange={(e) => setCustomTip(e.target.value)}
                  className="pl-8 h-10 border-gray-300 focus:border-green-500 focus:ring-green-500"
                  min="0"
                  step="0.01"
                />
              </div>
            )}

            <button
              type="button"
              onClick={() => setShowCustomTip(!showCustomTip)}
              className="text-sm text-green-600 hover:text-green-700 underline"
            >
              {showCustomTip ? "Use percentage tip" : "Enter custom tip"}
            </button>
          </div>

          {/* Payment Method */}
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">Payment method</h4>

            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50">
                  <RadioGroupItem value="momo" id="momo" />
                  <Smartphone className="h-5 w-5 text-blue-600" />
                  <Label htmlFor="momo" className="flex-1 cursor-pointer">
                    Mobile Money
                  </Label>
                </div>

                <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50">
                  <RadioGroupItem value="card" id="card" />
                  <CreditCard className="h-5 w-5 text-gray-600" />
                  <Label htmlFor="card" className="flex-1 cursor-pointer">
                    Credit or debit
                  </Label>
                </div>
              </div>
            </RadioGroup>
          </div>

          {/* Privacy Options */}
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <Checkbox id="anonymous" checked={isAnonymous} onCheckedChange={setIsAnonymous} className="mt-0.5" />
              <div className="flex items-center space-x-2">
                <Label htmlFor="anonymous" className="text-sm text-gray-700 cursor-pointer">
                  Don't display my name publicly on the fundraiser.
                </Label>
                <Info className="h-4 w-4 text-gray-400" />
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Checkbox
                id="marketing"
                checked={marketingUpdates}
                onCheckedChange={setMarketingUpdates}
                className="mt-0.5"
              />
              <Label htmlFor="marketing" className="text-sm text-gray-700 cursor-pointer">
                Get occasional marketing updates from GoFundMe. You may unsubscribe at any time.
              </Label>
            </div>
          </div>

          {/* Donation Summary */}
          <div className="border-t pt-4 space-y-2">
            <h4 className="font-semibold text-gray-900 mb-3">Your donation</h4>

            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Your donation</span>
              <span className="font-medium">{formatCurrency(getDonationAmount())}</span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-gray-600">GoFundMe tip</span>
              <span className="font-medium">{formatCurrency(getTipAmount())}</span>
            </div>

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
            disabled={getDonationAmount() === 0}
          >
            Donate now
          </Button>

          <p className="text-xs text-gray-500 text-center leading-relaxed">
            By continuing, you agree with GoFundMe's Terms and Privacy Policy, and GoFundMe's Terms of Service.
          </p>
        </div>
      </form>
    </div>
  )
}
