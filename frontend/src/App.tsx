import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./page/dashboard.tsx";
import TestPage from "./page/TestPage.tsx";

function App() {
  return (
    <>
      <Router>
        {/* <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes> */}
        <Routes>
          <Route path="/" element={<TestPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
