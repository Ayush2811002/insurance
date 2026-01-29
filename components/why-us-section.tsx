"use client"

import { motion } from "framer-motion"
import { Shield, Clock, Award, Headphones, FileCheck, IndianRupee } from "lucide-react"

const features = [
  {
    icon: Shield,
    title: "Trusted Protection",
    description: "Partner with India's top insurance providers for reliable coverage you can count on.",
    color: "bg-primary"
  },
  {
    icon: Clock,
    title: "Quick Processing",
    description: "Get your policy issued within minutes with our streamlined digital process.",
    color: "bg-amber-500"
  },
  {
    icon: Award,
    title: "Best Prices",
    description: "Compare and choose from multiple insurers to find the best rates for your needs.",
    color: "bg-accent"
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Our dedicated team is always available to assist you with any queries or claims.",
    color: "bg-rose-500"
  },
  {
    icon: FileCheck,
    title: "Easy Claims",
    description: "Hassle-free claim settlement process with 98% claim approval rate.",
    color: "bg-primary"
  },
  {
    icon: IndianRupee,
    title: "No Hidden Charges",
    description: "Transparent pricing with no hidden fees. What you see is what you pay.",
    color: "bg-accent"
  }
]

export function WhyUsSection() {
  return (
    <section id="why-us" className="py-20 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Why Choose Us
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            Why Shwetshree Enterprises?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            We&apos;re committed to making insurance simple, accessible, and trustworthy 
            for every Indian family.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <div className="bg-card rounded-2xl p-8 h-full border border-border/50 hover:border-primary/30 hover:shadow-lg transition-all duration-300">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  className={`w-14 h-14 rounded-2xl ${feature.color} flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl transition-shadow`}
                >
                  <feature.icon className="h-7 w-7 text-white" />
                </motion.div>
                <h3 className="text-xl font-semibold text-foreground mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
