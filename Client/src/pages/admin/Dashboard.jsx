
import "./Dashboard.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiGrid,
  FiPackage,
  FiTag,
  FiUsers,
  FiShoppingCart,
  FiHome,
  FiLogOut,
  FiDollarSign,
  FiBox,
  FiClock,
  FiActivity,
  FiX,
  FiMenu
} from "react-icons/fi";

import AdminService from "../../service/admin-api-services/AdminService";
import UserService from "../../service/user-api-services/UserService";
import { toast } from "react-toastify";
export const Dashboard = () => {
const navigate=useNavigate()
// const [menuOpen, setMenuOpen] = useState(false);
  const { showproduct } = AdminService();
  const { adminorder } = UserService();
  
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch dashboard data
  const fetchDashboard = async () => {
    try {
      setLoading(true);

      const [productResponse, orderResponse] = await Promise.all([
        showproduct(),
        adminorder(),
      ]);

      // Product response
      const productList = Array.isArray(productResponse)
        ? productResponse
        : productResponse?.data || [];

      // Order response
      const orderList = Array.isArray(orderResponse?.data)
        ? orderResponse.data
        : Array.isArray(orderResponse)
        ? orderResponse
        : [];

      setProducts(productList);
      setOrders(orderList);
    } catch (error) {
      console.error("Dashboard data error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  // Exclude cancelled and returned orders from sales
  const validOrders = orders.filter(
    (order) =>
      !["Cancelled", "Returned"].includes(order.deliveryStatus)
  );

  // Total sales
  const totalSales = validOrders.reduce(
    (total, order) => total + Number(order.totalPrice || 0),
    0
  );

  // Total orders
  const totalOrders = orders.length;

  // Total products
  const totalProducts = products.length;

  // Unique customers
  const customers = new Set(
    orders
      .map((order) => {
        return typeof order.user === "object"
          ? order.user?._id
          : order.user;
      })
      .filter(Boolean)
  );

  const totalCustomers = customers.size;

  // Last 7 days orders
  const weeklyData = Array.from({ length: 7 }, (_, index) => {
    const date = new Date();

    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() - (6 - index));

    const count = orders.filter((order) => {
      if (!order.createdAt) return false;

      const orderDate = new Date(order.createdAt);

      return orderDate.toDateString() === date.toDateString();
    }).length;

    return {
      date,
      count,
      label: date.toLocaleDateString("en-IN", {
        weekday: "short",
        day: "numeric",
      }),
    };
  });

  const maxOrders = Math.max(
    1,
    ...weeklyData.map((item) => item.count)
  );

  // Weekly chart points
  const chartPoints = weeklyData
    .map((item, index) => {
      const x = 35 + index * (630 / 6);
      const y = 190 - (item.count / maxOrders) * 150;

      return `${x},${y}`;
    })
    .join(" ");

  // Sales by category
  const categorySales = {};

  validOrders.forEach((order) => {
    order.orderItems?.forEach((item) => {
      const product = item.product;

      if (!product) return;

      const categoryName =
        product.category?.name || "Other";

      const price = Number(
        product.saleprice ?? product.price ?? 0
      );

      const quantity = Number(item.quantity || 0);

      categorySales[categoryName] =
        (categorySales[categoryName] || 0) +
        price * quantity;
    });
  });

  const categoryData = Object.entries(categorySales)
    .map(([name, sales]) => ({
      name,
      sales,
      percentage: 0,
    }))
    .sort((a, b) => b.sales - a.sales);

  const categoryTotal = categoryData.reduce(
    (total, item) => total + item.sales,
    0
  );

  // Calculate category percentages
  categoryData.forEach((item) => {
    item.percentage = categoryTotal
      ? (item.sales / categoryTotal) * 100
      : 0;
  });

  const chartColors = [
    "#4285ed",
    "#32b78b",
    "#a56bea",
    "#f0aa43",
    "#e56b85",
    "#26a6a1",
    "#e06c42",
    "#718096",
  ];

  // Donut chart gradient
  let percentage = 0;

  const donutGradient = categoryData.length
    ? `conic-gradient(${categoryData
        .map((item, index) => {
          const start = percentage;
          percentage += item.percentage;

          return `${chartColors[index % chartColors.length]} ${start}% ${percentage}%`;
        })
        .join(", ")})`
    : "#e8edf2";

  // Current date
  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

 const handlelogout=()=>{
  localStorage.removeItem("token");
  toast.success("Logout successfully!");
  navigate("/signin")
 }

  return (
    <div className="dashboard-main">

      {/* SIDEBAR */}
       {/* <div className="category-nav">
  <div className="nav-header">
    <h2>Dashtar</h2>

    <button
      type="button"
      className="hamburger"
      onClick={() => setMenuOpen(!menuOpen)}
      aria-label="Toggle navigation"
    >
      {menuOpen ? <FiX /> : <FiMenu />}
    </button>
  </div> */}

  {/* <div className={`category-nav-links ${menuOpen ? "active" : ""}`}>
    <Link to="/Dashboard" onClick={() => setMenuOpen(false)}>
      <FiGrid /> Dashboard
    </Link>

    <Link to="/Product" onClick={() => setMenuOpen(false)}>
      <FiPackage /> Product
    </Link>

    <Link to="/Categories" onClick={() => setMenuOpen(false)}>
      <FiHome /> Categories
    </Link> */}

    {/* <Link to="Offer" onClick={() => setMenuOpen(false)}>
      <FiTag /> Offer
    </Link> */}

    {/* <Link to="/Customer" onClick={() => setMenuOpen(false)}>
      <FiUsers /> Customer
    </Link>

    <Link to="/order" onClick={() => setMenuOpen(false)}>
      <FiShoppingCart /> Order
    </Link>

    <div className="category-logout">
      <button onClick={handlelogout}><FiLogOut /> Log Out</button>
    </div>
  </div>
</div> */}


      {/* DASHBOARD CONTENT */}
      <div className="dashboard-content">

        {/* HEADER */}
        <div className="dashboard-header">
          <div>
            <h1>Dashboard</h1>
            <p>{today}</p>
          </div>

          <div className="system-status">
            <FiActivity />
            System Status: Online
          </div>
        </div>

        {/* STAT CARDS */}
        <div className="dashboard-cards">

          {/* SALES */}
          <div className="dashboard-card">
            <div className="card-info">
              <span>TOTAL SALES</span>

              <h2>
                {loading
                  ? "..."
                  : `₹${totalSales.toLocaleString("en-IN")}`}
              </h2>

              <p className="sales-text">
                <FiActivity /> Completed and active orders
              </p>
            </div>

            <div className="card-icon sales-icon">
              <FiDollarSign />
            </div>
          </div>

          {/* ORDERS */}
          <div className="dashboard-card">
            <div className="card-info">
              <span>TOTAL ORDERS</span>

              <h2>{loading ? "..." : totalOrders}</h2>

              <p className="orders-text">
                <FiClock /> All customer orders
              </p>
            </div>

            <div className="card-icon orders-icon">
              <FiShoppingCart />
            </div>
          </div>

          {/* PRODUCTS */}
          <div className="dashboard-card">
            <div className="card-info">
              <span>PRODUCTS</span>

              <h2>{loading ? "..." : totalProducts}</h2>

              <p className="products-text">
                <FiBox /> Products in catalog
              </p>
            </div>

            <div className="card-icon products-icon">
              <FiPackage />
            </div>
          </div>

          {/* CUSTOMERS */}
          <div className="dashboard-card">
            <div className="card-info">
              <span>CUSTOMERS</span>

              <h2>{loading ? "..." : totalCustomers}</h2>

              <p className="customers-text">
                <FiUsers /> Unique customers with orders
              </p>
            </div>

            <div className="card-icon customers-icon">
              <FiUsers />
            </div>
          </div>

        </div>

        {/* CHART SECTION */}
        <div className="dashboard-charts">

          {/* WEEKLY ORDERS */}
          <div className="weekly-chart">
            <div className="chart-heading">
              <h3>Weekly Orders Overview</h3>
              <span>Last 7 Days</span>
            </div>

            <div className="line-chart">
              {loading ? (
                <p>Loading weekly orders...</p>
              ) : (
                <svg
                  viewBox="0 0 700 270"
                  preserveAspectRatio="none"
                >
                  {[40, 90, 140, 190].map((y, index) => (
                    <g key={index}>
                      <line
                        x1="35"
                        y1={y}
                        x2="665"
                        y2={y}
                        stroke="#e8ebef"
                        strokeWidth="1"
                      />

                      <text
                        x="15"
                        y={y + 4}
                        fontSize="11"
                        fill="#888"
                      >
                        {Math.round(
                          maxOrders * (190 - y) / 150
                        )}
                      </text>
                    </g>
                  ))}

                  <line
                    x1="35"
                    y1="190"
                    x2="665"
                    y2="190"
                    stroke="#dfe3e8"
                  />

                  <polyline
                    points={chartPoints}
                    fill="none"
                    stroke="#6554eb"
                    strokeWidth="3"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                  />

                  {weeklyData.map((item, index) => {
                    const x = 35 + index * (630 / 6);
                    const y =
                      190 - (item.count / maxOrders) * 150;

                    return (
                      <circle
                        key={index}
                        cx={x}
                        cy={y}
                        r="4"
                        fill="#6554eb"
                      />
                    );
                  })}

                  {weeklyData.map((item, index) => {
                    const x = 35 + index * (630 / 6);

                    return (
                      <text
                        key={index}
                        x={x}
                        y="215"
                        fontSize="10"
                        fill="#888"
                        textAnchor="middle"
                      >
                        {item.label}
                      </text>
                    );
                  })}
                </svg>
              )}
            </div>
          </div>

          {/* CATEGORY DONUT CHART */}
          <div className="category-chart">
            <h3>Sales by Category</h3>

            {loading ? (
              <p>Loading category sales...</p>
            ) : (
              <>
                <div className="donut-container">
                  <div
                    className="donut-chart"
                    style={{
                      background: donutGradient,
                    }}
                  >
                    <div className="donut-hole">
                      <h2>
                        ₹{categoryTotal.toLocaleString("en-IN", {
                          maximumFractionDigits: 0,
                        })}
                      </h2>

                      <span>Total Sales</span>
                    </div>
                  </div>
                </div>

                <div className="category-legend">
                  {categoryData.map((item, index) => (
                    <div
                      className="legend-item"
                      key={item.name}
                    >
                      <span
                        className="legend-dot"
                        style={{
                          backgroundColor:
                            chartColors[index % chartColors.length],
                        }}
                      />

                      <span className="legend-name">
                        {item.name}
                      </span>

                      <span className="legend-sales">
                        ₹{item.sales.toLocaleString("en-IN", {
                          maximumFractionDigits: 0,
                        })}
                        {" "}({item.percentage.toFixed(1)}%)
                      </span>
                    </div>
                  ))}

                  {categoryData.length === 0 && (
                    <p>No category sales available</p>
                  )}
                </div>
              </>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
