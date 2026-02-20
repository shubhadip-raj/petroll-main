import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import defaultPet from "@/app/assets/images/sample-dog2.jpeg";
import axios from "axios";
import { Shield, ArrowRight, Sparkles, Mail, Copy } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL;

export default function PetPage() {
    const location = useLocation();
    const { toast } = useToast();
    const [pet, setPet] = useState(null);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);
    const [showContactModal, setShowContactModal] = useState(false);
    const [showShareModal, setShowShareModal] = useState(false);

    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get("token");

    useEffect(() => {
        const fetchPet = async () => {
            if (!token) {
                setNotFound(true);
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get(`${API_URL}/pet/public/${token}`);
                if (!response.data) setNotFound(true);
                else setPet(response.data);
            } catch (error) {
                console.error("Error fetching pet:", error);
                setNotFound(true);
            }
            setLoading(false);
        };
        fetchPet();
    }, [token]);

    return (
        <Layout>
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-br from-peach/30 via-background to-lavender/20 dark:from-background dark:to-lavender/10 py-16 md:py-24">
                <div className="container mx-auto px-4 text-center max-w-3xl">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6"
                    >
                        <Sparkles className="w-4 h-4" /> Pet Information
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4"
                    >
                        {pet ? `Meet ${pet.petName}` : "Pet Details"}
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-lg md:text-xl text-muted-foreground"
                    >
                        Get all the essential information about your beloved pet in one
                        place. Track, protect, and stay connected with your furry friends.
                    </motion.p>
                </div>
            </section>

            {/* Loading */}
            {loading && (
                <div className="flex justify-center items-center py-24">
                    <p className="text-lg font-medium text-gray-600">
                        Loading pet details...
                    </p>
                </div>
            )}

            {/* Not Found */}
            {!loading && notFound && (
                <div className="flex justify-center py-24">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="bg-card border shadow-xl rounded-3xl p-10 max-w-md text-center"
                    >
                        <div className="text-7xl">🐶❓</div>
                        <h2 className="mt-4 text-3xl font-bold">Pet Not Found</h2>
                        <p className="text-muted-foreground mt-2">
                            This pet profile may have been removed or the QR link is invalid.
                        </p>
                        <Button className="mt-6" onClick={() => window.history.back()}>
                            ← Go Back
                        </Button>
                    </motion.div>
                </div>
            )}

            {/* Pet Details */}
            {!loading && pet && (
                <section className="container mx-auto px-4 pb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-gradient-to-br from-peach/10 via-background to-lavender/20 dark:from-background dark:via-background dark:to-teal/10 rounded-3xl shadow-2xl border border-border overflow-hidden max-w-5xl mx-auto"
                    >
                        <div className="grid md:grid-cols-3">
                            {/* Left: Pet Image */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="p-6 flex items-center justify-center relative"
                            >
                                <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-pink-300 via-purple-300 to-blue-300 blur-2xl opacity-30 animate-pulse"></div>
                                <img
                                    src={
                                        pet.base64Image
                                            ? `data:image/jpeg;base64,${pet.base64Image}`
                                            : defaultPet
                                    }
                                    alt={pet.petName}
                                    className="relative rounded-3xl shadow-2xl w-full object-cover aspect-square border border-gray-200"
                                />

                            </motion.div>

                            {/* Right: Pet Info */}
                            <div className="md:col-span-2 p-8 flex flex-col gap-6">
                                <h2 className="text-4xl md:text-5xl font-display font-bold text-gradient">
                                    {pet.petName}
                                </h2>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {[
                                        ["Owner", pet.owner?.userName || "N/A"],
                                        ["Breed", pet.breed],
                                        ["Species", pet.species],
                                        ["Color", pet.color],
                                        ["Gender", pet.gender],
                                        ["DOB", pet.dob],
                                        ["Spayed/Neutered", pet.spayedNeutered],
                                        ["Microchip ID", pet.microChipId || "N/A"],
                                        ["Emergency Contact", pet.emergencyContact || "N/A"],
                                    ].map(([label, value]) => (
                                        <div
                                            key={label}
                                            className="p-3 rounded-xl bg-white/50 dark:bg-gray-800/50 shadow-sm border border-border"
                                        >
                                            <b className="text-muted-foreground">{label}:</b>{" "}
                                            <span className="font-medium">{value}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* Lost Status */}
                                <div className="flex items-center gap-3 pt-2">
                                    <b>Lost Status:</b>
                                    {pet.lost ? (
                                        <Badge className="bg-red-600 text-white shadow-md">Lost</Badge>
                                    ) : (
                                        <Badge className="bg-green-600 text-white shadow-md">Safe</Badge>
                                    )}
                                </div>

                                {pet.lost && pet.lostMessage && (
                                    <div className="mt-3 p-4 rounded-xl bg-red-50 text-red-700 border border-red-200 shadow-lg">
                                        <b>Lost Message:</b> {pet.lostMessage}
                                    </div>
                                )}

                                {pet.description && (
                                    <div className="mt-6 p-4 rounded-xl bg-white/60 dark:bg-gray-800/60 shadow-lg border border-border">
                                        <strong>Description:</strong>
                                        <p className="text-gray-700 dark:text-gray-300 mt-1">
                                            {pet.description}
                                        </p>
                                    </div>
                                )}

                                {/* Action Buttons */}
                                <div className="mt-6 flex flex-wrap gap-4">
                                    <Button
                                        variant="default"
                                        size="lg"
                                        className="hover:scale-105 transition-transform"
                                        onClick={() => setShowContactModal(true)}
                                    >
                                        Contact Owner <ArrowRight className="w-5 h-5 ml-2" />
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="lg"
                                        className="hover:bg-primary/10 transition-colors"
                                        onClick={() => setShowShareModal(true)}
                                    >
                                        Share Profile
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Verified Badge */}
                    <motion.div
                        animate={{ y: [0, -8, 0] }}
                        transition={{ repeat: Infinity, duration: 3 }}
                        className="flex justify-center mt-10"
                    >
                        <div className="bg-card border shadow-xl rounded-3xl px-6 py-4 flex items-center gap-3 hover:scale-105 transition-transform">
                            <Shield className="w-6 h-6 text-primary" />
                            <div>
                                <div className="font-bold text-lg">Verified Pet Profile</div>
                                <div className="text-xs text-muted-foreground">
                                    Data secured by Petroll
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </section>
            )}

            {/* Contact Owner Modal */}
            {showContactModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 max-w-md w-full relative shadow-xl">
                        <h3 className="text-2xl font-bold mb-4">Contact Owner</h3>
                        <p>
                            <b>Name:</b> {pet.owner?.userName || "N/A"}
                        </p>
                        <p className="flex items-center gap-2">
                            <b>Email:</b> {pet.owner?.userEmail || "N/A"}{" "}
                            {pet.owner?.userEmail && (
                                <button
                                    onClick={() =>
                                        (window.location.href = `mailto:${pet.owner.userEmail}`)
                                    }
                                    className="ml-auto text-primary hover:underline flex items-center gap-1"
                                >
                                    <Mail className="w-4 h-4" /> Mail
                                </button>
                            )}
                        </p>
                        <p className="flex items-center gap-2">
                            <b>Phone:</b> {pet.owner?.phone || "N/A"}{" "}
                            {pet.owner?.phone && (
                                <button
                                    onClick={() => {
                                        navigator.clipboard.writeText(pet.owner.phone);
                                        toast({
                                            title: "Phone Copied!",
                                            description: "Owner's phone number copied to clipboard.",
                                        });
                                    }}
                                    className="ml-auto text-primary hover:underline flex items-center gap-1"
                                >
                                    <Copy className="w-4 h-4" /> Copy
                                </button>
                            )}
                        </p>
                        <button
                            onClick={() => setShowContactModal(false)}
                            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                        >
                            ✕
                        </button>
                    </div>
                </div>
            )}

            {/* Share Profile Modal */}
            {showShareModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 max-w-md w-full relative shadow-xl">
                        <h3 className="text-2xl font-bold mb-4">Share Pet Profile</h3>
                        <p className="break-all">{window.location.href}</p>
                        <button
                            onClick={() => {
                                navigator.clipboard.writeText(window.location.href);
                                toast({
                                    title: "Link Copied!",
                                    description: "Pet profile link copied to clipboard.",
                                });
                            }}
                            className="mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition"
                        >
                            Copy Link
                        </button>
                        <button
                            onClick={() => setShowShareModal(false)}
                            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                        >
                            ✕
                        </button>
                    </div>
                </div>
            )}
        </Layout>
    );
}
