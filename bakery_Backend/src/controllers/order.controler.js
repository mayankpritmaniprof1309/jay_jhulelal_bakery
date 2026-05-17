const jwt=require('jsonwebtoken')
const Order=require('../models/Order')
const Product=require('../models/Product')

const { sendOrderConfirmationEmail } =require('./emailService')

async function placeOrder(req, res) {
    console.log('🧑 req.user:', req.user); // ✅ add this
  console.log('📦 req.body:', req.body); // ✅ add this
  try {
    const { items, deliveryAddress } = req.body;

    // if (!items || items.length === 0) {
    //   return res.status(400).json({ message: "Order must have at least one item" });
    // }

    // //   Check stock for all items first
    // for (const item of items) {
    //   const product = await Product.findById(item.product);

    //   if (!product) {
    //     return res.status(404).json({ message: `Product not found: ${item.name}` });
    //   }

    //   if (product.stock < item.quantity) {
    //     return res.status(400).json({ 
    //       message: `"${item.name}" only has ${product.stock} left in stock` 
    //     });
    //   }
    // }

    // //  Deduct stock for all items
    // for (const item of items) {
    //   await Product.findByIdAndUpdate(item.product, {
    //     $inc: { stock: -item.quantity }
    //   });
    // }

    // Create the order
    const formattedItems = items.map(item => ({
      product:  item.product,
      name:     item.name,
      image:    item.image,
      price:    item.price,
      quantity: item.quantity,
    }));

    const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    const order = await Order.create({
      user:            req.user._id,
      items:           formattedItems,
      totalPrice,
      deliveryAddress,
      status:          'pending',
      isPaid:          false,
    });
    // Send confirmation email
    console.log('📧 Attempting email to:', req.user.email);

try {

  await sendOrderConfirmationEmail(
    req.user.email,
    `${req.user.firstName} ${req.user.lastName}`,
    {
      items: formattedItems,
      total: totalPrice,
    }
  );

  console.log('Email sent to:', req.user.email);

} catch (err) {

  console.error(' Email failed:', err.message);

}

    res.status(201).json({
      message: "Order placed successfully",
      data: order,
    });



  } catch (err) {
    console.error('FULL ERROR:', err);
     if (!res.headersSent) {
      return res.status(500).json({ message: err.message });
    }
  }
}

async function getAllOrders(req,res){
    const orders= await Order.find({})

    if(!orders) return res.status(400).send({message:"Error !!"})

        return res.status(200).send(orders)
}

//Populating name Users
async function populateUsers(req,res) {
    const users = await Order.find().populate('user', 'firstName lastName').sort('-createdAt');
    res.send(users)
}

//API controller to update isPaid field
async function updateIsPaid(req, res) {
    let order= await Order.findById(req.params.id)
    if(!order) return res.status(400).send({message:"No Order Found"})

    if (order.isPaid === true)
  order = await Order.findByIdAndUpdate(req.params.id, { isPaid: false }, { new: true });
else
  order = await Order.findByIdAndUpdate(req.params.id, { isPaid: true },  { new: true });
//    
    return res.status(200).send({ isPaid: order.isPaid });
}

//Api controller to update status
async function updateStatue(req,res){
    let order= await Order.findById(req.params.id)
    if(!order) return res.status(400).send({message:"No Order Found"})

    order=await Order.findByIdAndUpdate(req.params.id,{
        status:req.body.status
    })
    return res.status(200).send({message:"Status Updated",order})
}

module.exports={
    placeOrder,
    getAllOrders,
    populateUsers,
    updateIsPaid,
    updateStatue
}