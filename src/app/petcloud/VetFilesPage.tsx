import { useEffect, useState, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IonIcon } from "@/components/ui/IonIcon";
import { uploadPetCloudWeb } from "./uploadPetCloud.web";
import { Layout } from "../layout/Layout";

const API_URL = import.meta.env.VITE_API_URL;

export default function VetFilesPage() {
    const navigate = useNavigate();
    const location = useLocation();

    const { pet, user } = location.state || {};

    const [vetFiles, setVetFiles] = useState([]);
    const [loading, setLoading] = useState(false);

    // 🔥 Fetch vet files
    const fetchVetFiles = useCallback(async () => {
        if (!pet?.petId) return;

        setLoading(true);
        try {
            const response = await fetch(`${API_URL}/vetfiles/${pet.petId}`);
            const data = await response.json();
            setVetFiles(data.filter((file: string) => file && file.trim() !== ""));
        } catch (error) {
            console.error("Error fetching vet files:", error);
        } finally {
            setLoading(false);
        }
    }, [pet?.petId]);

    useEffect(() => {
        fetchVetFiles();
    }, [fetchVetFiles]);

    // 🔥 Upload vet file (WEB)
    const handleAddVetFile = async () => {
        if (!user || user.userType?.toLowerCase() !== "vet") {
            alert("Only vets can add vet files.");
            return;
        }

        const input = document.createElement("input");
        input.type = "file";
        input.accept = "*/*";

        input.onchange = async () => {
            const file = input.files?.[0];
            if (!file) return;

            const formData = new FormData();
            formData.append("file", file);
            formData.append("petId", pet.petId);
            formData.append("userId", user.userId);

            try {
                uploadPetCloudWeb(file, "vet", pet, user);
                fetchVetFiles();
            } catch (error) {
                console.error("Vet file upload error:", error);
            }
        };

        input.click();
    };

    // 🔥 Open vet file (WEB)
    const handleOpenVetFile = (base64Data: string, fileName = "vetfile.pdf") => {
        try {
            const cleanBase64 = base64Data.includes("base64,")
                ? base64Data.split("base64,")[1]
                : base64Data;

            const binary = atob(cleanBase64);
            const bytes = new Uint8Array(binary.length);

            for (let i = 0; i < binary.length; i++) {
                bytes[i] = binary.charCodeAt(i);
            }

            const blob = new Blob([bytes], { type: "application/pdf" });
            const url = URL.createObjectURL(blob);
            window.open(url, "_blank");

            setTimeout(() => URL.revokeObjectURL(url), 10000);
        } catch (error) {
            console.error("Error opening vet file:", error);
            alert("Cannot open this document.");
        }
    };

    // 🔥 Delete vet file
    const handleDeleteVetFile = async (fileId: number) => {
        if (!confirm("Are you sure you want to delete this vet file?")) return;

        try {
            await fetch(`${API_URL}/vetfiles/delete/${pet.petId}/${fileId}`, {
                method: "DELETE",
            });
            fetchVetFiles();
        } catch (err) {
            console.error("Delete vet file error:", err);
        }
    };

    return (
        <Layout>
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
                {/* HEADER */}
                <div className="flex justify-between items-center bg-white dark:bg-gray-800 px-6 py-4 shadow-md">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigate(-1)}
                            className="text-orange-500 text-2xl"
                        >
                            <IonIcon name="arrow-back-outline" />
                        </button>
                        <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                            Vet Files
                        </h1>
                    </div>

                    <button
                        onClick={handleAddVetFile}
                        className="text-orange-500 text-2xl"
                    >
                        <IonIcon name="add-circle-outline" />
                    </button>
                </div>

                {/* BODY */}
                <div className="p-6">
                    <h2 className="mb-4 text-lg font-semibold text-gray-800 dark:text-gray-100">
                        Vet Files for {pet?.petName}
                    </h2>

                    {loading && (
                        <div className="flex justify-center my-6">
                            <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    )}

                    {!loading && vetFiles.length === 0 && (
                        <p className="text-gray-500">No vet files found.</p>
                    )}

                    {!loading && vetFiles.length > 0 && (
                        <div className="space-y-4">
                            {vetFiles.map((file, index) => (
                                <div
                                    key={index}
                                    className="flex justify-between items-center p-4 bg-white dark:bg-gray-800 rounded-xl shadow"
                                >
                                    <button
                                        onClick={() =>
                                            handleOpenVetFile(file, `VetFile_${index + 1}.pdf`)
                                        }
                                        className="flex items-center gap-3"
                                    >
                                        <IonIcon
                                            name="document-text-outline"
                                            className="text-orange-500 text-xl"
                                        />
                                        <span className="text-gray-800 dark:text-gray-100 font-medium">
                                            Vet File {index + 1}
                                        </span>
                                    </button>

                                    <button
                                        onClick={() => handleDeleteVetFile(file.id || index)}
                                        className="text-red-500 hover:text-red-600 transition"
                                    >
                                        <IonIcon name="trash-outline" className="text-xl" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                    <button
                        onClick={() => navigate(-1)}
                        className="mt-8 w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl shadow transition"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        </Layout>
    );
}
