import React, { useContext, useEffect, useState } from "react";
import { IonIcon } from "@/components/ui/IonIcon";
import { Layout } from "@/app/layout/Layout";
import { useNavigate } from "react-router-dom";
import { UserContext } from "@/contexts/UserContext";

const API_URL = import.meta.env.VITE_API_URL;

export default function QRPassPage() {
  const navigate = useNavigate();
  const { user, token } = useContext(UserContext);

  const [pets, setPets] = useState([]);
  const [selectedPet, setSelectedPet] = useState(null);

  const [isQrPassExists, setIsQrPassExists] = useState(false);
  const [checkingQrPass, setCheckingQrPass] = useState(false);

  // Fetch pets
  useEffect(() => {
    if (!user?.userId || !token) return;

    const fetchPets = async () => {
      try {
        const response = await fetch(
          `${API_URL}/pets/${user.userId}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch pets");
        }

        const data = await response.json();
        setPets(data);
      } catch (error) {
        console.error("Error fetching pets:", error);
      }
    };

    fetchPets();
  }, [user, token]);

  // Check QR Pass for selected pet
  const checkQrPassStatus = async (petId: number) => {
    try {
      setCheckingQrPass(true);

      const res = await fetch(
        `${API_URL}/checkQrPass/${petId}`
      );

      if (!res.ok) {
        throw new Error("Failed to check QR Pass");
      }

      const exists: boolean = await res.json();
      setIsQrPassExists(exists);

    } catch (error) {
      console.error("Error checking QR Pass:", error);
      setIsQrPassExists(false);
    } finally {
      setCheckingQrPass(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4">
        <div className="bg-white dark:bg-gray-800 max-w-md w-full rounded-3xl shadow-2xl p-8 text-center space-y-6">

          {/* Icon Stack */}
          <div className="flex justify-center gap-3">
            <div className="bg-orange-100 dark:bg-orange-500/20 p-4 rounded-full">
              <IonIcon name="qr-code-outline" className="text-orange-500 text-4xl" />
            </div>
            <div className="bg-orange-100 dark:bg-orange-500/20 p-4 rounded-full">
              <IonIcon name="paw-outline" className="text-orange-500 text-4xl" />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Get Started with Petroll 🚀
          </h1>

          {/* Description */}
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            Add your pet to{" "}
            <span className="font-semibold text-orange-500">Petroll</span> and keep them safe
            with a smart{" "}
            <span className="font-semibold text-orange-500">Pet QR Tag</span>.
            <br /><br />
            One quick scan can help reunite pets with their owners in seconds.
          </p>

          {/* Pet Select */}
          <div className="text-left space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Select Pet
            </label>

            <select
              value={selectedPet?.petId || ""}
              onChange={(e) => {
                const pet = pets.find(
                  p => String(p.petId) === e.target.value
                );
                setSelectedPet(pet);
                setIsQrPassExists(false);

                if (pet) {
                  checkQrPassStatus(pet.petId);
                }
              }}
              className="w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-3 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="">Choose your pet</option>
              {pets.map((pet) => (
                <option key={pet.petId} value={pet.petId}>
                  {pet.petName}
                </option>
              ))}
            </select>

            {/* QR Pass Status Message */}
            {checkingQrPass && (
              <p className="text-sm text-gray-500 mt-2">
                Checking QR Pass status…
              </p>
            )}

            {!checkingQrPass && selectedPet && isQrPassExists && (
              <p className="text-sm text-amber-600 dark:text-amber-400 mt-2">
                A QR Pass has already been added for this pet 🐾  
                You can manage it from your pet dashboard.
              </p>
            )}
          </div>

          {/* Benefits */}
          <div className="text-left bg-gray-50 dark:bg-gray-700 rounded-xl p-4 space-y-2">
            <div className="flex items-center gap-2">
              <IonIcon name="checkmark-circle-outline" className="text-orange-500 text-xl" />
              <span>Instant pet identification</span>
            </div>
            <div className="flex items-center gap-2">
              <IonIcon name="checkmark-circle-outline" className="text-orange-500 text-xl" />
              <span>Quick access to owner details</span>
            </div>
            <div className="flex items-center gap-2">
              <IonIcon name="checkmark-circle-outline" className="text-orange-500 text-xl" />
              <span>Helpful if your pet gets lost</span>
            </div>
          </div>

          {/* Price Card */}
          <div className="bg-orange-50 dark:bg-gray-700 rounded-xl p-4 space-y-1">
            <p className="text-lg font-semibold text-gray-800 dark:text-gray-100">
              Just <span className="text-orange-500">₹999</span> per year
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              One QR Tag • One Year • Total Peace of Mind 🐾
            </p>
          </div>

          {/* Action Button */}
          <button
            disabled={!selectedPet || isQrPassExists}
            onClick={() =>
              navigate("/payment", {
                state: {
                  pet: selectedPet,
                  paymentFor: "qrPass",
                },
              })
            }
            className={`w-full font-semibold py-3 rounded-xl transition shadow-lg flex items-center justify-center gap-2
              ${selectedPet && !isQrPassExists
                ? "bg-orange-500 hover:bg-orange-600 text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
          >
            <IonIcon name="shield-checkmark-outline" className="text-xl" />
            {isQrPassExists ? "QR Pass Already Active" : "Get QR Pass Now"}
          </button>

          {/* Footer note */}
          <p className="text-xs text-gray-500 dark:text-gray-400">
            *Payment feature will be available soon. Stay tuned!
          </p>

          {/* Back */}
          <button
            onClick={() => navigate("/myPets")}
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
