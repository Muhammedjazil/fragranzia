
import "./Order.css"
import { Link } from "react-router-dom"
import {
  FiGrid,
  FiPackage,
  FiTag,
  FiUsers,
  FiShoppingCart,
  FiHome,
  FiBox,
  FiEye,
  FiFileText,
  FiCopy,
  FiCalendar,
  FiPhone,
  FiUser,
  FiMail,
  FiMapPin,
  FiCreditCard,
  FiX,
  FiLogOut 
} from "react-icons/fi";
import { RiMoneyRupeeCircleLine } from "react-icons/ri";
import Image1 from "../../assets/sub1.jpg"
import axios from "axios";
import { useEffect, useState } from "react";
import UserService from "../../service/user-api-services/UserService";

let data=[
    {id:"3udsdsd", name:"user1",phone:"1234567890", date:"july 1,2026",image:Image1,details:"steel", qty:"1",price:"60",total:"60" },
    {id:"3udsdsd", name:"user1",phone:"1234567890", date:"july 1,2026",image:Image1,details:"steel", qty:"1",price:"60",total:"60" } 
]


export const Order=()=>{
  const[details,setDetails]=useState(null)
  const {adminorder,fetchshowdetails,changeOrderStatus}=UserService()
const [showdeatils,setshowdetails]=useState(false)
const[order,setOrder]=useState([])

const fetchorderdetails = async () => {
  try {
    const response = await adminorder();
    setOrder(response.data || []);
  } catch (error) {
    console.error("Failed to fetch orders:", error);
  }
};

useEffect(() => {
  fetchorderdetails();
}, []);



const handleshow = async (id) => {
  try {
    const response = await fetchshowdetails(id);
    setDetails(response);
    setshowdetails(true);
  } catch (error) {
    console.error("Failed to fetch order details:", error);
  }
};

const handleStatusChange = async (id, newStatus) => {
  try {
    // Update the status in MongoDB through the backend
    await changeOrderStatus(id, newStatus);

    // Update the status shown in the table
    setOrder((prevOrders) =>
      prevOrders.map((item) =>
        item._id === id
          ? { ...item, deliveryStatus: newStatus }
          : item
      )
    );

    // Also update the open details modal, if it shows this order
    setDetails((prevDetails) =>
      prevDetails && prevDetails._id === id
        ? { ...prevDetails, deliveryStatus: newStatus }
        : prevDetails
    );

    alert("Delivery status updated successfully!");
  } catch (error) {
    console.error("Status update failed:", error);
    alert(
      error.response?.data?.message ||
      "Failed to update delivery status."
    );
  }
};


    return(
        <div className="orderdetails">

          <div className="category-nav">
        <h2>Dashtar</h2>

        <Link to="/Dashboard"><FiGrid /> Dashboard</Link>
      
        
        <Link to="/Product"><FiPackage /> Product</Link>
       

        <Link to="/Categories"><FiHome /> Categories</Link>
       

        <Link to="/Offer"><FiTag /> Offer</Link>
      

        <Link to="/Customer"><FiUsers /> Customer</Link>
        

        <Link to="/order"><FiShoppingCart /> order</Link>
       

        <div className="category-logout">
          <br />
          <button type="button"><FiLogOut /> Log Out</button>
        </div>
      </div>

      <div className="ordertable">
  <h1><FiBox/>Order Management</h1>
  <p>Monitor,track and update customer order dynamically</p>

  <div className="ordertablecontent">
  
<table>
  <thead>
    <tr>
      <th>ORDER ID</th>
      <th>CUSTOMER</th>
      <th>DATE</th>
      <th>PRODUCT DETAILS</th>
      <th>ACTION</th>
      <th>STATUS</th>
    </tr>
  </thead>

  <tbody>
    {order.map((value) => {
      const item = value.orderItems?.[0];
      const product = item?.product;
      const customer = value.user;

      return (
        <tr key={value._id}>
          <td>
            {value._id}
            <FiCopy />
          </td>

          <td>
            <span className="customer-avatar">
              {(customer?.name || "U").charAt(0).toUpperCase()}
            </span>

            <span className="customer-name">
              {customer?.name || "Unknown customer"}
            </span>

            <h5>
              <FiPhone />
              {customer?.phone || "No phone"}
            </h5>
          </td>

          <td>
            <span className="order-date">
              <FiCalendar />
              {value.createdAt
                ? new Date(value.createdAt).toLocaleDateString()
                : "N/A"}
            </span>
          </td>

          <td>
            <div className="imageorder">
              <div>
                {product?.image && (
                  <img
                    src={product.image}
                    alt={product.name || "Product"}
                  />
                )}
              </div>

              <div>
                <span className="product-name">
                  {product?.name || "Product unavailable"}
                </span>

                <br />

                <span className="product-info">
                  Qty: {item?.quantity || 0}
                </span>

                <br />

                <span className="product-info">
                  Price: ₹
                  {product?.saleprice ?? product?.price ?? 0}
                </span>

                <h6>
                  Total: ₹{value.totalPrice ?? 0}
                </h6>
              </div>
            </div>
          </td>

          <td>
            <button
              onClick={() => {
                setshowdetails(true);
                handleshow(value._id)
              }
                 
              }
              className="orderbutton1"
            >
              <FiEye /> Show Details
            </button>
          </td>

          <td>
            <select value={value.deliveryStatus || "Pending"}
             onChange={(e)=>{handleStatusChange(value._id,e.target.value)}}
            >
              <option value="Pending">Pending</option>
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Out for Delivery">Out for Delivery</option>
              <option value="Delivered">Delivered</option>
              <option value="Returned">Returned</option>
              <option value="Failed Delivery">Failed Delivery</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </td>
        </tr>
      );
    })}

    {order.length === 0 && (
      <tr>
        <td colSpan="6">No orders found.</td>
      </tr>
    )}
  </tbody>
</table>

        </div>

</div>{showdeatils && details && (
  <div className="showdetails">
    <span7 onClick={() => setshowdetails(false)}>
      <FiX />
    </span7>

    <h2>
      <span6><FiFileText /></span6>
      Order Details
    </h2>

    <h5>
      #{details._id} <FiCopy />
    </h5>

    <div className="insideorderdetails">
      {/* CUSTOMER DETAILS */}
      <div className="firstorder">
        <h3><FiUser /> CUSTOMER DETAILS</h3>

        <div className="user">
          <div className="U1">
            <span3>
              {(details.user?.name || "U").charAt(0).toUpperCase()}
            </span3>
          </div>

          <div className="U1deatils">
            <p>{details.user?.name || "Unknown customer"}</p>
            <p>User ID: {details.user?._id || "N/A"}</p>
          </div>
        </div>

        <p>
          <FiPhone />
          {details.user?.phone || "No phone available"}
        </p>

        <p>
          <FiMail />
          {details.user?.email || "No email available"}
        </p>
      </div>

      {/* SHIPPING ADDRESS */}
      <div className="addressdetailss">
        <h3><FiMapPin /> SHIPPING ADDRESS</h3>

        <p>{details.shippingAddress?.fullName || details.shippingAddress?.name || details.user?.name || "N/A"}</p>

        <p>{details.shippingAddress?.street || "No street address"}</p>

        <p>
          {[
            details.shippingAddress?.city,
            details.shippingAddress?.state,
            details.shippingAddress?.zip
          ].filter(Boolean).join(", ") || "Location unavailable"}
        </p>

        <p>{details.shippingAddress?.country || "N/A"}</p>

        <p>
          <FiPhone />
          {details.shippingAddress?.phone || "No contact available"}
        </p>

        {details.shippingAddress?.landmark && (
          <p>Landmark: {details.shippingAddress.landmark}</p>
        )}
      </div>

      {/* ORDER AND PAYMENT */}
      <div className="orderpayment">
        <h3><FiCalendar /> ORDER & PAYMENT</h3>

        <h6>
          Order Date:
          <span>
            {details.createdAt
              ? new Date(details.createdAt).toLocaleString()
              : "N/A"}
          </span>
        </h6>

        <br />

        <h6>
          Payment Status:
          <span>{details.paymentStatus || "Pending"}</span>
        </h6>

        <br />

        <h6>
          Payment Method:
          <span>{(details.paymentMethod || "COD").toUpperCase()}</span>
        </h6>

        <br />

        <h6>
          Delivery Status:
          <span>{details.deliveryStatus || "Pending"}</span>
        </h6>
      </div>
    </div>

    {/* ITEMS ORDERED */}
    <h3>ITEMS ORDERED</h3>

    {details.orderItems?.map((item, index) => {
      const product = item.product;
      const price = Number(
        product?.saleprice ?? product?.price ?? 0
      );

      return (
        <div className="itemordered" key={item._id || index}>
          <div className="itemimage">
            {product?.image ? (
              <img
                src={product.image}
                alt={product.name || "Product"}
              />
            ) : (
              <FiPackage />
            )}
          </div>

          <div className="itemdetals">
            <h5>{product?.name || "Product unavailable"}</h5>

            <h6>
              Category:{" "}
              <span>
                {product?.category?.name || "General"}
              </span>
            </h6>

            <br />

            <h6>
              Quantity: <span>{item.quantity || 0}</span>
            </h6>
          </div>

          <div className="itemprice">
            <h6>Unit Price</h6>

            <h6>
              <RiMoneyRupeeCircleLine />
              {price.toLocaleString("en-IN")}
            </h6>

            <h6>
              Item Total:
              <span>
                <RiMoneyRupeeCircleLine />
                {(price * (item.quantity || 0)).toLocaleString("en-IN")}
              </span>
            </h6>
          </div>
        </div>
      );
    })}

    {/* ORDER TOTAL */}
    <div className="orderfooter">
      <div className="paid">
        <h1>GRAND TOTAL</h1>

        <h2>
          <RiMoneyRupeeCircleLine />
          {Number(details.totalPrice || 0).toLocaleString("en-IN")}
        </h2>
      </div>

      <div className="staus">
        <h5>
          Delivery Status:{" "}
          <strong>{details.deliveryStatus || "Pending"}</strong>
        </h5>
      </div>

      <div className="closedetails">
        <button onClick={() => setshowdetails(false)}>
          Close Details
        </button>
      </div>
    </div>
  </div>
)}
<br/>
<br/>

        </div>
    )
}