import React, { useState } from "react";
import "./scss/admin.scss";

function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="dashboard">
      <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <h1>Rendify</h1>
        
        <ul>
          <li>Dashboard</li>
          <li>Users</li>
          <li>Settings</li>
        </ul>
        <button onClick={toggleSidebar}>Toggle Sidebar</button>
      </div>
      <div className="content">
        <header>
          <h1>Rendify Admin Dashboard</h1>
        </header>
        <main>
          <section>
            <h2>Dashboard Overview</h2>
            {/* Your dashboard content goes here */}
          </section>
        </main>
      </div>
    </div>
  );
}

export default App;
