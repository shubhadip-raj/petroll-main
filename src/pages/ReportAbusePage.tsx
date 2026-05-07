
import { motion } from "framer-motion";
import {
    AlertTriangle,
    Shield,
    Bug,
    Mail,
    UserX,
    FileWarning,
    MessageCircle,
} from "lucide-react";
import { Layout } from "@/components/layout/Layout";

const sections = [
    {
        icon: AlertTriangle,
        title: "Types of Issues You Can Report",
        content: [
            {
                subtitle: "Abuse or Misuse",
                text: "Report any misuse of Petroll services, including fake pet profiles, misleading information, or unauthorized use of QR tags.",
            },
            {
                subtitle: "Harassment or Harmful Behavior",
                text: "If you experience harassment, threats, or inappropriate communication through the platform, please report it immediately.",
            },
            {
                subtitle: "Lost or Stolen Tags",
                text: "If your Petroll QR tag is lost, stolen, or being misused, notify us so we can deactivate or secure it.",
            },
            {
                subtitle: "Technical Issues",
                text: "Report bugs, app crashes, QR scan failures, or any unexpected behavior affecting your experience.",
            },
        ],
    },
    {
        icon: Bug,
        title: "Reporting Technical Problems",
        content: [
            {
                subtitle: "App or Website Errors",
                text: "If you encounter errors while using the app or website, please include details such as device type, browser, and steps to reproduce the issue.",
            },
            {
                subtitle: "QR Code Issues",
                text: "If scanning a QR tag does not work or leads to incorrect information, report it with a screenshot if possible.",
            },
            {
                subtitle: "Performance Issues",
                text: "Let us know if the platform is slow, unresponsive, or experiencing downtime so we can investigate and improve performance.",
            },
        ],
    },
    {
        icon: Shield,
        title: "How We Handle Reports",
        content: [
            {
                subtitle: "Review Process",
                text: "All reports are reviewed by our team to ensure accuracy and fairness before any action is taken.",
            },
            {
                subtitle: "Confidentiality",
                text: "Your identity and report details are kept confidential and are only used to investigate the issue.",
            },
            {
                subtitle: "Action Taken",
                text: "Depending on the severity, we may warn, suspend, or permanently remove accounts that violate our policies.",
            },
        ],
    },
    {
        icon: UserX,
        title: "Account Safety & Protection",
        content: [
            {
                subtitle: "Secure Your Account",
                text: "If you suspect unauthorized access, immediately change your credentials and contact support.",
            },
            {
                subtitle: "Report Suspicious Activity",
                text: "Notify us if you notice unusual behavior in your account or any linked pet profiles.",
            },
            {
                subtitle: "Prevent Misuse",
                text: "Avoid sharing your login details or QR tags publicly to prevent unauthorized access.",
            },
        ],
    },
    {
        icon: FileWarning,
        title: "False Reports & Misuse",
        content: [
            {
                subtitle: "Responsible Reporting",
                text: "Only submit reports that are genuine and based on real concerns. Misuse of the reporting system may result in account restrictions.",
            },
            {
                subtitle: "Verification",
                text: "We may request additional information to verify your report before taking action.",
            },
        ],
    },
];
export default function ReportAbusePage() {
    return (
        <Layout>
            <section className="py-16 md:py-24">
                <div className="container mx-auto px-4 max-w-4xl">

                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-12"
                    >
                        <div className="inline-flex items-center gap-2 bg-red-100 text-red-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
                            <AlertTriangle className="w-4 h-4" />
                            Report Issues
                        </div>

                        <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
                            Report Abuse & Issues
                        </h1>

                        <p className="text-muted-foreground">
                            Help us keep Petroll safe and reliable by reporting misuse,
                            technical issues, or suspicious activity.
                        </p>
                    </motion.div>

                    {/* Main Card */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="bg-card rounded-3xl p-6 md:p-10 shadow-card border border-border"
                    >
                        {/* Intro */}
                        <div className="mb-10">
                            <p className="text-muted-foreground leading-relaxed mb-4">
                                At Petroll, we are committed to providing a safe and trustworthy
                                environment for pet owners and pet managers. If you encounter any
                                misuse, suspicious activity, or technical problems, please report
                                them to us.
                            </p>

                            <p className="text-muted-foreground leading-relaxed">
                                Your reports help us improve our platform, protect users, and
                                ensure pets remain safe and properly identified.
                            </p>
                        </div>

                        {/* Sections */}
                        <div className="space-y-10">
                            {sections.map((section, index) => (
                                <motion.div
                                    key={section.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="border-t border-border pt-8"
                                >
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="p-2 rounded-xl bg-red-100">
                                            <section.icon className="w-5 h-5 text-red-600" />
                                        </div>

                                        <h2 className="text-2xl font-display font-bold text-red-600">
                                            {section.title}
                                        </h2>
                                    </div>

                                    <div className="space-y-6">
                                        {section.content.map((item, i) => (
                                            <div key={i}>
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

                        {/* Contact Box */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="mt-10 p-6 rounded-2xl border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20"
                        >
                            <h3 className="font-display font-bold text-lg mb-4 flex items-center gap-2 text-gray-900 dark:text-white">
                                <Mail className="w-5 h-5 text-red-600 dark:text-red-400" />
                                Contact Support
                            </h3>

                            <p className="text-gray-700 dark:text-gray-300 mb-4">
                                To report an issue, please contact us with details and any
                                supporting screenshots or information.
                            </p>

                            <a
                                href="mailto:support@petroll.co"
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-red-100 text-red-700 dark:bg-red-800/40 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-800/60 transition-colors"
                            >
                                <MessageCircle className="w-4 h-4" />
                                support@petroll.co
                            </a>
                        </motion.div>

                        {/* Footer */}
                        <div className="mt-12 pt-8 border-t border-border">
                            <p className="text-sm text-muted-foreground text-center">
                                We take all reports seriously and aim to respond within 24–48 hours.
                            </p>
                        </div>

                    </motion.div>
                </div>
            </section>
        </Layout>
    );
}