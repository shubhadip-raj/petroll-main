import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { UserProvider } from "@/contexts/UserContext"; // <-- added

import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import TermsPage from "./pages/TermsPage";
import SafetyPage from "./pages/SafetyPage";
import ChildSafetyPage from "./pages/ChildSafetyPage";
import ContactPage from "./pages/ContactPage";
import NotFound from "./pages/NotFound";
import PetPage from "./pages/PetPage";
import Login from "./auth/Login";
import Register from "./auth/Register";
import HomeScreen from "./app/pages/HomeScreen";
import FeedScreen from "./app/pages/Feed";
import PetManagersPage from "./app/pages/PetManagers";
import ScanPetPage from "./app/pages/PetScanner";
import MyPetsPage from "./app/pages/MyPets";
import DocsPage from "./app/petcloud/DocsPage";
import ImagesPage from "./app/petcloud/ImagesPage";
import VideosPage from "./app/petcloud/VideosPage";
import VetFilesPage from "./app/petcloud/VetFilesPage";
import PetDetails from "./app/aditionalPages/PetDetails";
import AddFeedPage from "./app/aditionalPages/Addfeed";

import AccountDetailsPage from "./app/aditionalPages/AccountDetails";
import UpgradePremiumPage from "./app/aditionalPages/UpgradePremium";
import QRPassPage from "./app/aditionalPages/QRPassPage";
import PaymentPage from "./app/aditionalPages/PaymentPage";
import PetApprovalsPage from "./app/aditionalPages/PetApproval";
import ForgotPassword from "./auth/ForgotPassword";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <UserProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/safety" element={<SafetyPage />} />
              <Route path="/child-safety" element={<ChildSafetyPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/pet/view" element={<PetPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgotPassword" element={<ForgotPassword />} />
              <Route path="/homeScreen" element={<HomeScreen />} />
              <Route path="/feed" element={<FeedScreen />} />
              <Route path="/petManagers" element={<PetManagersPage />} />
              <Route path="/scanPet" element={<ScanPetPage />} />
              <Route path="/myPets" element={<MyPetsPage />} />
              <Route path="/Docs" element={<DocsPage />} />
              <Route path="/Images" element={<ImagesPage />} />
              <Route path="/Videos" element={<VideosPage />} />
              <Route path="/VetFiles" element={<VetFilesPage />} />
              <Route path="/PetDetails" element={<PetDetails />} />
              <Route path="/AddFeed" element={<AddFeedPage />} />
              <Route path="/pet-approvals" element={<PetApprovalsPage />} />
              <Route path="/account" element={<AccountDetailsPage />} />
              <Route path="/upgradePremium" element={<UpgradePremiumPage />} />
              <Route path="/qrPass" element={<QRPassPage />} />
              <Route path="/payment" element={<PaymentPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </UserProvider>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
