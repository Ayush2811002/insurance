"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Shield, Car, Plane, CheckCircle2, ArrowRight } from "lucide-react"
import Link from "next/link"

const products = [
  {
    icon: Heart,
    title: "Health Insurance",
    description: "Comprehensive medical coverage for you and your family with cashless treatment at 10,000+ hospitals.",
    color: "bg-rose-500",
    href: "/health-insurance",
    lightColor: "bg-rose-50",
    textColor: "text-rose-600",
    features: [
      "Cashless hospitalization",
      "Pre & post hospitalization",
      "Day care procedures",
      "No claim bonus up to 100%"
    ],
    startingPrice: "₹500/month",
    popular: true
  },
  {
    icon: Shield,
    title: "Life Insurance",
    description: "Secure your family's future with term plans, endowment policies, and investment-linked plans.",
    color: "bg-primary",
    href: "/quote?type=life",
    lightColor: "bg-primary/10",
    textColor: "text-primary",
    features: [
      "Term life coverage",
      "Critical illness rider",
      "Accidental death benefit",
      "Tax benefits under 80C"
    ],
    startingPrice: "₹300/month",
    popular: false
  },
  {
    icon: Car,
    title: "Motor Insurance",
    description: "Complete protection for your car and bike with quick claims settlement and 24/7 roadside assistance.",
    color: "bg-amber-500",
    href: "/quote?type=motor",
    lightColor: "bg-amber-50",
    textColor: "text-amber-600",
    features: [
      "Third-party liability",
      "Own damage cover",
      "Personal accident cover",
      "24/7 roadside assistance"
    ],
    startingPrice: "₹2,500/year",
    popular: false
  },
  {
    icon: Plane,
    title: "Travel Insurance",
    description: "Worry-free travel with coverage for trip cancellation, medical emergencies, and lost baggage.",
    color: "bg-accent",
    href: "/quote?type=travel",
    lightColor: "bg-accent/10",
    textColor: "text-accent",
    features: [
      "Trip cancellation cover",
      "Medical emergency",
      "Lost baggage protection",
      "Flight delay compensation"
    ],
    startingPrice: "₹199/trip",
    popular: false
  }
]

export function ProductsSection() {
  return (
    <section id="products" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Our Products
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            Insurance Solutions for Every Need
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Choose from our comprehensive range of insurance products designed 
            to protect what matters most to you.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <motion.div
              key={product.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="relative h-full bg-card hover:shadow-xl transition-all duration-300 group overflow-hidden">
                {product.popular && (
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-accent text-accent-foreground">Popular</Badge>
                  </div>
                )}
                
                <CardHeader className="pb-4">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className={`w-14 h-14 rounded-2xl ${product.color} flex items-center justify-center mb-4 shadow-lg`}
                  >
                    <product.icon className="h-7 w-7 text-white" />
                  </motion.div>
                  <CardTitle className="text-xl text-foreground">{product.title}</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    {product.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="pb-4">
                  <ul className="space-y-2">
                    {product.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="h-4 w-4 text-accent flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
                
                <CardFooter className="flex flex-col gap-4 pt-4 border-t">
                  <div className="w-full flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Starting from</span>
                    <span className="text-lg font-bold text-foreground">{product.startingPrice}</span>
                  </div>
                  <Link href={product.href || "/quote"} className="w-full">
                    <Button 
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground group-hover:gap-3 transition-all"
                    >
                      Get Quote
                      <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-all -ml-4 group-hover:ml-0" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
