import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "@/contexts/UserContext";
import { IonIcon } from "@/components/ui/IonIcon";
import { useLocation, useNavigate } from "react-router-dom";
import { Layout } from "../layout/Layout";

const API_URL = import.meta.env.VITE_API_URL;

export default function UpgradePremiumPage() {
    const { user, token } = useContext(UserContext);
    const location = useLocation();
    const { pet } = location.state || {};
    const navigate = useNavigate();

    const days = 90; // Fixed premium duration

    const [hasPending, setHasPending] = useState(false);
    const [loading, setLoading] = useState(true);

    /* 🔍 Check pending premium request */
    useEffect(() => {
        if (!pet?.petId) return;

        const checkPendingRequest = async () => {
            try {
                const response = await fetch(`${API_URL}/pending/pet/${pet.petId}`);
                const pending = await response.json();
                setHasPending(pending);
            } catch (error) {
                console.error("Error checking pending request:", error);
            } finally {
                setLoading(false);
            }
        };

        checkPendingRequest();
    }, [pet?.petId, token]);

    if (!pet) {
        return (
            <Layout>
                <div className="min-h-screen flex items-center justify-center">
                    <p className="text-gray-600">No pet selected.</p>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4">
                <div className="bg-white dark:bg-gray-800 max-w-md w-full rounded-3xl shadow-2xl p-8 space-y-6">

                    {/* Header */}
                    <div className="text-center space-y-2">
                        <div className="flex justify-center">
                            <div className="bg-orange-100 dark:bg-orange-500/20 p-4 rounded-full">
                                <IonIcon name="star-outline" className="text-orange-500 text-4xl" />
                            </div>
                        </div>

                        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                            Upgrade to Premium ⭐
                        </h1>

                        <p className="text-gray-600 dark:text-gray-300 text-sm">
                            Premium for{" "}
                            <span className="font-semibold text-orange-500">
                                {pet.petName}
                            </span>
                        </p>
                    </div>

                    {/* Description */}
                    <p className="text-center text-gray-700 dark:text-gray-300 leading-relaxed">
                        Unlock <span className="font-semibold text-orange-500">Pet Cloud</span>{" "}
                        and store documents, images, videos, and veterinary records
                        securely — all in one place.
                    </p>

                    {/* Benefits */}
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 space-y-2 text-sm">
                        {[
                            "Pet Cloud Access",
                            "Secure Media Storage",
                            "Veterinary Records",
                            "Anytime, Anywhere Access",
                        ].map((item) => (
                            <div key={item} className="flex items-center gap-2">
                                <IonIcon
                                    name="checkmark-circle-outline"
                                    className="text-orange-500"
                                />
                                <span className="text-gray-700 dark:text-gray-200">
                                    {item}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Plan Info */}
                    <div className="flex items-center gap-3 p-4 bg-orange-50 dark:bg-orange-900/30 rounded-xl">
                        <IonIcon
                            name="calendar-outline"
                            className="text-orange-500 text-2xl"
                        />
                        <p className="text-sm text-gray-800 dark:text-gray-100">
                            This premium plan provides{" "}
                            <span className="font-semibold text-orange-500">
                                90 days
                            </span>{" "}
                            of full access to Pet Cloud.
                        </p>
                    </div>

                    {/* Pending Notice */}
                    {!loading && hasPending && (
                        <div className="flex gap-3 p-4 bg-yellow-100 dark:bg-yellow-900/40 rounded-xl">
                            <IonIcon
                                name="time-outline"
                                className="text-orange-500 text-2xl"
                            />
                            <p className="text-sm text-gray-800 dark:text-gray-100">
                                You already have a pending premium request.
                                Please wait for admin approval.
                            </p>
                        </div>
                    )}

                    {/* Request Section */}
                    {!loading && !hasPending && (
                        <div className="space-y-4">

                            {/* CTA */}
                            <button
                                onClick={() =>
                                    navigate("/payment", {
                                        state: {
                                            pet,
                                            paymentFor: "petCloud",
                                            days: days
                                        },
                                    })
                                }
                                className="w-full font-semibold py-3 rounded-xl transition shadow-lg flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white"
                            >
                                <IonIcon name="wallet-outline" className="text-xl" />
                                Proceed to Payment
                            </button>
                        </div>
                    )}

                    {/* Back */}
                    <button
                        onClick={() => navigate(-1)}
                        className="text-orange-500 hover:text-orange-600 text-sm font-medium flex items-center justify-center gap-1"
                    >
                        <IonIcon name="arrow-back-outline" />
                        Go Back
                    </button>

                </div>
            </div>
        </Layout>
    );
}