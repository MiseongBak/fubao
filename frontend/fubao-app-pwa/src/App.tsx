import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import "./App.css";
import BottomNav from "./components/BottomNav";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/User/LoginPage";
import SignupPage from "./pages/User/SignupPage";
import ResultPage from "./pages/AI/ResultPage";
import CollectionPage from "./pages/Collection/CollectionPage";
import DetailPage from "./pages/Collection/DetailPage";
import FishBowlPage from "./pages/FishBowl/FishBowlPage";
import EquipmentInfoPage from "./pages/Information/EquipmentInfoPage";
import EtiquettePage from "./pages/Information/EtiquetteInfoPage";
import FishInfoPage from "./pages/Information/FishInfoPage";
import LocationInfoPage from "./pages/Information/LocationInfoPage";
import ProhibitionInfoPage from "./pages/Information/ProhibitionInfoPage";
import ReleaseInfo from "./pages/Information/ReleaseInfo";
import PlanManagePage from "./pages/Plan/PlanManagePage";
import ProfilePage from "./pages/User/ProfilePage";
import ViewAllPage from "./pages/ViewAllPage";
import MapPage from "./pages/Map/MapPage";
import MethodTotal from "./pages/Method/MethodTotal";
import PointTotal from "./pages/Point/PointTotal";
import FishTotal from "./pages/Fish/FishTotal";
import MethodPage1 from "./pages/Method/MethodPage1";
import MethodPage2 from "./pages/Method/MethodPage2";
import MethodPage3 from "./pages/Method/MethodPage3";
import MethodPage4 from "./pages/Method/MethodPage4";
import PointPage1 from "./pages/Point/PointPage1";
import PointPage2 from "./pages/Point/PointPage2";
import PointPage3 from "./pages/Point/PointPage3";
import PointPage4 from "./pages/Point/PointPage4";
import FishPage from "./pages/Fish/FishPage";
import TheFirstPage from "./pages/TheFirstPage";
import IntroductionPage from "./pages/IntroductionPage";
import RequireAuth from "./components/RequireAuth";

function App() {
  
  function ConditionalBottomNav() {
    const location = useLocation();
    // 로그인이나 회원가입 페이지에서는 BottomNav를 표시하지 않음
    if (location.pathname === '/login' || location.pathname === '/signup' || location.pathname === '/result' || location.pathname === '/introduction') {
      return null;
    }
  
    return <BottomNav />;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<TheFirstPage />} />
        <Route path="/introduction" element={<IntroductionPage />} />
        <Route path="/home" element={<RequireAuth><HomePage /></RequireAuth>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/result" element={<RequireAuth><ResultPage /></RequireAuth>} />
        <Route path="/collection" element={<RequireAuth><CollectionPage /></RequireAuth>} />
        <Route path="/detail/:fishid" element={<RequireAuth><DetailPage /></RequireAuth>} />
        <Route path="/fishbowl" element={<FishBowlPage />} />
        <Route path="/equipmentinfo" element={<RequireAuth><EquipmentInfoPage /></RequireAuth>} />
        <Route path="/etiquetteinfo" element={<RequireAuth><EtiquettePage /></RequireAuth>} />
        <Route path="/fishinfo" element={<RequireAuth><FishTotal /></RequireAuth>} />
        <Route path="/method" element={<RequireAuth><MethodTotal /></RequireAuth>} />
        <Route path="/point" element={<RequireAuth><PointTotal /></RequireAuth>} />
        <Route path="/locationinfo" element={<RequireAuth><LocationInfoPage /></RequireAuth>} />
        <Route path="/prohibitioninfo" element={<RequireAuth><ProhibitionInfoPage /></RequireAuth>} />
        <Route path="/releaseinfo" element={<RequireAuth><ReleaseInfo /></RequireAuth>} />
        <Route path="/map" element={<RequireAuth><MapPage /></RequireAuth>} />
        <Route path="/planmanage" element={<RequireAuth><PlanManagePage /></RequireAuth>} />
        <Route path="/profile" element={<RequireAuth><ProfilePage /></RequireAuth>} />
        <Route path="/viewall" element={<RequireAuth><ViewAllPage /></RequireAuth>} />
        <Route path="/method1" element={<RequireAuth><MethodPage1 /></RequireAuth>} />
        <Route path="/method2" element={<RequireAuth><MethodPage2 /></RequireAuth>} />
        <Route path="/method3" element={<RequireAuth><MethodPage3 /></RequireAuth>} />
        <Route path="/method4" element={<RequireAuth><MethodPage4 /></RequireAuth>} />
        <Route path="/point1" element={<RequireAuth><PointPage1 /></RequireAuth>} />
        <Route path="/point2" element={<RequireAuth><PointPage2 /></RequireAuth>} />
        <Route path="/point3" element={<RequireAuth><PointPage3 /></RequireAuth>} />
        <Route path="/point4" element={<RequireAuth><PointPage4 /></RequireAuth>} />
        <Route path="/fish/:id" element={<RequireAuth><FishPage /></RequireAuth>} />
      </Routes>
      <ConditionalBottomNav />
    </Router>
  );
}

export default App;
