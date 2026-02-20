// src/components/ui/IonIcon.tsx
import React from "react";
import * as IoIcons from "react-icons/io5";

interface IonIconProps {
  name: string; // Ionicon name, e.g., "apps-outline"
  className?: string;
  size?: number | string;
  color?: string;
  onClick?: () => void;
}

export const IonIcon: React.FC<IonIconProps> = ({ name, className, size, color, onClick }) => {
  // Convert hyphenated name to PascalCase used in react-icons
  // Example: "apps-outline" → "IoAppsOutline"
  const pascalCaseName = name
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");

  const iconName = `Io${pascalCaseName}`; // Add Io prefix


  const IconComponent = IoIcons[iconName];

  if (!IconComponent) {
    console.warn(`IonIcon: Icon "${name}" not found!`);
    return null;
  }

  return <IconComponent className={className} size={size} color={color} onClick={onClick} />;
};
