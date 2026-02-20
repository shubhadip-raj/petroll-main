import React from "react";
import { QRCodeCanvas } from "qrcode.react";
import { Pet } from "./pet";
import { Share2 } from "lucide-react";

interface QRCodeScreenProps {
  pet: Pet;
  onClose: () => void;
}

const QRCodeScreen: React.FC<QRCodeScreenProps> = ({ pet, onClose }) => {
  if (!pet) return null;

  const shareUrl = `https://petroll.co/pet/view?token=${pet.secureToken}`;

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: `${pet.petName} - Petroll`,
          text: `Check out my pet on Petroll`,
          url: shareUrl,
        });
      } else {
        await navigator.clipboard.writeText(shareUrl);
        alert("Link copied to clipboard!");
      }
    } catch {
      alert("Failed to share link");
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
      onClick={onClose}
    >
      {/* Modal */}
      <div
        className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-md p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 dark:text-gray-300 hover:text-orange-500 transition"
        >
          ✕
        </button>

        {/* Header */}
        <div className="flex items-center justify-center gap-2 mb-5">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            {pet.petName}
          </h2>
          🐾
        </div>

        {/* Content */}
        <div className="flex gap-4">
          {/* QR */}
          <div className="flex justify-center items-center border border-gray-200 dark:border-gray-700 rounded-lg p-3 bg-white">
            <QRCodeCanvas
              value={JSON.stringify({
                petId: pet.petId,
                petName: pet.petName,
                ownerName: pet.owner.userName,
                ownerId: pet.owner.userId,
                address: pet.owner.address ?? "",
                token: pet.secureToken,
              })}
              size={160}
            />
          </div>

          {/* Info */}
          <div className="text-sm flex flex-col justify-center">
            <p className="font-semibold text-gray-800 dark:text-gray-100">
              Owner: {pet.owner.userName}
            </p>

            {pet.owner.address && (
              <p className="text-gray-600 dark:text-gray-300 mt-1">
                {pet.owner.address}
              </p>
            )}

            <a
              href="https://petroll.co"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-500 hover:text-orange-600 underline mt-3 font-medium"
            >
              petroll.co
            </a>
          </div>
        </div>

        {/* Share */}
        <div className="flex justify-end mt-5">
          <button
            onClick={handleShare}
            className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 transition text-white px-4 py-2 rounded-lg shadow"
          >
            <Share2 size={18} />
            Share
          </button>
        </div>
      </div>
    </div>
  );
};

export default QRCodeScreen;
