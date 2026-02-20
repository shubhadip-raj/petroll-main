import { motion } from "framer-motion";
import { Shield, Lock, Eye, Server, UserCheck, AlertTriangle, Baby, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";

const policies = [
  {
    icon: Lock,
    title: "Data Encryption",
    description: "All data transmitted to and from Petroll.co is encrypted using industry-standard TLS 1.3 encryption. Your pet's information is stored using AES-256 encryption at rest.",
  },
  {
    icon: Eye,
    title: "Privacy First",
    description: "We never sell your personal or pet data to third parties. You have full control over who can view your pet's profile and what information is shared.",
  },
  {
    icon: Server,
    title: "Secure Infrastructure",
    description: "Our servers are hosted in SOC 2 Type II certified data centers with 24/7 monitoring, redundant backups, and disaster recovery protocols.",
  },
  {
    icon: UserCheck,
    title: "Access Control",
    description: "Multi-factor authentication is available for all accounts. You can manage and revoke access for caregivers and family members at any time.",
  },
];

const safetyGuidelines = [
  {
    title: "Pet Safety Guidelines",
    items: [
      "Never share your pet's QR code with unknown individuals",
      "Keep your pet's medical information up to date",
      "Verify the identity of anyone requesting access to your pet's profile",
      "Report any suspicious activity immediately",
      "Use strong, unique passwords for your account",
    ],
  },
  {
    title: "Community Guidelines",
    items: [
      "Treat all community members and their pets with respect",
      "Only share accurate and truthful information about your pets",
      "Do not engage in harassment or bullying behavior",
      "Report inappropriate content or behavior",
      "Respect the privacy of other pet owners",
    ],
  },
  {
    title: "Data Handling",
    items: [
      "Regular security audits and penetration testing",
      "Automatic session timeouts for inactive accounts",
      "Secure deletion of data upon account closure",
      "Limited employee access to user data",
      "Regular data backup and recovery testing",
    ],
  },
];

export default function SafetyPage() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-peach/30 via-background to-mint/20 dark:from-background dark:to-teal/5">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 bg-teal/10 text-teal px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Shield className="w-4 h-4" />
              Your Security Matters
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Safety & Security Policies
            </h1>
            <p className="text-lg text-muted-foreground">
              At Petroll.co, we take the safety of your data and your pets seriously. Learn about our comprehensive security measures and community guidelines.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Security Features */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Security Measures
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We employ multiple layers of security to protect your information
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {policies.map((policy, index) => (
              <motion.div
                key={policy.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-2xl p-6 shadow-card border border-border hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-teal/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <policy.icon className="w-6 h-6 text-teal" />
                  </div>
                  <div>
                    <h3 className="text-lg font-display font-bold mb-2">{policy.title}</h3>
                    <p className="text-muted-foreground">{policy.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Guidelines */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {safetyGuidelines.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-2xl p-6 shadow-card border border-border"
              >
                <h3 className="text-xl font-display font-bold mb-4 text-primary">
                  {section.title}
                </h3>
                <ul className="space-y-3">
                  {section.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-muted-foreground">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Child Safety Banner */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-lavender/20 to-teal/20 dark:from-lavender/10 dark:to-teal/10 rounded-3xl p-8 md:p-12 border border-border"
          >
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-16 h-16 bg-teal/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                <Baby className="w-8 h-8 text-teal" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-2xl font-display font-bold mb-2">Child Safety Policy</h2>
                <p className="text-muted-foreground">
                  Learn about our commitment to protecting children and minors who use our platform.
                </p>
              </div>
              <Button variant="teal" size="lg" asChild>
                <Link to="/child-safety">
                  Read Policy <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Report Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-coral/10 to-sunshine/10 dark:from-coral/5 dark:to-sunshine/5 rounded-3xl p-8 md:p-12 text-center border border-border"
          >
            <AlertTriangle className="w-12 h-12 text-coral mx-auto mb-4" />
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">
              Report a Security Concern
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
              If you notice any suspicious activity or have security concerns, please contact our security team immediately. We take all reports seriously and will investigate promptly.
            </p>
            <p className="font-medium text-primary">
              security@petroll.co
            </p>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
