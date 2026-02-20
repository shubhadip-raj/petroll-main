import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "@/contexts/UserContext";
import { IonIcon } from "@/components/ui/IonIcon";
import { useNavigate } from "react-router-dom";
import { Layout } from "../layout/Layout";

const API_URL = import.meta.env.VITE_API_URL;

export default function AccountDetailsPage() {
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [userType, setUserType] = useState("");

    const [editField, setEditField] = useState<string | null>(null);
    const [showTypeModal, setShowTypeModal] = useState(false);

    const [userTypes] = useState([
        "Owner",
        "Family",
        "Vet",
        "Walker",
        "Groomer",
        "Friend",
    ]);

    // Fetch User Details
    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const res = await fetch(`${API_URL}/getUserDetails/${user.userId}`);
                const data = await res.json();

                setUserName(data.userName || "");
                setUserEmail(data.userEmail || "");
                setPhone(data.phone || "");
                setAddress(data.address || "");
                setUserType(data.userType || "");
            } catch (err) {
                console.log("Fetch Error:", err);
            }
        };

        fetchUserDetails();
    }, [user.userId]);

    // Update User Details
    const handleUpdate = async () => {
        try {
            const response = await fetch(`${API_URL}/updateUser/${user.userId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userName,
                    userEmail,
                    phone,
                    address,
                    userType,
                }),
            });

            if (response.ok) {
                alert("User details updated successfully!");
                setEditField(null);
                setUser(await response.json());
            } else {
                alert("Failed to update user details");
            }
        } catch (error) {
            console.log("Update error:", error);
            alert("Something went wrong");
        }
    };

    return (
        <Layout>
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
                {/* HEADER */}
                <div className="flex items-center justify-between bg-white dark:bg-gray-800 px-6 py-4 shadow-md">
                    <button
                        onClick={() => navigate(-1)}
                        className="text-orange-500 hover:text-orange-600"
                    >
                        <IonIcon name="arrow-back-outline" size={28} />
                    </button>

                    <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                        Account Details
                    </h1>

                    <div className="w-7" />
                </div>

                {/* BODY */}
                <div className="max-w-xl mx-auto p-6 space-y-6">
                    {/* PROFILE */}
                    <div className="flex flex-col items-center space-y-3">
                        <img
                            src="/assets/images/default-user.png"
                            alt="Profile"
                            className="w-24 h-24 rounded-full object-cover shadow"
                        />
                        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                            {userName}
                        </h2>
                    </div>

                    {/* FIELDS */}
                    <div className="space-y-4">
                        {/* Name */}
                        <div className="flex items-center gap-3">
                            <span className="w-20 font-semibold text-gray-700 dark:text-gray-200">
                                Name
                            </span>
                            <input
                                className={`flex-1 rounded border px-3 py-2 text-gray-900 dark:text-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-400 ${editField === "userName" ? "bg-white dark:bg-gray-700" : "bg-gray-100 dark:bg-gray-800"
                                    }`}
                                value={userName}
                                disabled={editField !== "userName"}
                                onChange={(e) => setUserName(e.target.value)}
                            />
                            <button onClick={() => setEditField("userName")}>
                                <IonIcon name="pencil" size={20} className="text-orange-500" />
                            </button>
                        </div>

                        {/* Email */}
                        <div className="flex items-center gap-3">
                            <span className="w-20 font-semibold text-gray-700 dark:text-gray-200">
                                Email
                            </span>
                            <input
                                className={`flex-1 rounded border px-3 py-2 text-gray-900 dark:text-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-400 ${editField === "userEmail" ? "bg-white dark:bg-gray-700" : "bg-gray-100 dark:bg-gray-800"
                                    }`}
                                value={userEmail}
                                disabled={editField !== "userEmail"}
                                onChange={(e) => setUserEmail(e.target.value)}
                            />
                            <button onClick={() => setEditField("userEmail")}>
                                <IonIcon name="pencil" size={20} className="text-orange-500" />
                            </button>
                        </div>

                        {/* UserType */}
                        <div className="flex items-center gap-3">
                            <span className="w-20 font-semibold text-gray-700 dark:text-gray-200">
                                UserType
                            </span>
                            <button
                                className="flex-1 text-left rounded border px-3 py-2 border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                                onClick={() => setShowTypeModal(true)}
                            >
                                {userType || "Select User Type"}
                            </button>
                            <IonIcon name="chevron-down" size={22} className="text-orange-500" />
                        </div>

                        {/* Phone */}
                        <div className="flex items-center gap-3">
                            <span className="w-20 font-semibold text-gray-700 dark:text-gray-200">
                                Phone
                            </span>
                            <input
                                className={`flex-1 rounded border px-3 py-2 text-gray-900 dark:text-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-400 ${editField === "phone" ? "bg-white dark:bg-gray-700" : "bg-gray-100 dark:bg-gray-800"
                                    }`}
                                value={phone}
                                disabled={editField !== "phone"}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                            <button onClick={() => setEditField("phone")}>
                                <IonIcon name="pencil" size={20} className="text-orange-500" />
                            </button>
                        </div>

                        {/* Address */}
                        <div className="flex items-center gap-3">
                            <span className="w-20 font-semibold text-gray-700 dark:text-gray-200">
                                Address
                            </span>
                            <input
                                className={`flex-1 rounded border px-3 py-2 text-gray-900 dark:text-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-400 ${editField === "address" ? "bg-white dark:bg-gray-700" : "bg-gray-100 dark:bg-gray-800"
                                    }`}
                                value={address}
                                disabled={editField !== "address"}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                            <button onClick={() => setEditField("address")}>
                                <IonIcon name="pencil" size={20} className="text-orange-500" />
                            </button>
                        </div>
                    </div>

                    {/* BUTTONS */}
                    <div className="flex gap-4 mt-6">
                        <button
                            onClick={handleUpdate}
                            className="flex-1 rounded-xl bg-orange-500 py-2 text-white hover:bg-orange-600 transition"
                        >
                            Update
                        </button>
                        <button
                            onClick={() => navigate(-1)}
                            className="flex-1 rounded-xl border border-gray-300 py-2 text-gray-800 dark:border-gray-600 dark:text-gray-200"
                        >
                            Cancel
                        </button>
                    </div>
                </div>

                {/* USER TYPE MODAL */}
                {showTypeModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                        <div className="w-full max-w-md rounded-xl bg-white dark:bg-gray-800 p-6 space-y-4">
                            <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                                Select User Type
                            </h2>
                            <div className="flex flex-col space-y-2 max-h-60 overflow-y-auto">
                                {userTypes.map((type) => (
                                    <button
                                        key={type}
                                        className="w-full text-left px-4 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                                        onClick={() => {
                                            setUserType(type);
                                            setShowTypeModal(false);
                                        }}
                                    >
                                        {type}
                                    </button>
                                ))}
                            </div>
                            <button
                                className="w-full rounded-xl border border-gray-300 py-2 text-gray-800 dark:border-gray-600 dark:text-gray-200"
                                onClick={() => setShowTypeModal(false)}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
}
