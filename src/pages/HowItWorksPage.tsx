import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import howItWorksUsersImg from "@/assets/how-it-works-users.jpg";
import howItWorksManagersImg from "@/assets/how-it-works-managers.jpg";
import {
    User,
    UserPlus,
    PawPrint,
    QrCode,
    Smartphone,
    Bell,
    Shield,
    Briefcase,
    Settings,
    ClipboardList,
    BarChart3,
    ArrowRight,
    MessageSquare,
    Workflow,
} from "lucide-react";
import { Link } from "react-router-dom";

const userSteps = [
    {
        icon: UserPlus,
        title: "1. Create Your Account",
        description:
            "Sign up on the Petroll app using your email or social login. It takes less than a minute to get started.",
    },
    {
        icon: PawPrint,
        title: "2. Register Your Pet",
        description:
            "Add your pet's profile with their name, breed, photo, medical history, and emergency contacts.",
    },
    {
        icon: QrCode,
        title: "3. Get Your QR Tag",
        description:
            "Order a unique Petroll QR Tag for your pet's collar. Each tag is linked to your pet's digital profile.",
    },
    {
        icon: Smartphone,
        title: "4. Share & Connect",
        description:
            "Anyone who finds your pet can scan the QR tag to instantly view their profile and contact you.",
    },
    {
        icon: Bell,
        title: "5. Stay Updated",
        description:
            "Receive notifications when your pet's tag is scanned, track their location history, and manage their health records.",
    },
    {
        icon: Shield,
        title: "6. Peace of Mind",
        description:
            "Rest easy knowing your pet's identity is always accessible. Update their info anytime from the app.",
    },
];

const managerSteps = [
    {
        icon: Briefcase,
        title: "1. Register as a Pet Manager",
        description:
            "Sign up as a professional pet manager — whether you're a vet, groomer, daycare operator, or pet sitter.",
    },
    {
        icon: Settings,
        title: "2. Set Up Your Business Profile",
        description:
            "Add your business details, services offered, operating hours, and location to attract local pet owners.",
    },
    {
        icon: QrCode,
        title: "3. Scan Pet QR Tags",
        description:
            "Instantly access a pet's full profile by scanning their Petroll QR Tag — no paperwork needed.",
    },
    {
        icon: ClipboardList,
        title: "4. Manage Pet Records",
        description:
            "Update health records, add visit notes, upload vaccination documents, and track service history.",
    },
    {
        icon: Bell,
        title: "5. Communicate with Owners",
        description:
            "Send updates, appointment reminders, and care reports directly to pet owners through the platform.",
    },
    {
        icon: BarChart3,
        title: "6. Grow Your Business",
        description:
            "Gain visibility in the Petroll community, receive reviews, and build a trusted reputation.",
    },
];

export default function HowItWorksPage() {
    return (
        <Layout>
            {/* Hero Section (Same style as Contact Page) */}
            <section className="py-16 md:py-24 bg-gradient-to-br from-blue-100/80 via-background to-blue-50/40 dark:from-blue-950/40 dark:to-background">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center max-w-3xl mx-auto"
                    >
                        <div className="inline-flex items-center gap-2 bg-blue-600/10 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
                           <Workflow className="w-4 h-4" />
                            How Petroll Works
                        </div>

                        <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
                            Simple Steps to Protect & Manage Your Pets
                        </h1>

                        <p className="text-lg text-muted-foreground">
                            Whether you're a pet owner or a professional pet manager,
                            Petroll makes it easy to manage pet identity, records, and
                            communication in one place.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Tabs Section */}
            <section className="py-16 md:py-24">
                <div className="container mx-auto px-4">

                    <Tabs defaultValue="users" className="w-full max-w-6xl mx-auto">

                        <TabsList className="mx-auto mb-12 grid w-full max-w-md grid-cols-2 rounded-2xl bg-muted p-1.5">
                            <TabsTrigger
                                value="users"
                                className="flex items-center gap-2 rounded-xl py-3 text-sm font-semibold"
                            >
                                <User className="w-4 h-4" />
                                Pet Owners
                            </TabsTrigger>

                            <TabsTrigger
                                value="managers"
                                className="flex items-center gap-2 rounded-xl py-3 text-sm font-semibold"
                            >
                                <Briefcase className="w-4 h-4" />
                                Pet Managers
                            </TabsTrigger>
                        </TabsList>

                        {/* PET OWNERS */}
                        <TabsContent value="users">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-center mb-12"
                            >
                                <h2 className="text-3xl font-display font-bold mb-4">
                                    Getting Started as a Pet Owner
                                </h2>

                                <p className="text-muted-foreground max-w-2xl mx-auto">
                                    Follow these simple steps to create your pet's identity and
                                    keep them safe using Petroll.
                                </p>
                            </motion.div>
                            <div className="mb-12 flex justify-center">
                                <div className="overflow-hidden rounded-3xl border border-border shadow-card bg-gradient-to-br from-muted/40 to-muted/10 p-6">
                                    <img
                                        src={howItWorksUsersImg}
                                        alt="Pet owner registering their pet"
                                        className="w-full max-w-[700px] rounded-xl transition-transform duration-500 hover:scale-105"
                                    />
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {userSteps.map((step, index) => (
                                    <motion.div
                                        key={step.title}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="bg-card rounded-2xl p-6 shadow-card border border-border"
                                    >
                                        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                                            <step.icon className="w-6 h-6 text-primary" />
                                        </div>

                                        <h3 className="font-display font-bold mb-2">
                                            {step.title}
                                        </h3>

                                        <p className="text-sm text-muted-foreground">
                                            {step.description}
                                        </p>
                                    </motion.div>
                                ))}
                            </div>
                        </TabsContent>

                        {/* PET MANAGERS */}
                        <TabsContent value="managers">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-center mb-12"
                            >
                                <h2 className="text-3xl font-display font-bold mb-4">
                                    Getting Started as a Pet Manager
                                </h2>

                                <p className="text-muted-foreground max-w-2xl mx-auto">
                                    Petroll helps vets, groomers, and pet sitters streamline
                                    workflows and connect with pet owners.
                                </p>
                            </motion.div>

                            <div className="mb-12 flex justify-center">
                                <div className="overflow-hidden rounded-3xl border border-border shadow-card bg-gradient-to-br from-muted/40 to-muted/10 p-6">
                                    <img
                                        src={howItWorksManagersImg}
                                        alt="Pet owner registering their pet"
                                        className="w-full max-w-[700px] rounded-xl transition-transform duration-500 hover:scale-105"
                                    />
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {managerSteps.map((step, index) => (
                                    <motion.div
                                        key={step.title}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="bg-card rounded-2xl p-6 shadow-card border border-border"
                                    >
                                        <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center mb-4">
                                            <step.icon className="w-6 h-6 text-secondary" />
                                        </div>

                                        <h3 className="font-display font-bold mb-2">
                                            {step.title}
                                        </h3>

                                        <p className="text-sm text-muted-foreground">
                                            {step.description}
                                        </p>
                                    </motion.div>
                                ))}
                            </div>
                        </TabsContent>

                    </Tabs>

                    {/* CTA */}
                    <div className="text-center mt-16">
                        <Button variant="hero" size="lg" asChild>
                            <Link to="/login">
                                Get Started Today
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </Link>
                        </Button>
                    </div>

                </div>
            </section>
        </Layout>
    );
}