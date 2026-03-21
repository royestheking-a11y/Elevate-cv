import { createBrowserRouter } from "react-router";
import { DashboardLayout } from "./components/ui/Layout";
import { PublicLayout } from "./components/ui/PublicLayout";
import { AdminLayout } from "./components/ui/AdminLayout";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import LandingPage from "./components/pages/LandingPage";
import FeaturesPage from "./components/pages/public/FeaturesPage";
import TemplatesPage from "./components/pages/public/TemplatesPage";
import HowItWorksPage from "./components/pages/public/HowItWorksPage";
import TutorialsPage from "./components/pages/public/TutorialsPage";
import PrivacyPolicyPage from "./components/pages/public/PrivacyPolicyPage";
import TermsOfServicePage from "./components/pages/public/TermsOfServicePage";
import CookiePolicyPage from "./components/pages/public/CookiePolicyPage";
import LoginPage from "./components/pages/auth/LoginPage";
import SignupPage from "./components/pages/auth/SignupPage";
import DashboardHome from "./components/pages/DashboardHome";
import CVBuilderPage from "./components/pages/CVBuilderPage";
import ResumeRepairPage from "./components/pages/ResumeRepairPage";
import CoverLetterPage from "./components/pages/CoverLetterPage";
import EmailWriterPage from "./components/pages/EmailWriterPage";
import PublicCVPage from "./components/pages/PublicCVPage";
import ResumeStudioPage from "./components/pages/ResumeStudioPage";

import AdminDashboard from "./components/pages/admin/AdminDashboard";
import AdminUsers from "./components/pages/admin/AdminUsers";
import AdminMessages from "./components/pages/admin/AdminMessages";
import AdminAssets from "./components/pages/admin/AdminAssets";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: PublicLayout,
    children: [
      { index: true, Component: LandingPage },
      { path: "features", Component: FeaturesPage },
      { path: "templates", Component: TemplatesPage },
      { path: "how-it-works", Component: HowItWorksPage },
      { path: "tutorials", Component: TutorialsPage },
      { path: "privacy", Component: PrivacyPolicyPage },
      { path: "terms", Component: TermsOfServicePage },
      { path: "cookies", Component: CookiePolicyPage },
    ]
  },
  { path: "/login", Component: LoginPage },
  { path: "/signup", Component: SignupPage },
  { path: "/share/:id", Component: PublicCVPage },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, Component: DashboardHome },
      { path: "resume-builder", Component: CVBuilderPage },
      { path: "resume-repair", Component: ResumeRepairPage },
      { path: "cover-letter", Component: CoverLetterPage },
      { path: "email-writer", Component: EmailWriterPage },
      { path: "cv-studio", Component: ResumeStudioPage },
    ],
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute requireAdmin={true}>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, Component: AdminDashboard },
      { path: "users", Component: AdminUsers },
      { path: "messages", Component: AdminMessages },
      { path: "assets", Component: AdminAssets },
    ],
  }
]);
