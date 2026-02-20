import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IonIcon } from "@/components/ui/IonIcon";
import { Layout } from "../layout/Layout";
import { UserContext } from "@/contexts/UserContext";

const API_URL = import.meta.env.VITE_API_URL;

export default function PetApprovalsPage() {
    const navigate = useNavigate();
    const { user, token } = useContext(UserContext);

    const [pendingPetApprovals, setPendingPetApprovals] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPendingPets();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchPendingPets = async () => {
        try {
            setLoading(true);

            const response = await fetch(
                `${API_URL}/pendingApprovals?ownerId=${user?.userId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (!response.ok) throw new Error("Failed to fetch pending approvals");

            const data = await response.json();
            setPendingPetApprovals(data);
        } catch (error) {
            console.error(error);
            setPendingPetApprovals([]);
        } finally {
            setLoading(false);
        }
    };

    const handleApprove = async (id) => {
        try {
            const response = await fetch(`${API_URL}/approve/${id}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) throw new Error("Approval failed");

            alert("Pet approved successfully!");
            fetchPendingPets();
        } catch (error) {
            console.error(error);
            alert("Something went wrong while approving.");
        }
    };

    return (
        <Layout>
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
                {/* HEADER */}
                <div className="flex items-center gap-4 bg-white dark:bg-gray-800 px-6 py-4 shadow-md">
                    <button
                        onClick={() => navigate(-1)}
                        className="text-orange-500 text-2xl"
                    >
                        <IonIcon name="arrow-back-outline" />
                    </button>

                    <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                        Pet Approvals
                    </h1>
                </div>

                {/* BODY */}
                <div className="p-6">
                    {loading ? (
                        <div className="flex justify-center py-12">
                            <div className="h-10 w-10 animate-spin rounded-full border-4 border-orange-500 border-t-transparent" />
                        </div>
                    ) : pendingPetApprovals.length === 0 ? (
                        <p className="text-center text-gray-500 dark:text-gray-400">
                            No pending approvals!
                        </p>
                    ) : (
                        <div className="space-y-4">
                            {pendingPetApprovals.map(approval => (
                                <div
                                    key={approval.id}
                                    className="rounded-xl bg-white dark:bg-gray-800 p-5 shadow-md transition hover:shadow-lg"
                                >
                                    {/* Pet Name */}
                                    <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                                        Pet Name: {approval.petName}
                                    </p>

                                    {/* Requested By */}
                                    <p className="mt-1 text-gray-600 dark:text-gray-300">
                                        Requested by: {approval.requestedByName}
                                    </p>

                                    {/* Role */}
                                    <p className="text-gray-600 dark:text-gray-300">
                                        Role: {approval.joinType}
                                    </p>

                                    {/* APPROVE BUTTON */}
                                    <button
                                        onClick={() => handleApprove(approval.id)}
                                        className="mt-4 w-full rounded-xl bg-orange-500 py-3 text-white shadow transition hover:bg-orange-600"
                                    >
                                        Approve
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
}
