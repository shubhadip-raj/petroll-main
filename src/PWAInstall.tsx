import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { PawPrint } from "lucide-react";
import { setInstallPrompt } from "./pwaInstallts";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}

export default function PWAInstall() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [showInstall, setShowInstall] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;

  const handler = (e: Event) => {
  console.log("beforeinstallprompt fired"); // 👈 ADD THIS

  const event = e as BeforeInstallPromptEvent;
  event.preventDefault();

  setDeferredPrompt(event);
  setInstallPrompt(event);

  timer = setTimeout(() => {
    setShowInstall(true);
  }, 5000);
};

    window.addEventListener("beforeinstallprompt", handler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
      clearTimeout(timer);
    };
  }, []);

  const installApp = async () => {
    if (!deferredPrompt) return;

    await deferredPrompt.prompt();
    const result = await deferredPrompt.userChoice;

    if (result.outcome === "accepted") {
      console.log("PWA installed");
    }

    setDeferredPrompt(null);
    setShowInstall(false);
  };

  const cancelInstall = () => {
    setShowInstall(false);
  };

  if (!showInstall || !deferredPrompt) return null;

  return (
    <motion.div
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: [0, -8, 0], opacity: 1 }}
      transition={{
        y: { duration: 2.5, repeat: Infinity, ease: "easeInOut" },
        opacity: { duration: 0.5 }
      }}
      className="fixed bottom-4 left-0 right-0 mx-auto z-[9999] w-[92%] max-w-md"
    >
      <div className="bg-card shadow-xl rounded-2xl p-4 border border-border flex flex-col sm:flex-row sm:items-center gap-4">

        {/* Icon */}
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto sm:mx-0">
          <PawPrint className="w-6 h-6 text-primary" />
        </div>

        {/* Content */}
        <div className="text-center sm:text-left flex-1">
          <div className="font-bold text-sm">Install Petroll</div>
          <div className="text-xs text-muted-foreground">
            Get faster access to your pets
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-2 w-full sm:w-auto">
          <button
            onClick={installApp}
            className="flex-1 sm:flex-none px-3 py-2 bg-primary text-white text-xs rounded-lg hover:opacity-90 transition"
          >
            Install
          </button>

          <button
            onClick={cancelInstall}
            className="flex-1 sm:flex-none px-3 py-2 bg-muted text-xs rounded-lg hover:bg-muted/80 transition"
          >
            Cancel
          </button>
        </div>

      </div>
    </motion.div>
  );
}