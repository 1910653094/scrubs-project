import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import {
  Login,
  HSDashboard,
  MSDashboard,
  AccessDenied,
  NotFound,
  MSProfile,
  HSStaff,
  HSProfile,
  HSRooms,
  HSReports,
} from "./pages";
import { ProtectedRoute } from "./components";
import "./App.scss";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="login" element={<Login />} />
        <Route path="denied" element={<AccessDenied />} />

        <Route path="h" element={<ProtectedRoute permission="housekeeper" />}>
          <Route path="" element={<Navigate to="dashboard" />} />
          <Route path="dashboard" element={<HSDashboard />} />
          <Route path="staff" element={<HSStaff />} />
          <Route path="rooms" element={<HSRooms />} />
          <Route path="reports" element={<HSReports />} />
          <Route path="profile" element={<HSProfile />} />
        </Route>

        <Route path="m" element={<ProtectedRoute permission="medical" />}>
          <Route path="" element={<Navigate to="dashboard" />} />
          <Route path="dashboard" element={<MSDashboard />} /> // change to
          MSDashboard
          <Route path="profile" element={<MSProfile />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
