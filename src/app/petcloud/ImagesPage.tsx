import { useEffect, useState, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IonIcon } from "@/components/ui/IonIcon";
import { uploadPetCloudWeb } from "./uploadPetCloud.web";
import { Layout } from "../layout/Layout";

const API_URL = import.meta.env.VITE_API_URL;

export default function ImagesPage() {
    const navigate = useNavigate();
    const location = useLocation();

    const { pet, user } = location.state || {};

    const [imageList, setImageList] = useState<string[]>([]);
    const [previewImage, setPreviewImage] = useState<string | null>(null);

    // 🔥 Fetch images
    const fetchImages = useCallback(async () => {
        if (!pet?.petId) return;

        try {
            const resp = await fetch(`${API_URL}/images/${pet.petId}`);
            const data = await resp.json();
            const cleanImages = data.filter((img: string) => img && img !== "null");
            setImageList(cleanImages);
        } catch (err) {
            console.error("Error fetching images:", err);
        }
    }, [pet?.petId]);

    useEffect(() => {
        fetchImages();
    }, [fetchImages]);

    // 🔥 Upload image (WEB)
    const handleAddImage = async () => {
        if (!user?.userType) {
            alert("User not authorized");
            return;
        }

        if (!["owner", "family"].includes(user.userType.toLowerCase())) {
            alert("Only owners or family members can add images.");
            return;
        }

        const input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*";

        input.onchange = async () => {
            const file = input.files?.[0];
            if (!file) return;

            const formData = new FormData();
            formData.append("file", file);
            formData.append("petId", pet.petId);
            formData.append("userId", user.userId);

            try {
                uploadPetCloudWeb(file, "image", pet, user);
                fetchImages();
            } catch (err) {
                console.error("Upload error:", err);
            }
        };

        input.click();
    };

    // 🔥 Delete image
    const handleDeleteImage = async (index: number) => {
        if (!confirm("Are you sure you want to delete this image?")) return;

        try {
            await fetch(`${API_URL}/images/delete/${pet.petId}/${index}`, {
                method: "DELETE",
            });
            fetchImages();
        } catch (err) {
            console.error("Delete error:", err);
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
                            Images
                        </h1>
                    </div>

                    <button
                        onClick={handleAddImage}
                        className="text-orange-500 text-2xl"
                    >
                        <IonIcon name="add-circle-outline" />
                    </button>
                </div>

                {/* BODY */}
                <div className="p-6">
                    <h2 className="mb-4 text-lg font-semibold text-gray-800 dark:text-gray-100">
                        Images for {pet?.petName}
                    </h2>

                    {imageList.length === 0 ? (
                        <p className="text-gray-500">No images found.</p>
                    ) : (
                        <div className="space-y-4">
                            {imageList.map((img, index) => (
                                <div
                                    key={index}
                                    className="flex justify-between items-center p-4 bg-white dark:bg-gray-800 rounded-xl shadow"
                                >
                                    {/* Preview */}
                                    <button
                                        onClick={() =>
                                            setPreviewImage(`data:image/jpeg;base64,${img}`)
                                        }
                                        className="flex items-center gap-3"
                                    >
                                        <IonIcon
                                            name="image-outline"
                                            className="text-orange-500 text-xl"
                                        />
                                        <span className="text-gray-800 dark:text-gray-100 font-medium">
                                            Image {index + 1}
                                        </span>
                                    </button>

                                    {/* Delete */}
                                    <button
                                        onClick={() => handleDeleteImage(index)}
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

                {/* 🔥 IMAGE PREVIEW MODAL */}
                {previewImage && (
                    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
                        <button
                            onClick={() => setPreviewImage(null)}
                            className="absolute top-6 right-6 text-white text-3xl"
                        >
                            <IonIcon name="close" />
                        </button>

                        <img
                            src={previewImage}
                            alt="Preview"
                            className="max-w-[90%] max-h-[90%] object-contain rounded-lg shadow-lg"
                        />
                    </div>
                )}
            </div>
        </Layout>
    );
}
