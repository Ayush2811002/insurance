"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Lightbulb, User } from "lucide-react";
import type { QuoteData } from "@/app/health-insurance/page";
import { motion } from "framer-motion";

interface Props {
  data: QuoteData;
  onUpdate: (data: Partial<QuoteData>) => void;
  onNext: () => void;
}

const getMemberAvatar = (type: string, gender: "male" | "female") => {
  // Determine colors based on member type and gender
  const isMale = gender === "male";
  const isParent = ["father", "mother", "grandfather", "grandmother", "father-in-law", "mother-in-law"].includes(type);
  const isChild = ["son", "daughter"].includes(type);
  
  // Hair and skin colors
  const skinColor = "bg-amber-200";
  const hairColor = isMale ? "bg-amber-900" : "bg-amber-800";
  const shirtColor = isMale ? "bg-sky-400" : "bg-pink-400";
  
  // Older members get gray hair
  const finalHairColor = isParent ? "bg-gray-400" : hairColor;
  
  return (
    <div className={`w-14 h-14 ${isMale ? "bg-sky-100" : "bg-pink-100"} rounded-full flex items-center justify-center overflow-hidden relative`}>
      {/* Head/Face */}
      <div className="relative">
        {/* Hair */}
        <div className={`absolute -top-1 left-1/2 -translate-x-1/2 w-6 h-3 ${finalHairColor} rounded-t-full`} />
        {/* Face */}
        <div className={`w-6 h-6 ${skinColor} rounded-full`} />
        {/* Eyes */}
        <div className="absolute top-2 left-1 w-1 h-1 bg-gray-700 rounded-full" />
        <div className="absolute top-2 right-1 w-1 h-1 bg-gray-700 rounded-full" />
      </div>
      {/* Body/Shirt */}
      <div className={`absolute bottom-0 w-10 h-4 ${shirtColor} rounded-t-full`} />
    </div>
  );
};

const getMemberLabel = (type: string, gender: "male" | "female") => {
  const labels: Record<string, string> = {
    self: "Your age",
    spouse: gender === "male" ? "Wife's age" : "Husband's age",
    son: "Son's age",
    daughter: "Daughter's age",
    father: "Father's age",
    mother: "Mother's age",
    grandfather: "Grandfather's age",
    grandmother: "Grandmother's age",
    "father-in-law": "Father-in-law's age",
    "mother-in-law": "Mother-in-law's age",
    brother: "Brother's age",
    sister: "Sister's age",
    uncle: "Uncle's age",
    aunt: "Aunt's age",
  };
  return labels[type] || `${type}'s age`;
};

export function AgeSelectionStep({ data, onUpdate, onNext }: Props) {
  const [ages, setAges] = useState<Record<string, number>>(
    data.members.reduce((acc, m) => ({ ...acc, [m.id]: m.age || 25 }), {})
  );

  const handleAgeChange = (memberId: string, age: string) => {
    setAges((prev) => ({ ...prev, [memberId]: parseInt(age) }));
  };

  const handleContinue = () => {
    const updatedMembers = data.members.map((m) => ({
      ...m,
      age: ages[m.id] || 25,
    }));
    onUpdate({ members: updatedMembers });
    onNext();
  };

  const allAgesSelected = data.members.every((m) => ages[m.id]);

  // Get age range based on member type
  const getAgeRange = (type: string) => {
    if (["son", "daughter"].includes(type)) {
      return { min: 0, max: 30 };
    }
    if (["father", "mother", "father-in-law", "mother-in-law"].includes(type)) {
      return { min: 40, max: 100 };
    }
    if (["grandfather", "grandmother"].includes(type)) {
      return { min: 55, max: 100 };
    }
    return { min: 18, max: 100 };
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center"
    >
      <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-8">
        Select age of covered member(s)
      </h1>

      <div className="max-w-lg mx-auto space-y-4">
        {data.members.map((member, index) => {
          const ageRange = getAgeRange(member.type);
          return (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-4 bg-card p-3 rounded-xl border border-border"
            >
              {getMemberAvatar(member.type, member.gender)}
              <Select
                value={ages[member.id]?.toString()}
                onValueChange={(val) => handleAgeChange(member.id, val)}
              >
                <SelectTrigger className="flex-1 h-14 text-left border-0 bg-transparent">
                  <SelectValue placeholder={getMemberLabel(member.type, data.gender)}>
                    {ages[member.id] ? `${ages[member.id]} yr` : getMemberLabel(member.type, data.gender)}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent className="max-h-60">
                  {Array.from({ length: ageRange.max - ageRange.min + 1 }, (_, i) => i + ageRange.min).map((age) => (
                    <SelectItem key={age} value={age.toString()}>
                      {age} yr
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </motion.div>
          );
        })}
      </div>

      {/* Info Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="max-w-sm mx-auto mt-8 p-4 bg-amber-50 rounded-xl border border-amber-200"
      >
        <div className="flex gap-3">
          <div className="w-12 h-12 bg-amber-400 rounded-full flex items-center justify-center shrink-0">
            <Lightbulb className="w-6 h-6 text-white" />
          </div>
          <div className="text-left">
            <p className="font-semibold text-foreground">Get best pricing</p>
            <p className="text-sm text-muted-foreground">
              This will help us in calculating the premium & discounts for your family member(s)
            </p>
          </div>
        </div>
      </motion.div>

      {/* Continue Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <Button
          onClick={handleContinue}
          disabled={!allAgesSelected}
          className="w-full max-w-md mx-auto mt-8 py-6 text-lg bg-orange-500 hover:bg-orange-600 text-white disabled:opacity-50"
        >
          Continue &gt;
        </Button>
      </motion.div>
    </motion.div>
  );
}
