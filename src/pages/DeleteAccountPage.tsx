import { useState } from "react";
import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";
import ReCAPTCHA from "react-google-recaptcha";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export default function DeleteAccountPage() {
    const { toast } = useToast();

    const [isFullLoading, setIsFullLoading] = useState(false);
    const [isPartialLoading, setIsPartialLoading] = useState(false);
    const [captchaToken, setCaptchaToken] = useState<string | null>(null);

    const [fullData, setFullData] = useState({
        type: "all",           // added type field
        name: "",
        email: "",
        password: "",
        phone: "",
        reason: "",
    });

    const [partialData, setPartialData] = useState({
        type: "partial",       // added type field
        name: "",
        email: "",
        password: "",
        dataToDelete: "",
        reason: "",
    });
    function onChange(value) {
        console.log("Captcha value:", value);
        setCaptchaToken(value);
    }
    const handleFullDelete = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsFullLoading(true);
        if (!captchaToken) {
            toast({
                title: "Verification required",
                description: "Please complete the CAPTCHA",
                variant: "destructive",
            });
            return;
        }

        try {

            await axios.post(
                `${API_URL}/delete-account/full`,
                partialData,
                {
                    params: {
                        captchaToken: captchaToken,
                    },
                }
            );

            toast({
                title: "Request Submitted",
                description:
                    "Petroll admin will get back to you within 24 to 48 hours regarding your request.",
            });

            setFullData({
                type: "all",
                name: "",
                email: "",
                password: "",
                phone: "",
                reason: "",
            });
        } catch (error) {
            const errorMessage =
                error?.response?.data?.message ||   // from backend
                error?.response?.data ||            // fallback
                error.message ||                   // axios error
                "Something went wrong";

            toast({
                title: "Error",
                description: errorMessage,
                variant: "destructive",
            });
        } finally {
            setIsFullLoading(false);
            setCaptchaToken(null);
        }
    };

    const handlePartialDelete = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsPartialLoading(true);
        if (!captchaToken) {
            toast({
                title: "Verification required",
                description: "Please complete the CAPTCHA",
                variant: "destructive",
            });
            return;
        }

        try {
            await axios.post(
                `${API_URL}/delete-account/partial`,
                partialData,
                {
                    params: {
                        captchaToken: captchaToken,
                    },
                }
            );

            toast({
                title: "Request Submitted",
                description:
                    "Petroll admin will get back to you within 24 to 48 hours regarding your request.",
            });

            setPartialData({
                type: "partial",
                name: "",
                email: "",
                password: "",
                dataToDelete: "",
                reason: "",
            });

        } catch (error) {
            const errorMessage =
                error?.response?.data?.message ||   // from backend
                error?.response?.data ||            // fallback
                error.message ||                   // axios error
                "Something went wrong";

            toast({
                title: "Error",
                description: errorMessage,
                variant: "destructive",
            });

        } finally {
            setIsPartialLoading(false);
            setCaptchaToken(null);
        }
    };

    return (
        <Layout>
            {/* Hero Section */}
            <section className="py-16 md:py-24 bg-gradient-to-br from-red-100/40 via-background to-red-50/20 dark:from-red-950/30">
                <div className="container mx-auto px-4 text-center max-w-3xl">
                    <div className="inline-flex items-center gap-2 bg-red-100 text-red-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
                        <Trash2 className="w-4 h-4" />
                        Delete Account
                    </div>

                    <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
                        Manage Your Data
                    </h1>

                    <p className="text-muted-foreground">
                        You can request to delete your entire account or only specific data.
                    </p>
                </div>
            </section>

            {/* Tabs Section */}
            <section className="py-16">
                <div className="container mx-auto px-4 max-w-3xl">
                    <Tabs defaultValue="full" className="w-full">
                        <TabsList className="grid grid-cols-2 mb-8 rounded-xl bg-muted p-1">
                            <TabsTrigger value="full">Delete Full Account</TabsTrigger>
                            <TabsTrigger value="partial">Delete Partial Data</TabsTrigger>
                        </TabsList>

                        {/* FULL DELETE */}
                        <TabsContent value="full">
                            <div className="bg-card p-6 md:p-8 rounded-3xl border border-border shadow-card">
                                <h2 className="text-xl font-bold mb-6">Full Account Deletion</h2>

                                <form onSubmit={handleFullDelete} className="space-y-5">
                                    <Input
                                        placeholder="Full Name"
                                        value={fullData.name}
                                        onChange={(e) =>
                                            setFullData({ ...fullData, name: e.target.value })
                                        }
                                        required
                                    />

                                    <Input
                                        type="email"
                                        placeholder="Email"
                                        value={fullData.email}
                                        onChange={(e) =>
                                            setFullData({ ...fullData, email: e.target.value })
                                        }
                                        required
                                    />

                                    <Input
                                        type="password"
                                        placeholder="Password"
                                        value={fullData.password}
                                        onChange={(e) =>
                                            setFullData({ ...fullData, password: e.target.value })
                                        }
                                        required
                                    />

                                    <Input
                                        placeholder="Phone Number"
                                        value={fullData.phone}
                                        onChange={(e) =>
                                            setFullData({ ...fullData, phone: e.target.value })
                                        }
                                    />

                                    <Textarea
                                        placeholder="Reason for deletion"
                                        value={fullData.reason}
                                        onChange={(e) =>
                                            setFullData({ ...fullData, reason: e.target.value })
                                        }
                                    />
                                    <div className="flex justify-center w-full my-4">
                                        <div className="scale-[0.9] sm:scale-100 origin-center">
                                            <ReCAPTCHA
                                                sitekey="6LeglJQsAAAAAHjISRIu2QQ6z4F2yHKDk0JV2_uo"
                                                onChange={onChange}
                                            /></div></div>
                                    <Button
                                        type="submit"
                                        variant="destructive"
                                        className="w-full"
                                        disabled={isFullLoading}
                                    >
                                        {isFullLoading ? "Submitting..." : "Delete My Account"}
                                    </Button>
                                </form>
                            </div>
                        </TabsContent>

                        {/* PARTIAL DELETE */}
                        <TabsContent value="partial">
                            <div className="bg-card p-6 md:p-8 rounded-3xl border border-border shadow-card">
                                <h2 className="text-xl font-bold mb-6">Partial Data Deletion</h2>

                                <form onSubmit={handlePartialDelete} className="space-y-5">
                                    <Input
                                        placeholder="Full Name"
                                        value={partialData.name}
                                        onChange={(e) =>
                                            setPartialData({ ...partialData, name: e.target.value })
                                        }
                                        required
                                    />

                                    <Input
                                        type="email"
                                        placeholder="Email"
                                        value={partialData.email}
                                        onChange={(e) =>
                                            setPartialData({ ...partialData, email: e.target.value })
                                        }
                                        required
                                    />

                                    {/* Added Password Field */}
                                    <Input
                                        type="password"
                                        placeholder="Password"
                                        value={partialData.password}
                                        onChange={(e) =>
                                            setPartialData({ ...partialData, password: e.target.value })
                                        }
                                        required
                                    />

                                    <Input
                                        placeholder="What data do you want to delete?"
                                        value={partialData.dataToDelete}
                                        onChange={(e) =>
                                            setPartialData({
                                                ...partialData,
                                                dataToDelete: e.target.value,
                                            })
                                        }
                                        required
                                    />

                                    <Textarea
                                        placeholder="Reason for request"
                                        value={partialData.reason}
                                        onChange={(e) =>
                                            setPartialData({
                                                ...partialData,
                                                reason: e.target.value,
                                            })
                                        }
                                    />
                                    <div className="flex justify-center w-full my-4">
                                        <div className="scale-[0.9] sm:scale-100 origin-center">
                                            <ReCAPTCHA
                                                sitekey="6LeglJQsAAAAAHjISRIu2QQ6z4F2yHKDk0JV2_uo"
                                                onChange={onChange}
                                            /></div></div>
                                    <Button
                                        type="submit"
                                        variant="secondary"
                                        className="w-full"
                                        disabled={isPartialLoading}
                                    >
                                        {isPartialLoading ? "Submitting..." : "Submit Request"}
                                    </Button>
                                </form>
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </section>
        </Layout>
    );
}