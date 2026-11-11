
//===========================it is frontend========================//
//use:-repeated API callinee  avoidaakan
//axios vazhi  saatharana backendil pookunna code evade kodukunnu(saatharan ooroo jsxil nammalu kodukkuna axios.metho(urls) )
//ennitt evadathe fn avade call aakum(orro jsxil call aakum)
//backenduleekula code evade ezhuthanam

import React from 'react'

import useAxiosPrivate from "../../hooks/useAxiosPrivate";                    //codes for admin pages

const AdminService = () => {

    const axiosPrivate = useAxiosPrivate()

    const addToProduct = async (data) => {  //add-product.jsx lee

        const response = await axiosPrivate.post("/product/add",data);  // user request chynunth ee method,ee urlileek data pass chyyunnu-->go to backend
        return response.data;

    };
    
     const AddCategory = async (data) => {  //Addcategory

        const response = await axiosPrivate.post("/category",data);
        return response.data;
    };
    const EditCategory = async (categoryId, data) => {  //edit   

        const response = await axiosPrivate.put(`category/${categoryId}`, data)  //user req post method and eeoru urlileek data send-->go to backend
        return response?.data
    };

    const StatusCategory= async(categoryId,data) => {   //block or unblock
        const response = await axiosPrivate.put(`category/block/${categoryId}`, data)
        return response?.data
    }

   
 

    const getCategory = async () => {
    const response = await axiosPrivate.get("/category");
    return response.data;
  };


  const showproduct=async()=>{
      const response = await axiosPrivate.get("/product/admin");
    return response.data;
  }

  const EditProductsubmit = async (editProductId, data) => {

        const response = await axiosPrivate.put(`product/${editProductId}`, data)
        return response?.data
    };


     const Productstatus = async (Statusid, data) => {

        const response = await axiosPrivate.put(`product/block/${Statusid}`, data)
        return response?.data
    };

  const productcategory=async()=>{
   let response=await axiosPrivate.get("/category/addcategory")

    return response.data;
    
  }

  //take registerd user==pending===chyyanam

const fetchcustomer=async()=>{
  const response=await axiosPrivate.get("/api/auth/users")
  return response.data;

}

const changeisactive=async(id)=>{
  const response=await axiosPrivate.put(`/api/auth/isactive/${id}`)
  return response.data;

}

    return {
        // getHomePageData,
        // postRegister,
        addToProduct,
        AddCategory,
        EditCategory,
        EditProductsubmit,
        getCategory,
        StatusCategory,
        addToProduct,
        showproduct,
        Productstatus,
       
        productcategory,
        fetchcustomer,
        changeisactive
    };
};

export default AdminService