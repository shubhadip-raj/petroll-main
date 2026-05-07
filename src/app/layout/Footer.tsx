import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { PawPrint, Heart, Mail, MapPin, Phone } from "lucide-react";

const footerLinks = {
  company: [
    { name: "Ecosystem", path: "https://petroll.co/ecosystem" },
    { name: "Contact", path: "https://petroll.co/contact" },
    { name: "Delete Account", path: "/delete-my-account" },
    { name: "How It Works", path: "https://petroll.co/how-it-works" },
    { name: "Careers", path: "#" },
  ],
  legal: [
    { name: "Terms", path: "https://petroll.co/terms" },
    { name: "Safety Policies", path: "https://petroll.co/safety" },
    { name: "Report Abuse & Issues", path: "https://petroll.co/report-abuse" },
    //   { name: "Child Safety", path: "/child-safety" },
  ],
  features: [
    { name: "Pet Identity", path: "#" },
    { name: "Pet Social", path: "#" },
    { name: "Pet Cloud", path: "#" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <img src="/petroll-logo.png" alt="Petroll" className="h-8 w-auto" />
            <p className="text-sm text-muted-foreground">
              Your pet's identity, anchored in the cloud. A unique ID system for every beloved pet.
            </p>
          </div>
<div>
  <h4 className="font-semibold mb-3 text-sm">Platform</h4>
  <div className="flex flex-col gap-2 text-sm text-muted-foreground">
    <a href="https://petroll.co/ecosystem" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Ecosystem</a>
    <a href="https://petroll.co/petopedia" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Petopedia</a>
    <a href="https://petroll.co/communities" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Communities</a>
    <a href="https://petroll.co/pricing" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Pricing</a>
    <a href="https://petroll.co/how-it-works" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">How It Works</a>
  </div>
</div>

<div>
  <h4 className="font-semibold mb-3 text-sm">Legal</h4>
  <div className="flex flex-col gap-2 text-sm text-muted-foreground">
    <a href="https://petroll.co/terms" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Terms & Conditions</a>
    <a href="https://petroll.co/privacy" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Privacy Policy</a>
    <a href="https://petroll.co/safety" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Safety & Security</a>
    <a href="https://petroll.co/report-abuse" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Report Issues</a>
  </div>
</div>

          <div>
            <h4 className="font-semibold mb-3 text-sm">Contact</h4>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <a href="mailto:hello@petroll.co" className="flex items-center gap-2 hover:text-primary transition-colors">
                <Mail className="h-4 w-4" /> hello@petroll.co
              </a>
              <a href="tel:+15551234567" className="flex items-center gap-2 hover:text-primary transition-colors">
                <Phone className="h-4 w-4" /> +1 (555) 123-4567
              </a>
              <span className="flex items-center gap-2">
                <MapPin className="h-4 w-4" /> San Francisco, CA
              </span>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <span>© 2026 Paraa Tech Inc. All rights reserved.</span>
          <span>Built with ❤️ for every pet parent</span>
        </div>
      </div>
    </footer>
  );
}
