import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { AlertTriangle, Home } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL;

export default function PetRedirect() {
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchPet = async () => {
      try {
        const res = await axios.get(`${API_URL}/oldCode/${id}`);
        const redirectUrl = res.data.redirectUrl;

        if (redirectUrl) {
          window.location.href = redirectUrl;
        } else {
          setNotFound(true);
        }
      } catch (error) {
        console.error(error);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    fetchPet();
  }, [id]);

  // ✅ Loading UI
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center gap-4">

        <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center animate-pulse">
          🐾
        </div>

        <h2 className="text-xl font-semibold">
          Getting your pet...
        </h2>

        <p className="text-muted-foreground text-sm">
          Please wait while we fetch the details 🐶
        </p>

        <div className="flex gap-1 mt-2">
          <span className="w-2 h-2 bg-primary rounded-full animate-bounce"></span>
          <span className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:0.2s]"></span>
          <span className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:0.4s]"></span>
        </div>

      </div>
    );
  }

  // ❌ Not Found UI
  if (notFound) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center px-4">

        {/* Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 120 }}
          className="bg-red-100 dark:bg-red-900/30 p-6 rounded-full mb-6"
        >
          <AlertTriangle className="h-10 w-10 text-red-600" />
        </motion.div>

        {/* Title */}
        <h2 className="text-2xl md:text-3xl font-bold mb-2">
          Sorry, no pet found 🐾
        </h2>

        {/* Subtitle */}
        <p className="text-muted-foreground max-w-sm">
          Please add a correct ID for your pet or check the QR code again.
        </p>

        {/* Button */}
        <button
          onClick={() => (window.location.href = "/")}
          className="mt-6 flex items-center gap-2 px-5 py-2 bg-primary text-white rounded-lg hover:opacity-90 transition"
        >
          <Home className="w-4 h-4" />
          Return Home
        </button>

      </div>
    );
  }

  return null;
}