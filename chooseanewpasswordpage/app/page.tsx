"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, Sun, Moon, Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ProgressBar } from "@/components/ui/progress-bar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/context/ThemeContext";
import { Spinner } from "@/components/ui/spinner";

type Theme = "light" | "dark" | "system";

interface ResetPasswordFormData {
  newPassword: string;
  confirmPassword: string;
}

export default function ResetPasswordPage() {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const searchParams = useSearchParams();

  const { theme, setTheme, resolvedTheme, isThemeLoaded } = useTheme();
  const isDark = resolvedTheme === "dark";

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setError,
  } = useForm<ResetPasswordFormData>({
    mode: "onBlur",
  });

  const newPassword = watch("newPassword");

  // Effect to read theme from URL parameters
  useEffect(() => {
    if (isThemeLoaded) {
      const urlTheme = searchParams.get('theme') as Theme;
      if (urlTheme && ['light', 'dark', 'system'].includes(urlTheme)) {
        setTheme(urlTheme);
      }
    }
  }, [searchParams, setTheme, isThemeLoaded]);

  // Function to navigate to login with theme parameter
  const navigateToLogin = () => {
    setIsNavigating(true);
    const themeParam = `theme=${theme}`;
    setTimeout(() => {
      window.location.href = `http://localhost:3000?${themeParam}`;
    }, 500);
  };

  // Loading spinner for theme
  if (!isThemeLoaded || isNavigating) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <ProgressBar isLoading={true} />
      </div>
    );
  }

  async function onSubmit(data: ResetPasswordFormData) {
    setIsLoading(true);

    try {
      console.log({ newPassword: data.newPassword });
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Simulate successful password reset
      const isSuccess = true;

      if (isSuccess) {
        alert("Password reset successful! Redirecting to login...");
        // Automatically navigate to login after success
        setTimeout(() => {
          navigateToLogin();
        }, 1000);
      } else {
        setError("root", {
          type: "manual",
          message: "Failed to reset password. Please try again."
        });
      }
    } catch (error) {
      setError("root", {
        type: "manual",
        message: "An error occurred while resetting your password",
      });
    } finally {
      setIsLoading(false);
    }
  }

  const getThemeIcon = () => {
    if (theme === "system") {
      return isDark ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />;
    }
    return isDark ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />;
  };

  const inputClasses = `h-12 rounded-full px-4 transition-all duration-200 focus:ring-2 focus:ring-blue-500/20 ${
    isDark
      ? "bg-gray-800 border-gray-600 text-white placeholder-gray-500 focus:border-blue-500"
      : "bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-blue-500"
  }`;

  const dropdownContentClasses = `w-40 ${
    isDark
      ? "bg-gray-800 border-gray-700 text-white"
      : "bg-white border-gray-200 text-gray-900"
  }`;

  const dropdownItemClasses = `flex items-center justify-between cursor-pointer ${
    isDark ? "hover:bg-gray-700" : "hover:bg-gray-100"
  }`;

  return (
    <div className={`min-h-screen flex ${isDark ? "dark bg-gray-900" : "bg-white"}`}>
      {/* Global Progress Bar - Only for page navigation */}
      <ProgressBar isLoading={isNavigating} />

      {/* Theme Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className={`absolute top-6 right-6 z-10 rounded-full shadow-md hover:shadow-lg transition-all duration-200 ${
              isDark
                ? "bg-gray-800 border-gray-700 text-white hover:bg-gray-700"
                : "bg-white border-gray-300 text-gray-900 hover:bg-gray-50"
            }`}
            aria-label="Theme settings"
          >
            {getThemeIcon()}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className={dropdownContentClasses}>
          <DropdownMenuItem
            onClick={() => setTheme("light")}
            className={dropdownItemClasses}
          >
            <span>Light</span>
            {theme === "light" && <Check className="h-4 w-4" />}
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => setTheme("dark")}
            className={dropdownItemClasses}
          >
            <span>Dark</span>
            {theme === "dark" && <Check className="h-4 w-4" />}
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => setTheme("system")}
            className={dropdownItemClasses}
          >
            <span>System</span>
            {theme === "system" && <Check className="h-4 w-4" />}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Left Section - Image */}
      <div className="hidden lg:flex lg:flex-1 bg-gradient-to-br from-blue-600 to-purple-700 items-center justify-center p-8 relative overflow-hidden">
        <Image
          src="/chooseanewpassowrdlogo.png"
          alt="Reset password background"
          fill
          className="object-cover"
          priority
          sizes="50vw"
        />
      </div>

      {/* Right Section - Reset Password Form */}
      <div className={`flex-1 flex items-center justify-center p-6 ${isDark ? "bg-gray-900" : "bg-white"}`}>
        <div className="w-full max-w-md">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
            {/* Title */}
            <div className="text-center mb-8">
              <h1 className={`text-3xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
                Choose a New Password
              </h1>
              <p className={`mt-2 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                Create a strong password to secure your account
              </p>
            </div>

            {/* Root Error Message */}
            {errors.root && (
              <div
                className={`p-3 rounded-lg text-sm ${
                  isDark
                    ? "bg-red-900/20 text-red-200 border border-red-800"
                    : "bg-red-50 text-red-700 border border-red-200"
                }`}
              >
                {errors.root.message}
              </div>
            )}

            {/* New Password */}
            <div className="space-y-2">
              <Label htmlFor="newPassword" className={isDark ? "text-gray-200" : "text-gray-700"}>
                New Password
              </Label>
              <div className="relative">
                <Input
                  id="newPassword"
                  type={showNewPassword ? "text" : "password"}
                  placeholder="Enter your new password"
                  className={`${inputClasses} pr-12`}
                  disabled={isLoading}
                  {...register("newPassword", {
                    required: "New password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                />
                <Button
                  
                  variant="ghost"
                  size="icon"
                  aria-label={showNewPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowNewPassword((s) => !s)}
                  className={`absolute right-1 top-1/2 -translate-y-1/2 transition-colors ${
                    isDark ? "text-gray-400 hover:text-gray-200" : "text-gray-500 hover:text-gray-700"
                  }`}
                  disabled={isLoading}
                >
                  {showNewPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </Button>
              </div>
              {errors.newPassword && (
                <p className={`text-sm ${isDark ? "text-red-400" : "text-red-600"}`}>
                  {errors.newPassword.message}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className={isDark ? "text-gray-200" : "text-gray-700"}>
                Confirm Password
              </Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your new password"
                  className={`${inputClasses} pr-12`}
                  disabled={isLoading}
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (value) => value === newPassword || "Passwords do not match",
                  })}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowConfirmPassword((s) => !s)}
                  className={`absolute right-1 top-1/2 -translate-y-1/2 transition-colors ${
                    isDark ? "text-gray-400 hover:text-gray-200" : "text-gray-500 hover:text-gray-700"
                  }`}
                  disabled={isLoading}
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </Button>
              </div>
              {errors.confirmPassword && (
                <p className={`text-sm ${isDark ? "text-red-400" : "text-red-600"}`}>
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full h-12 rounded-full text-base font-medium bg-blue-600 hover:bg-blue-700 transition-all duration-200 shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] text-white relative"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <Spinner className="h-5 w-5 mr-2" />
                  Resetting Password...
                </div>
              ) : (
                "Reset Password"
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}