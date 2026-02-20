import { motion } from "framer-motion";
import { ShieldCheck, Baby, Lock, AlertCircle, Mail } from "lucide-react";
import { Layout } from "@/components/layout/Layout";

export default function ChildSafetyPage() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-peach/30 via-background to-lavender/20 dark:from-background dark:to-lavender/5">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 bg-teal/10 text-teal px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Baby className="w-4 h-4" />
              Protecting Our Users
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Child Safety Policy
            </h1>
            <p className="text-lg text-muted-foreground">
              Petroll.co By Paraa Tech Inc., USA
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-card rounded-3xl p-6 md:p-10 shadow-card border border-border space-y-10"
          >
            {/* Introduction */}
            <div>
              <h2 className="text-2xl font-display font-bold mb-4 text-primary flex items-center gap-2">
                <ShieldCheck className="w-6 h-6" />
                Introduction
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                At Petroll (Petroll.co by Paraa Tech Inc.), we are fully committed to safeguarding the welfare of all users, especially children, who interact with our pet management app. We recognize our responsibility to create a safe and secure environment for all users, ensuring that minors are protected from any harm or inappropriate content while using our platform. Our app is designed for users over the age of 13, and we follow strict protocols to protect children's privacy and well-being in compliance with relevant child safety laws and regulations.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                This document outlines Petroll's commitment to child safety, the procedures we follow, and our efforts to ensure a safe experience for all users.
              </p>
            </div>

            {/* Principles */}
            <div>
              <h2 className="text-2xl font-display font-bold mb-6 text-primary">
                Principles of the Policy
              </h2>
              <div className="space-y-6">
                <div className="bg-muted/30 rounded-2xl p-6 border border-border">
                  <h3 className="font-display font-bold mb-2">The welfare of children is our primary concern</h3>
                  <p className="text-muted-foreground">
                    At Petroll.co, we prioritize the safety and well-being of all users, particularly minors. Our platform is designed to offer a safe and secure space for users to manage their pets.
                  </p>
                </div>
                <div className="bg-muted/30 rounded-2xl p-6 border border-border">
                  <h3 className="font-display font-bold mb-2">Protection from harm, abuse, and exploitation</h3>
                  <p className="text-muted-foreground">
                    All children, regardless of their age, culture, disability, gender, language, racial origin, socio-economic status, religious belief, and/or sexual identity, have the right to protection from harm, abuse, and exploitation while using Petroll.co.
                  </p>
                </div>
                <div className="bg-muted/30 rounded-2xl p-6 border border-border">
                  <h3 className="font-display font-bold mb-2">Child protection is everyone's responsibility</h3>
                  <p className="text-muted-foreground">
                    We require all staff, users, and partners to understand their role in safeguarding children and promoting child safety within the platform.
                  </p>
                </div>
                <div className="bg-muted/30 rounded-2xl p-6 border border-border">
                  <h3 className="font-display font-bold mb-2">Children's rights to express views</h3>
                  <p className="text-muted-foreground">
                    Children have the right to express their views about the platform and its services, and their input will be treated with respect and consideration.
                  </p>
                </div>
              </div>
            </div>

            {/* Commitment */}
            <div>
              <h2 className="text-2xl font-display font-bold mb-6 text-primary">
                Our Commitment to Child Safety
              </h2>
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-display font-bold mb-3 flex items-center gap-2">
                    <span className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary text-sm">1</span>
                    Age Restrictions
                  </h3>
                  <p className="text-muted-foreground ml-10">
                    Petroll is designed exclusively for users aged 13 and older. We have implemented features and safeguards to ensure that no content or features intended for adults are accessible to users under 13. We comply with all relevant child protection laws, including the Children's Online Privacy Protection Act (COPPA) in the USA and GDPR-K (EU) regulations, to ensure that children's privacy is respected and protected.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-display font-bold mb-3 flex items-center gap-2">
                    <span className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary text-sm">2</span>
                    Content Moderation and Safeguards
                  </h3>
                  <p className="text-muted-foreground ml-10">
                    To ensure a safe experience for all users, Petroll has implemented strict content moderation features. This includes monitoring and filtering content to ensure that no harmful, inappropriate, or abusive material is accessible by minors. We continuously update these moderation features to stay in line with the latest child safety standards.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-display font-bold mb-3 flex items-center gap-2">
                    <span className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary text-sm">3</span>
                    Parental Controls and Reporting Mechanisms
                  </h3>
                  <p className="text-muted-foreground ml-10">
                    We provide parental controls for users under the age of 18, allowing parents and guardians to monitor and control their child's activity on Petroll. Additionally, we have a clear and easy-to-use reporting system that allows users to report inappropriate or harmful content or behavior, which will be investigated promptly.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-display font-bold mb-3 flex items-center gap-2">
                    <span className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary text-sm">4</span>
                    Data Privacy and Protection
                  </h3>
                  <p className="text-muted-foreground ml-10">
                    We do not collect any personal data from children under the age of 13. We ensure that all data handling practices comply with COPPA (USA), GDPR-K (EU), and other relevant laws, including providing detailed privacy protections for all users. We are transparent about the data we collect and how it is used.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-display font-bold mb-3 flex items-center gap-2">
                    <span className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary text-sm">5</span>
                    Safety Training for Staff
                  </h3>
                  <p className="text-muted-foreground ml-10">
                    All staff and volunteers at Petroll are trained on child safety practices and policies, and they are required to adhere to this Child Safety Policy. This ensures that everyone involved in the development and operation of the platform understands the importance of protecting children from harm.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-display font-bold mb-3 flex items-center gap-2">
                    <span className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary text-sm">6</span>
                    Immediate Response to Allegations of Misconduct
                  </h3>
                  <p className="text-muted-foreground ml-10">
                    We take any allegations of misconduct, abuse, or harmful behavior seriously. Any reports of inappropriate behavior or violations of our policies will be addressed in line with our procedures, which may include disciplinary actions, such as suspension or removal from the platform. We cooperate fully with law enforcement, when necessary.
                  </p>
                </div>
              </div>
            </div>

            {/* Review */}
            <div>
              <h2 className="text-2xl font-display font-bold mb-4 text-primary">
                Review and Evaluation
              </h2>
              <p className="text-muted-foreground mb-4">
                This policy will be regularly reviewed and updated in the following circumstances:
              </p>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <span><strong>Changes in legislation or regulatory guidance:</strong> In accordance with updates to child protection laws, including COPPA (USA), GDPR-K (EU), and other relevant standards.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <span><strong>Following any concerns or incidents raised about child safety:</strong> If any concerns are raised regarding the safety of children on Petroll, the policy and procedures will be reviewed and revised to address the issue effectively.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <span><strong>At least every three years:</strong> We will review this policy at least once every three years to ensure it remains relevant and effective.</span>
                </li>
              </ul>
            </div>

            {/* Special Note */}
            <div className="bg-gradient-to-r from-coral/10 to-sunshine/10 dark:from-coral/5 dark:to-sunshine/5 rounded-2xl p-6 border border-border">
              <h2 className="text-xl font-display font-bold mb-4 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-coral" />
                Special Note Regarding Children Under 13
              </h2>
              <p className="text-muted-foreground mb-4">
                Petroll is committed to protecting the privacy and safety of children under the age of 13. As stated, Petroll does not collect any personal data from children under 13, and we do not knowingly allow children under 13 to register or interact with our services. If a child under the age of 13 submits personally identifiable information to us, we will make every reasonable effort to delete this information as soon as possible.
              </p>
              <p className="text-foreground font-medium">
                If you are under 13, please do not register for Petroll or provide any personal information, such as your name, email address, or phone number.
              </p>
            </div>

            {/* Contact */}
            <div className="bg-teal/10 dark:bg-teal/5 rounded-2xl p-6 border border-border">
              <h2 className="text-xl font-display font-bold mb-4 flex items-center gap-2">
                <Mail className="w-5 h-5 text-teal" />
                Contact Information
              </h2>
              <p className="text-muted-foreground mb-4">
                If you have any concerns or questions regarding child safety on Petroll, or if you need to report any incidents related to the safety of minors, please contact us at:
              </p>
              <p className="text-foreground font-medium mb-2">
                Email: adam@petroll.co
              </p>
              <p className="text-muted-foreground">
                Petroll.co By Paraa Tech Inc., USA
              </p>
              <p className="text-sm text-muted-foreground mt-4">
                Last update Date: 10 Feb 2025
              </p>
            </div>

            {/* Footer note */}
            <div className="pt-8 border-t border-border text-center">
              <p className="text-muted-foreground mb-4">
                By using Petroll, you acknowledge and agree to abide by this Child Safety Policy & all other policies mentioned on the site.
              </p>
              <p className="text-sm text-muted-foreground">
                Copyright 2024 – Petroll.co By Paraa Tech Inc. USA
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
