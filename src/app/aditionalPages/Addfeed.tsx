import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IonIcon } from "@/components/ui/IonIcon";
import { Layout } from "../layout/Layout";

const API_URL = import.meta.env.VITE_API_URL;

export default function AddFeedPage() {
    const navigate = useNavigate();
    const location = useLocation();

    const { feedId, user, pet, notifyOwner } = location.state || {};

    const [postText, setPostText] = useState("");
    const [image, setImage] = useState(null);
    const [video, setVideo] = useState(null);
    const [doc, setDoc] = useState(null);

    const [existingImage, setExistingImage] = useState(null);
    const [existingVideo, setExistingVideo] = useState(null);
    const [existingDoc, setExistingDoc] = useState(null);

    const [loading, setLoading] = useState(false);

    // 🔥 Load feed when editing
    useEffect(() => {
        if (!feedId) return;

        fetch(`${API_URL}/feed/${feedId}`)
            .then(res => res.json())
            .then(feed => {
                setPostText(feed.content || "");
                setExistingImage(feed.image || null);
                setExistingVideo(feed.video || null);
                setExistingDoc(feed.doc || null);
            })
            .catch(err => console.error("Error loading feed:", err));
    }, [feedId]);

    // 🔥 Handle submit
    const handlePost = async () => {
        if (!postText.trim()) {
            alert("Please write something before posting.");
            return;
        }

        if (!user?.userId) {
            alert("User information missing.");
            return;
        }

        try {
            setLoading(true);

            const formData = new FormData();
            formData.append("content", postText);
            formData.append("userId", user.userId);
            formData.append("petId", pet?.petId);
            formData.append("notifyOwner", notifyOwner);

            if (image) formData.append("image", image);
            if (video) formData.append("video", video);
            if (doc) formData.append("document", doc);

            const endpoint = feedId
                ? `${API_URL}/updateFeed/${feedId}`
                : `${API_URL}/addFeed`;

            const response = await fetch(endpoint, {
                method: "POST",
                body: formData,
            });

            if (!response.ok) throw new Error("Upload failed");

            alert(feedId ? "Feed updated successfully!" : "Feed posted successfully!");
            navigate(-1);
        } catch (err) {
            console.error(err);
            alert("Failed to save feed.");
        } finally {
            setLoading(false);
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
                        {notifyOwner ? "Notify Owner" : feedId ? "Edit Feed" : "Add Feed"}
                    </h1>
                </div>

                {/* BODY */}
                <div className="p-6 space-y-6">
                    {/* TEXT INPUT */}
                    <div>
                        <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-200">
                            Write Something...
                        </label>
                        <textarea
                            rows={5}
                            value={postText}
                            onChange={e => setPostText(e.target.value)}
                            placeholder="Share something about your pet..."
                            className="w-full p-4 rounded-xl border bg-white dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
                        />
                    </div>

                    {/* ATTACHMENTS */}
                    <div>
                        <label className="block mb-3 font-semibold text-gray-700 dark:text-gray-200">
                            Add Attachments
                        </label>

                        <div className="flex gap-6">
                            {/* IMAGE */}
                            <label className="flex flex-col items-center cursor-pointer">
                                <IonIcon
                                    name="image-outline"
                                    className={`text-3xl ${
                                        image || existingImage ? "text-green-500" : "text-orange-500"
                                    }`}
                                />
                                <span className="text-sm mt-1">
                                    {image || existingImage ? "Selected" : "Image"}
                                </span>
                                <input
                                    type="file"
                                    accept="image/*"
                                    hidden
                                    onChange={e => setImage(e.target.files[0])}
                                />
                            </label>

                            {/* VIDEO */}
                            <label className="flex flex-col items-center cursor-pointer">
                                <IonIcon
                                    name="videocam-outline"
                                    className={`text-3xl ${
                                        video || existingVideo ? "text-green-500" : "text-orange-500"
                                    }`}
                                />
                                <span className="text-sm mt-1">
                                    {video || existingVideo ? "Selected" : "Video"}
                                </span>
                                <input
                                    type="file"
                                    accept="video/*"
                                    hidden
                                    onChange={e => setVideo(e.target.files[0])}
                                />
                            </label>

                            {/* DOC */}
                            <label className="flex flex-col items-center cursor-pointer">
                                <IonIcon
                                    name="document-text-outline"
                                    className={`text-3xl ${
                                        doc || existingDoc ? "text-green-500" : "text-orange-500"
                                    }`}
                                />
                                <span className="text-sm mt-1">
                                    {doc || existingDoc ? "Selected" : "Docs"}
                                </span>
                                <input
                                    type="file"
                                    accept="application/pdf"
                                    hidden
                                    onChange={e => setDoc(e.target.files[0])}
                                />
                            </label>
                        </div>
                    </div>

                    {/* DATE */}
                    <div className="flex items-center gap-2 bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
                        <IonIcon name="time-outline" className="text-orange-500 text-xl" />
                        <span className="text-gray-700 dark:text-gray-200">
                            {new Date().toLocaleDateString()} •{" "}
                            {new Date().toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                            })}
                        </span>
                    </div>

                    {/* ACTION BUTTONS */}
                    <div className="flex gap-4">
                        <button
                            onClick={handlePost}
                            disabled={loading}
                            className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl shadow transition"
                        >
                            {feedId ? "Update" : "Post"}
                        </button>

                        <button
                            onClick={() => navigate(-1)}
                            className="flex-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 py-3 rounded-xl shadow"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
