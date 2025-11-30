"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
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
} from "lucide-react";


type Theme = "light" | "dark" | "system";

interface HeaderProps {
  onSignOut: () => Promise<void>;
  isSigningOut: boolean;
}

interface ThemeOption {
  value: Theme;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

export function Header({ onSignOut, isSigningOut }: HeaderProps) {
  const [showSignOutDialog, setShowSignOutDialog] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();
  
  const isDark = resolvedTheme === "dark";
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const openMenu = () => {
    timeoutRef.current && clearTimeout(timeoutRef.current);
    setIsMenuOpen(true);
  };

  const closeMenuWithDelay = (delay = 250) => {
    timeoutRef.current && clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setIsMenuOpen(false);
      timeoutRef.current = null;
    }, delay);
  };

  const handleSignOutClick = () => {
    setIsMenuOpen(false);
    setShowSignOutDialog(true);
  };

  const confirmSignOut = async () => {
    await onSignOut();
    setShowSignOutDialog(false);
  };

  const themeOptions: ThemeOption[] = [
    { value: "light", label: "Light", icon: Sun, color: "text-yellow-500" },
    { value: "dark", label: "Dark", icon: Moon, color: "text-blue-400" },
    { value: "system", label: "System", icon: Monitor, color: "text-gray-500" },
  ];

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
              <Link href="/" aria-label="Go to homepage">
                <Button
                  variant="ghost"
                  className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent p-2"
                >
                  AuthFlow
                </Button>
              </Link>
            </motion.div>

            {/* User Menu */}
            <div
              className="relative z-50"
              onPointerEnter={openMenu}
              onPointerLeave={() => closeMenuWithDelay(250)}
            >
              <DropdownMenu 
                open={isMenuOpen} 
                onOpenChange={setIsMenuOpen} 
                modal={false}
              >
                <DropdownMenuTrigger asChild>
                  <div className="cursor-pointer outline-none">
                    <Avatar className="h-10 w-10 border-2 border-blue-200 dark:border-blue-800 shadow-sm transition-transform hover:scale-105">
                      <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold">
                        <User className="h-5 w-5" />
                      </AvatarFallback>
                    </Avatar>
                  </div>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  className={`w-64 ${
                    isDark
                      ? "bg-gray-800 border-gray-700 text-white"
                      : "bg-white border-gray-200 text-gray-900"
                  }`}
                  align="end"
                  sideOffset={8}
                  onPointerEnter={openMenu}
                  onPointerLeave={() => closeMenuWithDelay(250)}
                  onCloseAutoFocus={(e) => e.preventDefault()}
                >
                  {/* User Info - Simplified without box */}
                  <DropdownMenuLabel className="p-3 font-normal">
                    <div className="flex flex-col min-w-0">
                      <span className="text-sm font-semibold truncate">
                        Alex Johnson
                      </span>
                      <span
                        className={`text-xs truncate ${
                          isDark ? "text-gray-400" : "text-gray-500"
                        } mt-1`}
                      >
                        admin@authflow.com
                      </span>
                    </div>
                  </DropdownMenuLabel>

                  <DropdownMenuSeparator
                    className={isDark ? "bg-gray-600" : "bg-gray-200"}
                  />

                  {/* Theme Selection */}
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger
                      className={`flex items-center gap-3 p-3 cursor-pointer ${
                        isDark ? "hover:bg-gray-700" : "hover:bg-gray-100"
                      }`}
                    >
                      <Palette className="h-4 w-4" />
                      <span className="text-sm">Themes</span>
                    </DropdownMenuSubTrigger>
                    <DropdownMenuSubContent
                      className={`w-48 ${
                        isDark
                          ? "bg-gray-800 border-gray-700 text-white"
                          : "bg-white border-gray-200 text-gray-900"
                      }`}
                      sideOffset={8}
                      alignOffset={-5}
                      onPointerEnter={openMenu}
                      onPointerLeave={() => closeMenuWithDelay(250)}
                    >
                      {themeOptions.map((option) => {
                        const IconComponent = option.icon;
                        return (
                          <DropdownMenuItem
                            key={option.value}
                            className={`flex items-center justify-between p-3 cursor-pointer ${
                              isDark ? "hover:bg-gray-700" : "hover:bg-gray-100"
                            }`}
                            onClick={() => setTheme(option.value)}
                          >
                            <div className="flex items-center gap-2">
                              <IconComponent className={`h-4 w-4 ${option.color}`} />
                              <span className="text-sm">{option.label}</span>
                            </div>
                            {theme === option.value && <Check className="h-4 w-4" />}
                          </DropdownMenuItem>
                        );
                      })}
                    </DropdownMenuSubContent>
                  </DropdownMenuSub>

                  <DropdownMenuSeparator
                    className={isDark ? "bg-gray-600" : "bg-gray-200"}
                  />

                  {/* Sign Out */}
                  <DropdownMenuItem
                    className={`flex items-center gap-3 p-3 cursor-pointer text-red-600 dark:text-red-400 ${
                      isDark ? "hover:bg-gray-700" : "hover:bg-gray-100"
                    }`}
                    onClick={handleSignOutClick}
                  >
                    <LogOut className="h-4 w-4" />
                    <span className="text-sm">Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Sign Out Confirmation Dialog */}
      <AlertDialog open={showSignOutDialog} onOpenChange={setShowSignOutDialog}>
        <AlertDialogContent
          className={isDark ? "dark bg-gray-800 border-gray-700 text-white" : ""}
        >
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to sign out?</AlertDialogTitle>
            <AlertDialogDescription className={isDark ? "text-gray-300" : ""}>
              You will need to sign in again to access your account.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              disabled={isSigningOut}
              className={
                isDark
                  ? "bg-gray-700 text-white border-gray-600 hover:bg-gray-600"
                  : ""
              }
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