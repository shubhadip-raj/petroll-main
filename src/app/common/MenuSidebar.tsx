import { useContext, useEffect, useState } from "react";
import { X, ChevronDown, LogOut, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "@/contexts/UserContext";
import { cn } from "@/lib/utils";

const API_URL = import.meta.env.VITE_API_URL;

interface MenuSidebarProps {
    visible: boolean;
    onClose: () => void;
}

const roles = ["Owner", "Family", "Vet", "Walker", "Groomer", "Friend"];

const menuItems = [
    { label: "Home", path: "/homeScreen" },
    { label: "Notifications", path: "/notifications" },
    { label: "Pet Approvals", path: "/pet-approvals" },
    { label: "Shop", path: "/shop" },
    { label: "Account Details", path: "/account" },
    { label: "History", path: "/payment-history" },
    { label: "Expert Directory", path: "/experts" },
    { label: "Petology", path: "/petology" },
    { label: "TnC", path: "/terms" },
    { label: "About & Contacts", path: "/about" },
];

export default function MenuSidebar({ visible, onClose }: MenuSidebarProps) {
    const { user, setUser, logout } = useContext(UserContext);
    const navigate = useNavigate();

    const [roleMenuOpen, setRoleMenuOpen] = useState(false);
    const [selectedRole, setSelectedRole] = useState(user?.userType);

    useEffect(() => {
        setSelectedRole(user?.userType);
    }, [user?.userType]);

    const handleRoleChange = async (role: string) => {
        if (!user) return;

        // If selected role is already the user's role → no API call needed
        if (role === user.userType || role.toLocaleLowerCase() === "owner") {
            if (role.toLocaleLowerCase() === "owner") {
                const res = await fetch(`${API_URL}/getLatestPetByUserId?userId=${user.userId}`)
                const petData = await res.json();

                if (petData?.petId) {
                    if (user?.userId && petData?.petId) {
                        sessionStorage.setItem(
                            `selectedPetId_${user.userId}`,
                            String(petData.petId)
                        );
                    }
                }
            }
            setSelectedRole(role);
            setRoleMenuOpen(false);
            setUser({ ...user, userType: role });
            onClose();
            return;
        }

        try {
            const response = await fetch(
                `${API_URL}/checkUserJoinPets/${user.userId}?userType=${role}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            const alreadyJoined: boolean = await response.json();

            // If user has NOT joined any pet with this role → STOP
            if (!alreadyJoined) {
                alert(`You haven't joined any pet with the role "${role}". Please join first.`);
                return;
            } else {
                const res = await fetch(
                    `${API_URL}/userJoinLatestPet/${user.userId}?userType=${role}`
                );
                if (!res.ok) {
                    throw new Error("Failed to fetch latest joined pet");
                }

                const petData = await res.json();

                 if (user?.userId && petData?.petId) {
                        sessionStorage.setItem(
                            `selectedPetId_${user.userId}`,
                            String(petData.petId)
                        );
                    }
            }
            // Proceed only if joined
            setSelectedRole(role);
            setRoleMenuOpen(false);
            setUser({ ...user, userType: role });
            onClose();

        } catch (error) {
            console.error("Failed to check user join pets:", error);
        }
    };


    const handleLogout = () => {
        localStorage.clear();
        sessionStorage.clear();
        logout();
        onClose();
        navigate("/login", { replace: true });
    };

    return (
        <>
            {/* Overlay */}
            <div
                onClick={onClose}
                className={cn(
                    "fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300",
                    visible ? "opacity-100" : "opacity-0 pointer-events-none"
                )}
            />

            {/* Sidebar */}
            <aside
                className={cn(
                    "fixed top-0 right-0 z-50 h-screen w-[320px]",
                    "bg-background/90 backdrop-blur-xl",
                    "border-l border-border/50 shadow-[0_0_40px_rgba(0,0,0,0.15)]",
                    "flex flex-col",
                    "transform transition-transform duration-300 ease-[cubic-bezier(.4,0,.2,1)]",
                    visible ? "translate-x-0" : "translate-x-full"
                )}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-border/50">
                    <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-full bg-primary/15 flex items-center justify-center">
                            <User className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground">Welcome</p>
                            <h3 className="text-sm font-semibold leading-tight max-w-[160px] truncate">
                                {user?.userName || "Guest"}
                            </h3>
                        </div>
                    </div>

                    <button
                        onClick={onClose}
                        className="p-2 rounded-full hover:bg-muted transition"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

                {/* Role Selector */}
                <div className="relative px-5 py-4 border-b border-border/50 z-50">
                    <button
                        onClick={() => setRoleMenuOpen(!roleMenuOpen)}
                        className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl
               bg-muted/60 hover:bg-muted transition shadow-sm"
                    >
                        <span className="text-sm font-medium">{selectedRole}</span>
                        <ChevronDown
                            className={cn(
                                "w-4 h-4 transition-transform duration-200",
                                roleMenuOpen && "rotate-180"
                            )}
                        />
                    </button>

                    {roleMenuOpen && (
                        <div
                            className="
        absolute left-0 right-0 mt-2
        rounded-xl border border-border/60
        bg-background shadow-2xl
        z-[999]
        overflow-hidden
      "
                        >
                            {roles.map((role) => (
                                <button
                                    key={role}
                                    onClick={() => handleRoleChange(role)}
                                    className={cn(
                                        "w-full text-left px-4 py-2.5 text-sm transition",
                                        "hover:bg-muted/70",
                                        role === selectedRole &&
                                        "bg-primary/10 text-primary font-semibold"
                                    )}
                                >
                                    {role}
                                </button>
                            ))}
                        </div>
                    )}
                </div>


                {/* Menu */}
                <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
                    {menuItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            onClick={onClose}
                            className="block px-4 py-2.5 text-sm rounded-xl font-medium
                         hover:bg-muted/70 transition focus:outline-none
                         focus:ring-2 focus:ring-primary/30"
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>

                {/* Footer */}
                <div className="border-t border-border/50 px-5 py-4">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2.5
                       rounded-xl text-sm font-medium text-red-500
                       hover:bg-red-500/10 transition"
                    >
                        <LogOut className="w-4 h-4" />
                        Logout
                    </button>

                    <p className="mt-3 text-[11px] text-center text-muted-foreground">
                        Petroll • Version 2.0
                    </p>
                </div>
            </aside>
        </>
    );
}
