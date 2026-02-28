import React, { useState, useEffect, useCallback, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "@/contexts/UserContext";
import { IonIcon } from "@/components/ui/IonIcon";
import { Layout } from "../layout/Layout";

const API_URL = import.meta.env.VITE_API_URL;

export default function MyPetsPage() {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    const [pets, setPets] = useState([]);
    const [selectedPetId, setSelectedPetId] = useState<number | null>(null);

    /* Load pets for user */
    useEffect(() => {
        if (!user) return;

        const fetchPets = async () => {
            try {
                let url = "";
                if (user.userType.toLowerCase() === "owner") {
                    url = `${API_URL}/pets/${user.userId}`;
                } else {
                    url = `${API_URL}/userJoinPets/${user.userId}?userType=${user.userType}`;
                }

                const res = await fetch(url);
                const data = await res.json();
                setPets(data);
            } catch (err) {
                console.error("Error fetching pets:", err);
            }
        };

        fetchPets();
    }, [user]);
    // const storedPetId = Number(localStorage.getItem("selectedPetId"));
    const storedPetId = user?.userId
        ? sessionStorage.getItem(`selectedPetId_${user.userId}`)
        : null;


    const onAddPet = () => {
        if (user?.userType?.toLowerCase() === "owner") {
            navigate("/PetDetails", { state: { user } });
        } else {
            alert(
                "Only pet owners can add a new pet. Please switch to an owner account to continue."
            );
        }
    };

    return (
        <Layout>
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
                {/* HEADER */}
                <div className="flex justify-between items-center bg-white dark:bg-gray-800 px-6 py-4 shadow-md">
                    <div className="flex items-center gap-4">
                        {/* Menu button  */}
                        <button className="text-orange-500 hover:text-orange-600">
                            <IonIcon name="apps-outline" size={28} />
                        </button>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                            My Pets
                        </h1>
                    </div>

                    <button
                        onClick={onAddPet}
                        className="text-orange-500 hover:text-orange-600"
                    >
                        <IonIcon name="add-circle-outline" size={26} />
                    </button>
                </div>

                {/* PET LIST */}
                <div className="px-6 py-4">
                    {pets.length === 0 ? (
                        <div className="mt-10 text-center">
                            <p className="text-gray-500">
                                No pets found.
                            </p>
                            <p className="text-sm text-gray-400">
                                Add one using the + icon.
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-5 mt-6">
                            {pets.map((pet) => (
                                <button
                                    key={pet.petId}
                                    onClick={() => {
                                        setSelectedPetId(pet.petId);
                                        // localStorage.setItem("selectedPetId", String(pet.petId));
                                        if (user?.userId && pet?.petId) {
                                            sessionStorage.setItem(
                                                `selectedPetId_${user.userId}`,
                                                String(pet.petId)
                                            );
                                        }
                                        navigate("/homeScreen", {
                                            state: { petId: pet.petId, userId: user.userId }
                                        });
                                    }}
                                    className={`group relative flex items-center gap-4 p-5 rounded-2xl transition-all duration-300
            bg-white dark:bg-gray-800 shadow-md hover:shadow-xl hover:-translate-y-0.5
            ${Number(storedPetId) === pet.petId
                                            ? "ring-2 ring-orange-400 bg-orange-50 dark:bg-orange-900/20"
                                            : "hover:bg-gray-50 dark:hover:bg-gray-700"
                                        }`}
                                >
                                    {/* Avatar */}
                                    <div className="relative">
                                        <img
                                            src={
                                                pet.base64Image
                                                    ? `data:image/jpeg;base64,${pet.base64Image}`
                                                    : "../assets/images/sample-dog2.jpeg"
                                            }
                                            alt={pet.petName}
                                            className={`w-16 h-16 rounded-full object-cover border-2 transition
                ${Number(storedPetId) === pet.petId
                                                    ? "border-orange-400"
                                                    : "border-gray-200 dark:border-gray-600 group-hover:border-orange-300"
                                                }`}
                                        />

                                        {/* Selected Indicator */}
                                        {Number(storedPetId) === pet.petId && (
                                            <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs shadow">
                                                ✓
                                            </span>
                                        )}
                                    </div>

                                    {/* Info */}
                                    <div className="flex-1 text-left min-w-0">
                                        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 truncate">
                                            {pet.petName}
                                        </h2>
                                        <p className="text-sm text-gray-600 dark:text-gray-300 truncate">
                                            {pet.breed || pet.species}
                                        </p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                                            {pet.gender}
                                        </p>
                                    </div>

                                    {/* Arrow */}
                                    <IonIcon
                                        name="chevron-forward"
                                        size={20}
                                        className="text-gray-400 group-hover:text-orange-400 transition"
                                    />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

            </div>
        </Layout>
    );
}
