import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon, PawPrint } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About Us", path: "/about" },
  { name: "Safety", path: "/safety" },
  { name: "Contact", path: "/contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <motion.div
                whileHover={{ rotate: 15 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <PawPrint className="w-8 h-8 text-primary" />
              </motion.div>
              <span className="text-2xl font-display font-bold text-gradient">
                Petroll
              </span>
              <span className="text-sm font-medium text-muted-foreground">
                .co
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    "relative font-medium transition-colors hover:text-primary",
                    location.pathname === link.path
                      ? "text-primary"
                      : "text-foreground"
                  )}
                >
                  {link.name}
                  {location.pathname === link.path && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
                    />
                  )}
                </Link>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              {/* Theme Toggle */}
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="rounded-full"
              >
                <AnimatePresence mode="wait">
                  {theme === "light" ? (
                    <motion.div
                      key="sun"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                    >
                      <Sun className="w-5 h-5 text-sunshine" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="moon"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                    >
                      <Moon className="w-5 h-5 text-lavender" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </Button>

              {/* Join Now (Desktop) */}
              <Button
                variant="hero"
                size="sm"
                className="hidden md:flex"
                onClick={() => setShowAuthModal(true)}
              >
                Join Now
              </Button>

              {/* Mobile Menu Toggle */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? <X /> : <Menu />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden overflow-hidden"
              >
                <div className="py-4 space-y-2">
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.path}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        to={link.path}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          "block py-3 px-4 rounded-xl font-medium transition-colors",
                          location.pathname === link.path
                            ? "bg-primary/10 text-primary"
                            : "hover:bg-muted"
                        )}
                      >
                        {link.name}
                      </Link>
                    </motion.div>
                  ))}

                  {/* Join Now (Mobile) */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: navLinks.length * 0.1 }}
                    className="pt-2"
                  >
                    <Button
                      variant="hero"
                      className="w-full"
                      onClick={() => {
                        setIsOpen(false);
                        setShowAuthModal(true);
                      }}
                    >
                      Join Now
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

     
      {/* Auth Modal */}
      <AnimatePresence>
        {showAuthModal && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAuthModal(false)}
            />

            {/* Modal Wrapper (IMPORTANT FIX) */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                className="
            w-full max-w-md
            rounded-3xl bg-background
            border border-border
            p-6 sm:p-8
            shadow-2xl
            max-h-[90vh] overflow-y-auto
          "
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold tracking-tight">
                      Welcome to <span className="text-primary">Petroll</span>
                    </h2>
                    <p className="text-sm text-muted-foreground mt-1">
                      Join the safest pet community 🐾
                    </p>
                  </div>
                  <button
                    onClick={() => setShowAuthModal(false)}
                    className="rounded-full p-2 hover:bg-muted transition"
                  >
                    <X className="w-5 h-5 text-muted-foreground" />
                  </button>
                </div>

                {/* Actions */}
                <div className="space-y-6">
                  {/* Register */}
                  <Link to="/register" onClick={() => setShowAuthModal(false)}>
                    <Button
                      variant="hero"
                      className="w-full h-12 text-base font-semibold"
                    >
                      Create Account
                    </Button>
                  </Link>

                  {/* Divider */}
                  <div className="relative flex items-center justify-center">
                    <span className="absolute px-3 text-xs text-muted-foreground bg-background">
                      OR
                    </span>
                    <div className="w-full h-px bg-border" />
                  </div>

                  {/* Login */}
                  <Link to="/login" onClick={() => setShowAuthModal(false)}>
                    <Button
                      variant="outline"
                      className="w-full h-12 text-base font-semibold"
                    >
                      Login to Existing Account
                    </Button>
                  </Link>
                </div>

                {/* Footer */}
                <p className="mt-6 text-center text-xs text-muted-foreground">
                  By continuing, you agree to our{" "}
                  <span className="underline cursor-pointer hover:text-primary">
                    Terms
                  </span>{" "}
                  &{" "}
                  <span className="underline cursor-pointer hover:text-primary">
                    Privacy Policy
                  </span>
                </p>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>


    </>
  );
}
