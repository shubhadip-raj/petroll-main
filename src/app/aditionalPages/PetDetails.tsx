import { useEffect, useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "@/contexts/UserContext";
import { IonIcon } from "@/components/ui/IonIcon";
import { Layout } from "../layout/Layout";

const API_URL = import.meta.env.VITE_API_URL;

interface Pet {
  petId?: number;
  petName: string;
  gender: string;
  color: string;
  breed: string;
  species: string;
  dob: string;
  spayedNeutered: string;
  microChipId: string;
  emergencyContact: string;
  emergencyEmail: string;
  lost: boolean;
  description: string;
  base64Image: string;
  lostMessage: string;
}

export default function PetDetails() {
  const { user } = useContext(UserContext);
  const { state } = useLocation();
  const navigate = useNavigate();

  const petId = state?.petId;

  const [loading, setLoading] = useState(!!petId);
  const [showGender, setShowGender] = useState(false);
  const [showNeuter, setShowNeuter] = useState(false);
  const [showLostModal, setShowLostModal] = useState(false);
  const [tempLostMessage, setTempLostMessage] = useState("");
  const [imagePreview, setImagePreview] = useState<string>("");


  const [pet, setPet] = useState<Pet>({
    petName: "",
    gender: "UNKNOWN",
    color: "",
    breed: "",
    species: "",
    dob: "",
    spayedNeutered: "UNKNOWN",
    microChipId: "",
    emergencyContact: "",
    emergencyEmail: "",
    lost: false,
    description: "",
    base64Image: "",
    lostMessage: "",
  });

  // 🔥 Load pet if editing
  useEffect(() => {
    if (!petId) return;

    fetch(`${API_URL}/getPetById?id=${petId}`)
      .then((res) => res.json())
      .then((data) => {
        setPet(data);

        if (data.base64Image) {
          setImagePreview(`data:image/jpeg;base64,${data.base64Image}`);
        }
      })
      .finally(() => setLoading(false));
  }, [petId]);


  // 🔥 Image picker (WEB)
  const selectImage = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";

    input.onchange = () => {
      const file = input.files?.[0];
      if (!file) return;

      const reader = new FileReader();

      reader.onload = () => {
        const dataUrl = reader.result as string;

        // ✅ For UI preview
        setImagePreview(dataUrl);

        // ✅ For backend (strip prefix)
        const base64 = dataUrl.split(",")[1];
        setPet((p) => ({ ...p, base64Image: base64 }));
      };

      reader.readAsDataURL(file);
    };

    input.click();
  };


  // 🔥 Save pet
  const handleSave = async () => {
    if (!user?.userId) {
      alert("User not logged in");
      return;
    }

    const endpoint = petId
      ? `${API_URL}/updatePet/${petId}`
      : `${API_URL}/addPet`;

    const method = petId ? "PUT" : "POST";

    const res = await fetch(endpoint, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...pet, owner: user }),
    });

    if (res.ok) {
      alert(petId ? "Pet updated!" : "Pet created!");
      navigate(-1);
    } else {
      alert("Failed to save pet");
    }
  };

  if (loading) {
    return <div className="p-10 text-center text-gray-700 dark:text-gray-200">Loading...</div>;
  }
const handleCancel = () => {
  // example conditions
  if (petId) {
    navigate("/homeScreen");
  } else {
    navigate("/qrPass"); // fallback
  }
};

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
        {/* HEADER */}
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => navigate(-1)}>
            <IonIcon name="arrow-back-outline" className="text-2xl text-orange-500" />
          </button>
          <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            {petId ? "Edit Pet" : "Add Pet"}
          </h1>
        </div>

        {/* IMAGE */}
        <div
          className="relative w-40 h-40 mx-auto rounded-full overflow-hidden shadow mb-6 cursor-pointer"
          onClick={selectImage}
        >
          <img
            src={imagePreview || "/assets/images/sample-dog2.jpeg"}
            className="w-full h-full object-cover"
          />

          <div className="absolute bottom-2 right-2 bg-orange-500 p-2 rounded-full text-white">
            <IonIcon name="camera-outline" />
          </div>
        </div>

        {/* FORM */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-5 space-y-4">
          {[
            ["Pet Name", "petName"],
            ["Color", "color"],
            ["Breed", "breed"],
            ["Species", "species"],
            ["Chip ID", "microChipId"],
            ["Contact", "emergencyContact"],
            ["Email", "emergencyEmail"],
          ].map(([label, key]) => (
            <div key={key} className="grid grid-cols-2 gap-4 items-center">
              <span className="text-gray-700 dark:text-gray-300 font-medium">{label}</span>
              <input
                className="
                px-3 py-2 rounded-lg
                bg-white dark:bg-gray-700
                text-gray-900 dark:text-gray-100
                placeholder-gray-400 dark:placeholder-gray-400
                border border-gray-300 dark:border-gray-600
                focus:outline-none focus:ring-2 focus:ring-orange-500
              "
                value={(pet)[key]}
                onChange={(e) => setPet({ ...pet, [key]: e.target.value })}
              />
            </div>
          ))}

          {/* DOB */}
          <div className="grid grid-cols-2 gap-4 items-center">
            <span className="text-gray-700 dark:text-gray-300 font-medium">Birth Date</span>
            <input
              type="date"
              className="
              px-3 py-2 rounded-lg
              bg-white dark:bg-gray-700
              text-gray-900 dark:text-gray-100
              border border-gray-300 dark:border-gray-600
              focus:outline-none focus:ring-2 focus:ring-orange-500
            "
              value={pet.dob}
              onChange={(e) => setPet({ ...pet, dob: e.target.value })}
            />
          </div>

          {/* GENDER */}
          <div
            className="grid grid-cols-2 gap-4 items-center cursor-pointer"
            onClick={() => setShowGender(true)}
          >
            <span className="text-gray-700 dark:text-gray-300 font-medium">Gender</span>
            <span className="text-gray-900 dark:text-gray-100">{pet.gender}</span>
          </div>

          {/* NEUTER */}
          <div
            className="grid grid-cols-2 gap-4 items-center cursor-pointer"
            onClick={() => setShowNeuter(true)}
          >
            <span className="text-gray-700 dark:text-gray-300 font-medium">Neutered</span>
            <span className="text-gray-900 dark:text-gray-100">{pet.spayedNeutered}</span>
          </div>

          {/* LOST */}
          <div className="grid grid-cols-2 gap-4 items-center">
            <span className="text-gray-700 dark:text-gray-300 font-medium">At Home</span>
            <input
              type="checkbox"
              className="w-5 h-5 accent-orange-500 cursor-pointer"
              checked={!pet.lost}
              onChange={(e) =>
                e.target.checked
                  ? setPet({ ...pet, lost: false, lostMessage: "" })
                  : setShowLostModal(true)
              }
            />
          </div>

          {/* DESCRIPTION */}
          <textarea
            className="
            w-full p-3 rounded-lg
            bg-white dark:bg-gray-700
            text-gray-900 dark:text-gray-100
            border border-gray-300 dark:border-gray-600
            focus:outline-none focus:ring-2 focus:ring-orange-500
          "
            placeholder="Description"
            value={pet.description}
            onChange={(e) => setPet({ ...pet, description: e.target.value })}
          />
        </div>

        {/* BUTTONS */}
        <div className="flex gap-3 mt-6">
          <button
            onClick={handleSave}
            className="flex-1 bg-orange-500 text-white py-2 rounded-lg"
          >
            {petId ? "Update" : "Save"}
          </button>
          <button
            onClick={handleCancel}
            className="flex-1 border py-2 rounded-lg dark:border-gray-600 dark:text-gray-100"
          >
            Cancel
          </button>

        </div>

        {/* MODALS */}
        {showGender && (
          <Modal title="Select Gender" onClose={() => setShowGender(false)}>
            {["MALE", "FEMALE", "UNKNOWN"].map((g) => (
              <ModalItem
                key={g}
                onClick={() => {
                  setPet({ ...pet, gender: g });
                  setShowGender(false);
                }}
                label={g}
              />
            ))}
          </Modal>
        )}

        {showNeuter && (
          <Modal title="Neutered Status" onClose={() => setShowNeuter(false)}>
            {["YES", "NO", "UNKNOWN"].map((n) => (
              <ModalItem
                key={n}
                label={n}
                onClick={() => {
                  setPet({ ...pet, spayedNeutered: n });
                  setShowNeuter(false);
                }}
              />
            ))}
          </Modal>
        )}

        {showLostModal && (
          <Modal title="Lost Message" onClose={() => setShowLostModal(false)}>
            <textarea
              className="
              w-full p-3 rounded-lg
              bg-white dark:bg-gray-700
              text-gray-900 dark:text-gray-100
              border border-gray-300 dark:border-gray-600
              focus:outline-none focus:ring-2 focus:ring-orange-500
              mb-3
            "
              value={tempLostMessage}
              onChange={(e) => setTempLostMessage(e.target.value)}
            />
            <button
              className="bg-orange-500 text-white w-full py-2 rounded"
              onClick={() => {
                setPet({ ...pet, lost: true, lostMessage: tempLostMessage });
                setShowLostModal(false);
              }}
            >
              Save
            </button>
          </Modal>
        )}
      </div>
    </Layout>
  );
}

/* 🔥 Reusable modal */
function Modal({
  title,
  children,
  onClose,
}: {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-xl p-4 w-80">
        <h2 className="font-semibold mb-3">{title}</h2>
        {children}
        <button onClick={onClose} className="mt-3 text-sm text-gray-500 dark:text-gray-400">
          Close
        </button>
      </div>
    </div>
  );
}

function ModalItem({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
    >
      {label}
    </button>
  );
}
