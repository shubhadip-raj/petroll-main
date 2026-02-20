// src/utils/uploadPetCloud.web.ts

import { Pet } from "../pages/pet";
import { User } from "../pages/User";

const API_URL = import.meta.env.VITE_API_URL;
export async function uploadPetCloudWeb(
  file: File,
  type: "image" | "video" | "doc" | "vet",
  pet:Pet,
  user:User
) {
  const formData = new FormData();

  formData.append("file", file);
  formData.append("petId", String(pet.petId));
  formData.append("userId", String(user.userId));
  formData.append("type", type);

  try {
    const response = await fetch(`${API_URL}/saveInCloud`, {
      method: "POST",
      body: formData, // DO NOT set Content-Type manually
    });

    if (!response.ok) {
      const text = await response.text();
      console.error("Upload failed:", text);
      throw new Error("Upload failed");
    }

    return await response.json();
  } catch (err) {
    console.error("Upload error:", err);
    throw err;
  }
}
