import React, { useEffect, useState, useContext, useCallback } from "react";
import { UserContext } from "@/contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { IonIcon } from "@/components/ui/IonIcon";
import { Layout } from "../layout/Layout";


const API_URL = import.meta.env.VITE_API_URL;

export default function PetManagersPage() {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [pet, setPet] = useState(null);
    const [petId, setPetId] = useState(null);
    const [managers, setManagers] = useState([]);


    /* ------------------ Load Pet & Managers ------------------ */
    useEffect(() => {
        const loadPetAndManagers = async () => {
            if (!user?.userId) return;
            setLoading(true);

            try {
                // Load latest pet
                //const storedPetId = localStorage.getItem("selectedPetId");
                const storedPetId = user?.userId
                    ? sessionStorage.getItem(`selectedPetId_${user.userId}`)
                    : null;

                // const res = await fetch(`${API_URL}/getLatestPetByUserId?userId=${user.userId}`);
                const res = await fetch(
                    `${API_URL}/getPetById?id=${storedPetId}`
                );
                const petData = await res.json();

                if (petData?.petId) {
                    setPet(petData);
                    setPetId(petData.petId);

                    // Load managers
                    const mgrRes = await fetch(`${API_URL}/getPetManagers?petId=${petData.petId}`);
                    const mgrData = await mgrRes.json();
                    setManagers(mgrData);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        loadPetAndManagers();
    }, [user]);

    /* ------------------ Actions ------------------ */
    const onCall = (item) => {
        if (!item.phone) {
            alert("No phone number available");
            return;
        }
        window.location.href = `tel:${item.phone}`;
    };

    const onShare = async (item) => {
        if (!pet) {
            alert("Pet information not available");
            return;
        }

        const message = `Check out! ${item.joinerName} wants to join pet ${pet.petName} as ${item.joinType}.`;

        if (navigator.share) {
            try {
                await navigator.share({ title: "Pet Manager Invite", text: message });
            } catch (err) {
                console.error("Share failed:", err);
            }
        } else {
            // fallback: copy to clipboard
            navigator.clipboard.writeText(message);
            alert("Message copied to clipboard");
        }
    };

    const onDelete = async (item) => {
        if (!window.confirm("Are you sure you want to delete this manager?")) return;

        try {
            const res = await fetch(`${API_URL}/deletePetManager/${item.id}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
            });
            const data = await res.json();

            if (res.ok) {
                setManagers((prev) => prev.filter((mgr) => mgr.id !== item.id));
                alert("Manager deleted successfully");
            } else {
                alert(data.message || "Failed to delete manager");
            }
        } catch (err) {
            console.error(err);
            alert("Failed to delete manager");
        }
    };

    /* ------------------ Render ------------------ */
    return (
        <Layout>
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
                {/* Header */}
                <div className="flex justify-between items-center bg-white dark:bg-gray-800 px-6 py-4 shadow-md">
                    <div className="flex items-center gap-4">
                        <button className="text-orange-500 hover:text-orange-600">
                            <IonIcon name="apps-outline" size={28} />
                        </button>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Pet Managers</h1>
                    </div>

                    <button className="text-orange-500 hover:text-orange-600">
                        <IonIcon name="paw-outline" size={28} />
                    </button>
                </div>

                {/* Info Text */}
                <div className="flex flex-col md:flex-row items-center bg-yellow-100 dark:bg-yellow-900 rounded-xl p-6 m-6 gap-4">
                    <IonIcon name="bulb-outline" size={60} className="text-yellow-600 dark:text-yellow-400" />
                    <p className="text-gray-800 dark:text-gray-200 text-center md:text-left">
                        Register to start managing pets as Owner, Family, Friends, Doctor, Groomers and more...
                    </p>
                </div>

                {/* Managers List */}
                <div className="px-6">
                    {loading ? (
                        <p className="text-gray-500 dark:text-gray-400 text-center mt-10">Loading managers...</p>
                    ) : managers.length === 0 ? (
                        <p className="text-gray-500 dark:text-gray-400 text-center mt-10">No managers found.</p>
                    ) : (
                        managers.map((item) => (
                            <div
                                key={item.id}
                                className="flex items-center gap-4 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md mb-4"
                            >
                                <IonIcon name="person-circle-outline" size={40} className="text-orange-500" />

                                <div className="flex-1">
                                    <p className="font-semibold text-gray-900 dark:text-gray-100">{item.joinerName}</p>
                                    <p className="text-gray-500 dark:text-gray-400">{item.joinType}</p>
                                </div>

                                {/* Actions */}
                                <div className="flex items-center gap-3">
                                    <button onClick={() => onCall(item)} className="text-blue-500 hover:text-blue-600">
                                        <IonIcon name="call-outline" size={26} />
                                    </button>

                                    <button onClick={() => onShare(item)} className="text-green-500 hover:text-green-600">
                                        <IonIcon name="share-social-outline" size={26} />
                                    </button>

                                    <button onClick={() => onDelete(item)} className="text-red-500 hover:text-red-600">
                                        <IonIcon name="trash-outline" size={26} />
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>

            </div>
        </Layout>
    );
}
