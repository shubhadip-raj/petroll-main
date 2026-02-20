import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Layout } from "@/app/layout/Layout";
import { IonIcon } from "@/components/ui/IonIcon";
import { UserContext } from "@/contexts/UserContext";

const API_URL = import.meta.env.VITE_API_URL;

export default function PaymentPage() {
    const navigate = useNavigate();
    const { user, token } = useContext(UserContext);
    const location = useLocation();
    const { pet, paymentFor, days } = location.state || {};

    const [activeTab, setActiveTab] = useState("india");
    const [transactionId, setTransactionId] = useState("");
    const [loading, setLoading] = useState(false);

    if (!pet) {
        return (
            <Layout>
                <div className="min-h-screen flex items-center justify-center">
                    <p className="text-gray-600">No pet selected.</p>
                </div>
            </Layout>
        );
    }

    /* 🔁 Payment Type Config (with highlight) */
    const paymentConfig = {
        qrPass: {
            title: "QR Pass",
            highlight: "QR Pass",
            description: "Activate",
        },
        petCloud: {
            title: "Pet Cloud Premium",
            highlight: "Pet Cloud Premium",
            description: "Upgrade to",
        },
    };

    const paymentText = paymentConfig[paymentFor] || paymentConfig.qrPass;

    /* 💰 Amounts */
    const INR_AMOUNT = 999;
    const USD_RATE = 0.012;
    const USD_AMOUNT = (INR_AMOUNT * USD_RATE).toFixed(2);

    const paymentDetails = {
        india: {
            qr: "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=INDIA_PAYMENT",
            number: "+91 98765 43210",
            amount: `₹${INR_AMOUNT}`,
            label: "INR",
        },
        usa: {
            qr: "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=USA_PAYMENT",
            number: "+1 555 123 4567",
            amount: `$${USD_AMOUNT}`,
            label: "USD",
        },
    };

    const currentPayment = paymentDetails[activeTab];

    /* 📤 Submit payment details */
    const handleSubmit = async () => {
        if (!transactionId) return;

        const payload = {
            userId: user?.userId,
            userName: user?.userName,
            userEmail: user?.userEmail,
            petId: pet.petId,
            petName: pet.petName,
            transactionId,
            paymentAmount: currentPayment.amount,
            paymentCurrency: currentPayment.label,
            country: activeTab,
            paymentFor,
        };

        setLoading(true);

        try {
            const res = await fetch(`${API_URL}/addPaymentDetails`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (!res.ok) throw new Error("Payment failed");

            alert("Payment submitted successfully ✅");
            if (res.ok && paymentFor === "petCloud") {
                handleRequestPremium();
            }


            navigate("/homeScreen");
        } catch (err) {
            alert("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };
    /* 📤 Send premium request */
    const handleRequestPremium = async () => {
        if (!days) {
            alert("Please enter number of days");
            return;
        }

        try {
            const response = await fetch(
                `${API_URL}/premium/request/${pet.petId}/${Number(days)}`,
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (!response.ok) throw new Error("Failed to send request");

            alert(
                "Your premium request has been sent to admin."
            );
        } catch (error) {
            alert(error.message);
        }
    };
    return (
        <Layout>
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4">
                <div className="bg-white dark:bg-gray-800 max-w-md w-full rounded-3xl shadow-2xl p-8 space-y-6">

                    {/* Header */}
                    <div className="text-center space-y-2">
                        <div className="flex justify-center">
                            <div className="bg-orange-100 dark:bg-orange-500/20 p-4 rounded-full">
                                <IonIcon name="wallet-outline" className="text-orange-500 text-4xl" />
                            </div>
                        </div>

                        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                            Complete Your Payment 💳
                        </h1>

                        <p className="text-gray-600 dark:text-gray-300 text-sm">
                            {paymentText.description}{" "}
                            <span className="font-semibold text-orange-500">
                                {paymentText.highlight}
                            </span>{" "}
                            for{" "}
                            <span className="font-semibold text-orange-500">
                                {pet.petName}
                            </span>
                        </p>

                        {/* Highlight Badge */}
                        <div className="flex justify-center">
                            <span className="bg-orange-100 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400 px-3 py-1 rounded-full text-xs font-semibold">
                                {paymentText.highlight}
                            </span>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="flex bg-gray-100 dark:bg-gray-700 rounded-xl p-1">
                        {["india", "usa"].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`flex-1 py-2 rounded-lg text-sm font-semibold transition
                                    ${activeTab === tab
                                        ? "bg-white dark:bg-gray-800 text-orange-500 shadow"
                                        : "text-gray-600 dark:text-gray-300"
                                    }`}
                            >
                                {tab === "india" ? "🇮🇳 India" : "🇺🇸 USA"}
                            </button>
                        ))}
                    </div>

                    {/* Payment Section */}
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-2xl p-6 space-y-5 text-center">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                            Pay for{" "}
                            <span className="text-orange-500 font-semibold">
                                {paymentText.highlight}
                            </span>
                        </h2>

                        <p className="text-sm text-gray-600 dark:text-gray-300">
                            Please pay the exact amount to activate{" "}
                            <span className="text-orange-500 font-semibold">
                                {paymentText.highlight}
                            </span>
                        </p>

                        <div className="bg-orange-50 dark:bg-orange-500/10 border border-orange-200 dark:border-orange-400/20 rounded-xl py-3">
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                                Amount to Pay ({currentPayment.label})
                            </p>
                            <p className="text-2xl font-bold text-orange-500">
                                {currentPayment.amount}
                            </p>
                        </div>

                        <div className="flex justify-center">
                            <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-md">
                                <img
                                    src={currentPayment.qr}
                                    alt="Payment QR Code"
                                    className="w-44 h-44 object-contain"
                                />
                            </div>
                        </div>

                        <div className="flex items-center gap-3 text-gray-400 text-sm">
                            <div className="flex-1 h-px bg-gray-300 dark:bg-gray-600" />
                            OR
                            <div className="flex-1 h-px bg-gray-300 dark:bg-gray-600" />
                        </div>

                        <div>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                                Send payment to this number
                            </p>
                            <div className="flex justify-center items-center gap-2">
                                <IonIcon name="call-outline" className="text-orange-500" />
                                <span className="font-bold text-gray-900 dark:text-gray-100">
                                    {currentPayment.number}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Payment Form */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                            Payment Details
                        </h3>

                        {[
                            ["Name", user?.userName],
                            ["Email", user?.userEmail],
                            ["Pet Name", pet.petName],
                            ["Pet ID", pet.petId],
                        ].map(([label, value]) => (
                            <div key={label} className="flex flex-col text-left">
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    {label}
                                </label>
                                <input
                                    type="text"
                                    value={value || ""}
                                    disabled
                                    className="w-full rounded-xl border px-4 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200"
                                />
                            </div>
                        ))}

                        <div className="flex flex-col text-left">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Transaction ID
                            </label>
                            <input
                                type="text"
                                value={transactionId}
                                onChange={(e) => setTransactionId(e.target.value)}
                                placeholder="Enter Transaction ID"
                                className="w-full rounded-xl border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:text-gray-100"
                            />
                        </div>
                    </div>

                    {/* Submit */}
                    <button
                        disabled={!transactionId || loading}
                        onClick={handleSubmit}
                        className={`w-full font-semibold py-3 rounded-xl transition shadow-lg flex items-center justify-center gap-2
        ${transactionId && !loading
                                ? "bg-orange-500 hover:bg-orange-600 text-white"
                                : "bg-gray-300 text-gray-500 cursor-not-allowed"
                            }`}
                    >
                        <IonIcon name="checkmark-done-outline" className="text-xl" />

                        {loading ? (
                            "Submitting..."
                        ) : (
                            <>
                                Submit Payment For
                                <span className="font-bold underline decoration-white/40">
                                    {paymentFor === "petCloud" ? "Pet Cloud Premium" : "QR Pass"}
                                </span>

                            </>
                        )}
                    </button>

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
