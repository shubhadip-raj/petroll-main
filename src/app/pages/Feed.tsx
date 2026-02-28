import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "@/contexts/UserContext";
import { IonIcon } from "@/components/ui/IonIcon";
import { Pet } from "./pet";
import { Layout } from "../layout/Layout";

const API_URL = import.meta.env.VITE_API_URL;

type Feed = {
    feedId: number;
    content: string;
    createdAt: string;

    adder?: {
        userId: number;
        userName: string;
    };

    // 🔥 Transient base64 fields from backend
    base64Image?: string;
    base64Video?: string;
    base64Document?: string;

    // (optional – only if you already use it elsewhere)
    docUrl?: string;
};


type Comment = {
    id: number;
    userId: number;
    userName: string;
    content: string;
};

export default function FeedScreen() {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    const [pet, setPet] = useState<Pet | null>(null);
    const [feeds, setFeeds] = useState<Feed[]>([]);
    const [notifiedFeeds, setNotifiedFeeds] = useState<Feed[]>([]);
    const [activeTab, setActiveTab] = useState<"feeds" | "notified">("feeds");
    const [loading, setLoading] = useState(true);

    const [comments, setComments] = useState<Record<number, Comment[]>>({});
    const [commentText, setCommentText] = useState<Record<number, string>>({});
    const [showCommentInput, setShowCommentInput] = useState<Record<number, boolean>>({});
    const [likes, setLikes] = useState<Record<number, number>>({});
    const [likedByMe, setLikedByMe] = useState<Record<number, boolean>>({});
    const [canNotify, setCanNotify] = useState(false);

    /* ---------------------- Load Latest Pet & Feeds ---------------------- */
    useEffect(() => {
        const load = async () => {
            try {
                setLoading(true);
                if (!user?.userId) return;
                // const storedPetId = localStorage.getItem("selectedPetId");
                const storedPetId = user?.userId
                    ? sessionStorage.getItem(`selectedPetId_${user.userId}`)
                    : null;

                // const res = await fetch(`${API_URL}/getLatestPetByUserId?userId=${user.userId}`);
                const res = await fetch(
                    `${API_URL}/getPetById?id=${storedPetId}`
                );
                const petData: Pet = await res.json();
                if (!petData?.petId) return;
                setPet(petData);

                const feedRes = await fetch(`${API_URL}/feedlist/${petData.petId}`);
                const feedData: Feed[] = await feedRes.json();
                setFeeds(feedData);

                const notifiedRes = await fetch(`${API_URL}/notifiedfeedlist/${petData.petId}`);
                const notifiedData: Feed[] = await notifiedRes.json();
                setNotifiedFeeds(notifiedData);

                // Load interactions
                [...feedData, ...notifiedData].forEach(f => loadInteractions(f.feedId));
                checkNotificationEligibility(petData);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        load();
    }, [user]);

    /* ---------------------- Interactions ---------------------- */
    const loadInteractions = async (feedId: number) => {
        try {
            const [commentRes, likeRes] = await Promise.all([
                fetch(`${API_URL}/comments/${feedId}`),
                fetch(`${API_URL}/likes/${feedId}?userId=${user?.userId}`)
            ]);

            const commentData: Comment[] = await commentRes.json();
            const likeData = await likeRes.json();

            setComments(prev => ({ ...prev, [feedId]: commentData }));
            setLikes(prev => ({ ...prev, [feedId]: likeData.count }));
            setLikedByMe(prev => ({ ...prev, [feedId]: likeData.likedByMe }));
        } catch {
            console.error("error loading interactions");
        }
    };

    const handleLike = async (feedId: number) => {
        try {
            const res = await fetch(`${API_URL}/likes/toggle`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ feedId, userId: user?.userId }),
            });
            const data = await res.json();
            setLikes(prev => ({ ...prev, [feedId]: data.count }));
            setLikedByMe(prev => ({ ...prev, [feedId]: data.liked }));
        } catch {
            window.alert("Could not like post");
        }
    };

    const handleCommentSubmit = async (feedId: number) => {
        if (!commentText[feedId]) return;
        try {
            const res = await fetch(`${API_URL}/comments`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    feedId,
                    userId: user?.userId,
                    userName: user?.userName,
                    content: commentText[feedId],
                }),
            });

            const newComment: Comment = await res.json();
            setComments(prev => ({
                ...prev,
                [feedId]: [...(prev[feedId] || []), newComment],
            }));
            setCommentText(prev => ({ ...prev, [feedId]: "" }));
            setShowCommentInput(prev => ({ ...prev, [feedId]: false }));
        } catch {
            window.alert("Failed to add comment");
        }
    };

    const handleDeleteFeed = async (feedId: number) => {
        if (!window.confirm("Are you sure you want to delete this feed?")) return;

        try {
            const res = await fetch(`${API_URL}/delete-feed/${feedId}`, { method: "DELETE" });
            const isDeleted = await res.json();

            if (isDeleted) {
                window.alert("Feed deleted successfully");
                setFeeds(prev => prev.filter(f => f.feedId !== feedId));
                setNotifiedFeeds(prev => prev.filter(f => f.feedId !== feedId));
            } else {
                window.alert("Feed not found");
            }
        } catch {
            window.alert("Network error. Please try again.");
        }
    };

    const handleDeleteComment = async (commentId: number, feedId: number) => {
        if (!window.confirm("Delete this comment?")) return;
        try {
            await fetch(`${API_URL}/deleteComments/${commentId}`, { method: "DELETE" });
            setComments(prev => ({
                ...prev,
                [feedId]: prev[feedId]?.filter(c => c.id !== commentId) || [],
            }));
        } catch {
            window.alert("Failed to delete comment");
        }
    };

    const checkNotificationEligibility = async (petData: Pet) => {
        try {
            const res = await fetch(`${API_URL}/canView-notify`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ user, pet: petData }),
            });
            const data = await res.json();
            setCanNotify(data.canNotify);
        } catch {
            setCanNotify(false);
        }
    };

    const openBase64Pdf = (base64Data, fileName = "document.pdf") => {
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
        } catch (err) {
            console.error("Failed to open document:", err);
            alert("Unable to open document");
        }
    };


    /* ---------------------- UI ---------------------- */
    const currentFeeds = activeTab === "feeds" ? feeds : notifiedFeeds;

    return (
        <Layout>
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
                {/* Header */}
                <div className="flex justify-between items-center bg-white dark:bg-gray-800 px-6 py-4 shadow-md">
                    <div className="flex items-center gap-4">
                        <button className="text-orange-500 hover:text-orange-600">
                            <IonIcon name="apps-outline" size={28} />
                        </button>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                            {pet?.petName || "My Pet"}
                        </h1>
                    </div>

                    <button
                        onClick={() => pet && navigate("/AddFeed", { state: { pet, user, notifyOwner: false } })}
                        className="text-orange-500 text-2xl hover:text-orange-600 transition"
                    >
                        <IonIcon name="add-circle-outline" />
                    </button>
                </div>

                <div className="max-w-3xl mx-auto mt-10 px-4">

                    {/* Tabs */}
                    <div className="flex justify-center mb-10">
                        <div className="inline-flex rounded-2xl bg-gray-100 dark:bg-gray-800 p-1 shadow-inner">
                            <button
                                onClick={() => setActiveTab("feeds")}
                                className={`px-6 py-2 rounded-xl font-semibold text-sm transition-all duration-300 ${activeTab === "feeds"
                                    ? "bg-orange-500 text-white shadow-lg"
                                    : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-200"
                                    }`}
                            >
                                My Feeds
                            </button>

                            {canNotify && (
                                <button
                                    onClick={() => setActiveTab("notified")}
                                    className={`px-6 py-2 rounded-xl font-semibold text-sm transition-all duration-300 ${activeTab === "notified"
                                        ? "bg-red-500 text-white shadow-lg"
                                        : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-200"
                                        }`}
                                >
                                    Notifications
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Feeds */}
                    {loading ? (
                        <div className="text-center text-gray-500 mt-20">
                            Loading feeds...
                        </div>
                    ) : currentFeeds.length === 0 ? (
                        <div className="text-center text-gray-500 mt-20">
                            {activeTab === "feeds" ? "No feeds to display." : "No notifications."}
                        </div>
                    ) : (
                        <div className="space-y-8">
                            {currentFeeds.map(feed => (
                                <div
                                    key={feed.feedId}
                                    className="rounded-3xl bg-white dark:bg-gray-800 p-6 shadow-lg hover:shadow-2xl transition-shadow"
                                >

                                    {/* HEADER */}
                                    <div className="mb-4 flex items-start justify-between">
                                        <div className="flex items-center gap-4">
                                            <IonIcon
                                                name="person-circle-outline"
                                                className="text-4xl text-gray-500 dark:text-gray-300"
                                            />
                                            <div>
                                                <p className="font-semibold text-gray-900 dark:text-gray-100">
                                                    {feed.adder?.userName || "Unknown"}
                                                </p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                                    {new Date(feed.createdAt).toLocaleString()}
                                                </p>
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => handleDeleteFeed(feed.feedId)}
                                            className="text-red-400 hover:text-red-600 transition"
                                        >
                                            <IonIcon name="trash-bin-outline" />
                                        </button>
                                    </div>

                                    {/* CONTENT */}
                                    <p className="text-gray-800 dark:text-gray-200 leading-relaxed">
                                        {feed.content}
                                    </p>

                                    {/* ATTACHMENTS */}
                                    <div className="mt-5 space-y-5">

                                        {/* IMAGE */}
                                        {feed.base64Image && (
                                            <div className="rounded-3xl overflow-hidden bg-black/5 dark:bg-black shadow-lg">
                                                <img
                                                    src={`data:image/jpeg;base64,${feed.base64Image}`}
                                                    alt="Feed"
                                                    className="w-full max-h-[420px] object-contain mx-auto"
                                                />
                                            </div>
                                        )}



                                        {/* VIDEO */}
                                        {feed.base64Video && (
                                            <div className="rounded-3xl overflow-hidden bg-black shadow-lg">
                                                <video
                                                    src={`data:video/mp4;base64,${feed.base64Video}`}
                                                    controls
                                                    preload="metadata"
                                                    className="w-full max-h-[650px] object-contain bg-black"
                                                />
                                            </div>
                                        )}

                                        {/* DOCUMENT */}
                                        {feed.base64Document && (
                                            <button
                                                onClick={() =>
                                                    openBase64Pdf(feed.base64Document, feed.docUrl)
                                                }
                                                className="flex items-center gap-4 rounded-2xl bg-gray-50 dark:bg-gray-700 p-4 shadow-md hover:shadow-lg transition"
                                            >
                                                <IonIcon
                                                    name="document-text-outline"
                                                    className="text-3xl text-orange-500"
                                                />
                                                <span className="truncate font-medium text-gray-800 dark:text-gray-100">
                                                    {feed.docUrl?.split("/").pop() || "Document"}
                                                </span>
                                            </button>
                                        )}
                                    </div>

                                    {/* REACTIONS */}
                                    <div className="mt-6 flex gap-8 text-sm border-t border-gray-200 dark:border-gray-700 pt-4">
                                        <button
                                            onClick={() => handleLike(feed.feedId)}
                                            className="flex items-center gap-2 text-red-500 hover:text-red-600 transition"
                                        >
                                            <IonIcon
                                                name={
                                                    likedByMe[feed.feedId]
                                                        ? "heart"
                                                        : "heart-outline"
                                                }
                                            />
                                            <span className="font-medium">
                                                {likes[feed.feedId] || 0}
                                            </span>
                                        </button>

                                        <button
                                            onClick={() =>
                                                setShowCommentInput(prev => ({
                                                    ...prev,
                                                    [feed.feedId]: !prev[feed.feedId],
                                                }))
                                            }
                                            className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 transition"
                                        >
                                            <IonIcon name="chatbubble-outline" />
                                            {showCommentInput[feed.feedId] ? "Cancel" : "Comment"}
                                        </button>
                                    </div>

                                    {/* COMMENT INPUT */}
                                    {showCommentInput[feed.feedId] && (
                                        <div className="mt-4 flex gap-3">
                                            <input
                                                value={commentText[feed.feedId] || ""}
                                                onChange={e =>
                                                    setCommentText(prev => ({
                                                        ...prev,
                                                        [feed.feedId]: e.target.value,
                                                    }))
                                                }
                                                placeholder="Add a comment..."
                                                className="flex-1 rounded-xl border border-gray-300 dark:border-gray-600 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 dark:bg-gray-700 dark:text-gray-100"
                                            />
                                            <button
                                                onClick={() =>
                                                    handleCommentSubmit(feed.feedId)
                                                }
                                                className="px-4 rounded-xl bg-orange-500 hover:bg-orange-600 text-white shadow-md transition"
                                            >
                                                <IonIcon name="send-outline" />
                                            </button>
                                        </div>
                                    )}

                                    {/* COMMENTS */}
                                    {comments[feed.feedId]?.map(c => (
                                        <div
                                            key={c.id}
                                            className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700 text-sm"
                                        >
                                            <div className="flex items-center justify-between mb-1">
                                                <span className="font-semibold text-gray-800 dark:text-gray-200">
                                                    {c.userName}
                                                </span>
                                                {c.userId === user?.userId && (
                                                    <button
                                                        onClick={() =>
                                                            handleDeleteComment(c.id, feed.feedId)
                                                        }
                                                        className="text-xs text-red-400 hover:text-red-600 transition"
                                                    >
                                                        Delete
                                                    </button>
                                                )}
                                            </div>
                                            <p className="text-gray-600 dark:text-gray-300">
                                                {c.content}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    )}
                </div>


            </div>
        </Layout>
    );
}
