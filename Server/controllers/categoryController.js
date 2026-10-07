const {Category}=require("../models/Category")


const Fetchuser=async(req,res)=>{
     try{
      console.log(2222);
      
      const categorys=await Category.find();
      console.log(categorys);
      
      res.status(200).json(categorys)
     }
     catch(error){
      res.status(500).json({message:error.message})
     }
}

const onhandleedit=async(req,res)=>{
  let {id}=req.params
  let {name,description}=req.body
  try{
    let  data=await Category.findByIdAndUpdate(
      id,
      {name,
        description
      },
      {new:true}
    )
    res.json(data)
  }
  catch(error){
    res.json({message:error.message})
  }
}





const Onhandleadd= async (req,res)=>{
  const {name,description,isActive}=req.body
  

  try{
    const newcat = new Category({name,description,isActive})
    await newcat.save();
    res.json(newcat)
  }
  catch(error){
   res.json({message:error-message})
  }
}

const handleblock=async(req,res)=>{
  const {id}=req.params
  const {isActive}=req.body

  try{
    let block=await Category.findByIdAndUpdate(
      id,
      {isActive:!isActive},
      {new:true}
    )
    res.json(block)
  }
  catch(error){
    res.json({message:error.message})
  }
}



module.exports={
  Onhandleadd,
  Fetchuser,
  onhandleedit,
  handleblock
}