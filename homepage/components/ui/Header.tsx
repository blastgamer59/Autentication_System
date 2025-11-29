"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useTheme } from "@/context/ThemeContext";
import {
  Sun,
  Moon,
  Monitor,
  LogOut,
  User,
  Palette,
  Check,
  ChevronRight,
} from "lucide-react";

interface HeaderProps {
  onSignOut: () => Promise<void>;
  isSigningOut: boolean;
}

export function Header({ onSignOut, isSigningOut }: HeaderProps) {
  const [showSignOutDialog, setShowSignOutDialog] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleSignOutClick = () => {
    setIsMenuOpen(false);
    setShowSignOutDialog(true);
  };

  const confirmSignOut = async () => {
    await onSignOut();
    setShowSignOutDialog(false);
  };

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsMenuOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsMenuOpen(false);
    }, 300);
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md dark:bg-gray-900/80 supports-backdrop-blur:bg-white/60"
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/">
                <Button variant="ghost" className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent p-2">
                  AuthFlow
                </Button>
              </Link>
            </motion.div>

            {/* User Avatar with Dropdown Menu */}
            <div
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                <DropdownMenuTrigger asChild>
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="cursor-pointer"
                  >
                    <Avatar className="h-10 w-10 border-2 border-blue-200 dark:border-blue-800 shadow-sm">
                      <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold">
                        <User className="h-5 w-5" />
                      </AvatarFallback>
                    </Avatar>
                  </motion.div>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className={`w-64 ${isDark ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-gray-200 text-gray-900"}`}
                  align="end"
                  sideOffset={8}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <AnimatePresence>
                    {isMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.1 }}
                      >
                        {/* User Information - Email first as requested */}
                        <DropdownMenuLabel className="p-0 font-normal">
                          <div className="p-3">
                            <div className={`p-3 rounded-lg ${isDark ? "bg-gray-700/50" : "bg-gray-50"}`}>
                              <div className="flex flex-col min-w-0">
                                <span className={`text-xs truncate ${isDark ? "text-gray-400" : "text-gray-500"} mb-1`}>
                                  admin@authflow.com
                                </span>
                                <span className="text-sm font-semibold truncate">
                                  Alex Johnson
                                </span>
                              </div>
                            </div>
                          </div>
                        </DropdownMenuLabel>

                        <DropdownMenuSeparator className={isDark ? "bg-gray-600" : "bg-gray-200"} />

                        {/* Themes Submenu */}
                        <DropdownMenuSub>
                          <DropdownMenuSubTrigger
                            className={`flex items-center justify-between p-3 cursor-pointer ${isDark ? "hover:bg-gray-700" : "hover:bg-gray-100"}`}
                          >
                            <div className="flex items-center gap-3">
                              <Palette className="h-4 w-4" />
                              <span className="text-sm">Themes</span>
                            </div>
                            <ChevronRight className="h-4 w-4" />
                          </DropdownMenuSubTrigger>
                          <DropdownMenuSubContent
                            className={`w-48 ${isDark ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-gray-200 text-gray-900"}`}
                            sideOffset={8}
                            alignOffset={-5}
                          >
                            {/* Light Theme Option */}
                            <DropdownMenuItem
                              className={`flex items-center justify-between p-3 cursor-pointer ${isDark ? "hover:bg-gray-700" : "hover:bg-gray-100"}`}
                              onClick={() => setTheme("light")}
                            >
                              <div className="flex items-center gap-2">
                                <Sun className="h-4 w-4 text-yellow-500" />
                                <span className="text-sm">Light</span>
                              </div>
                              {theme === "light" && <Check className="h-4 w-4" />}
                            </DropdownMenuItem>

                            {/* Dark Theme Option */}
                            <DropdownMenuItem
                              className={`flex items-center justify-between p-3 cursor-pointer ${isDark ? "hover:bg-gray-700" : "hover:bg-gray-100"}`}
                              onClick={() => setTheme("dark")}
                            >
                              <div className="flex items-center gap-2">
                                <Moon className="h-4 w-4 text-blue-400" />
                                <span className="text-sm">Dark</span>
                              </div>
                              {theme === "dark" && <Check className="h-4 w-4" />}
                            </DropdownMenuItem>

                            {/* System Theme Option */}
                            <DropdownMenuItem
                              className={`flex items-center justify-between p-3 cursor-pointer ${isDark ? "hover:bg-gray-700" : "hover:bg-gray-100"}`}
                              onClick={() => setTheme("system")}
                            >
                              <div className="flex items-center gap-2">
                                <Monitor className="h-4 w-4 text-gray-500" />
                                <span className="text-sm">System</span>
                              </div>
                              {theme === "system" && <Check className="h-4 w-4" />}
                            </DropdownMenuItem>
                          </DropdownMenuSubContent>
                        </DropdownMenuSub>

                        <DropdownMenuSeparator className={isDark ? "bg-gray-600" : "bg-gray-200"} />

                        {/* Logout - At the bottom as requested */}
                        <DropdownMenuItem
                          className={`flex items-center gap-3 p-3 cursor-pointer text-red-600 dark:text-red-400 ${isDark ? "hover:bg-gray-700" : "hover:bg-gray-100"}`}
                          onClick={handleSignOutClick}
                        >
                          <LogOut className="h-4 w-4" />
                          <span className="text-sm">Logout</span>
                        </DropdownMenuItem>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Sign Out Confirmation Dialog */}
      <AlertDialog open={showSignOutDialog} onOpenChange={setShowSignOutDialog}>
        <AlertDialogContent className={isDark ? "dark bg-gray-800 border-gray-700 text-white" : ""}>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to sign out?</AlertDialogTitle>
            <AlertDialogDescription className={isDark ? "text-gray-300" : ""}>
              You will need to sign in again to access your account.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              disabled={isSigningOut}
              className={isDark ? "bg-gray-700 text-white border-gray-600 hover:bg-gray-600" : ""}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmSignOut}
              disabled={isSigningOut}
              className="bg-red-600 hover:bg-red-700 focus:ring-red-600 text-white"
            >
              {isSigningOut ? "Signing out..." : "Sign out"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}