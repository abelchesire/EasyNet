import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/layout";
import './index.css';
import Dashboard from "./pages/dashboard";
import NetworkManagement from "./pages/netmgt";
import Reports from "./pages/reports";
import Settings from "./pages/settings";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />} />
          <Route index element={<Dashboard/>} />
          <Route path="/networkManagement" element={<NetworkManagement/>} />
          <Route path="/reports" element={<Reports/>} />
          <Route path="/settings" element={<Settings/>} />
      </Routes>
    </Router>
  );
}

export default App;
