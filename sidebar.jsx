export default function Sidebar({
  activePage,
  setActivePage,
  className,
  setSidebarOpen 
}) {

  const handleClick = (page) => {
    setActivePage(page);
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  };
  return (
    <div className={className}>
      <h3>Admin</h3>
      <p
        onClick={() => handleClick("dashboard")}
        className={activePage==="dashboard" ? "active" : ""}
      >
        📊 Dashboard
      </p>
      <p
        onClick={() => handleClick("complaints")}
        className={activePage==="complaints" ? "active" : ""}
      >
        📍 Complaints
      </p>
      <p
        onClick={() => handleClick("users")}
        className={activePage==="users" ? "active" : ""}
      >
        👤 Users
      </p>
      <p
        onClick={() => handleClick("settings")}
        className={activePage==="settings" ? "active" : ""}
      >
        ⚙ Settings
      </p>
    </div>
  );
}