
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "./payment.css";

import {
  FiShoppingCart,
  FiBell,
  FiUser,
  FiSearch,
  FiTruck,
  FiHome,
  FiBriefcase,
  FiMapPin,
  FiCreditCard,
  FiPhone,
  FiStar,
} from "react-icons/fi";

import {
  FaMoneyBillWave,
  FaUniversity,
} from "react-icons/fa";

import {
  SiGooglepay,
  SiPhonepe,
} from "react-icons/si";

import UserService from "../../service/user-api-services/UserService";

export const Payment = () => {
  // Cart products
  const [Product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);

  // Primary address
  const [address, setAddAddress] = useState(null);
  const [addressLoading, setAddressLoading] = useState(true);
const [placingOrder, setPlacingOrder] = useState(false);
  // Selected payment method
  const [paymentMethod, setPaymentMethod] = useState("cod");

  const {
    getCart,
    changequantity,
    fetchaddress,
    placeOrder
  } = UserService();

  // =========================================
  // FETCH CART PRODUCTS
  // =========================================
  const fetchCart = async () => {
    try {
      const response = await getCart();

      setProduct(response.cart || []);
    } catch (error) {
      console.error(
        "Error fetching cart:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // =========================================
  // FETCH PRIMARY ADDRESS
  // =========================================
  const getPrimaryAddress = async () => {
    try {
      const data = await fetchaddress();

      const addresses = Array.isArray(data)
        ? data
        : data.addresses || [];

      const primaryAddress = addresses.find(
        (item) => item.isDefault === true
      );

      setAddAddress(primaryAddress || null);
    } catch (error) {
      console.error(
        "Error fetching primary address:",
        error.response?.data || error.message
      );

      setAddAddress(null);
    } finally {
      setAddressLoading(false);
    }
  };

  useEffect(() => {
    getPrimaryAddress();
  }, []);

  // =========================================
  // CHANGE CART QUANTITY
  // =========================================
  // const handleQuantity = async (id, quantity) => {
  //   if (quantity < 1) return;

  //   try {
  //     await changequantity(id, quantity);
  //     await fetchCart();
  //   } catch (error) {
  //     console.error(
  //       "Quantity update error:",
  //       error.response?.data || error.message
  //     );
  //   }
  // };

  // =========================================
  // PRICE CALCULATIONS
  // =========================================
  const totalItems = Product.reduce(
    (sum, item) => sum + Number(item.quantity || 0),
    0
  );

  const originalTotal = Product.reduce((sum, item) => {
    const price = Number(item.product?.price || 0);
    const quantity = Number(item.quantity || 0);

    return sum + price * quantity;
  }, 0);

  const saleTotal = Product.reduce((sum, item) => {
    const price = Number(
      item.product?.saleprice ?? item.product?.price ?? 0
    );

    const quantity = Number(item.quantity || 0);

    return sum + price * quantity;
  }, 0);

  const totalDiscount = originalTotal - saleTotal;
  const deliveryCharge = 0;
  const totalAmount = saleTotal + deliveryCharge;

  // =========================================
  // PAGE
  // =========================================

const handlePlaceOrder=async()=>{
  if(!address?._id){
    alert("please select ptimary address first")
    return;
  }
  if(Product.length===0){
    alert("your cart is empty")
    return;
  }
  if(paymentMethod!="cod"){
    alert("please select casg on delivary")
    return
  }
  try{
    setPlacingOrder(true)
    const response=await placeOrder(address._id,"cod")
    alert(response.message || "order placed successfully")
       // Refresh cart after successful order
      await fetchCart();
      
  }
  catch(error){
    console.log("order placed error")
  }
}


  return (
    <div className="payment">

      {/* NAVBAR */}
      {/* ================= NAVBAR ================= */}

      <div className="home-fullnav">

        <h2 id="nav-heading">Fragranzia</h2>

        <div className="home-fullnav1">

          <div className="home-nav">

            <nav>
              <ul>

                <li>
                  <Link to="/Home">Home</Link>

                </li>

                <li>
                  <Link to="/products">Products</Link>
                </li>

                <li>
                  <Link to="/gifting">Gifting</Link>
                </li>

                <li>
                  <Link to="/about">About</Link>
                </li>

              </ul>
            </nav>

          </div>


          {/* SEARCH */}

          <div className="home-navsearch">

            <FiSearch />

            <input
              type="text"
              placeholder="Search products..."
            />

          </div>


          {/* ICONS */}

          <div className="home-navicons">

            <Link to="/cart">
              <FiShoppingCart />
            </Link>

            <Link to="/notifications">
              <FiBell />
            </Link>

            <Link to="/profilesave">
              <FiUser />
            </Link>

          </div>

        </div>

      </div>


      {/* MAIN CHECKOUT LAYOUT */}
      <div className="payment-layout">

        {/* =====================================
            LEFT COLUMN
        ====================================== */}
        <div className="payment-left-column">

          {/* CART PRODUCTS */}
          <div className="payment-products">

            {loading ? (
              <p className="payment-message">
                Loading cart products...
              </p>
            ) : Product.length === 0 ? (
              <p className="payment-message">
                Your cart is empty.
              </p>
            ) : (
              Product.map((item) => {
                const product = item.product;

                if (!product) return null;

                return (
                  <div className="payment-22" key={product._id}>
                    <img
                      src={product.image}
                      alt={product.name}
                    />
                    <div className="payment-details">

                      <h2>{product.name}</h2>

                      <p className="payment-rating">
                        {product.name}
                        <span>
                          4.5 <FiStar />
                        </span>
                      </p>

                      {/* QUANTITY */}
                      <div className="payment-buttons">
                        <span>{item.quantity}</span>
                      </div>

                      {/* PRICE */}
                      <div className="payment-prices">

                        <strong>
                          Rs{" "}
                          {Number(
                            product.saleprice ?? product.price ?? 0
                          ).toLocaleString("en-IN")}
                        </strong>

                        {Number(product.price || 0) >
                          Number(
                            product.saleprice ?? product.price ?? 0
                          ) && (
                            <del>
                              Rs{" "}
                              {Number(product.price).toLocaleString("en-IN")}
                            </del>
                          )}

                        {product.offer && (
                          <span className="payment-discount">
                            {product.offer}
                          </span>
                        )}

                      </div>

                      <p className="payment-delivery">
                        Delivered soon, Free delivery <FiTruck />
                      </p>

                      <p className="payment-return">
                        7 day return policy
                      </p>

                    </div>

                  </div>
                );
              })
            )}

          </div>

          {/* PERSONAL DETAILS */}
          <section className="payment-personal">

            <h2>Personal Details</h2>

            <div className="payment-address-tabs">

              <Link to="/adress">
                Add address +
              </Link>


            </div>

            <h3 className="address-heading">
              Primary Address
            </h3>

            <div className="border">

              {addressLoading ? (
                <p>Loading address...</p>
              ) : address ? (
                <>
                  <h3>
                    {address.fullName}
                    <span className="primary-label">
                      Primary
                    </span>
                  </h3>

                  <p>
                    {address.street}, {address.city}
                    <br />

                    {address.state} - {address.zip}
                    <br />

                    {address.country}
                    <br />

                    <FiPhone /> {address.phone}

                    {address.landmark && (
                      <>
                        <br />
                        Landmark: {address.landmark}
                      </>
                    )}
                  </p>
                </>
              ) : (
                <div>
                  <p>
                    No primary address selected.
                  </p>

                  <Link to="/Profilesave">
                    Select a primary address
                  </Link>
                </div>
              )}

            </div>

          </section>

        </div>

        {/* =====================================
            RIGHT COLUMN
        ====================================== */}
        <div className="payment-right-column">

          {/* PRICE DETAILS */}
          <div className="priceDeatails">

            <h2>Price Details</h2>

            <div className="price-row">
              <span>Price ({totalItems} items)</span>

              <strong>
                Rs {originalTotal.toLocaleString("en-IN")}
              </strong>
            </div>

            <div className="price-row">
              <span>Discount</span>

              <strong className="discount-amount">
                - Rs {totalDiscount.toLocaleString("en-IN")}
              </strong>
            </div>

            <div className="price-row">
              <span>Delivery Charge</span>

              <strong className="free-delivery">
                Free Delivery
              </strong>
            </div>

            <hr />

            <div className="price-row total-row">
              <strong>Total Amount</strong>

              <strong>
                Rs {totalAmount.toLocaleString("en-IN")}
              </strong>
            </div>

          </div>

          {/* PAYMENT METHODS */}
          <div className="payment-methods">

            <h2>Payment Methods</h2>

            <label className="payment-option">
              <span>
                <SiGooglepay />
                Google Pay
              </span>

              <input
                type="radio"
                name="payment"
                value="googlepay"
                checked={paymentMethod === "googlepay"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
            </label>

            <label className="payment-option">
              <span>
                <FaMoneyBillWave />
                Cash on delivery (cash/UPI)
              </span>

              <input
                type="radio"
                name="payment"
                value="cod"
                checked={paymentMethod === "cod"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
            </label>

            <label className="payment-option">
              <span>
                <SiPhonepe />
                Paytm / PhonePe / Amazon Pay
              </span>

              <input
                type="radio"
                name="payment"
                value="wallet"
                checked={paymentMethod === "wallet"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
            </label>

            <label className="payment-option">
              <span>
                <FiCreditCard />
                Credit / Debit card
              </span>

              <input
                type="radio"
                name="payment"
                value="card"
                checked={paymentMethod === "card"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
            </label>

            <label className="payment-option">
              <span>
                <FaUniversity />
                Net Banking
              </span>

              <input
                type="radio"
                name="payment"
                value="netbanking"
                checked={paymentMethod === "netbanking"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
            </label>

            <button
  className="pay-now"
  type="button"
  onClick={handlePlaceOrder}
  disabled={placingOrder}
>
  {placingOrder ? "Placing Order..." : "Pay Now"}
</button>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Payment;
