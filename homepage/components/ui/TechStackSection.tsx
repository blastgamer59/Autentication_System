"use client";

import { motion, Variants } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const techStack = [
  {
    icon: (
      <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M18.6656 21.9783C17.8993 22.6223 16.6289 22.3807 16.1392 21.5392C15.6495 20.6977 15.6495 19.3023 16.1392 18.4608C16.6289 17.6193 17.8993 17.3777 18.6656 18.0217C19.4319 18.6656 19.4319 19.3344 18.6656 19.9783C18.6656 20.6223 17.8993 20.3807 17.4096 19.5392C16.9199 18.6977 16.9199 17.3023 17.4096 16.4608C17.8993 15.6193 19.1697 15.3777 19.936 16.0217C21.4685 17.3095 21.4685 20.6905 19.936 21.9783C18.4035 23.2661 16.0965 23.2661 14.564 21.9783C13.0315 20.6905 13.0315 17.3095 14.564 16.0217C15.3303 15.3777 16.6007 15.6193 17.0904 16.4608C17.5801 17.3023 17.5801 18.6977 17.0904 19.5392C16.6007 20.3807 15.3303 20.6223 14.564 19.9783C13.7977 19.3344 13.7977 18.6656 14.564 18.0217C15.3303 17.3777 16.6007 17.6193 17.0904 18.4608C17.5801 19.3023 17.5801 20.6977 17.0904 21.5392C16.6007 22.3807 15.3303 22.6223 14.564 21.9783Z" fill="currentColor"/>
        <path d="M12 22C6.477 22 2 17.523 2 12C2 6.477 6.477 2 12 2C17.523 2 22 6.477 22 12C22 17.523 17.523 22 12 22ZM12 20C16.418 20 20 16.418 20 12C20 7.582 16.418 4 12 4C7.582 4 4 7.582 4 12C4 16.418 7.582 20 12 20Z" fill="currentColor"/>
      </svg>
    ),
    name: "Next.js",
    description: [
      "App Router for routing",
      "Server Components for performance",
      "API Routes for backend logic"
    ],
    color: "from-gray-500 to-black dark:from-gray-400 dark:to-white"
  },
  {
    icon: (
      <svg className="h-8 w-8" viewBox="0 0 24 24" aria-hidden>
        <rect width="24" height="24" rx="4" fill="#3178C6"/>
        <path d="M12.672 12.0002V11.3282H16.992V12.0002H15.264V17.3282H14.4V12.0002H12.672Z" fill="white"/>
        <path d="M14.8801 6.72021H16.3201V9.40821H16.4161L18.1441 6.72021H19.7761L17.7601 9.79221L19.9201 13.0562H18.2401L16.8001 10.3682L16.3201 11.1362V13.0562H14.8801V6.72021Z" fill="white"/>
        <path d="M9.888 12.6722C9.888 13.8242 10.368 14.4962 11.616 14.9762L12.48 15.3122C13.92 15.8402 14.592 16.7042 14.592 18.0482C14.592 19.8722 13.152 20.8322 10.944 20.8322C9.456 20.8322 8.208 20.4482 7.296 19.6802L8.016 18.5282C8.736 19.1042 9.648 19.4402 10.656 19.4402C11.808 19.4402 12.48 18.9602 12.48 18.0482C12.48 17.0882 11.904 16.7042 10.752 16.2722L9.888 15.9362C8.448 15.4082 7.776 14.5922 7.776 13.2482C7.776 11.5202 9.12 10.5602 11.232 10.5602C12.336 10.5602 13.344 10.8482 14.112 11.4722L13.44 12.6242C12.816 12.1442 12.048 11.9042 11.232 11.9042C10.176 11.9042 9.552 12.3842 9.552 13.2482C9.552 13.3442 9.552 13.5362 9.6 13.6322C9.696 13.7282 9.792 13.7282 9.888 13.7282C10.08 13.7282 10.224 13.6802 10.368 13.6322C10.512 13.5842 10.608 13.5362 10.704 13.5362C10.8 13.4882 10.896 13.4882 10.992 13.4882C11.184 13.4882 11.328 13.5842 11.424 13.7282C11.52 13.8722 11.568 14.0642 11.568 14.3042C11.568 14.4962 11.52 14.6882 11.424 14.8322C11.328 14.9762 11.184 15.0722 10.992 15.0722C10.8 15.0722 10.656 15.0242 10.512 14.9762C10.368 14.9282 10.272 14.8802 10.176 14.8802C10.08 14.8322 9.984 14.8322 9.888 14.8322C9.792 14.8322 9.696 14.8802 9.6 14.9282C9.552 15.0242 9.552 15.1202 9.552 15.2162C9.552 15.3122 9.552 15.4082 9.552 15.5042V16.1282C9.552 16.2242 9.552 16.3202 9.6 16.4162C9.696 16.5122 9.792 16.5122 9.888 16.5122C10.08 16.5122 10.224 16.4642 10.368 16.4162C10.512 16.3682 10.608 16.3202 10.704 16.3202C10.8 16.2722 10.896 16.2722 10.992 16.2722C11.184 16.2722 11.328 16.3682 11.424 16.5122C11.52 16.6562 11.568 16.8482 11.568 17.0882C11.568 17.2802 11.52 17.4722 11.424 17.6162C11.328 17.7602 11.184 17.8562 10.992 17.8562C10.8 17.8562 10.656 17.8082 10.512 17.7602C10.368 17.7122 10.272 17.6642 10.176 17.6642C10.08 17.6162 9.984 17.6162 9.888 17.6162C9.792 17.6162 9.696 17.6642 9.6 17.7122C9.552 17.8082 9.552 17.9042 9.552 18.0002C9.552 18.0962 9.552 18.1922 9.552 18.2882V18.9122C9.552 19.0082 9.552 19.1042 9.6 19.2002C9.696 19.2962 9.792 19.2962 9.888 19.2962C10.08 19.2962 10.224 19.2482 10.368 19.2002C10.512 19.1522 10.608 19.1042 10.704 19.1042C10.8 19.0562 10.896 19.0562 10.992 19.0562C11.184 19.0562 11.328 19.1522 11.424 19.2962C11.52 19.4402 11.568 19.6322 11.568 19.8722C11.568 20.0642 11.52 20.2562 11.424 20.4002C11.328 20.5442 11.184 20.6402 10.992 20.6402C10.8 20.6402 10.656 20.5922 10.512 20.5442C10.368 20.4962 10.272 20.4482 10.176 20.4482C10.08 20.4002 9.984 20.4002 9.888 20.4002C9.792 20.4002 9.696 20.4482 9.6 20.4962C9.552 20.5922 9.552 20.6882 9.552 20.7842C9.552 20.8802 9.552 20.9762 9.552 21.0722V21.6962C9.552 21.7922 9.552 21.8882 9.6 21.9842C9.696 22.0802 9.792 22.0802 9.888 22.0802C10.08 22.0802 10.224 22.0322 10.368 21.9842C10.512 21.9362 10.608 21.8882 10.704 21.8882C10.8 21.8402 10.896 21.8402 10.992 21.8402C11.184 21.8402 11.328 21.9362 11.424 22.0802C11.52 22.2242 11.568 22.4162 11.568 22.6562C11.568 22.8482 11.52 23.0402 11.424 23.1842C11.328 23.3282 11.184 23.4242 10.992 23.4242C10.8 23.4242 10.656 23.3762 10.512 23.3282C10.368 23.2802 10.272 23.2322 10.176 23.2322C10.08 23.1842 9.984 23.1842 9.888 23.1842C9.792 23.1842 9.696 23.2322 9.6 23.2802C9.552 23.3762 9.552 23.4722 9.552 23.5682C9.552 23.6642 9.552 23.7602 9.552 23.8562V24.0002H9.888Z" fill="white"/>
      </svg>
    ),
    name: "TypeScript",
    description: [
      "Type safety across the app",
      "Better developer experience",
      "Reduced runtime errors"
    ],
    color: "from-blue-600 to-blue-800 dark:from-blue-400 dark:to-blue-600"
  },
  {
    icon: (
      <svg className="h-8 w-8" viewBox="0 0 24 24" aria-hidden>
        <path d="M12.001 6.65499C14.0649 6.65499 15.751 7.28999 16.801 8.40999C17.851 9.52999 18.376 11.025 18.376 12.9C18.376 14.775 17.851 16.27 16.801 17.39C15.751 18.51 14.0649 19.145 12.001 19.145C9.93704 19.145 8.25096 18.51 7.20096 17.39C6.15096 16.27 5.62596 14.775 5.62596 12.9C5.62596 11.025 6.15096 9.52999 7.20096 8.40999C8.25096 7.28999 9.93704 6.65499 12.001 6.65499ZM12.001 5.45499C9.45704 5.45499 7.40104 6.28999 6.00104 7.95999C4.60104 9.62999 3.90096 11.625 3.90096 13.95C3.90096 16.275 4.60104 18.27 6.00104 19.935C7.40104 21.6 9.45704 22.425 12.001 22.425C14.545 22.425 16.601 21.6 18.001 19.935C19.401 18.27 20.101 16.275 20.101 13.95C20.101 11.625 19.401 9.62999 18.001 7.95999C16.601 6.28999 14.545 5.45499 12.001 5.45499Z" fill="#06B6D4"/>
        <path d="M12.001 6.65499C13.201 6.65499 14.251 6.92999 15.151 7.47999C16.051 8.02999 16.726 8.80499 17.176 9.80499C17.626 10.805 17.851 11.97 17.851 13.3C17.851 14.63 17.626 15.795 17.176 16.795C16.726 17.795 16.051 18.57 15.151 19.12C14.251 19.67 13.201 19.945 12.001 19.945C10.801 19.945 9.75096 19.67 8.85096 19.12C7.95096 18.57 7.27596 17.795 6.82596 16.795C6.37596 15.795 6.15096 14.63 6.15096 13.3C6.15096 11.97 6.37596 10.805 6.82596 9.80499C7.27596 8.80499 7.95096 8.02999 8.85096 7.47999C9.75096 6.92999 10.801 6.65499 12.001 6.65499Z" fill="#7C3AED"/>
      </svg>
    ),
    name: "Tailwind CSS",
    description: [
      "Utility-first styling",
      "Responsive design",
      "Dark mode support"
    ],
    color: "from-cyan-500 to-blue-500 dark:from-cyan-400 dark:to-blue-400"
  },
  {
    icon: (
      <svg className="h-8 w-8" viewBox="0 0 24 24" aria-hidden>
        <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z" fill="#339933"/>
        <path d="M9.5 17.5H7.5V7.5H9.5V17.5Z" fill="white"/>
        <path d="M13.5 17.5H11.5V7.5H13.5V17.5Z" fill="white"/>
        <path d="M16.5 17.5H14.5V7.5H16.5V17.5Z" fill="white"/>
      </svg>
    ),
    name: "Node.js",
    description: [
      "Event-driven, non-blocking I/O",
      "Great for APIs and microservices",
      "Huge NPM ecosystem"
    ],
    color: "from-green-500 to-emerald-600 dark:from-green-400 dark:to-emerald-500"
  },
  {
    icon: (
      <svg className="h-8 w-8" viewBox="0 0 24 24" aria-hidden>
        <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z" fill="#000000"/>
        <path d="M7.5 17.5H16.5V16H7.5V17.5Z" fill="white"/>
        <path d="M7.5 14.5H16.5V13H7.5V14.5Z" fill="white"/>
        <path d="M7.5 11.5H16.5V10H7.5V11.5Z" fill="white"/>
        <path d="M7.5 8.5H16.5V7H7.5V8.5Z" fill="white"/>
      </svg>
    ),
    name: "Express.js",
    description: [
      "Minimal and flexible node framework",
      "Middleware-based architecture",
      "Fast API development"
    ],
    color: "from-gray-700 to-black dark:from-gray-600 dark:to-gray-400"
  },
  {
    icon: (
      <svg className="h-8 w-8" viewBox="0 0 24 24" aria-hidden>
        <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z" fill="#00758F"/>
        <path d="M12 6C8.69 6 6 8.69 6 12C6 15.31 8.69 18 12 18C15.31 18 18 15.31 18 12C18 8.69 15.31 6 12 6Z" fill="#00758F"/>
        <path d="M12 8C9.79 8 8 9.79 8 12C8 14.21 9.79 16 12 16C14.21 16 16 14.21 16 12C16 9.79 14.21 8 12 8Z" fill="white"/>
        <path d="M12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10Z" fill="#00758F"/>
      </svg>
    ),
    name: "MySQL",
    description: [
      "Relational database",
      "ACID compliance",
      "Mature ecosystem and tooling"
    ],
    color: "from-blue-500 to-indigo-600 dark:from-blue-400 dark:to-indigo-500"
  },
  {
    icon: (
      <svg className="h-8 w-8" viewBox="0 0 24 24" aria-hidden>
        <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z" fill="#A41E11"/>
        <path d="M12 6C8.69 6 6 8.69 6 12C6 15.31 8.69 18 12 18C15.31 18 18 15.31 18 12C18 8.69 15.31 6 12 6Z" fill="#A41E11"/>
        <path d="M12 8C9.79 8 8 9.79 8 12C8 14.21 9.79 16 12 16C14.21 16 16 14.21 16 12C16 9.79 14.21 8 12 8Z" fill="white"/>
        <path d="M12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10Z" fill="#A41E11"/>
      </svg>
    ),
    name: "Redis",
    description: [
      "In-memory data store",
      "Fast caching and pub/sub",
      "Supports persistence"
    ],
    color: "from-red-500 to-red-700 dark:from-red-400 dark:to-red-600"
  },
  {
    icon: (
      <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" aria-hidden>
        <circle cx="6" cy="6" r="2.5" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="18" cy="6" r="2.5" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="12" cy="16" r="2.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M7.8 7.8L11 13.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
        <path d="M16.2 7.8L13 13.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
    name: "Microservices",
    description: [
      "Independent deployable services",
      "Scalable and fault-isolated",
      "Good fit with container orchestration"
    ],
    color: "from-purple-500 to-pink-500 dark:from-purple-400 dark:to-pink-400"
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
                    <div className={`p-2 rounded-lg bg-gradient-to-br ${tech.color} text-white shadow-lg flex items-center justify-center`}>
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
                        <svg className="h-4 w-4 mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" aria-hidden>
                          <path d="M5 12l4 4L19 7" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
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