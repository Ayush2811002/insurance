"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { QuoteData, Member } from "@/app/health-insurance/page";

interface Props {
  data: QuoteData;
  onUpdate: (data: Partial<QuoteData>) => void;
  onNext: () => void;
}

const BASIC_MEMBERS = [
  { id: "self", type: "self", label: "Self", gender: "male" as const },
  { id: "wife", type: "spouse", label: "Wife", gender: "female" as const },
  { id: "husband", type: "spouse", label: "Husband", gender: "male" as const },
  { id: "son", type: "son", label: "Son", gender: "male" as const },
  { id: "daughter", type: "daughter", label: "Daughter", gender: "female" as const },
  { id: "father", type: "father", label: "Father", gender: "male" as const },
  { id: "mother", type: "mother", label: "Mother", gender: "female" as const },
];

const MORE_MEMBERS = [
  { id: "grandfather", type: "grandfather", label: "Grandfather", gender: "male" as const },
  { id: "grandmother", type: "grandmother", label: "Grandmother", gender: "female" as const },
  { id: "father-in-law", type: "father-in-law", label: "Father-in-law", gender: "male" as const },
  { id: "mother-in-law", type: "mother-in-law", label: "Mother-in-law", gender: "female" as const },
  { id: "brother", type: "brother", label: "Brother", gender: "male" as const },
  { id: "sister", type: "sister", label: "Sister", gender: "female" as const },
  { id: "uncle", type: "uncle", label: "Uncle", gender: "male" as const },
  { id: "aunt", type: "aunt", label: "Aunt", gender: "female" as const },
];

const getMemberIcon = (type: string, gender: "male" | "female") => {
  const isMale = gender === "male";
  const bgColor = isMale ? "bg-sky-100" : "bg-pink-100";
  const hairColor = isMale ? "bg-amber-700" : "bg-amber-800";
  const skinColor = "bg-amber-200";
  
  return (
    <div className={`w-12 h-12 ${bgColor} rounded-full flex items-center justify-center overflow-hidden relative`}>
      {/* Simple avatar representation */}
      <div className="relative">
        <div className={`w-6 h-6 ${hairColor} rounded-full absolute -top-1 left-1/2 -translate-x-1/2`} />
        <div className={`w-5 h-5 ${skinColor} rounded-full relative top-1`} />
      </div>
    </div>
  );
};

export function GenderMemberStep({ data, onUpdate, onNext }: Props) {
  const [showMore, setShowMore] = useState(false);
  const [selectedMembers, setSelectedMembers] = useState<string[]>(
    data.members.map((m) => m.id)
  );

  const displayMembers = data.gender === "male" 
    ? BASIC_MEMBERS.filter(m => m.id !== "husband")
    : BASIC_MEMBERS.filter(m => m.id !== "wife");

  const toggleMember = (member: typeof BASIC_MEMBERS[0]) => {
    setSelectedMembers((prev) => {
      if (prev.includes(member.id)) {
        return prev.filter((id) => id !== member.id);
      }
      return [...prev, member.id];
    });
  };

  const handleContinue = () => {
    const allMembers = [...BASIC_MEMBERS, ...MORE_MEMBERS];
    const members: Member[] = selectedMembers.map((id) => {
      const member = allMembers.find((m) => m.id === id)!;
      return { ...member };
    });
    onUpdate({ members });
    onNext();
  };

  const isSelected = (id: string) => selectedMembers.includes(id);

  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold text-foreground mb-2">
        Get <span className="text-accent">0% GST</span> now with upto{" "}
        <span className="text-accent">25% extra discount</span>
        <sup className="text-sm">**</sup>
      </h1>

      {/* Gender Selection */}
      <div className="flex justify-center gap-2 my-8">
        <button
          onClick={() => onUpdate({ gender: "male" })}
          className={`px-8 py-3 rounded-full font-medium transition-all ${
            data.gender === "male"
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground hover:bg-muted/80"
          }`}
        >
          Male
        </button>
        <button
          onClick={() => onUpdate({ gender: "female" })}
          className={`px-8 py-3 rounded-full font-medium transition-all ${
            data.gender === "female"
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground hover:bg-muted/80"
          }`}
        >
          Female
        </button>
      </div>

      {/* Select Members */}
      <p className="text-lg text-muted-foreground mb-6">
        Select members you want to insure
      </p>

      <div className="grid grid-cols-3 gap-4 max-w-xl mx-auto">
        {displayMembers.map((member) => (
          <motion.button
            key={member.id}
            onClick={() => toggleMember(member)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`relative p-4 rounded-xl border-2 transition-all ${
              isSelected(member.id)
                ? "border-accent bg-accent/5"
                : "border-border bg-card hover:border-muted-foreground/30"
            }`}
          >
            {isSelected(member.id) && (
              <div className="absolute top-2 right-2 w-5 h-5 bg-accent rounded-full flex items-center justify-center">
                <Check className="w-3 h-3 text-white" />
              </div>
            )}
            <div className="flex items-center gap-3">
              {getMemberIcon(member.type, member.id === "self" ? data.gender : member.gender)}
              <span className={`font-medium ${isSelected(member.id) ? "text-accent" : "text-foreground"}`}>
                {member.label}
              </span>
            </div>
          </motion.button>
        ))}
      </div>

      {/* More Members Toggle */}
      <button
        onClick={() => setShowMore(!showMore)}
        className="flex items-center gap-2 mx-auto mt-6 text-primary font-medium"
      >
        <span className="w-2 h-2 bg-primary rounded-full" />
        More members
        {showMore ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>

      {/* More Members Grid */}
      {showMore && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="grid grid-cols-3 gap-4 max-w-xl mx-auto mt-4"
        >
          {MORE_MEMBERS.map((member) => (
            <motion.button
              key={member.id}
              onClick={() => toggleMember(member)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`relative p-4 rounded-xl border-2 transition-all ${
                isSelected(member.id)
                  ? "border-accent bg-accent/5"
                  : "border-border bg-card hover:border-muted-foreground/30"
              }`}
            >
              {isSelected(member.id) && (
                <div className="absolute top-2 right-2 w-5 h-5 bg-accent rounded-full flex items-center justify-center">
                  <Check className="w-3 h-3 text-white" />
                </div>
              )}
              <div className="flex items-center gap-3">
                {getMemberIcon(member.type, member.gender)}
                <span className={`font-medium text-sm ${isSelected(member.id) ? "text-accent" : "text-foreground"}`}>
                  {member.label}
                </span>
              </div>
              {["brother", "sister", "uncle", "aunt"].includes(member.id) && (
                <span className="absolute -top-2 -right-2 bg-accent text-white text-xs px-2 py-0.5 rounded-full">
                  NEW
                </span>
              )}
            </motion.button>
          ))}
        </motion.div>
      )}

      {/* Continue Button */}
      <Button
        onClick={handleContinue}
        disabled={selectedMembers.length === 0}
        className="w-full max-w-md mx-auto mt-8 py-6 text-lg bg-orange-500 hover:bg-orange-600 text-white"
      >
        Continue
      </Button>

      <p className="text-xs text-muted-foreground mt-4">
        By clicking on &quot;Continue&quot;, you agree to our{" "}
        <span className="text-primary cursor-pointer">Privacy Policy</span>,{" "}
        <span className="text-primary cursor-pointer">Terms of Use</span> &amp;{" "}
        <span className="text-primary cursor-pointer">*Disclaimer</span>
      </p>
    </div>
  );
}
