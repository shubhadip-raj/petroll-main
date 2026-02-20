import { useEffect, useState, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IonIcon } from "@/components/ui/IonIcon";
import { uploadPetCloudWeb } from "./uploadPetCloud.web";
import { Layout } from "../layout/Layout";

const API_URL = import.meta.env.VITE_API_URL;

export default function VideosPage() {
    const navigate = useNavigate();
    const location = useLocation();

    const { pet, user } = location.state || {};

    const [videoList, setVideoList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

    // 🔥 Fetch videos
    const fetchVideos = useCallback(async () => {
        if (!pet?.petId) return;

        try {
            setLoading(true);
            const response = await fetch(`${API_URL}/videos/${pet.petId}`);
            const data = await response.json();
            setVideoList(data);
        } catch (error) {
            console.error("Error fetching videos:", error);
        } finally {
            setLoading(false);
        }
    }, [pet?.petId]);

    useEffect(() => {
        fetchVideos();
    }, [fetchVideos]);

    // 🔥 Upload video (WEB)
    const handleAddVideo = async () => {
        if (!user?.userType) return;

        if (!["owner", "family"].includes(user.userType.toLowerCase())) {
            alert("Only owners or family members can add videos.");
            return;
        }

        const input = document.createElement("input");
        input.type = "file";
        input.accept = "video/*";

        input.onchange = async () => {
            const file = input.files?.[0];
            if (!file) return;

            const formData = new FormData();
            formData.append("file", file);
            formData.append("petId", pet.petId);
            formData.append("userId", user.userId);

            try {
                uploadPetCloudWeb(file, "video", pet, user);
                fetchVideos();
            } catch (error) {
                console.error("Video upload error:", error);
            }
        };

        input.click();
    };

    // 🔥 Delete video
    const handleDeleteVideo = async (videoId: number) => {
        if (!confirm("Are you sure you want to delete this video?")) return;

        try {
            await fetch(`${API_URL}/videos/delete/${pet.petId}/${videoId}`, {
                method: "DELETE",
            });
            fetchVideos();
        } catch (err) {
            console.error("Delete video error:", err);
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
                            Videos
                        </h1>
                    </div>

                    <button
                        onClick={handleAddVideo}
                        className="text-orange-500 text-2xl"
                    >
                        <IonIcon name="add-circle-outline" />
                    </button>
                </div>

                {/* BODY */}
                <div className="p-6">
                    <h2 className="mb-4 text-lg font-semibold text-gray-800 dark:text-gray-100">
                        Videos for {pet?.petName}
                    </h2>

                    {loading ? (
                        <p className="text-gray-500">Loading videos...</p>
                    ) : videoList.length === 0 ? (
                        <p className="text-gray-500">No videos found.</p>
                    ) : (
                        <div className="space-y-4">
                            {videoList.map((video, index) => (
                                <div
                                    key={video.id || index}
                                    className="flex justify-between items-center p-4 bg-white dark:bg-gray-800 rounded-xl shadow"
                                >
                                    <button
                                        onClick={() =>
                                            setSelectedVideo(`${API_URL}/video/${video.id}`)
                                        }
                                        className="flex items-center gap-3"
                                    >
                                        <IonIcon
                                            name="videocam-outline"
                                            className="text-orange-500 text-xl"
                                        />
                                        <span className="text-gray-800 dark:text-gray-100 font-medium">
                                            Video {index + 1}
                                        </span>
                                    </button>

                                    <button
                                        onClick={() => handleDeleteVideo(video.id)}
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

                {/* 🔥 VIDEO MODAL */}
                {selectedVideo && (
                    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
                        <div className="relative w-[90%] max-w-3xl bg-black rounded-xl overflow-hidden">
                            <button
                                onClick={() => setSelectedVideo(null)}
                                className="absolute top-3 right-3 text-orange-500 text-3xl z-10"
                            >
                                <IonIcon name="close-circle" />
                            </button>

                            <video
                                src={selectedVideo}
                                controls
                                autoPlay
                                className="w-full h-[60vh] object-contain bg-black"
                            />
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
}
