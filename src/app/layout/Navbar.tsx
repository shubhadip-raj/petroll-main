import { useState, useContext, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, PawPrint, Menu, X, User, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";
import { UserContext } from "@/contexts/UserContext";
import MenuSidebar from "@/app/common/MenuSidebar";
import { triggerInstall } from "@/pwaInstallts";

const navLinks = [
  { name: "Home", path: "/home-screen", subPaths: ["/pet-approvals", "/account", "/upgrade-premium", "/Docs", "/Images", "/Videos", "/VetFiles", "/payment"] },
  { name: "Feed", path: "/feed", subPaths: ["/add-feed", "/feedDetails"] },
  { name: "Pet Managers", path: "/pet-managers" },
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
      {/* <nav className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border shadow-sm">
        <div className="container mx-auto px-4"> */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background  border-b border-border shadow-sm">
        <div className="container mx-auto flex items-center justify-between h-16 px-4">
          {/* <div className="flex items-center justify-between h-16 md:h-20"> */}
          {/* Left: Logo / Paw icon */}
          {/* <div className="flex items-center gap-2">
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
            </div> */}

          <Link to="/" className="flex items-center gap-2">
            <img src="/petroll-logo.png" alt="Petroll" className="h-9 w-auto" />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
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
                    "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    isActive
                      ? "bg-gray-100 dark:bg-gray-900 text-orange-500"
                      : "text-muted-foreground hover:bg-gray-200 dark:hover:bg-gray-800 hover:text-orange-500"
                  )}
                >
                  {link.name}
                </Link>
              );
            })}

            {/* Download App Button (Styled like nav item) */}
            <button
              onClick={triggerInstall}
              className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors text-muted-foreground hover:bg-gray-200 dark:hover:bg-gray-800 hover:text-orange-500"
            >
              <Download className="w-4 h-4" />
              Download App
            </button>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* Theme toggle */}
            <Button variant="ghost" size="icon" onClick={toggleTheme}>
              {theme === "light" ? <Sun /> : <Moon />}
            </Button>

            <Button
              onClick={triggerInstall}
              variant="ghost"
              size="icon"
            >
              <Download className="w-4 h-4" />
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
                        "block px-4 py-3 rounded-md font-medium transition-colors",
                        isActive
                          ? "bg-black text-white dark:bg-white dark:text-black"
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

      </nav>

      {/* USER MENU SIDEBAR */}
      <MenuSidebar visible={showSidebar} onClose={() => setShowSidebar(false)} />
    </>
  );
}