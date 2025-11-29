"use client";

import { motion, Variants } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  FileCode, 
  Type, 
  Palette, 
  Component, 
  Shield, 
  Database,
  Zap } from "lucide-react";

const techStack = [
  {
    icon: <FileCode className="h-8 w-8" />,
    name: "Next.js 14",
    description: [
      "App Router for routing",
      "Server Components for performance",
      "API Routes for backend logic"
    ],
    color: "from-gray-500 to-black dark:from-gray-400 dark:to-white"
  },
  {
    icon: <Type className="h-8 w-8" />,
    name: "TypeScript",
    description: [
      "Type safety across the app",
      "Better developer experience",
      "Reduced runtime errors"
    ],
    color: "from-blue-600 to-blue-800 dark:from-blue-400 dark:to-blue-600"
  },
  {
    icon: <Palette className="h-8 w-8" />,
    name: "Tailwind CSS",
    description: [
      "Utility-first styling",
      "Responsive design",
      "Dark mode support"
    ],
    color: "from-cyan-500 to-blue-500 dark:from-cyan-400 dark:to-blue-400"
  },
  {
    icon: <Component className="h-8 w-8" />,
    name: "shadcn/ui",
    description: [
      "Reusable UI components",
      "Accessible by default",
      "Customizable design system"
    ],
    color: "from-purple-500 to-pink-500 dark:from-purple-400 dark:to-pink-400"
  },
  {
    icon: <Shield className="h-8 w-8" />,
    name: "NextAuth.js",
    description: [
      "OAuth providers support",
      "JWT session management",
      "Secure authentication flows"
    ],
    color: "from-green-500 to-emerald-600 dark:from-green-400 dark:to-emerald-500"
  },
  {
    icon: <Database className="h-8 w-8" />,
    name: "Prisma",
    description: [
      "Type-safe database client",
      "Migrations management",
      "SQL and NoSQL support"
    ],
    color: "from-blue-500 to-indigo-600 dark:from-blue-400 dark:to-indigo-500"
  }
];

export function TechStackSection() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants: Variants = {
    hidden: { 
      y: 50, 
      opacity: 0,
      scale: 0.9
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const listItemVariants: Variants = {
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-transparent to-blue-50/50 dark:to-gray-900/50">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-purple-400 mb-4">
            Built with Modern Tech Stack
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Carefully selected technologies that ensure performance, security, and developer experience
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {techStack.map((tech, index) => (
            <motion.div
              key={tech.name}
              variants={cardVariants}
              whileHover={{ 
                y: -8,
                scale: 1.02,
                transition: { 
                  duration: 0.2,
                  ease: "easeOut"
                }
              }}
              whileTap={{ 
                scale: 0.98,
                transition: {
                  duration: 0.1,
                  ease: "easeOut"
                }
              }}
            >
              <Card className="group relative h-full bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-2 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300 overflow-hidden">
                {/* Gradient Background Effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${tech.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-lg bg-gradient-to-br ${tech.color} text-white shadow-lg`}>
                      {tech.icon}
                    </div>
                    <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">
                      {tech.name}
                    </CardTitle>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <ul className="space-y-2">
                    {tech.description.map((point, pointIndex) => (
                      <motion.li 
                        key={pointIndex}
                        variants={listItemVariants}
                        initial="hidden"
                        whileInView="visible"
                        transition={{ 
                          duration: 0.3, 
                          delay: index * 0.1 + pointIndex * 0.1,
                          ease: "easeOut"
                        }}
                        viewport={{ once: true }}
                        className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300"
                      >
                        <Zap className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        {point}
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}