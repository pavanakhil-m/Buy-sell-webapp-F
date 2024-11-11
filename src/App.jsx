// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import PrimaryPage from './pages/Primary/Primary';
// import Login from './pages/login/Login';
// import Register from './pages/register/Register';

// function App() {

//   const[userLoggedIn, setUserLoggedIn] = useState(false);

//   return (
//     <Router>
//       <Routes>
//         <Route 
//             path="/" 
//             element={user && user.userId ? <Navigate to="/home" />: <PrimaryPage />} />

//         <Route 
//             path="/login" 
//             element={user && user.userId ? <Navigate to="/home" />: <Login />} />

//         <Route 
//             path="/register" 
//             element={user && user.userId ? <Navigate to="/home" /> : <Register/>} />

//         <Route
//             path="/home"
//             element={user && user.userId ? <Home /> : <Navigate to="/login" />}
//           />
//       </Routes>
//     </Router>
//   )
// }

// export default App

// src/App.jsx
import React from 'react';
import AppRoutes from './Routes';

const App = () => {
  return <AppRoutes />;
};

export default App;

