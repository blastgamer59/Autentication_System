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

interface LoginFormData {
  email: string;
  password: string;
}

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const searchParams = useSearchParams();

  const { theme, setTheme, resolvedTheme, isThemeLoaded } = useTheme();
  const isDark = resolvedTheme === "dark";

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginFormData>({
    defaultValues: {
      email: "",
      password: "",
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

  // Function to navigate to signup with theme parameter
  const navigateToSignup = () => {
    setIsNavigating(true);
    const themeParam = `theme=${theme}`;
    setTimeout(() => {
      window.location.href = `http://localhost:3001?${themeParam}`;
    }, 500);
  };

  // Function to navigate to forgot password with theme parameter
  const navigateToForgotPassword = () => {
    setIsNavigating(true);
    const themeParam = `theme=${theme}`;
    setTimeout(() => {
      window.location.href = `http://localhost:3002?${themeParam}`;
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

  async function onSubmit(data: LoginFormData) {
    setIsLoading(true);

    try {
      console.log({ email: data.email, password: data.password });
      await new Promise(resolve => setTimeout(resolve, 2000));

      const isValidLogin = true;

      if (isValidLogin) {
        alert("Login successful!");
      } else {
        setError("email", {
          type: "manual",
          message: "Invalid credentials"
        });
        setError("password", {
          type: "manual",
          message: "Invalid credentials"
        });
      }
    } catch (error) {
      setError("root", {
        type: "manual",
        message: "An error occurred during login",
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function handleGoogleSignIn() {
    setIsGoogleLoading(true);

    try {
      console.log("Google sign in clicked");
      await new Promise(resolve => setTimeout(resolve, 2000));
      alert("Google sign in successful!");
    } finally {
      setIsGoogleLoading(false);
    }
  }

  const getThemeIcon = () => {
    if (theme === "system") {
      return isDark ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />;
    }
    return isDark ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />;
  };

  const inputClasses = `h-12 rounded-full px-6 transition-all duration-200 focus:ring-2 focus:ring-blue-500/20 ${isDark
    ? "bg-gray-800 border-gray-600 text-white placeholder-gray-500 focus:border-blue-500"
    : "bg-white border-gray-400 text-gray-900 placeholder-gray-400 focus:border-blue-500"
    }`;

  const dropdownContentClasses = `w-40 ${isDark
    ? "bg-gray-800 border-gray-700 text-white"
    : "bg-white border-gray-200 text-gray-900"
    }`;

  const dropdownItemClasses = `flex items-center justify-between cursor-pointer ${isDark ? "hover:bg-gray-700" : "hover:bg-gray-100"
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
            className={`absolute top-6 right-6 z-10 rounded-full shadow-md hover:shadow-lg transition-all duration-200 ${isDark
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
          src="/loginimage.jpg"
          alt="Login background"
          fill
          className="object-cover"
          priority
          sizes="50vw"
        />
      </div>

      {/* Right Section - Login Form */}
      <div className={`flex-1 flex items-center justify-center p-6 ${isDark ? "bg-gray-900" : "bg-white"}`}>
        <div className="w-full max-w-md">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
            {/* Title */}
            <div className="text-center mb-8">
              <h1 className={`text-3xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
                Welcome Back
              </h1>
              <p className={`mt-2 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                Enter your credentials to access your account
              </p>
            </div>

            {/* Root Error Message */}
            {errors.root && (
              <div className={`p-3 rounded-lg text-sm ${isDark
                ? "bg-red-900/20 text-red-200 border border-red-800"
                : "bg-red-50 text-red-700 border border-red-200"
                }`}>
                {errors.root.message}
              </div>
            )}

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className={isDark ? "text-gray-200" : "text-gray-700"}>
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                className={inputClasses}
                disabled={isLoading || isGoogleLoading}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.email && (
                <p className={`text-sm ${isDark ? "text-red-400" : "text-red-600"}`}>
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="password" className={isDark ? "text-gray-200" : "text-gray-700"}>
                  Password
                </Label>
                <Button
                  variant="link"
                  onClick={navigateToForgotPassword}
                  className="text-blue-500 hover:underline p-0 h-auto text-sm"
                  type="button"
                >
                  Forgot password?
                </Button>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className={`${inputClasses} pr-12`}
                  disabled={isLoading || isGoogleLoading}
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowPassword((s) => !s)}
                  className={`absolute right-1 top-1/2 -translate-y-1/2 transition-colors ${isDark ? "text-gray-400 hover:text-gray-200" : "text-gray-500 hover:text-gray-700"
                    }`}
                  disabled={isLoading || isGoogleLoading}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </Button>
              </div>
              {errors.password && (
                <p className={`text-sm ${isDark ? "text-red-400" : "text-red-600"}`}>
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full h-12 rounded-full text-base font-medium bg-blue-600 hover:bg-blue-700 transition-all duration-200 shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] text-white relative"
              disabled={isLoading || isGoogleLoading}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <Spinner className="h-5 w-5 mr-2" />
                  Signing In...
                </div>
              ) : (
                "Sign In"
              )}
            </Button>

            {/* Divider */}
            <div className="relative mb-4">
              <div className="absolute inset-0 flex items-center">
                <div className={`w-full border-t ${isDark ? "border-gray-600" : "border-gray-300"}`} />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className={`px-3 ${isDark ? "bg-gray-900 text-gray-400" : "bg-white text-gray-500"}`}>
                  Or continue with
                </span>
              </div>
            </div>

            {/* Google Sign In Button */}
            <button
              type="button"
              onClick={handleGoogleSignIn}
              className={`
                w-full h-12 rounded-full flex items-center justify-center gap-3 
                text-base font-medium border-[1.5px] hover:shadow-md 
                transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed
                ${isDark
                  ? "border-gray-600 bg-gray-800 text-white hover:bg-gray-750"
                  : "border-gray-400 bg-white text-gray-900 hover:bg-gray-50"
                }
              `}
              disabled={isLoading || isGoogleLoading}
            >
              <div className="flex items-center gap-3">
                {isGoogleLoading ? (
                  <Spinner className="h-6 w-6" />
                ) : (
                  <svg className="h-6 w-6" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                  </svg>
                )}
                <span className="whitespace-nowrap">
                  {isGoogleLoading ? "Signing in..." : "Continue with Google"}
                </span>
              </div>
            </button>

            {/* Sign up link */}
            <div className={`text-center text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
              Don't have an account?{" "}
              <Button
                variant="link"
                onClick={navigateToSignup}
                className="text-blue-500 font-medium hover:underline p-0 h-auto"
                type="button"
              >
                Create a new one
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}