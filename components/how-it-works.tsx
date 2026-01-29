"use client"

import { motion } from "framer-motion"
import { Shield, FileText, Users, Building2, CheckCircle2, CreditCard, HeadphonesIcon, ArrowRight, ArrowDown } from "lucide-react"

const workflowSteps = [
  {
    id: "insurers",
    icon: Building2,
    title: "Insurance Partners",
    description: "We partner with 50+ top insurers",
    color: "bg-primary",
    items: ["HDFC Life", "ICICI Lombard", "Max Life"]
  },
  {
    id: "operations",
    icon: Shield,
    title: "Our Operations",
    description: "Seamless policy management",
    color: "bg-accent",
    items: ["Sales", "Operations", "Claims"]
  },
  {
    id: "client",
    icon: Users,
    title: "Client Interface",
    description: "Easy access & management",
    color: "bg-amber-500",
    items: ["Policy Details", "Documents", "Support"]
  },
  {
    id: "customers",
    icon: HeadphonesIcon,
    title: "You (Customer)",
    description: "Complete coverage & peace of mind",
    color: "bg-rose-500",
    items: ["Claims", "Payments", "Queries"]
  }
]

const flowItems = [
  { from: "Products", to: "Quote", direction: "right" },
  { from: "Customer Details", to: "Policy Details", direction: "right" },
  { from: "Payments", to: "Payments", direction: "both" },
  { from: "Claim Form", to: "Approval", direction: "both" },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            How It Works
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            End-to-End Digital Insurance Platform
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            We seamlessly connect you with multiple insurance providers, 
            delivering an enriched customer experience at every step.
          </p>
        </motion.div>

        {/* Interactive Workflow Diagram */}
        <div className="max-w-5xl mx-auto">
          {/* Desktop View */}
          <div className="hidden lg:block">
            <div className="relative bg-card rounded-3xl p-8 shadow-lg border border-border">
              <div className="grid grid-cols-4 gap-6">
                {workflowSteps.map((step, index) => (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.15 }}
                    className="relative"
                  >
                    <div className="flex flex-col items-center text-center">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className={`w-16 h-16 rounded-2xl ${step.color} flex items-center justify-center mb-4 shadow-lg`}
                      >
                        <step.icon className="h-8 w-8 text-white" />
                      </motion.div>
                      <h3 className="font-semibold text-foreground mb-1">{step.title}</h3>
                      <p className="text-xs text-muted-foreground mb-3">{step.description}</p>
                      
                      <div className="space-y-2 w-full">
                        {step.items.map((item, i) => (
                          <motion.div
                            key={item}
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.15 + i * 0.1 }}
                            className="flex items-center justify-center gap-2 text-sm text-muted-foreground bg-muted/50 rounded-lg py-2 px-3"
                          >
                            <CheckCircle2 className="h-3 w-3 text-accent" />
                            {item}
                          </motion.div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Connector Arrow */}
                    {index < workflowSteps.length - 1 && (
                      <div className="absolute top-8 -right-3 transform">
                        <motion.div
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          <ArrowRight className="h-6 w-6 text-primary" />
                        </motion.div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Flow Lines */}
              <div className="mt-8 pt-6 border-t border-border">
                <div className="grid grid-cols-4 gap-4 text-center">
                  {[
                    { label: "Products & Quotes", icon: FileText },
                    { label: "Customer Details", icon: Users },
                    { label: "Payments", icon: CreditCard },
                    { label: "Claims & Queries", icon: HeadphonesIcon },
                  ].map((item, index) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="flex items-center justify-center gap-2 text-sm text-muted-foreground"
                    >
                      <item.icon className="h-4 w-4 text-primary" />
                      {item.label}
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Mobile View */}
          <div className="lg:hidden space-y-4">
            {workflowSteps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-card rounded-2xl p-6 shadow-lg border border-border"
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl ${step.color} flex items-center justify-center flex-shrink-0`}>
                    <step.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-1">{step.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{step.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {step.items.map((item) => (
                        <span
                          key={item}
                          className="text-xs bg-muted/50 text-muted-foreground rounded-full px-3 py-1"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                {index < workflowSteps.length - 1 && (
                  <div className="flex justify-center mt-4">
                    <ArrowDown className="h-5 w-5 text-primary animate-bounce" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom Message */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center text-lg italic text-primary mt-12 max-w-3xl mx-auto font-medium"
        >
          {"\"End to end digital platform to enable partners to seamlessly provide multiple insurance policies at the click of a button and deliver an enriched customer experience\""}
        </motion.p>
      </div>
    </section>
  )
}
