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

/* ---------------- MEMBERS ---------------- */

const BASIC_MEMBERS = [
  { id: "self", type: "self", label: "Self", gender: "male" as const },
  { id: "wife", type: "spouse", label: "Wife", gender: "female" as const },
  { id: "husband", type: "spouse", label: "Husband", gender: "male" as const },
  { id: "son", type: "son", label: "Son", gender: "male" as const },
  {
    id: "daughter",
    type: "daughter",
    label: "Daughter",
    gender: "female" as const,
  },
  { id: "father", type: "father", label: "Father", gender: "male" as const },
  { id: "mother", type: "mother", label: "Mother", gender: "female" as const },
];

const MORE_MEMBERS = [
  {
    id: "grandfather",
    type: "grandfather",
    label: "Grandfather",
    gender: "male" as const,
  },
  {
    id: "grandmother",
    type: "grandmother",
    label: "Grandmother",
    gender: "female" as const,
  },
  {
    id: "father-in-law",
    type: "father-in-law",
    label: "Father-in-law",
    gender: "male" as const,
  },
  {
    id: "mother-in-law",
    type: "mother-in-law",
    label: "Mother-in-law",
    gender: "female" as const,
  },
  { id: "brother", type: "brother", label: "Brother", gender: "male" as const },
  { id: "sister", type: "sister", label: "Sister", gender: "female" as const },
  { id: "uncle", type: "uncle", label: "Uncle", gender: "male" as const },
  { id: "aunt", type: "aunt", label: "Aunt", gender: "female" as const },
];

/* ---------------- NEW BADGE CONFIG ---------------- */

const NEW_MEMBER_IDS = new Set(["brother", "sister", "uncle", "aunt"]);

/* ---------------- ICON ---------------- */

const getMemberIcon = (gender: "male" | "female") => {
  const bg = gender === "male" ? "bg-sky-100" : "bg-pink-100";
  const hair = gender === "male" ? "bg-amber-700" : "bg-amber-800";

  return (
    <div
      className={`w-10 h-10 sm:w-12 sm:h-12 ${bg} rounded-full flex items-center justify-center`}
    >
      <div className="relative">
        <div
          className={`w-5 h-5 ${hair} rounded-full absolute -top-1 left-1/2 -translate-x-1/2`}
        />
        <div className="w-4 h-4 bg-amber-200 rounded-full relative top-1" />
      </div>
    </div>
  );
};

/* ---------------- COMPONENT ---------------- */

export function GenderMemberStep({ data, onUpdate, onNext }: Props) {
  const [showMore, setShowMore] = useState(false);
  const [selectedMembers, setSelectedMembers] = useState<string[]>(
    data.members.map((m) => m.id),
  );

  const displayMembers =
    data.gender === "male"
      ? BASIC_MEMBERS.filter((m) => m.id !== "husband")
      : BASIC_MEMBERS.filter((m) => m.id !== "wife");

  const toggleMember = (id: string) => {
    setSelectedMembers((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id],
    );
  };

  const handleContinue = () => {
    const allMembers = [...BASIC_MEMBERS, ...MORE_MEMBERS];
    const members: Member[] = selectedMembers.map(
      (id) => allMembers.find((m) => m.id === id)!,
    );
    onUpdate({ members });
    onNext();
  };

  return (
    <div className="text-center px-3 sm:px-0">
      {/* Heading */}
      <h1 className="text-xl sm:text-3xl font-bold mb-2">
        Get <span className="text-accent">0% GST</span> now with upto{" "}
        <span className="text-accent">25% extra discount</span>
        <sup className="text-xs">**</sup>
      </h1>

      {/* Gender */}
      <div className="flex flex-col sm:flex-row justify-center gap-2 my-6">
        {(["male", "female"] as const).map((g) => (
          <button
            key={g}
            onClick={() => onUpdate({ gender: g })}
            className={`w-full sm:w-auto px-6 py-3 rounded-full font-medium ${
              data.gender === g
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground"
            }`}
          >
            {g === "male" ? "Male" : "Female"}
          </button>
        ))}
      </div>

      <p className="text-sm sm:text-lg text-muted-foreground mb-4">
        Select members you want to insure
      </p>

      {/* BASIC MEMBERS */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 max-w-xl mx-auto">
        {displayMembers.map((member) => {
          const selected = selectedMembers.includes(member.id);
          return (
            <motion.button
              key={member.id}
              onClick={() => toggleMember(member.id)}
              whileTap={{ scale: 0.97 }}
              className={`relative p-3 sm:p-4 rounded-xl border-2 ${
                selected ? "border-accent bg-accent/5" : "border-border bg-card"
              }`}
            >
              {selected && (
                <div className="absolute top-2 right-2 w-5 h-5 bg-accent rounded-full flex items-center justify-center">
                  <Check className="w-3 h-3 text-white" />
                </div>
              )}

              <div className="flex flex-col sm:flex-row items-center gap-2">
                {getMemberIcon(
                  member.id === "self" ? data.gender : member.gender,
                )}
                <span className="text-sm sm:text-base font-medium">
                  {member.label}
                </span>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* MORE MEMBERS TOGGLE */}
      <button
        onClick={() => setShowMore(!showMore)}
        className="flex items-center gap-2 mx-auto mt-6 text-primary font-medium"
      >
        <span className="w-2 h-2 bg-primary rounded-full" />
        More members
        {showMore ? <ChevronUp /> : <ChevronDown />}
      </button>

      {/* MORE MEMBERS GRID */}
      {showMore && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 max-w-xl mx-auto mt-4">
          {MORE_MEMBERS.map((member) => {
            const selected = selectedMembers.includes(member.id);
            return (
              <motion.button
                key={member.id}
                onClick={() => toggleMember(member.id)}
                className={`relative p-3 sm:p-4 rounded-xl border-2 ${
                  selected
                    ? "border-accent bg-accent/5"
                    : "border-border bg-card"
                }`}
              >
                {/* ✅ NEW badge */}
                {NEW_MEMBER_IDS.has(member.id) && (
                  <span className="absolute -top-2 -right-2 bg-accent text-white text-[10px] px-2 py-0.5 rounded-full font-medium">
                    NEW
                  </span>
                )}

                <div className="flex flex-col sm:flex-row items-center gap-2">
                  {getMemberIcon(member.gender)}
                  <span className="text-sm font-medium">{member.label}</span>
                </div>
              </motion.button>
            );
          })}
        </div>
      )}

      {/* CONTINUE */}
      <Button
        onClick={handleContinue}
        disabled={!selectedMembers.length}
        className="w-full max-w-md mx-auto mt-10 py-6 text-lg bg-orange-500 hover:bg-orange-600"
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
