import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import CreateEventPage from './pages/CreateEventPage';
import AdminSportsCategories from './pages/AdminSportsCategories';
import AdminCities from './pages/AdminCities';
import AdminAreas from './pages/AdminAreas';
import AllEventsPage from './pages/AllEventsPage';
import MyEventsPage from './pages/MyEventsPage';
import EditEventPage from './pages/EditEventPage';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        {/* <Route path="/" element={<h1>Welcome to Sports Buddy</h1>} /> */}
        <Route path="/create-event" element={<CreateEventPage />} />
        <Route path="/admin/sports-categories" element={<AdminSportsCategories />} />
        <Route path="/admin/cities" element={<AdminCities />} />
        <Route path="/admin/areas" element={<AdminAreas />} />
        <Route path="/events" element={<AllEventsPage />} />
        <Route path="/my-events" element={<MyEventsPage />} />
        <Route path="/edit-event/:id" element={<EditEventPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/profile" element={<ProfilePage />} />

      </Routes>
    </Router>
  );
}

export default App;

