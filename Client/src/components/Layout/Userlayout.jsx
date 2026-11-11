import { UserNavbar } from "../user/Usernavbar";

const UserLayout = ({ children, search, setSearch }) => {
  return (
    <div className="user-layout">

      {/* Common User Navbar */}
      <UserNavbar
        search={search}
        setSearch={setSearch}
      />

      {/* User page content */}
      <main className="user-content">
        {children}
      </main>

    </div>
  );
};

export default UserLayout;