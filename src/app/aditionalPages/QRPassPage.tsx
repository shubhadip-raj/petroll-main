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

  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const [isQrPassExists, setIsQrPassExists] = useState(false);
  const [checkingQrPass, setCheckingQrPass] = useState(false);

  // ✅ Fetch pets
  useEffect(() => {
    if (!user?.userId || !token) return;

    const fetchPets = async () => {
      try {
        const response = await fetch(`${API_URL}/pets/${user.userId}`);

        if (!response.ok) throw new Error("Failed to fetch pets");

        const data = await response.json();
        setPets(data);
      } catch (error) {
        console.error("Error fetching pets:", error);
      }
    };

    fetchPets();
  }, [user, token]);

  // ✅ Fetch pricing plans
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await fetch(`${API_URL}/pricing/all`);
        const data = await res.json();
        setPlans(data);
      } catch (err) {
        console.error("Error fetching pricing:", err);
      }
    };

    fetchPlans();
  }, []);

  // ✅ Check QR Pass
  const checkQrPassStatus = async (petId: number) => {
    try {
      setCheckingQrPass(true);

      const res = await fetch(`${API_URL}/checkQrPass/${petId}`);

      if (!res.ok) throw new Error("Failed to check QR Pass");

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

          {/* Icons */}
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
          </p>

          {/* ✅ Pet Select */}
          <div className="text-left space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Select Pet
            </label>

            <select
              value={selectedPet?.petId || ""}
              onChange={(e) => {
                const pet = pets.find(p => String(p.petId) === e.target.value);
                setSelectedPet(pet);
                setIsQrPassExists(false);

                if (pet) checkQrPassStatus(pet.petId);
              }}
              className="w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-3"
            >
              <option value="">Choose your pet</option>
              {pets.map((pet) => (
                <option key={pet.petId} value={pet.petId}>
                  {pet.petName}
                </option>
              ))}
            </select>

            {checkingQrPass && (
              <p className="text-sm text-gray-500 mt-2">Checking QR Pass…</p>
            )}

            {!checkingQrPass && selectedPet && isQrPassExists && (
              <p className="text-sm text-amber-600 mt-2">
                QR Pass already exists for this pet 🐾
              </p>
            )}
          </div>

          {/* ✅ Pricing Plans */}
          <div className="space-y-3">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 text-left">
              Select Plan
            </p>

            <div className="grid grid-cols-3 gap-3">
              {plans.map((plan) => (
                <div
                  key={plan.pricingId}
                  onClick={() => setSelectedPlan(plan)}
                  className={`cursor-pointer rounded-xl p-3 text-center border transition
          ${selectedPlan?.pricingId === plan.pricingId
                      ? "border-orange-500 bg-orange-50 dark:bg-orange-500/20 scale-105"
                      : "border-gray-300 dark:border-gray-600"
                    }`}
                >
                  <p className="font-semibold text-sm">{plan.pricingPlan}</p>

                  <p className="text-xs line-through text-gray-500">₹{plan.actualPrice}</p>

                  <p className="text-sm font-bold text-orange-500">₹{plan.discountPrice}</p>

                  {/* Conditional note
                  {plan.pricingPlan.toLowerCase() === "bronze" && (
                    <p className="text-xs text-red-500 mt-1">
                      Note: Bronze plan does not include access to PetCloud features.
                    </p>
                  )}

                  {plan.pricingPlan.toLowerCase() === "silver" && (
                    <p className="text-xs text-green-600 mt-1">
                      Note: Silver plan includes limited PetCloud access.
                    </p>
                  )}

                  {plan.pricingPlan.toLowerCase() === "gold" && (
                    <p className="text-xs text-blue-600 mt-1">
                      Note: Gold plan includes full PetCloud access.
                    </p>
                  )} */}
                </div>
              ))}
            </div>
            <p className="text-xs text-red-500 mt-1">
              Note: Bronze plan does not include access to PetCloud features.
            </p>
          </div>

          {/* ✅ Button */}
          <button
            disabled={!selectedPet || !selectedPlan || isQrPassExists}
            onClick={() =>
              navigate("/payment", {
                state: {
                  pet: selectedPet,
                  plan: selectedPlan,                
                },
              })
            }
            className={`w-full font-semibold py-3 rounded-xl transition shadow-lg flex items-center justify-center gap-2
              ${selectedPet && selectedPlan && !isQrPassExists
                ? "bg-orange-500 hover:bg-orange-600 text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
          >
            <IonIcon name="shield-checkmark-outline" className="text-xl" />
            {"Proceed to Payment"}
          </button>

          {/* Back */}
          <button
            onClick={() => navigate("/myPets")}
            className="text-orange-500 text-sm flex justify-center gap-1"
          >
            <IonIcon name="arrow-back-outline" />
            Go Back
          </button>

        </div>
      </div>
    </Layout>
  );
}