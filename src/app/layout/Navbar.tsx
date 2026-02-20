import { useState, useContext, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, PawPrint, Menu, X, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";
import { UserContext } from "@/contexts/UserContext";
import MenuSidebar from "@/app/common/MenuSidebar";

const navLinks = [
  { name: "Home", path: "/homeScreen", subPaths: ["/pet-approvals", "/account", "/upgradePremium" ,"/Docs", "/Images", "/Videos", "/VetFiles","/payment"] },
  { name: "Feed", path: "/feed", subPaths: ["/AddFeed", "/feedDetails"] },
  { name: "Pet Managers", path: "/petManagers" },
  { name: "Pet Scanner", path: "/scanPet" },
  { name: "My Pets", path: "/myPets", subPaths: ["/PetDetails", "/myPets/edit", "/qrPass"] },
];

export function Navbar() {
  const [isNavOpen, setIsNavOpen] = useState(false); // mobile nav toggle
  const [showSidebar, setShowSidebar] = useState(false); // user sidebar
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const { user, token } = useContext(UserContext);
  const navigate = useNavigate();


  useEffect(() => {
    if (!token) {
      navigate("/");
      return;
    }

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));

      const TWELVE_HOURS = 12 * 60 * 60 * 1000;
      const issuedAt = payload.iat * 1000;

      const isExpired = Date.now() > issuedAt + TWELVE_HOURS;

      if (isExpired) {
        localStorage.clear();
        navigate("/");
      }
    } catch {
      localStorage.clear();
      navigate("/");
    }
  }, [token, navigate]);


  return (
    <>
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Left: Logo / Paw icon */}
            <div className="flex items-center gap-2">
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
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => {
                const isActive =
                  location.pathname === link.path ||
                  link.subPaths?.some((sub) =>
                    location.pathname.startsWith(sub)
                  );

                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={cn(
                      "relative font-medium transition-colors hover:text-primary",
                      isActive ? "text-primary" : "text-foreground"
                    )}
                  >
                    {link.name}
                    {isActive && (
                      <motion.div
                        layoutId="navbar-indicator"
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
                      />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              {/* Theme toggle */}
              <Button variant="ghost" size="icon" onClick={toggleTheme}>
                {theme === "light" ? <Sun /> : <Moon />}
              </Button>

              {/* Desktop: User button */}
              {user && (
                <button
                  onClick={() => setShowSidebar(true)}
                  className="hidden md:flex items-center gap-2 font-medium hover:text-primary transition"
                >
                  <div className="h-9 w-9 rounded-full bg-primary/15 flex items-center justify-center">
                    <User className="w-4 h-4 text-primary" />
                  </div>
                  <span>{user.userName}</span>
                </button>
              )}

              {/* Mobile: Sidebar toggle */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setShowSidebar((prev) => !prev)}
              >
                {showSidebar ? <X /> : <Menu />}
              </Button>

              {/* Mobile Nav toggle */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setIsNavOpen((prev) => !prev)}
              >
                {isNavOpen ? <X /> : <PawPrint />}
              </Button>
            </div>
          </div>

          {/* MOBILE NAV LINKS */}
          <AnimatePresence>
            {isNavOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="md:hidden overflow-hidden"
              >
                <div className="py-4 space-y-2">
                  {navLinks.map((link) => {
                    const isActive =
                      location.pathname === link.path ||
                      link.subPaths?.some((sub) =>
                        location.pathname.startsWith(sub)
                      );

                    return (
                      <Link
                        key={link.path}
                        to={link.path}
                        onClick={() => setIsNavOpen(false)}
                        className={cn(
                          "block px-4 py-3 rounded-xl font-medium",
                          isActive
                            ? "bg-primary/10 text-primary"
                            : "hover:bg-muted"
                        )}
                      >
                        {link.name}
                      </Link>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      {/* USER MENU SIDEBAR */}
      <MenuSidebar visible={showSidebar} onClose={() => setShowSidebar(false)} />
    </>
  );
}
