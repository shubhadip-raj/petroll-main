import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "@/contexts/UserContext";
import { IonIcon } from "@/components/ui/IonIcon"; // Ionicons wrapper
const API_URL = import.meta.env.VITE_API_URL;

// Import at the top of your file
import vetImg from "@/app/assets/images/vet.jpg";
import petToysImg from "@/app/assets/images/pet-toys.jpg";
import petWashImg from "@/app/assets/images/pet-wash.jpg";
import groomingImg from "@/app/assets/images/grooming.jpg";
import mainAdImage from "@/app/assets/images/advertisement.jpg";
import { useNavigate } from "react-router-dom";




export default function AdvertisementScreen({ pet }) {
    const { user, token } = useContext(UserContext);
    const navigate = useNavigate();
    const [mainAd, setMainAd] = useState({ src: mainAdImage, link: "#" });
    const [subAds, setSubAds] = useState([
        { src: vetImg, title: "Vet Services", link: "#" },
        { src: petToysImg, title: "Pet Toys", link: "#" },
        { src: petWashImg, title: "Pet Wash", link: "#" },
        { src: groomingImg, title: "Grooming", link: "#" },
    ]);
    const [joinPetModalVisible, setJoinPetModalVisible] = useState(false);
    const [selectedRole, setSelectedRole] = useState<string | null>(null);

    const roles = ["Family", "Friend", "Vet", "Groomer", "Walker"];

    // Fetch ads from backend
    useEffect(() => {
        const fetchAds = async () => {
            try {
                const res = await fetch(`${API_URL}/getAds`);
                if (!res.ok) throw new Error("Network response was not ok");
                const data = await res.json();

                if (data.mainAdBase64) {
                    setMainAd({ src: `data:image/jpeg;base64,${data.mainAdBase64}`, link: data.mainAdLink || "#" });
                }

                setSubAds([
                    {
                        src: data.subAd1Base64 ? `data:image/jpeg;base64,${data.subAd1Base64}` : vetImg,
                        title: "Vet Services",
                        link: data.subAd1Link || "#",
                    },
                    {
                        src: data.subAd2Base64 ? `data:image/jpeg;base64,${data.subAd2Base64}` : petToysImg,
                        title: "Pet Toys",
                        link: data.subAd2Link || "#",
                    },
                    {
                        src: data.subAd3Base64 ? `data:image/jpeg;base64,${data.subAd3Base64}` : petWashImg,
                        title: "Pet Wash",
                        link: data.subAd3Link || "#",
                    },
                    {
                        src: data.subAd4Base64 ? `data:image/jpeg;base64,${data.subAd4Base64}` : groomingImg,
                        title: "Grooming",
                        link: data.subAd4Link || "#",
                    },
                ]);
            } catch (err) {
                console.error("Error fetching ads:", err);
            }
        };
        fetchAds();
    }, []);

    const handleJoinPet = async (role: string | null) => {
        if (!role) return alert("Please select a role");
        if (user?.userType?.toLowerCase() === "owner" || user?.userId === pet?.owner?.userId) {
            return alert(`You are the owner of this pet: ${pet?.petName}. You cannot join with a new role.`);
        }

        try {
            const res = await fetch(`${API_URL}/joinPet`, {
                method: "POST",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
                body: JSON.stringify({
                    joinerId: user.userId,
                    petId: pet.petId,
                    ownerId: pet.owner.userId,
                    userRoleInJoin: role,
                }),
            });
            if (!res.ok) throw new Error("Failed to join pet");

            alert(`Request sent! You requested to join as ${role}.`);
            setJoinPetModalVisible(false);
            setSelectedRole(null);
        } catch (err) {
            console.error(err);
            alert("Unable to join pet");
        }
    };

    return (
        <div className="w-full my-6">
            {/* Main Ad */}
            <div className="mb-6">
                <a href={mainAd.link} target="_blank" rel="noopener noreferrer">
                    <img
                        src={mainAd.src}
                        alt="Main Ad"
                        className="w-full h-64 sm:h-80 md:h-96 object-contain rounded-xl shadow-lg bg-gray-100 dark:bg-gray-700"
                    />
                </a>
            </div>

            {/* Section Header */}
            <div className="flex items-center gap-2 mb-4 bg-orange-500 p-2 rounded-lg text-white font-semibold">
                <IonIcon name="person-circle-outline" className="text-2xl" />
                <span>Pet Managers, Friends and Family</span>
            </div>

            {/* Managers & Sub Ads Grid (2 rows of 3) */}
            <div className="grid grid-cols-3 gap-4 mb-6">
                {/* Row 1 */}
                <button
                    onClick={() =>  navigate("/petManagers")}
                    className="flex flex-col items-center justify-center p-4 rounded-xl shadow hover:scale-105 transition bg-white dark:bg-gray-800"
                >
                    <IonIcon name="person-circle-outline" className="text-5xl mb-2 text-gray-800 dark:text-gray-100" />
                    <span className="text-gray-800 dark:text-gray-100 font-medium">Managers</span>
                </button>

                {subAds.slice(0, 2).map((ad) => (
                    <a
                        key={ad.title}
                        href={ad.link || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center justify-center p-2 rounded-xl shadow hover:scale-105 transition bg-white dark:bg-gray-800"
                    >
                        <img
                            src={ad.src}
                            alt={ad.title}
                            className="w-full h-28 object-contain rounded-md"
                        />
                        <span className="text-gray-800 dark:text-gray-100 font-medium mt-1">{ad.title}</span>
                    </a>
                ))}

                {/* Row 2 */}
                <button
                    onClick={() => setJoinPetModalVisible(true)}
                    className="flex flex-col items-center justify-center p-4 rounded-xl shadow hover:scale-105 transition bg-white dark:bg-gray-800"
                >
                    <IonIcon name="add-circle-outline" className="text-5xl mb-2 text-gray-800 dark:text-gray-100" />
                    <span className="text-gray-800 dark:text-gray-100 font-medium">Join the Pet</span>
                </button>

                {subAds.slice(3, 4).map((ad) => (
                    <a
                        key={ad.title}
                        href={ad.link || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center justify-center p-2 rounded-xl shadow hover:scale-105 transition bg-white dark:bg-gray-800"
                    >
                        <img
                            src={ad.src}
                            alt={ad.title}
                            className="w-full h-28 object-contain rounded-md"
                        />
                        <span className="text-gray-800 dark:text-gray-100 font-medium mt-1">{ad.title}</span>
                    </a>
                ))}

                {/* Pet Wash (2nd row last item) */}
                {subAds.slice(2, 3).map((ad) => (
                    <a
                        key={ad.title}
                        href={ad.link || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center justify-center p-2 rounded-xl shadow hover:scale-105 transition bg-white dark:bg-gray-800"
                    >
                        <img
                            src={ad.src}
                            alt={ad.title}
                            className="w-full h-28 object-contain rounded-md"
                        />
                        <span className="text-gray-800 dark:text-gray-100 font-medium mt-1">{ad.title}</span>
                    </a>
                ))}
            </div>


            {/* Join Pet Modal */}
            {joinPetModalVisible && (
                <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg w-80">
                        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">Select Role</h2>
                        {roles.map((role) => (
                            <button
                                key={role}
                                onClick={() => setSelectedRole(role)}
                                className={`flex items-center gap-3 w-full p-2 mb-2 rounded-lg border ${selectedRole === role
                                    ? "border-orange-500 bg-orange-100 dark:bg-orange-900"
                                    : "border-gray-300 dark:border-gray-600"
                                    } text-gray-800 dark:text-gray-100`}
                            >
                                <span className="flex-1">{role}</span>
                                {selectedRole === role && <IonIcon name="checkmark-circle" className="text-orange-500 text-xl" />}
                            </button>
                        ))}
                        <div className="flex gap-3 mt-4">
                            <button
                                onClick={() => handleJoinPet(selectedRole)}
                                disabled={!selectedRole}
                                className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-medium p-2 rounded-lg transition disabled:opacity-50"
                            >
                                Join
                            </button>
                            <button
                                onClick={() => { setJoinPetModalVisible(false); setSelectedRole(null); }}
                                className="flex-1 bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-100 font-medium p-2 rounded-lg transition"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
