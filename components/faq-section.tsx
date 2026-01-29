"use client"

import { motion } from "framer-motion"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    question: "How do I buy insurance through Shwetshree Enterprises?",
    answer: "Buying insurance is simple! Just fill out the quote form with your basic details, compare plans from multiple insurers, select the best one for your needs, and complete the payment online. Your policy will be issued instantly via email."
  },
  {
    question: "What types of insurance do you offer?",
    answer: "We offer a comprehensive range of insurance products including Health Insurance, Life Insurance, Motor Insurance (Car & Bike), Travel Insurance, Home Insurance, and Business Insurance. We partner with 50+ top insurers to give you the best options."
  },
  {
    question: "How fast is the claim settlement process?",
    answer: "We pride ourselves on quick claim settlements. For cashless health claims, approval is typically within 30 minutes. For reimbursement claims, the process takes 7-15 working days depending on the insurer. Our team assists you throughout the process."
  },
  {
    question: "Is my personal information secure?",
    answer: "Absolutely! We use bank-grade encryption and security measures to protect your data. We are IRDAI registered and comply with all data protection regulations. Your information is never shared with third parties without your consent."
  },
  {
    question: "Can I compare insurance plans before buying?",
    answer: "Yes! Our platform allows you to compare plans from multiple insurers side by side. You can compare coverage, premiums, benefits, and exclusions to make an informed decision. Our advisors are also available to help you choose."
  },
  {
    question: "Do you charge any fees for your service?",
    answer: "No, our service is completely free for customers. We earn a commission from insurance companies, which is already factored into the premium. You pay the same amount whether you buy directly from the insurer or through us."
  },
  {
    question: "What if I need help with my existing policy?",
    answer: "We're here to help with all your insurance needs! Whether it's policy renewal, making changes to your coverage, filing a claim, or just understanding your policy better, our support team is available 24/7 to assist you."
  },
  {
    question: "Are there any tax benefits on insurance?",
    answer: "Yes! Health insurance premiums qualify for tax deduction under Section 80D (up to ₹25,000 for self/family, ₹50,000 for senior citizens). Life insurance premiums qualify under Section 80C (up to ₹1.5 lakh). Consult a tax advisor for specific guidance."
  }
]

export function FAQSection() {
  return (
    <section id="faq" className="py-20 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            FAQ
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Have questions? We&apos;ve got answers. If you don&apos;t find what you&apos;re 
            looking for, feel free to contact us.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card rounded-xl border border-border px-6 data-[state=open]:shadow-lg transition-shadow"
              >
                <AccordionTrigger className="text-left hover:no-underline py-5">
                  <span className="font-semibold text-foreground pr-4">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  )
}
