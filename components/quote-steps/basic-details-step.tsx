"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { QuoteData } from "@/app/health-insurance/page";

interface Props {
  data: QuoteData;
  onUpdate: (data: Partial<QuoteData>) => void;
  onNext: () => void;
}

export function BasicDetailsStep({ data, onUpdate, onNext }: Props) {
  const [name, setName] = useState(data.name || "");
  const [phone, setPhone] = useState(data.phone || "");
  const [countryCode, setCountryCode] = useState("+91");

  const isValid = name.trim().length >= 2 && phone.length === 10;

  const handleContinue = () => {
    if (!isValid) return;
    onUpdate({ name, phone: `${countryCode}${phone}` });
    onNext();
  };

  return (
    <div className="text-center px-3 sm:px-0">
      {/* Heading */}
      <h1 className="text-xl sm:text-3xl font-bold mb-2">Save your progress</h1>

      <p className="text-sm sm:text-base text-muted-foreground mb-8">
        Get to plans directly next time you visit us
      </p>

      {/* Form */}
      <div className="max-w-lg mx-auto space-y-6">
        {/* Full Name */}
        <div className="text-left">
          <Label htmlFor="name" className="text-sm text-muted-foreground">
            Your full name
          </Label>
          <Input
            id="name"
            type="text"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="h-12 sm:h-14 text-base sm:text-lg mt-1 border-2 focus:border-primary"
          />
        </div>

        {/* Phone Number */}
        <div className="text-left">
          <Label htmlFor="phone" className="text-sm text-muted-foreground">
            Enter mobile number
          </Label>

          <div className="flex gap-2 mt-1">
            <Select value={countryCode} onValueChange={setCountryCode}>
              <SelectTrigger className="w-28 h-12 sm:h-14">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="+91">India +91</SelectItem>
                <SelectItem value="+1">USA +1</SelectItem>
                <SelectItem value="+44">UK +44</SelectItem>
              </SelectContent>
            </Select>

            <Input
              id="phone"
              type="tel"
              placeholder="Enter your mobile number"
              value={phone}
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, "").slice(0, 10);
                setPhone(val);
              }}
              className="flex-1 h-12 sm:h-14 text-base sm:text-lg border-2 focus:border-primary"
            />
          </div>
        </div>
      </div>

      {/* Continue Button (same style as other steps) */}
      <Button
        onClick={handleContinue}
        disabled={!isValid}
        className="w-full max-w-md mx-auto mt-10 py-6 text-lg bg-orange-500 hover:bg-orange-600 text-white"
      >
        Continue
      </Button>

      {/* Disclaimer */}
      <p className="text-xs text-muted-foreground mt-4 max-w-md mx-auto">
        By proceeding, I agree to receive communication from Shwetshree
        Enterprises on WhatsApp, SMS, email or calls regarding my insurance
        needs.
      </p>
    </div>
  );
}
