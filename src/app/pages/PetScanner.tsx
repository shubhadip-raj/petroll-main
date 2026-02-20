import React, { useState, useContext, useRef } from "react";
import { UserContext } from "@/contexts/UserContext";
import { IonIcon } from "@/components/ui/IonIcon";
import { useNavigate } from "react-router-dom";
import { QrReader } from "@blackbox-vision/react-qr-reader";
import { Layout } from "../layout/Layout";

const API_URL = import.meta.env.VITE_API_URL;

export default function ScanPetPage() {
    const { user, token } = useContext(UserContext);
    const navigate = useNavigate();

    const [showScanner, setShowScanner] = useState(false);
    const [scannedPet, setScannedPet] = useState(null);
    const [joinRole, setJoinRole] = useState("");
    const [joinModalVisible, setJoinModalVisible] = useState(false);
    const [cameraError, setCameraError] = useState("");
    const scannedOnce = useRef(false);

    /* ------------------ QR Scan Handler ------------------ */
    const handleScan = (result, error) => {
        if (result?.text && !scannedOnce.current) {
            scannedOnce.current = true;

            const scannedData = result.text;
            setShowScanner(false);

            // If QR contains URL → navigate
            if (
                scannedData.startsWith("http://") ||
                scannedData.startsWith("https://")
            ) {
                navigate("/Feed", { state: { petUrl: scannedData } });
                return;
            }

            // Otherwise expect JSON
            try {
                const qrData = JSON.parse(scannedData);
                setScannedPet(qrData);
                setJoinModalVisible(true);
            } catch {
                alert("Invalid QR Code");
                scannedOnce.current = false;
            }
        }

        if (error?.name === "NotAllowedError") {
            setCameraError("Camera permission denied.");
        }

        if (error?.name === "NotFoundError") {
            setCameraError("Camera not found on this device.");
        }
    };

    /* ------------------ Join Pet ------------------ */
    const handleJoinPet = async () => {
        if (!scannedPet || user.userId === scannedPet.ownerId) {
            alert(
                `You are the owner of this pet: ${scannedPet?.petName}\nYou cannot join with a new role.`
            );
            return;
        }

        if (!joinRole) {
            alert("Please select a role to join as.");
            return;
        }

        try {
            const res = await fetch(`${API_URL}/joinPet`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    joinerId: user.userId,
                    petId: scannedPet.petId,
                    ownerId: scannedPet.ownerId,
                    userRoleInJoin: joinRole,
                }),
            });

            if (!res.ok) throw new Error("Join failed");

            alert(
                `Request sent. Requested to join as ${joinRole}. Waiting for owner's approval.`
            );

            setJoinModalVisible(false);
            setJoinRole("");
            scannedOnce.current = false;
        } catch (err) {
            console.error(err);
            alert("Unable to join pet");
        }
    };

    return (
        <Layout>
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
                {/* HEADER */}
                <div className="flex items-center justify-between bg-white dark:bg-gray-800 px-6 py-4 shadow-md">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigate(-1)}
                            className="text-orange-500 hover:text-orange-600"
                        >
                            <IonIcon name="arrow-back-outline" size={28} />
                        </button>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                            Scan to View Pet
                        </h1>
                    </div>

                    <IonIcon
                        name="paw-outline"
                        size={28}
                        className="text-orange-500"
                    />
                </div>

                {/* BODY */}
                <div className="flex flex-col items-center justify-center px-6 py-12">
                    {!showScanner && (
                        <button
                            onClick={() => {
                                setCameraError("");
                                scannedOnce.current = false;
                                setShowScanner(true);
                            }}
                            className="flex items-center gap-2 rounded-xl bg-orange-500 px-6 py-3 text-white shadow transition hover:bg-orange-600"
                        >
                            <IonIcon name="qr-code-outline" size={24} />
                            Scan QR Code
                        </button>
                    )}

                    {showScanner && (
                        <div className="relative mt-6 w-full max-w-md rounded-xl bg-white p-3 shadow dark:bg-gray-800">
                            {!cameraError ? (
                                <QrReader
                                    onResult={handleScan}
                                    constraints={{ facingMode: "environment" }}
                                    className="rounded-xl overflow-hidden"
                                />
                            ) : (
                                <div className="flex flex-col items-center justify-center p-6 text-center text-red-500">
                                    <IonIcon
                                        name="camera-off-outline"
                                        size={48}
                                    />
                                    <p className="mt-3 font-semibold">
                                        {cameraError}
                                    </p>
                                </div>
                            )}

                            <button
                                onClick={() => {
                                    setShowScanner(false);
                                    setCameraError("");
                                    scannedOnce.current = false;
                                }}
                                className="absolute top-2 right-2 rounded bg-red-500 px-3 py-1 text-white hover:bg-red-600"
                            >
                                Close
                            </button>
                        </div>
                    )}
                </div>

                {/* JOIN MODAL */}
                {joinModalVisible && scannedPet && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                        <div className="w-full max-w-md space-y-4 rounded-xl bg-white p-6 shadow-xl dark:bg-gray-800">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                                Pet Details
                            </h2>

                            <div className="flex justify-between">
                                <span className="font-semibold">Name:</span>
                                <span>{scannedPet.petName}</span>
                            </div>

                            <div className="flex justify-between">
                                <span className="font-semibold">Owner:</span>
                                <span>{scannedPet.ownerName}</span>
                            </div>

                            <h3 className="font-semibold">Join as:</h3>
                            <div className="flex flex-wrap gap-2">
                                {["Family", "Vet", "Walker", "Groomer", "Friend"].map(
                                    role => (
                                        <button
                                            key={role}
                                            onClick={() => setJoinRole(role)}
                                            className={`rounded-full border px-4 py-2 transition ${
                                                joinRole === role
                                                    ? "border-orange-500 bg-orange-500 text-white"
                                                    : "border-gray-300 text-gray-800 dark:border-gray-600 dark:text-gray-200"
                                            }`}
                                        >
                                            {role}
                                        </button>
                                    )
                                )}
                            </div>

                            <button
                                onClick={handleJoinPet}
                                className="w-full rounded-xl bg-orange-500 py-2 text-white hover:bg-orange-600"
                            >
                                Join Pet
                            </button>

                            <button
                                onClick={() => {
                                    setJoinModalVisible(false);
                                    scannedOnce.current = false;
                                }}
                                className="w-full rounded-xl border border-gray-300 py-2 text-gray-800 dark:border-gray-600 dark:text-gray-200"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
}
