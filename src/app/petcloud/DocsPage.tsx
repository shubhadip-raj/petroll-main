import { useEffect, useState, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IonIcon } from "@/components/ui/IonIcon";
import { uploadPetCloudWeb } from "./uploadPetCloud.web";
import { Layout } from "../layout/Layout";

const API_URL = import.meta.env.VITE_API_URL;

export default function DocsPage() {
    const navigate = useNavigate();
    const location = useLocation();

    const { pet, user } = location.state || {};

    const [docList, setDocList] = useState([]);
    const [loading, setLoading] = useState(true);

    // 🔥 Fetch documents
    const fetchDocuments = useCallback(async () => {
        if (!pet?.petId) return;

        try {
            setLoading(true);
            const response = await fetch(`${API_URL}/docs/${pet.petId}`);
            const data = await response.json();
            setDocList(data);
        } catch (error) {
            console.error("Error fetching docs:", error);
        } finally {
            setLoading(false);
        }
    }, [pet?.petId]);

    useEffect(() => {
        fetchDocuments();
    }, [fetchDocuments]);

    // 🔥 Upload document (WEB)
    const handleAddDocument = async () => {
        if (!user?.userType) {
            alert("User not authorized");
            return;
        }

        if (!["owner", "family"].includes(user.userType.toLowerCase())) {
            alert("Only owners or family members can add documents.");
            return;
        }

        const input = document.createElement("input");
        input.type = "file";
        input.accept = "application/pdf";

        input.onchange = async () => {
            const file = input.files?.[0];
            if (!file) return;

            try {
                await uploadPetCloudWeb(file, "doc", pet, user);
                fetchDocuments();
            } catch (err) {
                alert("Failed to upload document");
            }
        };

        input.click();
    };


    // 🔥 Open document (WEB)
    const handleOpenDocument = (base64Data: string, fileName = "document.pdf") => {
        try {
            if (!base64Data) {
                alert("Document data missing");
                return;
            }

            // 1️⃣ Remove data URL prefix if present
            const cleanBase64 = base64Data.includes("base64,")
                ? base64Data.split("base64,")[1]
                : base64Data;

            // 2️⃣ Decode base64 safely
            const binaryString = window.atob(cleanBase64);
            const len = binaryString.length;
            const bytes = new Uint8Array(len);

            for (let i = 0; i < len; i++) {
                bytes[i] = binaryString.charCodeAt(i);
            }

            // 3️⃣ Create blob
            const blob = new Blob([bytes], {
                type: "application/pdf",
            });

            // 4️⃣ Open in new tab
            const url = URL.createObjectURL(blob);
            window.open(url, "_blank");

            // 5️⃣ Cleanup memory
            setTimeout(() => URL.revokeObjectURL(url), 10000);
        } catch (error) {
            console.error("Error opening document:", error);
            alert("Unable to open document");
        }
    };


    // 🔥 Delete document
    const handleDeleteDocument = async (docId: number) => {
        if (!confirm("Are you sure you want to delete this document?")) return;

        try {
            await fetch(`${API_URL}/docs/delete/${docId}`, {
                method: "DELETE",
            });
            fetchDocuments();
        } catch (error) {
            console.error("Delete error:", error);
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
                            Documents
                        </h1>
                    </div>

                    <button
                        onClick={handleAddDocument}
                        className="text-orange-500 text-2xl"
                    >
                        <IonIcon name="add-circle-outline" />
                    </button>
                </div>

                {/* BODY */}
                <div className="p-6">
                    <h2 className="mb-4 text-lg font-semibold text-gray-800 dark:text-gray-100">
                        Documents for Pet: {pet?.petName}
                    </h2>

                    {loading ? (
                        <p className="text-gray-500">Loading documents...</p>
                    ) : docList.length === 0 ? (
                        <p className="text-gray-500">No documents found.</p>
                    ) : (
                        <div className="space-y-4">
                            {docList.map((doc, index) => (
                                <div
                                    key={doc.docId || index}
                                    className="flex justify-between items-center p-4 bg-white dark:bg-gray-800 rounded-xl shadow"
                                >
                                    <button
                                        onClick={() =>
                                            handleOpenDocument(doc, `Document_${index + 1}.pdf`)
                                        }
                                        className="flex items-center gap-3 text-left"
                                    >
                                        <IonIcon
                                            name="document-text-outline"
                                            className="text-orange-500 text-xl"
                                        />
                                        <span className="text-gray-800 dark:text-gray-100 font-medium">
                                            Document {index + 1}
                                        </span>
                                    </button>

                                    <button
                                        onClick={() => handleDeleteDocument(doc.docId)}
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
