import { motion } from "framer-motion";
import { FileText, Shield, Users, Scale, Globe, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";

const sections = [
  {
    icon: Shield,
    title: "About our services",
    content: [
      {
        subtitle: "Age Requirement",
        text: "To use our Services, you must be at least 13 years old. However, the minimum age requirement may be higher in your home country, and you must comply with any such requirement.",
      },
      {
        subtitle: "Account Registration",
        text: "To create an account, you must register for our Services using your email and/or phone number. By registering, you agree to receive text messages and phone calls from us or our third-party providers with verification codes for the purpose of registering for our Services.",
      },
      {
        subtitle: "Privacy of User Data",
        text: "Petroll is committed to safeguarding your personal data and content. We do not sell, rent, or monetize your information in any way. Please read our Privacy Policy to understand how we protect the information you provide when using our Services. By using our Services, you agree to our data practices as described in our Privacy Policy, including the transfer of your encrypted information and metadata to the United States and other countries where we have facilities, service providers, or partners. For example, third-party providers may send you a verification code or process your support tickets, and we may share some of your information with stakeholders with your consent, such as pet groomers or vets managing your pets.",
      },
      {
        subtitle: "Software",
        text: "To access new features and improved functionality, you must agree to download and install updates to our Services.",
      },
      {
        subtitle: "Fees and Taxes",
        text: "You are responsible for any data and mobile carrier fees and taxes associated with the devices you use to access our Services.",
      },
    ],
  },
  {
    icon: Users,
    title: "Using Petroll App, web, devices, hardware or any other tools",
    content: [
      {
        subtitle: "Compliance with Terms and Policies",
        text: "By using our Services, you agree to comply with our Terms and posted policies. If we disable your account due to a violation of our Terms, you may not create another account without obtaining our permission.",
      },
      {
        subtitle: "Legal and Acceptable Use",
        text: "You agree to use our Services only for legal, authorized, and acceptable purposes. You will not use (or assist others in using) our Services in ways that violate or infringe upon the rights of Petroll, our users, or others, including privacy, publicity, intellectual property, or other proprietary rights. This also includes engaging in illegal or impermissible activities, such as sending spam or using external scripts to automate actions.",
      },
      {
        subtitle: "Account Security",
        text: "While we have designed our Services with privacy in mind, you are responsible for ensuring the security of your device, tags, tools, and accounts. If your phone is lost or you suspect your account has been compromised, please contact us to prevent unauthorized access.",
      },
      {
        subtitle: "No Assurance",
        text: "Our Services are intended to offer convenience and provide a means for you to manage your pets better by keeping as much information about them as possible. However, we do not provide any assurance for the safety or emergency needs of your pets or pet management.",
      },
      {
        subtitle: "Third-Party Services",
        text: "Our Services may allow you to access, use, or interact with third-party websites, apps, content, and other products and services. When you use third-party services, their terms and privacy policies will govern your use of those services.",
      },
    ],
  },
  {
    icon: Scale,
    title: "Your Rights with Petroll",
    content: [
      {
        subtitle: "Your Information Rights",
        text: "You retain ownership of any information you submit through Petroll's Services.",
      },
      {
        subtitle: "Petroll's Intellectual Property Rights",
        text: "We own all intellectual property rights associated with our Services, including copyrights, trademarks, patents, and trade secrets. You may not use our trademarks, domains, logos, trade dress, patents, or any other intellectual property without our written consent.",
      },
      {
        subtitle: "Limited License",
        text: "By agreeing to these Terms, Petroll grants you a limited, non-exclusive, non-transferable, and revocable license to use our Services. This license is subject to the terms and conditions outlined in these Terms.",
      },
    ],
  },
  {
    icon: AlertCircle,
    title: "Disclaimers and Limitations",
    content: [
      {
        subtitle: "Disclaimers",
        text: "When you use our Services, you do so at your own risk. We provide our Services \"as is\" and without any express or implied warranties, including but not limited to warranties of merchantability, fitness for a particular purpose, title, non-infringement, and freedom from computer viruses or other harmful code. Petroll does not guarantee that any information provided by us is accurate, complete, or useful, or that our Services will be operational, error-free, secure, or safe, or that they will function without disruptions, delays, or imperfections. We do not control how or when our users use our Services, and we are not responsible for the actions or information (including content) of our users or other third parties. By using our Services, you release Petroll Associates from any claim, complaint, cause of action, controversy, or dispute (collectively referred to as \"Claim\") and damages, known and unknown, relating to, arising out of, or in any way connected with any such Claim you have against any third parties.",
      },
      {
        subtitle: "Availability of Our Services",
        text: "Petroll may interrupt or discontinue our Services at any time, including for maintenance, upgrades, or network or equipment failures. We may also choose to discontinue certain features or support for certain devices and platforms. We will make efforts to provide advance notice of any such interruptions or discontinuations, but we do not guarantee that such notice will be provided.",
      },
    ],
  },
  {
    icon: Globe,
    title: "Resolving Disputes and Ending Terms",
    content: [
      {
        subtitle: "Resolving disputes",
        text: "You agree to resolve any Claim you have with us relating to or arising out of our Terms, us, or our Services exclusively in the United States District Court for the Northern District of California or a state court in San Mateo County, California. You also agree to submit to the personal jurisdiction of such courts for the purpose of litigating all such disputes. The laws of the State of California govern our Terms, as well as any disputes, whether in court or arbitration, which might arise between Petroll and you, without regard to conflict of law provisions.",
      },
      {
        subtitle: "Ending these Terms",
        text: "You can end your agreement with Petroll by discontinuing the use of our services, deleting the application and web history, and ceasing the use of any associated tools. However, we reserve the right to modify, suspend, or terminate your access to our Services at any time for any reason, especially if you violate our Terms or create a potential risk or legal exposure for Petroll. Certain provisions, such as \"Licenses,\" \"Disclaimers,\" \"Limitation of Liability,\" \"Resolving Dispute,\" \"Availability and Ending these Terms,\" and \"General,\" will continue to apply even after termination of your relationship with Petroll.",
      },
    ],
  },
];

export default function TermsPage() {
  return (
    <Layout>
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <FileText className="w-4 h-4" />
              Legal
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Terms & Conditions
            </h1>
            <p className="text-muted-foreground">
              Terms of Service
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-card rounded-3xl p-6 md:p-10 shadow-card border border-border"
          >
            {/* Introduction */}
            <div className="mb-10">
              <p className="text-muted-foreground leading-relaxed mb-4">
                Petroll, operated by Paraa Tech Inc, employs advanced security systems to establish a QR identity for pets and the related services. This service offers single or multiple identities for pets and other animals in the form of QR stickers. By scanning these stickers, you can access all the relevant information about the targeted pet or animal.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                To access our Services, including our apps, website, and other related services, you agree to our Terms of Service ("Terms"). These terms outline the rules and guidelines for using our Services, and they apply to all users. By installing or using our Services, you acknowledge and agree to comply with our Terms, which govern the use of our platform and ensure that all users have a safe and secure experience. At Petroll, we are committed to maintaining the high standards of security and transparency in all our operations.
              </p>
            </div>

            {/* Main Sections */}
            <div className="space-y-10">
              {sections.map((section, sectionIndex) => (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: sectionIndex * 0.1 }}
                  className="border-t border-border pt-8"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 rounded-xl bg-primary/10">
                      <section.icon className="w-5 h-5 text-primary" />
                    </div>
                    <h2 className="text-2xl font-display font-bold text-primary">
                      {section.title}
                    </h2>
                  </div>
                  <div className="space-y-6">
                    {section.content.map((item, index) => (
                      <div key={index}>
                        <h3 className="font-display font-semibold text-lg mb-2">
                          {item.subtitle}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {item.text}
                        </p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* General Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="border-t border-border pt-8 mt-10"
            >
              <h2 className="text-2xl font-display font-bold text-primary mb-6">
                General
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Petroll reserves the right to update these Terms periodically. Your continued use of our Services indicates your acceptance of the updated Terms and replaces any prior agreements. You are responsible for complying with all applicable export control and trade sanctions laws. These Terms constitute the entire agreement between you and Petroll regarding our Services. If you do not agree with our Terms, you should discontinue using our Services.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Petroll's failure to enforce any of these Terms does not waive our right to enforce them in the future. If any provision of these Terms is deemed unlawful, void, or unenforceable, that provision shall be considered separate from these Terms and will not affect the validity of the remaining provisions. Our Services are not intended for distribution or use in any country where such distribution or use would violate local law or regulations. We reserve the right to limit our Services in any country. If you have any questions about these Terms, please contact us at{" "}
                <a href="mailto:privacy@petroll.co" className="text-primary hover:underline">
                  privacy@petroll.co
                </a>.
              </p>
            </motion.div>

            {/* Related Policies */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-10 p-6 bg-primary/5 rounded-2xl border border-primary/20"
            >
              <h3 className="font-display font-bold text-lg mb-4">Related Policies</h3>
              <p className="text-muted-foreground mb-4">
                Also refer to our other policies on the site:
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  to="/child-safety"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium hover:bg-primary/20 transition-colors"
                >
                  <Shield className="w-4 h-4" />
                  Child Safety Policy
                </Link>
                <Link
                  to="/safety"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium hover:bg-primary/20 transition-colors"
                >
                  <Shield className="w-4 h-4" />
                  Safety Policies
                </Link>
              </div>
            </motion.div>

            {/* Footer Note */}
            <div className="mt-12 pt-8 border-t border-border">
              <p className="text-sm text-muted-foreground text-center">
                By using Petroll, you acknowledge and agree to abide by all other policies mentioned on the site.
              </p>
              <p className="text-xs text-muted-foreground text-center mt-4">
                Copyright 2024 – Petroll.co By Paraa Tech Inc. USA
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
