// src/pages/HomeScreen.tsx
import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "@/contexts/UserContext";
import MenuSidebar from "@/app/common/MenuSidebar";
import QRCodeScreen from "@/app/pages/QRCodeScreen";
import AdvertisementScreen from "@/app/pages/AdvertisementScreen";
import { IonIcon } from "@/components/ui/IonIcon"; // Ionicons wrapper
import { Layout } from "@/app/layout/Layout";
import { useNavigate, useLocation } from "react-router-dom";
import { Pet } from "./pet";
import samplePetImg from "@/app/assets/images/sample-dog2.jpeg";

const API_URL = import.meta.env.VITE_API_URL;

interface Notification {
    type: "trial" | "expired";
    daysLeft?: number;
    message: string;
}

export default function HomeScreen() {
    const { user } = useContext(UserContext);
    const [pet, setPet] = useState<Pet | null>(null);
    const [loading, setLoading] = useState(true);
    const [menuVisible, setMenuVisible] = useState(false);
    const [qrVisible, setQrVisible] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [showPremiumModal, setShowPremiumModal] = useState(false);
    const [premiumModalType, setPremiumModalType] = useState<string>("");
    const [notification, setNotification] = useState<Notification | null>(null);

    const location = useLocation();
    const state = location.state as { petId?: number; userId?: number } | null;
    const petId = state?.petId;
    const navigate = useNavigate();

    // Fetch latest pet for the user
    useEffect(() => {
        const loadPet = async () => {
            setLoading(true);

            try {
                // const storedPetId = localStorage.getItem("selectedPetId");
                const storedPetId = user?.userId
                    ? sessionStorage.getItem(`selectedPetId_${user.userId}`)
                    : null;
                const selectedPetId = state?.petId ?? storedPetId;

                let res: Response;

                if (selectedPetId) {
                    res = await fetch(`${API_URL}/getPetById?id=${selectedPetId}`);
                } else {
                    if (!user?.userId) return;
                    res = await fetch(`${API_URL}/getLatestPetByUserId?userId=${user.userId}`);
                }

                if (!res.ok) throw new Error("Failed to fetch pet");

                const petData = await res.json();
                setPet(petData);

                // if (petData?.petId) {
                //     localStorage.setItem("selectedPetId", String(petData.petId));
                // }
                if (user?.userId && petData?.petId) {
                    sessionStorage.setItem(
                        `selectedPetId_${user.userId}`,
                        String(petData.petId)
                    );
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        loadPet();
    }, [state, user?.userId, user?.userType]);

    // Premium logic
    const today = new Date();
    const isPremiumActive =
        pet?.isPremium &&
        pet?.premiumExpiryDate &&
        new Date(pet.premiumExpiryDate) >= today;


    // console.log(isPremiumActive); // always true or false


    // Trial / expired notification
    useEffect(() => {
        if (user?.createdAt) {
            const createdDate = new Date(user.createdAt);
            const diffDays = Math.floor((today.getTime() - createdDate.getTime()) / (1000 * 60 * 60 * 24));
            if (diffDays < 90) {
                const daysLeft = 90 - diffDays;
                setNotification({
                    type: "trial",
                    daysLeft,
                    message: `Your trial expires in ${daysLeft} day${daysLeft !== 1 ? "s" : ""}.`,
                });
            } else {
                setNotification({ type: "expired", message: "Your Petroll pass has expired." });
            }
        }
    }, [user]);

    const openMenu = () => setMenuVisible(true);
    const openQRCode = () => pet?.petId && setQrVisible(true);

    // Web-friendly image selector
    const selectImage = async () => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*";
        input.onchange = () => {
            const file = input.files?.[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = () => {
                setPet((prev) => (prev ? { ...prev, base64Image: reader.result as string } : prev));
            };
            reader.readAsDataURL(file);
        };
        input.click();
    };

    const onAddPet = () => {
        if (user?.userType?.toLowerCase() === "owner") {
            navigate("/PetDetails", { state: { user } });
        } else {
            alert("Only pet owners can add a new pet.");
        }
    };

    // Handles Pet Cloud media buttons
    const initAddMediaModal = (type: string) => {
        if (!isPremiumActive) {
            setPremiumModalType(type);
            setShowPremiumModal(true);
            return;
        }

        if (!pet?.petId) {
            alert("No pet found. Please add a pet first.");
            return;
        }

        navigate(`/${type}`, { state: { pet, user } });
    };
    const handleAddFeed = () => {
        setModalVisible(false);
        navigate("/AddFeed", {
            state: { user, pet }
        });
    };

    const handleNotifyOwner = () => {
        setModalVisible(false);

        if (user?.userId === pet?.owner?.userId) {
            alert(
                "You Are the Owner\n\nYou are the owner of this pet, so there is no need to notify yourself."
            );
            return;
        }

        navigate("/AddFeed", {
            state: {
                user,
                pet,
                notifyOwner: true
            }
        });
    };

    return (
        <Layout>
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
                {/* Header */}
                <div className="flex justify-between items-center bg-white dark:bg-gray-800 px-6 py-4 shadow-md">
                    <div className="flex items-center gap-4">
                        <button onClick={openMenu} className="text-orange-500 text-2xl hover:text-orange-600 transition">
                            <IonIcon name="apps-outline" />
                        </button>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                            {pet?.petName || "My Pet"}
                        </h1>
                    </div>
                    <button onClick={openQRCode} className="text-orange-500 text-2xl hover:text-orange-600 transition">
                        <IonIcon name="qr-code-outline" />
                    </button>
                </div>

                <div className="px-4 sm:px-6 py-6 max-w-6xl mx-auto">
                    {/* Notification */}
                    {notification && (
                        <div
                            className={`p-3 rounded mb-4 flex items-center gap-2 shadow ${notification.type === "trial" ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-700"
                                }`}
                        >
                            <IonIcon
                                name="information-circle-sharp"
                                className={`${notification.type === "trial" ? "text-yellow-800" : "text-red-700"} text-xl`}
                            />
                            <span className="font-medium text-sm sm:text-base">{notification.message}</span>
                        </div>
                    )}

                    {/* Pet Image */}
                    <div className="relative mb-6 rounded-xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700">
                        {loading ? (
                            <div className="flex items-center justify-center h-64 text-gray-500 dark:text-gray-400">Loading pet...</div>
                        ) : (
                            <img
                                src={pet?.base64Image ? `data:image/jpeg;base64,${pet.base64Image}` : samplePetImg}
                                alt="Pet"
                                className="w-full h-64 sm:h-80 md:h-96 object-contain bg-gray-100 dark:bg-gray-700"
                            />
                        )}
                        <button
                            onClick={selectImage}
                            className="absolute bottom-4 right-4 bg-orange-500 hover:bg-orange-600 transition p-3 rounded-full text-white shadow-lg"
                        >
                            <IonIcon name="camera-outline" />
                        </button>
                    </div>

                    {/* Icon Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6 text-center">
                        {[
                            { name: "Feed", icon: "list-outline", action: () => navigate("/feed"), color: "bg-orange-500" },
                            { name: "Notify", icon: "mail-open-outline", action: () => setModalVisible(true), color: "bg-orange-500" },
                            { name: "Petroll Pass", icon: "logo-usd", action: () => navigate("/qrPass"), color: "bg-lime-500" },
                            { name: "Calendar", icon: "timer-outline", action: () => alert("Calendar"), color: "bg-orange-500" },
                        ].map((item) => (
                            <button
                                key={item.name}
                                onClick={item.action}
                                className={`${item.color} p-4 rounded-xl text-white shadow hover:scale-105 transform transition`}
                            >
                                <IonIcon name={item.icon} className="mx-auto text-2xl mb-1" />
                                <span className="block font-medium">{item.name}</span>
                            </button>
                        ))}
                    </div>

                    {/* Pet Cloud */}
                    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-4 mb-6">
                        <div className="flex justify-between items-center mb-3 font-semibold text-gray-800 dark:text-gray-100">
                            <div className="flex items-center gap-2">
                                <IonIcon name="cloud-done-outline" />
                                <span>Pet Cloud</span>
                            </div>
                        </div>

                        <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                            {["Docs", "Images", "Videos", "VetFiles"].map((type) => (
                                <button
                                    key={type}
                                    onClick={() => initAddMediaModal(type)}
                                    className="flex flex-col items-center p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition shadow-sm"
                                >
                                    <IonIcon
                                        name={
                                            type === "Docs"
                                                ? "documents-outline"
                                                : type === "Images"
                                                    ? "eye-outline"
                                                    : type === "Videos"
                                                        ? "videocam-outline"
                                                        : "file-tray-outline"
                                        }
                                        className="text-2xl mb-1 text-gray-700 dark:text-gray-200"
                                    />
                                    <span className="text-gray-800 dark:text-gray-100 text-sm">{type}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Advertisement */}
                    <AdvertisementScreen pet={pet} />

                    {/* Pet Details */}
                    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-4 mb-6">
                        <div className="flex items-center gap-2 mb-3 bg-orange-500 text-white p-2 rounded-lg font-semibold">
                            <IonIcon name="paw-outline" />
                            <span>Pet Details</span>
                        </div>

                        <button
                            onClick={() =>
                                pet?.petId
                                    ? navigate("/PetDetails", { state: { petId: pet.petId, user } })
                                    : onAddPet()
                            }
                            className="flex items-center gap-2 p-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left shadow-sm transition"
                        >
                            <IonIcon name="list-outline" />
                            <span className="font-medium">Pet Information</span>
                        </button>
                    </div>
                </div>
                {/* QRCodeScreen Modals */}
                {qrVisible && <QRCodeScreen pet={pet} onClose={() => setQrVisible(false)} />}

                {/* Post / Notify Modal */}
                {modalVisible && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-2xl w-80">

                            {/* Header */}
                            <div className="flex justify-between items-center mb-5 text-gray-800 dark:text-gray-100">
                                <h2 className="font-semibold text-lg">Post / Notify</h2>
                                <button
                                    onClick={() => setModalVisible(false)}
                                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition"
                                >
                                    <IonIcon name="close-circle" />
                                </button>
                            </div>

                            {/* Add Feed */}
                            <button
                                onClick={handleAddFeed}
                                className="mb-3 w-full p-3 bg-orange-500 hover:bg-orange-600 transition text-white rounded-xl shadow-md font-medium"
                            >
                                Add New Feed
                            </button>

                            {/* Notify Owner */}
                            <button
                                onClick={handleNotifyOwner}
                                className="w-full p-3 bg-red-500 hover:bg-red-600 transition text-white rounded-xl shadow-md font-medium"
                            >
                                Notify Owner
                            </button>
                        </div>
                    </div>
                )}


                {/* Premium Modal */}
                {showPremiumModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl max-w-sm w-full p-6 space-y-4">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                                Premium Required
                            </h2>

                            {pet?.owner?.userId === user?.userId ? (
                                // OWNER VIEW
                                <>
                                    <p className="text-sm text-gray-600 dark:text-gray-300">
                                        Premium access is required to use {premiumModalType} features for the pet{" "}
                                        <span className="font-semibold">{pet.petName}</span>.
                                    </p>

                                    <button
                                        onClick={() => navigate("/upgradePremium", { state: { pet } })}
                                        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-xl transition"
                                    >
                                        Upgrade to Premium
                                    </button>
                                </>
                            ) : (
                                // NON-OWNER VIEW
                                <>
                                    <p className="text-sm text-gray-600 dark:text-gray-300">
                                        The pet <span className="font-semibold">{pet.petName}</span> does not
                                        have Pet Cloud access.
                                        <br />
                                        Please notify the owner to upgrade their plan.
                                    </p>

                                    <button
                                        onClick={() => navigate("/AddFeed", {
                                            state: {
                                                user,
                                                pet,
                                                notifyOwner: true
                                            }
                                        })}
                                        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-xl transition"
                                    >
                                        Notify Owner
                                    </button>
                                </>
                            )}

                            <button
                                onClick={() => setShowPremiumModal(false)}
                                className="w-full border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 py-2 rounded-xl mt-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
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
