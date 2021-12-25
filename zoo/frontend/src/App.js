import './App.css';
import Zoos from './components/Zoos/Zoos'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Zoo from './components/Zoo/Zoo'
import AdminPage from './components/Admin/Admin';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route index element={<Zoos />} />
      <Route path="/zoo/:id" element={<Zoo />} />
      <Route path="/admin" element={<AdminPage />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
