"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Check,
  ChevronDown,
  ChevronUp,
  Filter,
  Video,
  MessageCircle,
  Hospital,
  Star,
  X,
  Pencil,
  Phone,
  ArrowRight,
  Shield,
  Heart,
  BadgePercent,
  Info,
} from "lucide-react";
import type { QuoteData } from "@/app/health-insurance/page";
import Image from "next/image";

interface Props {
  data: QuoteData;
  onBack: () => void;
}

const INSURANCE_PLANS = [
  {
    id: 1,
    name: "Ultimate Care (Direct)",
    insurer: "Care Health",
    insurerShort: "CARE",
    insurerColor: "bg-teal-500",
    cashlessHospitals: 105,
    features: [
      "No Room Rent Limit",
      "5 lakhs per year, increasing every year",
      "Unlimited Restoration of cover",
    ],
    allFeatures: [
      "No Room Rent Limit",
      "5 lakhs per year, increasing every year",
      "Unlimited Restoration of cover",
      "Day care procedures covered",
      "Pre & post hospitalization",
      "Ambulance charges covered",
      "Free annual health checkup",
    ],
    coverOptions: ["3 Lakh", "5 Lakh", "10 Lakh", "15 Lakh", "25 Lakh", "50 Lakh"],
    defaultCover: "5 Lakh",
    premiums: { "3 Lakh": 650, "5 Lakh": 947, "10 Lakh": 1450, "15 Lakh": 1890, "25 Lakh": 2450, "50 Lakh": 3200 },
    discount: 5,
    popular: true,
    roomType: "No Limit",
    policyPeriod: "1 Year",
    planType: "Individual",
    morePlans: 9,
  },
  {
    id: 2,
    name: "ReAssure 3.0 Elite",
    insurer: "Niva Bupa",
    insurerShort: "NIVA",
    insurerColor: "bg-blue-600",
    cashlessHospitals: 94,
    features: [
      "Single Private AC room",
      "5 Lakh Renewal bonus",
      "Unlimited Restoration of cover",
    ],
    allFeatures: [
      "Single Private AC room",
      "5 Lakh Renewal bonus",
      "Unlimited Restoration of cover",
      "Maternity cover available",
      "No claim bonus up to 100%",
      "Worldwide emergency cover",
    ],
    coverOptions: ["3 Lakh", "5 Lakh", "10 Lakh", "20 Lakh", "50 Lakh"],
    defaultCover: "5 Lakh",
    premiums: { "3 Lakh": 580, "5 Lakh": 825, "10 Lakh": 1280, "20 Lakh": 2100, "50 Lakh": 3500 },
    discount: 5,
    popular: false,
    roomType: "Single Private AC",
    policyPeriod: "1 Year",
    planType: "Individual",
    morePlans: 13,
  },
  {
    id: 3,
    name: "Super Star Value",
    insurer: "Star Health",
    insurerShort: "STAR",
    insurerColor: "bg-yellow-500",
    cashlessHospitals: 96,
    features: [
      "15% co-payment applicable",
      "Single Private AC Room",
      "2.5 lakh No Claim Bonus",
    ],
    allFeatures: [
      "15% co-payment applicable",
      "Single Private AC Room",
      "2.5 lakh No Claim Bonus",
      "Restoration of cover unlimited",
      "Modern treatment covered",
      "AYUSH treatment covered",
    ],
    coverOptions: ["3 Lakh", "5 Lakh", "10 Lakh", "15 Lakh", "25 Lakh"],
    defaultCover: "5 Lakh",
    premiums: { "3 Lakh": 420, "5 Lakh": 566, "10 Lakh": 980, "15 Lakh": 1350, "25 Lakh": 1950 },
    discount: 5,
    popular: false,
    roomType: "Single Private AC",
    policyPeriod: "1 Year",
    planType: "Individual",
    morePlans: 5,
  },
  {
    id: 4,
    name: "Optima Secure",
    insurer: "HDFC Ergo",
    insurerShort: "HDFC",
    insurerColor: "bg-red-600",
    cashlessHospitals: 150,
    features: [
      "Wellness rewards",
      "Global coverage option",
      "Unlimited Online consultations",
    ],
    allFeatures: [
      "Wellness rewards",
      "Global coverage option",
      "Unlimited Online consultations",
      "No room rent capping",
      "Air ambulance cover",
      "Organ donor expenses",
    ],
    coverOptions: ["5 Lakh", "10 Lakh", "25 Lakh", "50 Lakh", "1 Crore"],
    defaultCover: "5 Lakh",
    premiums: { "5 Lakh": 899, "10 Lakh": 1400, "25 Lakh": 2200, "50 Lakh": 3100, "1 Crore": 4500 },
    discount: 7,
    popular: false,
    roomType: "No Limit",
    policyPeriod: "1 Year",
    planType: "Individual",
    morePlans: 7,
  },
  {
    id: 5,
    name: "Arogya Sanjeevani",
    insurer: "Bajaj Allianz",
    insurerShort: "BAJAJ",
    insurerColor: "bg-blue-800",
    cashlessHospitals: 180,
    features: [
      "Government approved plan",
      "Standardized coverage",
      "Affordable premiums",
    ],
    allFeatures: [
      "Government approved plan",
      "Standardized coverage",
      "Affordable premiums",
      "No co-payment under 60 years",
      "AYUSH treatment covered",
      "Cataract surgery covered",
    ],
    coverOptions: ["1 Lakh", "2 Lakh", "3 Lakh", "5 Lakh"],
    defaultCover: "5 Lakh",
    premiums: { "1 Lakh": 320, "2 Lakh": 450, "3 Lakh": 550, "5 Lakh": 720 },
    discount: 0,
    popular: false,
    roomType: "Shared Room",
    policyPeriod: "1 Year",
    planType: "Individual",
    morePlans: 3,
  },
  {
    id: 6,
    name: "Health Companion",
    insurer: "Max Bupa",
    insurerShort: "MAX",
    insurerColor: "bg-orange-500",
    cashlessHospitals: 88,
    features: [
      "Comprehensive coverage",
      "Wellness benefits",
      "No claim bonus 20%",
    ],
    allFeatures: [
      "Comprehensive coverage",
      "Wellness benefits",
      "No claim bonus 20%",
      "Second opinion benefit",
      "Home healthcare",
      "Mental health cover",
    ],
    coverOptions: ["3 Lakh", "5 Lakh", "10 Lakh", "25 Lakh"],
    defaultCover: "5 Lakh",
    premiums: { "3 Lakh": 680, "5 Lakh": 920, "10 Lakh": 1520, "25 Lakh": 2400 },
    discount: 10,
    popular: false,
    roomType: "Single Private",
    policyPeriod: "1 Year",
    planType: "Individual",
    morePlans: 4,
  },
];

const FILTER_CATEGORIES = [
  { id: "sortBy", label: "Sort by" },
  { id: "cover", label: "Cover" },
  { id: "roomRent", label: "Room rent type" },
  { id: "benefits", label: "Policy benefits" },
  { id: "premium", label: "Premium (per month)" },
  { id: "portability", label: "Portability" },
  { id: "maternity", label: "Maternity cover" },
  { id: "waitingPeriod", label: "Existing disease waiting period" },
  { id: "policyPeriod", label: "Policy period" },
];

export function PlansResultStep({ data, onBack }: Props) {
  const [coverFilter, setCoverFilter] = useState("all");
  const [sortBy, setSortBy] = useState("relevance");
  const [insurerFilter, setInsurerFilter] = useState("all");
  const [discountFilter, setDiscountFilter] = useState(false);
  const [planCovers, setPlanCovers] = useState<Record<number, string>>({});
  const [comparePlans, setComparePlans] = useState<number[]>([]);
  const [showAllFilters, setShowAllFilters] = useState(false);
  const [expandedPlans, setExpandedPlans] = useState<number[]>([]);
  const [showCompareModal, setShowCompareModal] = useState(false);
  const [activeFilterCategory, setActiveFilterCategory] = useState("sortBy");

  // Filter state for all filters modal
  const [tempSortBy, setTempSortBy] = useState("relevance");
  const [tempCoverFilter, setTempCoverFilter] = useState("all");
  const [tempRoomRent, setTempRoomRent] = useState("all");
  const [tempPremiumRange, setTempPremiumRange] = useState("all");

  const memberSummary = data.members.map((m) => `${m.label} (${m.age})`).join(", ");

  const getPlanCover = (planId: number, defaultCover: string) => {
    return planCovers[planId] || defaultCover;
  };

  const getPlanPremium = (plan: typeof INSURANCE_PLANS[0]) => {
    const cover = getPlanCover(plan.id, plan.defaultCover);
    return plan.premiums[cover as keyof typeof plan.premiums] || plan.premiums[plan.defaultCover as keyof typeof plan.premiums];
  };

  const filteredAndSortedPlans = useMemo(() => {
    let result = [...INSURANCE_PLANS];

    // Filter by cover
    if (coverFilter !== "all") {
      result = result.filter((plan) =>
        plan.coverOptions.includes(coverFilter)
      );
    }

    // Filter by insurer
    if (insurerFilter !== "all") {
      result = result.filter((plan) => plan.insurerShort === insurerFilter);
    }

    // Filter by discount
    if (discountFilter) {
      result = result.filter((plan) => plan.discount > 0);
    }

    // Sort
    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => getPlanPremium(a) - getPlanPremium(b));
        break;
      case "price-high":
        result.sort((a, b) => getPlanPremium(b) - getPlanPremium(a));
        break;
      case "hospitals":
        result.sort((a, b) => b.cashlessHospitals - a.cashlessHospitals);
        break;
      default:
        // Relevance - popular first
        result.sort((a, b) => (b.popular ? 1 : 0) - (a.popular ? 1 : 0));
    }

    return result;
  }, [coverFilter, sortBy, insurerFilter, discountFilter, planCovers]);

  const toggleCompare = (planId: number) => {
    setComparePlans((prev) => {
      if (prev.includes(planId)) {
        return prev.filter((id) => id !== planId);
      }
      if (prev.length >= 3) {
        return prev;
      }
      return [...prev, planId];
    });
  };

  const toggleExpanded = (planId: number) => {
    setExpandedPlans((prev) =>
      prev.includes(planId)
        ? prev.filter((id) => id !== planId)
        : [...prev, planId]
    );
  };

  const applyAllFilters = () => {
    setSortBy(tempSortBy);
    setCoverFilter(tempCoverFilter);
    setShowAllFilters(false);
  };

  const clearAllFilters = () => {
    setTempSortBy("relevance");
    setTempCoverFilter("all");
    setTempRoomRent("all");
    setTempPremiumRange("all");
  };

  const comparedPlanDetails = INSURANCE_PLANS.filter((p) =>
    comparePlans.includes(p.id)
  );

  return (
    <div className="pb-32">
      {/* Promo Banner */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 py-2 px-4 text-center mb-4 rounded-lg">
        <span className="text-sm">
          <span className="mr-2">🎉</span>
          All premiums shown come with{" "}
          <span className="text-orange-600 font-semibold">0% GST</span> applied
        </span>
      </div>

      {/* Header Summary */}
      <div className="flex items-center justify-between mb-6 p-4 bg-card rounded-xl border border-border">
        <div className="flex items-center gap-4 flex-wrap">
          <span className="text-sm font-medium text-foreground">
            {memberSummary}
          </span>
          <span className="text-muted-foreground">|</span>
          <span className="text-sm text-muted-foreground">{data.city}</span>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={onBack}
          className="gap-2 bg-transparent"
        >
          <Pencil className="w-4 h-4" />
          Edit search
        </Button>
      </div>

      {/* Quick Filters Bar */}
      <div className="flex flex-wrap items-center gap-3 mb-6 pb-4 border-b border-border">
        <span className="font-medium text-foreground text-sm">Quick filters</span>

        <Select value={coverFilter} onValueChange={setCoverFilter}>
          <SelectTrigger className="w-32 h-9 text-sm">
            <SelectValue placeholder="Cover" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Covers</SelectItem>
            <SelectItem value="3 Lakh">3 Lakh</SelectItem>
            <SelectItem value="5 Lakh">5 Lakh</SelectItem>
            <SelectItem value="10 Lakh">10 Lakh</SelectItem>
            <SelectItem value="25 Lakh">25 Lakh</SelectItem>
            <SelectItem value="50 Lakh">50 Lakh</SelectItem>
          </SelectContent>
        </Select>

        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-44 h-9 text-sm">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="relevance">By relevance</SelectItem>
            <SelectItem value="price-low">Premium: Low to High</SelectItem>
            <SelectItem value="price-high">Premium: High to Low</SelectItem>
            <SelectItem value="hospitals">Cashless hospitals</SelectItem>
          </SelectContent>
        </Select>

        <Button
          variant={discountFilter ? "default" : "outline"}
          size="sm"
          className={`gap-2 h-9 ${!discountFilter ? "bg-transparent" : ""}`}
          onClick={() => setDiscountFilter(!discountFilter)}
        >
          <BadgePercent className="w-4 h-4" />
          Discount
        </Button>

        <Select value={insurerFilter} onValueChange={setInsurerFilter}>
          <SelectTrigger className="w-36 h-9 text-sm">
            <SelectValue placeholder="Insurer" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Insurers</SelectItem>
            <SelectItem value="CARE">Care Health</SelectItem>
            <SelectItem value="NIVA">Niva Bupa</SelectItem>
            <SelectItem value="STAR">Star Health</SelectItem>
            <SelectItem value="HDFC">HDFC Ergo</SelectItem>
            <SelectItem value="BAJAJ">Bajaj Allianz</SelectItem>
            <SelectItem value="MAX">Max Bupa</SelectItem>
          </SelectContent>
        </Select>

        <Button
          variant="outline"
          size="sm"
          className="gap-2 h-9 bg-transparent border-primary text-primary hover:bg-primary/10"
          onClick={() => setShowAllFilters(true)}
        >
          <Filter className="w-4 h-4" />
          All filters
        </Button>
      </div>

      {/* Plans Count & View Toggle */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-1 h-6 bg-primary rounded-full" />
          <span className="font-medium text-foreground">
            {filteredAndSortedPlans.length} plans found
          </span>
        </div>
      </div>

      {/* Plans List */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Plans */}
        <div className="lg:col-span-2 space-y-4">
          {filteredAndSortedPlans.map((plan, index) => {
            const currentCover = getPlanCover(plan.id, plan.defaultCover);
            const currentPremium = getPlanPremium(plan);
            const gstPremium = Math.round(currentPremium * 1.18);
            const isExpanded = expandedPlans.includes(plan.id);
            const isComparing = comparePlans.includes(plan.id);

            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`bg-card border rounded-xl overflow-hidden hover:shadow-lg transition-all ${
                  isComparing ? "border-primary border-2" : "border-border"
                }`}
              >
                <div className="p-6">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    {/* Insurer Info */}
                    <div className="flex items-start gap-4">
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-16 h-16 ${plan.insurerColor} rounded-lg flex items-center justify-center text-white font-bold text-xs shadow-md`}
                        >
                          {plan.insurerShort}
                        </div>
                        <button className="text-xs text-primary hover:underline mt-2">
                          About Insurer &gt;
                        </button>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-semibold text-foreground text-lg">
                            {plan.name}
                          </h3>
                          {plan.popular && (
                            <span className="bg-amber-100 text-amber-700 text-xs px-2 py-0.5 rounded-full font-medium">
                              Popular
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                          <Hospital className="w-4 h-4 text-accent" />
                          <span className="font-medium text-accent">
                            {plan.cashlessHospitals}
                          </span>{" "}
                          Cashless hospitals.{" "}
                          <button className="text-primary hover:underline">
                            View list &gt;
                          </button>
                        </p>
                      </div>
                    </div>

                    {/* Pricing */}
                    <div className="flex flex-col items-end gap-1">
                      <p className="text-xs text-muted-foreground">Cover amount</p>
                      <Select
                        value={currentCover}
                        onValueChange={(value) =>
                          setPlanCovers((prev) => ({
                            ...prev,
                            [plan.id]: value,
                          }))
                        }
                      >
                        <SelectTrigger className="w-32 h-9">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {plan.coverOptions.map((cover) => (
                            <SelectItem key={cover} value={cover}>
                              ₹{cover}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-2">
                    {(isExpanded ? plan.allFeatures : plan.features).map(
                      (feature, i) => (
                        <div key={i} className="flex items-start gap-2 text-sm">
                          <Check className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                          <span className="text-muted-foreground">{feature}</span>
                        </div>
                      )
                    )}
                  </div>

                  {/* View All Features */}
                  <button
                    onClick={() => toggleExpanded(plan.id)}
                    className="text-sm text-primary hover:underline mt-3 flex items-center gap-1"
                  >
                    {isExpanded ? "View less" : "View all features"}{" "}
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </button>

                  {/* Footer */}
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between mt-6 pt-4 border-t border-border gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground">
                        Premium (1 year)
                      </p>
                      <p className="text-2xl font-bold text-foreground">
                        ₹{currentPremium.toLocaleString()}
                        <span className="text-sm font-normal text-muted-foreground">
                          /month
                        </span>
                      </p>
                      <p className="text-xs text-muted-foreground">
                        ₹{gstPremium.toLocaleString()} Incl. GST
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <div className="flex items-center gap-3">
                        {plan.discount > 0 && (
                          <span className="flex items-center gap-1 text-accent text-sm">
                            <Star className="w-4 h-4 fill-accent" />
                            Inclusive of {plan.discount}% online discount*
                          </span>
                        )}
                        <Button className="bg-amber-500 hover:bg-amber-600 text-white px-6">
                          Customize plan <ArrowRight className="w-4 h-4 ml-1" />
                        </Button>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox
                          id={`compare-${plan.id}`}
                          checked={isComparing}
                          onCheckedChange={() => toggleCompare(plan.id)}
                          disabled={!isComparing && comparePlans.length >= 3}
                        />
                        <label
                          htmlFor={`compare-${plan.id}`}
                          className="text-sm text-muted-foreground cursor-pointer"
                        >
                          Add to compare
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* More Plans from Insurer */}
                {plan.morePlans > 0 && (
                  <button className="w-full py-3 border-t border-dashed border-border text-sm text-primary hover:bg-primary/5 transition-colors">
                    View {plan.morePlans} more plans from {plan.insurer}{" "}
                    <ChevronDown className="w-4 h-4 inline" />
                  </button>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Video Call CTA */}
          <div className="bg-card border border-border rounded-xl p-6 sticky top-4">
            <div className="w-full h-28 bg-gradient-to-br from-teal-400 to-teal-600 rounded-lg mb-4 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-black/10" />
              <Video className="w-12 h-12 text-white relative z-10" />
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              See your options explained step by step with{" "}
              <span className="font-semibold text-foreground">
                screen sharing by an advisor
              </span>
              .
            </p>
            <p className="text-xs text-primary mb-3 hover:underline cursor-pointer">
              Know more &gt;
            </p>
            <Button className="w-full gap-2 bg-primary hover:bg-primary/90">
              <Video className="w-4 h-4" />
              Start video call
            </Button>
            <p className="text-xs text-muted-foreground mt-3 text-center">
              Customers on video calls finalize their plan{" "}
              <span className="font-semibold text-foreground">2x faster</span>{" "}
              and with more confidence.
            </p>
          </div>

          {/* Expert Advice */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-2">
              <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
              <span className="text-sm font-medium text-amber-700">
                6 lakh+ successful home visits done
              </span>
            </div>
            <p className="font-semibold text-foreground mb-1">
              Expert insurance advice is now available at your home!
            </p>
            <Button
              variant="outline"
              className="w-full mt-3 border-amber-500 text-amber-600 hover:bg-amber-100 bg-white"
            >
              Book a FREE slot now &gt;
            </Button>
            <button className="text-xs text-muted-foreground mt-2 w-full text-center hover:underline">
              x Not interested
            </button>
          </div>

          {/* Claims Banner */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4">
            <p className="text-sm font-semibold text-blue-900">
              ₹1500 Cr worth of claims assisted in 2023-24
            </p>
          </div>
        </div>
      </div>

      {/* Compare Tray */}
      <AnimatePresence>
        {comparePlans.length > 0 && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-2xl z-50"
          >
            <div className="max-w-6xl mx-auto px-4 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {comparedPlanDetails.map((plan, index) => (
                    <div
                      key={plan.id}
                      className="flex items-center gap-3 bg-secondary/50 rounded-lg px-4 py-2 relative"
                    >
                      <div
                        className={`w-10 h-10 ${plan.insurerColor} rounded-lg flex items-center justify-center text-white font-bold text-xs`}
                      >
                        {plan.insurerShort}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground truncate max-w-32">
                          {plan.name}
                        </p>
                      </div>
                      <button
                        onClick={() => toggleCompare(plan.id)}
                        className="absolute -top-2 -right-2 w-5 h-5 bg-muted-foreground text-white rounded-full flex items-center justify-center hover:bg-destructive transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                      {index < comparedPlanDetails.length - 1 && (
                        <span className="absolute -right-4 text-muted-foreground font-medium">
                          vs
                        </span>
                      )}
                    </div>
                  ))}
                  {comparePlans.length < 3 && (
                    <div className="w-40 h-14 border-2 border-dashed border-border rounded-lg flex items-center justify-center text-muted-foreground text-sm">
                      Add plan to compare
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <Button
                    onClick={() => setShowCompareModal(true)}
                    className="bg-amber-500 hover:bg-amber-600 text-white px-8"
                  >
                    Compare now
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => setComparePlans([])}
                    className="text-primary"
                  >
                    Close
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* All Filters Modal */}
      <Sheet open={showAllFilters} onOpenChange={setShowAllFilters}>
        <SheetContent side="right" className="w-full sm:max-w-xl p-0">
          <div className="flex h-full">
            {/* Filter Categories Sidebar */}
            <div className="w-48 bg-secondary/30 border-r border-border py-4">
              <h3 className="px-4 font-semibold text-foreground mb-4">
                Filter plans
              </h3>
              <div className="space-y-1">
                {FILTER_CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveFilterCategory(cat.id)}
                    className={`w-full text-left px-4 py-3 text-sm transition-colors ${
                      activeFilterCategory === cat.id
                        ? "bg-card text-primary font-medium border-l-2 border-primary"
                        : "text-muted-foreground hover:bg-card/50"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Filter Options */}
            <div className="flex-1 flex flex-col">
              <div className="flex-1 p-6 overflow-y-auto">
                {activeFilterCategory === "sortBy" && (
                  <div>
                    <h4 className="font-medium text-foreground mb-2">Sort by</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      Plans with your preference will be shown first
                    </p>
                    <div className="space-y-3">
                      {[
                        { value: "relevance", label: "By relevance" },
                        { value: "price-low", label: "Premium low to high" },
                        { value: "hospitals", label: "Cashless hospitals network" },
                      ].map((option) => (
                        <label
                          key={option.value}
                          className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-all ${
                            tempSortBy === option.value
                              ? "border-primary bg-primary/5"
                              : "border-border hover:border-primary/50"
                          }`}
                        >
                          <div
                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                              tempSortBy === option.value
                                ? "border-primary"
                                : "border-muted-foreground"
                            }`}
                          >
                            {tempSortBy === option.value && (
                              <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                            )}
                          </div>
                          <span className="text-foreground">{option.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {activeFilterCategory === "cover" && (
                  <div>
                    <h4 className="font-medium text-foreground mb-4">
                      Select cover amount
                    </h4>
                    <div className="space-y-3">
                      {["all", "3 Lakh", "5 Lakh", "10 Lakh", "25 Lakh", "50 Lakh"].map(
                        (cover) => (
                          <label
                            key={cover}
                            className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-all ${
                              tempCoverFilter === cover
                                ? "border-primary bg-primary/5"
                                : "border-border hover:border-primary/50"
                            }`}
                          >
                            <div
                              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                tempCoverFilter === cover
                                  ? "border-primary"
                                  : "border-muted-foreground"
                              }`}
                            >
                              {tempCoverFilter === cover && (
                                <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                              )}
                            </div>
                            <span className="text-foreground">
                              {cover === "all" ? "All Covers" : `₹${cover}`}
                            </span>
                          </label>
                        )
                      )}
                    </div>
                  </div>
                )}

                {activeFilterCategory === "roomRent" && (
                  <div>
                    <h4 className="font-medium text-foreground mb-4">
                      Room rent type
                    </h4>
                    <div className="space-y-3">
                      {["all", "No Limit", "Single Private AC", "Single Private", "Shared Room"].map(
                        (room) => (
                          <label
                            key={room}
                            className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-all ${
                              tempRoomRent === room
                                ? "border-primary bg-primary/5"
                                : "border-border hover:border-primary/50"
                            }`}
                          >
                            <div
                              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                tempRoomRent === room
                                  ? "border-primary"
                                  : "border-muted-foreground"
                              }`}
                            >
                              {tempRoomRent === room && (
                                <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                              )}
                            </div>
                            <span className="text-foreground">
                              {room === "all" ? "All Types" : room}
                            </span>
                          </label>
                        )
                      )}
                    </div>
                  </div>
                )}

                {!["sortBy", "cover", "roomRent"].includes(activeFilterCategory) && (
                  <div className="flex items-center justify-center h-40 text-muted-foreground">
                    <Info className="w-5 h-5 mr-2" />
                    More filters coming soon
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-border flex items-center justify-between">
                <Button variant="ghost" onClick={clearAllFilters}>
                  Clear filters
                </Button>
                <Button onClick={applyAllFilters} className="px-8">
                  Show {filteredAndSortedPlans.length} plans &gt;
                </Button>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Compare Modal */}
      <Dialog open={showCompareModal} onOpenChange={setShowCompareModal}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Compare Plans</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            {comparedPlanDetails.map((plan) => (
              <div key={plan.id} className="border border-border rounded-xl p-4">
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={`w-12 h-12 ${plan.insurerColor} rounded-lg flex items-center justify-center text-white font-bold text-xs`}
                  >
                    {plan.insurerShort}
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">{plan.name}</h4>
                    <p className="text-sm text-muted-foreground">{plan.insurer}</p>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Cover</span>
                    <span className="font-medium text-foreground">
                      ₹{getPlanCover(plan.id, plan.defaultCover)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Premium</span>
                    <span className="font-medium text-foreground">
                      ₹{getPlanPremium(plan).toLocaleString()}/month
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Cashless Hospitals</span>
                    <span className="font-medium text-foreground">
                      {plan.cashlessHospitals}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Room Type</span>
                    <span className="font-medium text-foreground">{plan.roomType}</span>
                  </div>
                </div>

                <div className="border-t border-border pt-4">
                  <h5 className="text-sm font-medium text-foreground mb-2">Features</h5>
                  <div className="space-y-2">
                    {plan.allFeatures.slice(0, 5).map((feature, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs">
                        <Check className="w-3 h-3 text-accent mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Button className="w-full mt-4 bg-amber-500 hover:bg-amber-600 text-white">
                  Buy Now
                </Button>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Chat Widget */}
      <div className="fixed bottom-6 right-6 z-40">
        <Button className="rounded-full w-14 h-14 bg-accent hover:bg-accent/90 shadow-lg gap-2">
          <MessageCircle className="w-6 h-6" />
        </Button>
      </div>
    </div>
  );
}
