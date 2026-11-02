//user

import React from 'react'
import axios from "axios";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";                    //codes for user pages

const UserService = () => {

    const axiosPrivate = useAxiosPrivate()

    const getHome = async () => {  

        const response = await axiosPrivate.get("/product");
        return response.data;
    
    };
   
 //=======================================//
 

 // 2. Add product to cart
  const addToCart = async (productId) => {
    const response = await axiosPrivate.post("/api/cart", [   //axiosPrivate-->send token
      {
        _id: productId,                               //productid,quantity send to backend
        quantity: 1,
      },
    ]);

    return response.data;
  };

  // 3. Get logged-in user's cart
  const getCart = async () => {
    const response = await axiosPrivate.get("/api/cart");
    return response.data;
  };


  const cartitemdelete=async(id)=>{
    const response = await axiosPrivate.delete(`/api/cart/${id}`);
    return response.data;


  }

  const changequantity=async(id,quantity)=>{
   const response=await axiosPrivate.put(`/api/cart/${id}`,{quantity})
     return response.data;
  }


const handlewishlist = async (productId) => {      //to post wishlist(hearticon click) from productpage to  user collection
  const response = await axiosPrivate.post("/wishlist", {
    productId: productId,
  });
  return response.data;        //Backend-ൽ നിന്ന് ലഭിച്ച data തിരികെ നൽകുന്നു.
}; 

  const getWishlist = async () => {
    const response = await axiosPrivate.get("/wishlist");
    return response.data;
  };


const userDeatils = async () => {
  const response = await axiosPrivate.get("/api/auth/userdetails");

  console.log("FULL AXIOS RESPONSE:", response);
  console.log("RESPONSE DATA:", response.data);

  return response.data;
};
  


const takeediteddata=async()=>{
let response=await axiosPrivate.get("/address")
 return response.data;
}
const updateAddress = async (addressId, addressData) => {
  const response = await axiosPrivate.put(`/address/${addressId}`, addressData);  //update

  return response.data;
};

//addaddress button
const createAddress = async (addressData) => {
  const response = await axiosPrivate.post(
    "/address",
    addressData
  );

  return response.data;
};


const profiledata=async(data)=>{
let response=await axiosPrivate.put("/api/auth/newdata",data)

  return response.data;
}

//send signup details

const signupedata=async(formData)=>{
let response=await axiosPrivate.post("/api/auth/register",formData)
  return response.data;

}
//send signin details

const logindata=async(formData)=>{
let response=await axiosPrivate.post("/api/auth/login",formData)
  return response.data;

  
}

//add this 19

const setPrimaryAddress = async (addressId) => {
  const response = await axiosPrivate.put(
    `/address/primary/${addressId}`
  );

  return response.data;
};


//fetchaddress

const fetchaddress=async()=>{
  let response=await axiosPrivate.get("/address")
  return response.data;

}

//to place order

const placeOrder=async(shippingAddress,paymentMethod)=>{     //shippingAddress-->addressId
  const response=await axiosPrivate.post("/api/orders", {
    shippingAddress,
    paymentMethod,
  });
  return response.data;

}

const takeorder=async()=>{
  const response=await axiosPrivate.get("/api/orders")
  return response.data;

}

//take registerd user==pending===chyyanam

const fetchcustomer=async()=>{
  const response=await axiosPrivate.get("/api/auth/users")
  return response.data;

}


const adminorder=async(req,res)=>{
  const response=await axiosPrivate.get("/api/orders/customer")
  return response.data;

}

const changeisactive=async(id)=>{
  const response=await axiosPrivate.put(`/api/auth/isactive/${id}`)
  return response.data;

}

const fetchshowdetails=async(id)=>{
  let response=await axiosPrivate.get(`/api/orders/show/${id}`)
  return response.data;


}

const changeOrderStatus=async(id,deliveryStatus)=>{
  let response=await axiosPrivate.put(`/api/orders/status/${id}`,
    { deliveryStatus }
  )
  return response.data;

}
const handlecancel=async(id)=>{
  let response=await axiosPrivate.delete(`/api/orders/cancel/${id}`)
  return response.data;

}

const removeproductdetails = async (id) => {
  const response = await axiosPrivate.get(
    `/api/orders/specific/${id}`
  );

  console.log("Specific order API data:", response.data);

  return response.data;
};


const requestReturn = async (productId, reason) => {
  const response = await axiosPrivate.post(
    "/api/orders/return",
    {
      productId: productId,
      reason: reason,
    }
  );

  return response.data;
};


// Fetch all products for Suggested for you
const fechData = async () => {
  const response = await axiosPrivate.get("/product");
  return response.data;
};

// Fetch one product using its ID
const fetchimage = async (id) => {
  const response = await axiosPrivate.get(`/product/image/${id}`);
  return response.data;
};

const getFilteredProducts = async (minPrice, maxPrice, sortBy) => {
  const response = await axiosPrivate.get("/product/filter", {
    params: {
      minPrice,
      maxPrice,
      sortBy
    }
  });

  return response.data;
};
  return {
    
    getHome,
    addToCart,
    getCart,
    cartitemdelete,
    changequantity,
    handlewishlist,
    getWishlist,
    userDeatils,
    // usereditdetails,
    takeediteddata,
    updateAddress,
    createAddress,
    profiledata,
    signupedata,
    logindata,
    setPrimaryAddress,
    fetchaddress,
    placeOrder,
    takeorder,
    fetchcustomer,
    adminorder,
    changeisactive,
    fetchshowdetails,
    changeOrderStatus,
    handlecancel,
    removeproductdetails,
    requestReturn,
    fechData,
    fetchimage,
    getFilteredProducts
    
    
  };
};

export default UserService;