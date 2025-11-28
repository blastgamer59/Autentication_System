"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { Sun, Moon, Check, ArrowLeft } from "lucide-react";
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
  email: string;
}

export default function RequestResetPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const searchParams = useSearchParams();

  const { theme, setTheme, resolvedTheme, isThemeLoaded } = useTheme();
  const isDark = resolvedTheme === "dark";

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<ResetPasswordFormData>({
    defaultValues: {
      email: "",
    },
    mode: "onBlur",
  });

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
      console.log({ email: data.email });
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate successful reset request
      setIsSubmitted(true);
      
    } catch (error) {
      setError("root", {
        type: "manual",
        message: "An error occurred while requesting password reset",
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

  const inputClasses = `h-12 rounded-full px-6 transition-all duration-200 focus:ring-2 focus:ring-blue-500/20 ${
    isDark
      ? "bg-gray-800 border-gray-600 text-white placeholder-gray-500 focus:border-blue-500"
      : "bg-white border-gray-400 text-gray-900 placeholder-gray-400 focus:border-blue-500"
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
      {/* Global Progress Bar */}
      <ProgressBar isLoading={isNavigating} />

      {/* Theme Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className={`absolute top-6 right-6 z-10 rounded-full shadow-md hover:shadow-lg transition-all duration-200 ${
              isDark
                ? "bg-gray-800 border-gray-700 text-white"
                : "bg-white border-gray-300 text-gray-900"
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
          src="/forgotpasswordimage.png"
          alt="Reset password background"
          fill
          className="object-cover"
          priority
          sizes="50vw"
        />
      </div>

      {/* Right Section - Reset Password Form */}
      <div className={`flex-1 flex items-center justify-center p-6 ${
        isDark ? "bg-gray-900" : "bg-white"
      }`}>
        <div className="w-full max-w-md">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
              {/* Back to Login */}
              <Button
                variant="ghost"
                onClick={navigateToLogin}
                className={`p-0 h-auto mb-4 flex items-center gap-2 ${
                  isDark ? "text-gray-400 hover:text-gray-200" : "text-gray-600 hover:text-gray-900"
                }`}
                type="button"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Login
              </Button>

              {/* Title */}
              <div className="text-center mb-8">
                <h1 className={`text-3xl font-bold ${
                  isDark ? "text-white" : "text-gray-900"
                }`}>
                  Reset Your Password
                </h1>
                <p className={`mt-2 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                  Enter your email address and we'll send you instructions to reset your password.
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

              {/* Email */}
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className={isDark ? "text-gray-200" : "text-gray-700"}
                >
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className={inputClasses}
                  disabled={isLoading}
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                />
                {errors.email && (
                  <p
                    className={`text-sm ${
                      isDark ? "text-red-400" : "text-red-600"
                    }`}
                  >
                    {errors.email.message}
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
                    Sending Instructions...
                  </div>
                ) : (
                  "Send Reset Instructions"
                )}
              </Button>
            </form>
          ) : (
            /* Success Message */
            <div className="text-center space-y-6">
              {/* Back to Login */}
              <Button
                variant="ghost"
                onClick={navigateToLogin}
                className={`p-0 h-auto mb-4 flex items-center gap-2 ${
                  isDark ? "text-gray-400 hover:text-gray-200" : "text-gray-600 hover:text-gray-900"
                }`}
                type="button"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Login
              </Button>

              {/* Success Icon */}
              <div className="flex justify-center">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                  isDark ? "bg-green-900/20" : "bg-green-100"
                }`}>
                  <svg
                    className={`w-8 h-8 ${isDark ? "text-green-400" : "text-green-600"}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              </div>

              {/* Success Title */}
              <div>
                <h1 className={`text-3xl font-bold ${
                  isDark ? "text-white" : "text-gray-900"
                }`}>
                  Check Your Email
                </h1>
                <p className={`mt-2 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                  We've sent password reset instructions to your email address.
                </p>
              </div>

              {/* Additional Info */}
              <div className={`text-sm p-4 rounded-lg ${
                isDark ? "bg-gray-800 text-gray-300" : "bg-gray-50 text-gray-600"
              }`}>
                <p>
                  If you don't see the email in your inbox, please check your spam folder or try again.
                </p>
              </div>

              {/* Back to Login Button */}
              <Button
                onClick={navigateToLogin}
                className="w-full h-12 rounded-full text-base font-medium bg-blue-600 hover:bg-blue-700 transition-all duration-200 shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] text-white"
              >
                Return to Login
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}