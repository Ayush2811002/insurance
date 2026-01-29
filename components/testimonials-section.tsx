"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Quote } from "lucide-react"

const testimonials = [
  {
    name: "Rajesh Kumar",
    role: "Business Owner, Mumbai",
    content: "Shwetshree helped me find the perfect health insurance for my family. The process was so simple and the team was incredibly helpful. Highly recommended!",
    rating: 5,
    initials: "RK"
  },
  {
    name: "Priya Sharma",
    role: "IT Professional, Bangalore",
    content: "I was confused about life insurance options until I spoke with the Shwetshree team. They explained everything clearly and helped me make the right choice.",
    rating: 5,
    initials: "PS"
  },
  {
    name: "Amit Patel",
    role: "Doctor, Ahmedabad",
    content: "The claim settlement was incredibly fast! When my car met with an accident, Shwetshree handled everything smoothly. Truly stress-free experience.",
    rating: 5,
    initials: "AP"
  },
  {
    name: "Sneha Reddy",
    role: "Teacher, Hyderabad",
    content: "Best insurance advisors I have worked with. They compare multiple options and give unbiased recommendations. Saved me a lot of money on my health policy!",
    rating: 5,
    initials: "SR"
  },
  {
    name: "Vikram Singh",
    role: "Entrepreneur, Delhi",
    content: "Transparent, efficient, and trustworthy. Shwetshree Enterprises has changed my perception of insurance companies. Their 24/7 support is exceptional.",
    rating: 5,
    initials: "VS"
  },
  {
    name: "Anita Desai",
    role: "Homemaker, Pune",
    content: "I got my travel insurance in just 10 minutes! The digital process is so convenient. Will definitely use Shwetshree for all my insurance needs.",
    rating: 5,
    initials: "AD"
  }
]

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            What Our Customers Say
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Don&apos;t just take our word for it. Here&apos;s what our happy customers 
            have to say about their experience with Shwetshree Enterprises.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full bg-card hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-amber-400 fill-current" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                    ))}
                  </div>
                  
                  <div className="relative mb-6">
                    <Quote className="absolute -top-2 -left-2 h-8 w-8 text-primary/10" />
                    <p className="text-muted-foreground relative z-10 pl-4">
                      {testimonial.content}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-4 pt-4 border-t">
                    <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-semibold">
                      {testimonial.initials}
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
