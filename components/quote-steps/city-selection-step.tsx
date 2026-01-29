"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, X, Building2 } from "lucide-react";
import type { QuoteData } from "@/app/health-insurance/page";

interface Props {
  data: QuoteData;
  onUpdate: (data: Partial<QuoteData>) => void;
  onNext: () => void;
}

const POPULAR_CITIES = [
  "Mumbai",
  "Delhi",
  "Bangalore",
  "Hyderabad",
  "Chennai",
  "Kolkata",
  "Pune",
  "Ahmedabad",
  "Lucknow",
  "Jaipur",
  "Kanpur",
  "Nagpur",
  "Indore",
  "Bhopal",
  "Patna",
  "Vadodara",
  "Surat",
  "Agra",
  "Varanasi",
  "Allahabad",
];

export function CitySelectionStep({ data, onUpdate, onNext }: Props) {
  const [search, setSearch] = useState(data.city || "");
  const [selectedCity, setSelectedCity] = useState(data.city || "");

  const filteredCities = search
    ? POPULAR_CITIES.filter((city) =>
        city.toLowerCase().includes(search.toLowerCase())
      )
    : POPULAR_CITIES;

  const handleCitySelect = (city: string) => {
    setSelectedCity(city);
    setSearch(city);
  };

  const handleContinue = () => {
    onUpdate({ city: selectedCity || search });
    onNext();
  };

  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold text-foreground mb-8">
        Select your city
      </h1>

      {/* Search Input */}
      <div className="max-w-lg mx-auto relative">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search your city"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setSelectedCity("");
            }}
            className="pl-12 pr-12 h-14 text-lg border-2 focus:border-primary"
          />
          {search && (
            <button
              onClick={() => {
                setSearch("");
                setSelectedCity("");
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2"
            >
              <X className="w-5 h-5 text-muted-foreground" />
            </button>
          )}
        </div>
      </div>

      {/* Popular Cities */}
      <div className="max-w-2xl mx-auto mt-8">
        <p className="text-left font-medium text-foreground mb-4">Popular cities</p>
        <div className="flex flex-wrap gap-3">
          {filteredCities.slice(0, 12).map((city) => (
            <button
              key={city}
              onClick={() => handleCitySelect(city)}
              className={`px-4 py-2 rounded-full border-2 transition-all ${
                selectedCity === city
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border bg-card hover:border-primary/50 text-foreground"
              }`}
            >
              {city}
            </button>
          ))}
        </div>
      </div>

      {/* Info Card */}
      <div className="max-w-sm mx-auto mt-8 p-4 bg-muted rounded-xl">
        <div className="flex gap-3">
          <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center shrink-0">
            <Building2 className="w-6 h-6 text-primary" />
          </div>
          <div className="text-left">
            <p className="text-sm text-muted-foreground">
              This will help us in finding the network of{" "}
              <span className="font-semibold text-foreground">Cashless Hospitals</span> in your city
            </p>
          </div>
        </div>
      </div>

      {/* Continue Button */}
      <Button
        onClick={handleContinue}
        disabled={!selectedCity && !search}
        className="w-full max-w-md mx-auto mt-8 py-6 text-lg bg-orange-500 hover:bg-orange-600 text-white"
      >
        Continue
      </Button>
    </div>
  );
}
