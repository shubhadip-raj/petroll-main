import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Home, PawPrint } from "lucide-react";
import { motion } from "framer-motion";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <Layout>
      <div className="min-h-[60vh] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          
          className="text-center px-4"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="text-8xl mb-6"
          >
            🐾
          </motion.div>
          <h1 className="text-6xl md:text-8xl font-display font-bold text-primary mb-4">404</h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8">
            Oops! This page has wandered off...
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="lg" asChild>
              <a href="/">
                <Home className="w-4 h-4" />
                Return Home
              </a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="/contact">
                <PawPrint className="w-4 h-4" />
                Contact Us
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
};

export default NotFound;
