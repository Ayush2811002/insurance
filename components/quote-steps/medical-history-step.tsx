"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Check, Lightbulb } from "lucide-react";
import type { QuoteData } from "@/app/health-insurance/page";

interface Props {
  data: QuoteData;
  onUpdate: (data: Partial<QuoteData>) => void;
  onNext: () => void;
}

const MEDICAL_CONDITIONS = [
  { id: "diabetes", label: "Diabetes" },
  { id: "blood-pressure", label: "Blood Pressure" },
  { id: "heart-disease", label: "Heart disease" },
  { id: "surgery", label: "Any Surgery" },
  { id: "thyroid", label: "Thyroid" },
  { id: "asthma", label: "Asthma" },
  { id: "other", label: "Other disease" },
  { id: "none", label: "None of these" },
];

export function MedicalHistoryStep({ data, onUpdate, onNext }: Props) {
  const [selectedConditions, setSelectedConditions] = useState<string[]>(
    data.medicalConditions || []
  );
  const [whatsappUpdates, setWhatsappUpdates] = useState(data.whatsappUpdates);

  const toggleCondition = (conditionId: string) => {
    setSelectedConditions((prev) => {
      if (conditionId === "none") {
        return ["none"];
      }
      const filtered = prev.filter((id) => id !== "none");
      if (filtered.includes(conditionId)) {
        return filtered.filter((id) => id !== conditionId);
      }
      return [...filtered, conditionId];
    });
  };

  const handleContinue = () => {
    onUpdate({ medicalConditions: selectedConditions, whatsappUpdates });
    onNext();
  };

  const isSelected = (id: string) => selectedConditions.includes(id);

  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold text-foreground mb-2">
        Medical history
      </h1>
      <p className="text-muted-foreground mb-8">
        Do any member(s) have any existing illnesses for which they take regular medication?
      </p>

      <div className="max-w-xl mx-auto">
        <div className="grid grid-cols-2 gap-4">
          {MEDICAL_CONDITIONS.map((condition) => (
            <button
              key={condition.id}
              onClick={() => toggleCondition(condition.id)}
              className={`relative flex items-center gap-3 p-4 rounded-xl border-2 transition-all text-left ${
                isSelected(condition.id)
                  ? "border-primary bg-primary/5"
                  : "border-border bg-card hover:border-muted-foreground/30"
              }`}
            >
              <div
                className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-all ${
                  isSelected(condition.id)
                    ? "border-primary bg-primary"
                    : "border-muted-foreground/30"
                }`}
              >
                {isSelected(condition.id) && (
                  <Check className="w-4 h-4 text-primary-foreground" />
                )}
              </div>
              <span className="font-medium text-foreground">{condition.label}</span>
            </button>
          ))}
        </div>

        {/* WhatsApp Toggle */}
        <div className="flex items-center justify-center gap-3 mt-8">
          <span className="text-sm text-muted-foreground">Get Updates on WhatsApp</span>
          <Switch
            checked={whatsappUpdates}
            onCheckedChange={setWhatsappUpdates}
          />
        </div>

        {/* Info Card */}
        <div className="max-w-sm mx-auto mt-6 p-4 bg-amber-50 rounded-xl border border-amber-200">
          <div className="flex gap-3">
            <div className="w-12 h-12 bg-amber-400 rounded-full flex items-center justify-center shrink-0">
              <Lightbulb className="w-6 h-6 text-white" />
            </div>
            <div className="text-left">
              <p className="text-sm text-muted-foreground">
                We will find you plans that{" "}
                <span className="font-semibold text-foreground">cover your condition</span>.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Continue Button */}
      <Button
        onClick={handleContinue}
        disabled={selectedConditions.length === 0}
        className="w-full max-w-md mx-auto mt-8 py-6 text-lg bg-orange-500 hover:bg-orange-600 text-white"
      >
        View plans
      </Button>
    </div>
  );
}
