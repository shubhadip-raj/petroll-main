import { User } from "./User";

export interface Pet {
  petId: number;
  petName: string;

  gender?: string;
  color?: string;
  breed?: string;
  species?: string;
  dob?: string;
  spayedNeutered?: string;
  microChipId?: string;
  emergencyContact?: string;
  emergencyEmail?: string;

  lost: boolean;
  description?: string;
  lostMessage?: string;

  secureToken: string;
  createdAt: string; // ISO string from backend

  // Images
  petImage?: Uint8Array;
  base64Image?: string;

  owner: User;

  // 🔐 Premium fields (MATCH backend JSON)
  isPremium: boolean;
  validDays: number;
  premiumStartDate?: string;   // "2026-02-04"
  premiumExpiryDate?: string;  // "2026-04-05"
}
