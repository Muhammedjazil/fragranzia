import AdminNavbar from "../admin/Adminnavbar";

const AdminLayout = ({ children }) => {
  return (
    <div className="admin-layout Product-table-og">

      {/* Common Admin Navbar */}
      <AdminNavbar />

      {/* Admin page content */}
      <main className="admin-content">

        {children}      {/*admin keran pattunna page(.jsx) eg:-producttable.jsx,dasgbord etc.... so aa oru childernilekk commenayi navbar set aakunnu  */}                   
      </main>
    </div>
  );
};

export default AdminLayout;