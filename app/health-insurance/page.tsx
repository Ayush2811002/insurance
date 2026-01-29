"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Shield } from "lucide-react";
import Link from "next/link";
import { GenderMemberStep } from "@/components/quote-steps/gender-member-step";
import { AgeSelectionStep } from "@/components/quote-steps/age-selection-step";
import { CitySelectionStep } from "@/components/quote-steps/city-selection-step";
import { BasicDetailsStep } from "@/components/quote-steps/basic-details-step";
import { MedicalHistoryStep } from "@/components/quote-steps/medical-history-step";
import { PlansResultStep } from "@/components/quote-steps/plans-result-step";

export interface Member {
  id: string;
  type: string;
  label: string;
  age?: number;
  gender: "male" | "female";
}

export interface QuoteData {
  gender: "male" | "female";
  members: Member[];
  city: string;
  name: string;
  phone: string;
  medicalConditions: string[];
  whatsappUpdates: boolean;
}

const STEPS = [
  "Select Members",
  "Members Age",
  "Select City",
  "Your Details",
  "Medical History",
  "View Plans",
];

export default function HealthInsuranceQuote() {
  const [currentStep, setCurrentStep] = useState(0);
  const [quoteData, setQuoteData] = useState<QuoteData>({
    gender: "male",
    members: [],
    city: "",
    name: "",
    phone: "",
    medicalConditions: [],
    whatsappUpdates: true,
  });

  const progress = ((currentStep + 1) / STEPS.length) * 100;

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateQuoteData = (data: Partial<QuoteData>) => {
    setQuoteData((prev) => ({ ...prev, ...data }));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">
              Shwetshree
            </span>
          </Link>
          <div className="text-sm text-muted-foreground">
            Need help?{" "}
            <span className="text-primary font-medium cursor-pointer">
              Talk to us
            </span>
          </div>
        </div>
        {/* Progress Bar */}
        <div className="h-1.5 bg-muted">
          <motion.div
            className="h-full bg-accent"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <div className="text-center text-xs text-muted-foreground py-1 bg-muted/50">
          {Math.round(progress)}% complete
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          {currentStep > 0 && (
            <button
              onClick={handleBack}
              className="w-12 h-12 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-muted-foreground" />
            </button>
          )}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {currentStep === 0 && (
              <GenderMemberStep
                data={quoteData}
                onUpdate={updateQuoteData}
                onNext={handleNext}
              />
            )}
            {currentStep === 1 && (
              <AgeSelectionStep
                data={quoteData}
                onUpdate={updateQuoteData}
                onNext={handleNext}
              />
            )}
            {currentStep === 2 && (
              <CitySelectionStep
                data={quoteData}
                onUpdate={updateQuoteData}
                onNext={handleNext}
              />
            )}
            {currentStep === 3 && (
              <BasicDetailsStep
                data={quoteData}
                onUpdate={updateQuoteData}
                onNext={handleNext}
              />
            )}
            {currentStep === 4 && (
              <MedicalHistoryStep
                data={quoteData}
                onUpdate={updateQuoteData}
                onNext={handleNext}
              />
            )}
            {currentStep === 5 && (
              <PlansResultStep
                data={quoteData}
                onBack={() => setCurrentStep(3)}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer Stats */}
      {currentStep < 5 && (
        <footer className="fixed bottom-0 left-0 right-0 bg-muted/80 backdrop-blur-sm border-t border-border py-4">
          <div className="max-w-4xl mx-auto px-4 flex items-center justify-between text-sm">
            <p className="text-muted-foreground">
              Shwetshree is{" "}
              <span className="font-semibold text-foreground">
                one of India&apos;s leading
              </span>
              <br />
              digital insurance platform
            </p>
            <div className="flex items-center gap-8">
              <div className="text-center">
                <p className="text-lg font-bold text-primary">10,000+</p>
                <p className="text-xs text-muted-foreground">Happy Customers</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-primary">50+</p>
                <p className="text-xs text-muted-foreground">
                  Insurance Partners
                </p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-primary">98%</p>
                <p className="text-xs text-muted-foreground">
                  Claim Settlement
                </p>
              </div>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}
