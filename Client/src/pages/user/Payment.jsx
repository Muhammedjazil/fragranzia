
import { Link, useNavigate } from "react-router-dom";
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
FaCheck

} from "react-icons/fa";
import {
  SiGooglepay,
  SiPhonepe,
} from "react-icons/si";
import { RxCross2 } from 'react-icons/rx';
import { toast } from "react-toastify";
import UserService from "../../service/user-api-services/UserService";
// import { useNavigate } from "react-router-dom";
export const Payment = () => {
  // Cart products
  // const navigate = useNavigate();
  const navigate = useNavigate();
  const[failour,setFailour]=useState(false)
  const[success,setSuccess]=useState(false);
  const [Product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);

  // Primary address
  const [address, setAddAddress] = useState(null);
  const [addressLoading, setAddressLoading] = useState(true);
const [placingOrder, setPlacingOrder] = useState(false);
  // Selected payment method
  // const [paymentMethod, setPaymentMethod] = useState();
  const [paymentMethod, setPaymentMethod] = useState("COD"); //initaially a vlaue to be selected so,

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

// const handlePlaceOrder = async () => {
//   if (!address?._id) {
//     alert("Please select primary address first");
//     return;
//   }

//   if (Product.length === 0) {
//     alert("Your cart is empty");
//     return;
//   }

//   try {
//     setPlacingOrder(true);

//     // Send the selected payment method
//     const response = await placeOrder(
//       address._id,
//       paymentMethod
//     );

//     if (!response?.success) {
//       alert(response?.message || "Order failed");
//       return;
//     }

//     // COD payment
//     if (paymentMethod === "cod") {
//       alert("Order placed successfully");
//       navigate("/Paymentsuccess");
//       return;
//     }

//     // Online payment (UPI, card, etc.)
//     if (response.razorpayOrder) {
//       await handlePayment(response.razorpayOrder);
//     }

//   } catch (error) {
//     console.error(
//       "Order error:",
//       error.response?.data || error.message
//     );

//     alert(error.response?.data?.message || "Something went wrong");

//   } finally {
//     setPlacingOrder(false);
//   }
// };

const handlePlaceOrder = async () => {
  if (!address?._id) {
     toast.warning("Please select a primary address first!");
    return;
  }

  if (Product.length === 0) {
     toast.warning("Your cart is empty!");
    return;
  }

  if (!paymentMethod) {
    toast.warning("Please select a payment method!");
    return;
  }

  try {
    setPlacingOrder(true);

    const response = await placeOrder(
      address._id,
      paymentMethod
    );

    console.log("Backend response:", response);

    if (!response?.success) {
        setFailour(true);
      console.log("ppppppppppppppppppppppp");

         toast.error(response?.message || "Order failed!");
      return;
    }

    if (paymentMethod === "COD") {
     
      // navigate("/Paymentsuccess");
      setSuccess(true);
      return;
    }

    if (response.razorpayOrder) {
      await handlePayment(response.razorpayOrder);
    } else {
          toast.error("Razorpay order was not created!");
    }

  } catch (error) {
    console.log("Order error=================:", error.response?.data || error.message);
    
  setFailour(true);
        toast.error(
      error.response?.data?.message ||
      "Something went wrong!"
    );

  } finally {
    console.log("ttttttttttttttttttttttt");
    
    setPlacingOrder(false);
  }
};
// //============================weadd===============
// const handlePayment = async (data) => {
//     try {
//       console.log("==== handlePayment 1");

//       const isScriptLoaded = await loadRazorpayScript();
//       if (!isScriptLoaded) {
//         alert(
//           "Failed to load Razorpay SDK. Please check your internet connection."
//         );
//         return;
//       }

//       console.log("==== handlePayment 2");


//       // Initialize Razorpay
//       const options = {
//         key: "rzp_test_TtcgxkiZwyZJ7b", // Replace with Razorpay Key ID
//         amount: data.amount,
//         currency: "INR",
//         name: "Cart7",
//         description: "Purchase Description",
//         order_id: data.id,
//         // handler: async function (response) {

//         //   const verifyRes = await axios.post('http://localhost:3000/order/payment/verify-payment', {
//         //     razorpay_order_id: response.razorpay_order_id,
//         //     razorpay_payment_id: response.razorpay_payment_id,
//         //     razorpay_signature: response.razorpay_signature,
//         //   });

//         //   if (verifyRes.data.success) {
//         //     console.log("inside verifyRes.data.success");

//         //     //  navigate("/order-success");
//         //   } else {
//         //     alert("Payment Failed!");
//         //     console.log("elseeeeee");

//         //   }

//         // },

//         // prefill: {
//         //   name: "John Doe",
//         //   email: "johndoe@example.com",
//         //   contact: "9999999999",
//         // },

//         theme: {
//           color: "#3399cc",
//         },
//       };

//       const rzp1 = new window.Razorpay(options);
//       rzp1.open();
//     } catch (error) {
//       console.error("Payment Error:--------------", error);
//     }
//   };
const handlePayment = async (data) => {
  try {
    const isScriptLoaded = await loadRazorpayScript();

    if (!isScriptLoaded) {
          toast.error("Failed to load Razorpay SDK!");
      return;
    }

    const options = {
      key: "rzp_test_TtcgxkiZwyZJ7b",
      amount: data.amount,
      currency: data.currency,
      name: "Fragranzia",
      description: "Purchase",
      order_id: data.id,

      handler: async function (response) {
         toast.success("Payment successful!");
          setSuccess(true);
        console.log("Payment successful:", response);

        // Call your backend payment verification API here.
        // Do not navigate to success until verification succeeds.
      },

      theme: {
        color: "#3399cc",
      },
    };

    const rzp1 = new window.Razorpay(options);

    rzp1.on("payment.failed", function (response) {
      console.log("Payment failed:", response.error);
       setFailour(true);
        toast.error(
        response.error.description || "Payment failed!"
      );
    });

    rzp1.open();

  } catch (error) {
    console.error("Payment error:", error);
  
    toast.error("Payment initialization failed!");
  }
};
  //============weadd=============

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  return (
    <div className="payment">

      {/* NAVBAR */}
      {/* ================= NAVBAR ================= */}

      {/* <div className="home-fullnav">

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
                  <Link to="/gifting">Wishlist</Link>
                </li>

                <li>
                  <Link to="/about">About</Link>
                </li>

              </ul>
            </nav>

          </div> */}


          {/* SEARCH */}

          {/* <div className="home-navsearch">

            <FiSearch />

            <input
              type="text"
              placeholder="Search products..."
            />

          </div>


          {/* ICONS */}

          {/* <div className="home-navicons">

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

      // </div> */} 


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

              <button className="adadrs" onClick={()=>{navigate("/profilesave",{
                state:{activeTab:"address"}
              })}}>
                Add address +
              </button>


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
                value="COD"
                checked={paymentMethod === "COD"}
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


  {/* =========================payment success============================*/}

    {success &&(
    <div className="section-success">
       <div className="section-success-1">
      <div className="Facheck">
    <FaCheck/>
    </div>
    
    <div className="sucess-data">
    <h1>Thank You for Ordering!</h1>
    <p>Your order has been successfully placed.<br/> We're preparing it for shipment</p>
    <br/>
    <Link to="/home">
    <button className="sucessbutton" >Back to Home</button></Link>
   <button
  className="sucess1"
  onClick={() => {
    navigate("/profilesave", {
      state: { activeTab: "order" }
    });
  }}
>
  Track Order
</button>
    </div>
    
    
    </div>
    
    </div>
       )}

       {failour && (
       <div className="section-failour">
          <div className="section-failour-1">
         <div className="RxCross2">
       <RxCross2/>
       </div>
       
       <div className="failour-data">
       <h1>Your order has failed!</h1>
       <p>Your order cant be completed Please<br/> check your internet connection!</p>
       <br/>
    <Link to="/home">
       <button>Back to Home</button></Link>
       <button onClick={()=>{setFailour(false)}}>Retry</button>
       </div>
       
       
       </div>
       
       </div>
       )}

    </div>

  );
};

export default Payment;
