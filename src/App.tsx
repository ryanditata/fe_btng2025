import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"; //  ganti ke react-router-dom

import { ScrollToTop } from "./components/common/ScrollToTop";
import AppLayoutAdministrator from "./layout/administrator/AppLayoutAdministrator";
import AppLayoutParticipant from "./layout/participant/AppLayoutParticipant";
import AppLayoutDivision from "./layout/division/AppLayoutDivision";

// Context
import { GlobalDataPesertaProvider } from "./context/GlobalDataPesertaContext";

// import LandingPage from "./pages/LandingPage/LandingPage";

// Division Pages
import DivisionDashboard from "./pages/Division/Dashboard/DivisionDashboard";
import DivisionKelas from "./pages/Division/Kelas/DivisionKelas";
import DetailKelas from "./pages/Division/Kelas/DetailKelas";
import DivisionMateri from "./pages/Division/Materi/DivisionMateri";
import DivisionTugas from "./pages/Division/Tugas/DivisionTugas";
   
import AppDivisionAdministrator from "./pages/Administrator/AppDivisionAdministrator";
import AppClassnAdministrator from "./pages/Administrator/AppClassAdministrator";
import AppAdminDivisionAdministrator from "./pages/Administrator/AppAdminDivisionAdministrator";
import AppListParticipant from "./pages/Administrator/AppListParticipant";
import AppAddDivisionAdministrator from "./pages/Administrator/AppAddDivisionAdministrator";
import AppAddAdminDivisionAdministrator from "./pages/Administrator/AppAddAdminDivisionAdministrator";
import AppUpdateDivisionAdministrator from "./pages/Administrator/AppUpdateDivisionAdministrator";
import AppUpdateAdminDivisionAdministrator from "./pages/Administrator/AppUpdateAdminDivisionAdministrator";
import AppReadDivisionAdministrator from "./pages/Administrator/AppReadDivisionAdministrator"
import AppReadAdminDivisionAdministrator from "./pages/Administrator/AppReadAdminDivisionAdministrator";
import SignInPage from "./pages/AuthUser/SignInPage";
import SignUpPage from "./pages/AuthUser/SignUpPage";

// Import halaman login
import Login from "./pages/Division/Login";
import AnnouncementPage from "./pages/Division/Pengumuman/Announcement";
import ParticipantClass from "./pages/Participant/ParticipantClass";
import Profile from "./pages/Participant/Profile";
import DashboardParticipant from "./pages/Participant/DashboardParticipant";
import ClassDetailParticipant from "./pages/Participant/ClassDetailParticipant";
import PengumumanParticipant from "./pages/Participant/PengumumanParticipant";
import LandingPage from "./pages/LandingPage/LandingPage";
import NotFound from "./pages/NotFound";



import AbsensiPage from "./pages/Division/Absensi/Absensi";
import ClassList from "./pages/Administrator/AppClassAdministrator";
import ClassParticipants from "./pages/Administrator/classes/ClassParticipants";
import LoginAdministrator from "./pages/Administrator/LoginAdministrator";

export default function App() {
  return (
    <>
      <Router>
        <GlobalDataPesertaProvider>
        <ScrollToTop />
        <Routes>

          {/* Landing Page */}
          <Route index path="/" element={<LandingPage />} />

          {/* Landing Page */}
          <Route index path="/home" element={<LandingPage />} />

          {/* Landing Page */}
          <Route index path="/home" element={<LandingPage />} />

          {/* Announcement */}
          <Route path="/announcement" element={<AnnouncementPage />} />

          {/* Absensi */}
          <Route path="/absensi" element={<AbsensiPage />} />

          {/* Dashboard Layout Participant */}
          <Route element={<AppLayoutParticipant />}>
            <Route index path="/participant" element={<Navigate to="/participant/dashboard" replace />} />
            <Route path="/participant/dashboard" element={<DashboardParticipant />} />
            <Route path="/participant/class" element={<ParticipantClass />} />
            <Route path="/participant/class/:id" element={<ClassDetailParticipant />} />
            <Route path="/participant/announcement" element={<PengumumanParticipant />} />
            <Route path="/participant/profile" element={<Profile />} />
          </Route>

           {/* ✅ Tambahin route ke Login custom */}
          <Route path="/login/administrator" element={<LoginAdministrator />} />

          {/* Administrator Layout */}
          <Route element={<AppLayoutAdministrator />}>
            <Route
              index
              path="/administrator"
              element={<AppDivisionAdministrator />}
            />
            <Route
              index
              path="/administrator/division"
              element={<AppDivisionAdministrator />}
            />
            {/* Add more admin routes here */}
            <Route
              path="/administrator/class"
              element={<AppClassnAdministrator />}
            />
            <Route
              path="/administrator/admin-division"
              element={<AppAdminDivisionAdministrator />}
            />
            <Route
              index
              path="/administrator/division/participant/:id"
              element={<AppListParticipant />}
            />
            <Route path="/administrator/class" element={<AppClassnAdministrator />} />
            <Route path="/administrator/admin-division" element={<AppAdminDivisionAdministrator />} />
            <Route index path="/administrator/division/participant/:id" element={<AppListParticipant />} />
            <Route index path="/administrator/division/add-division" element={<AppAddDivisionAdministrator />} />
            <Route index path="/administrator/admin-division/add-admin-division" element={<AppAddAdminDivisionAdministrator />} />
            <Route index path="/administrator/division/update-division" element={<AppUpdateDivisionAdministrator />} />
            <Route index path="/administrator/admin-division/update-admin-division/:id" element={<AppUpdateAdminDivisionAdministrator />} />
            <Route index path="/administrator/division/read-division" element={<AppReadDivisionAdministrator />} />
            <Route index path="/administrator/admin-division/read-admin-division/:id" element={<AppReadAdminDivisionAdministrator />} />

            {/* Classes (di bawah admin) */}
            <Route path="/classes" element={<ClassList />} />
            <Route path="/classes/:id/participants" element={<ClassParticipants />} />
          </Route>

          {/* Login Divisi */}
          <Route index path="/login/divisi" element={<Login />} />

          {/* Division Layout */}
          <Route element={<AppLayoutDivision />}>
            <Route index path="/divisi" element={<DivisionDashboard />} />
            {/* Add more participant routes here */}
            <Route path="/divisi/pengumuman" element={<AnnouncementPage />} />
            <Route path="/divisi/kelas" element={<DivisionKelas />} />
            <Route path="/divisi/kelas/:id_kelas" element={<DetailKelas />} />
            <Route path="/divisi/kelas/:id_kelas/absensi" element={<AbsensiPage />} />
            <Route path="/divisi/materi" element={<DivisionMateri />} />
            <Route path="/divisi/tugas" element={<DivisionTugas />} />
          </Route>

          {/* Auth Pages User */}
          <Route path="/signin/participant" element={<SignInPage />} />
          <Route path="/signup/participant" element={<SignUpPage />} />

         

          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        </GlobalDataPesertaProvider>
      </Router>
    </>
  );
}