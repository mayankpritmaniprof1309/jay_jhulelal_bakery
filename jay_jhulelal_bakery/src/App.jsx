import React from 'react'
import Homepage from './homepage_components/Homepage'
import { Routes, Route } from 'react-router-dom';
import Products from './productsPage_components/Products'
import Login_page from './login_components/login_page';
import SignUpPage from './signUpPage/SignUpPage';



const items=[


  {
    'name':'Bomboloni',
    'image':'https://plus.unsplash.com/premium_photo-1676573295464-cd20bfd68744?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Ym9tYm9sb25pfGVufDB8fDB8fHww',
    'desc':'Exquisitely soft Italian bombolonis, filled with decadent, velvety indulgence.',
    'price':400,
    'qty':' piece',
    'rating':'5',
  'reviews':'200'
  },
  {
    'name':'Ferrero Rocher cupcake',
    'image':'https://images.unsplash.com/photo-1603532648955-039310d9ed75?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y3VwJTIwY2FrZXN8ZW58MHx8MHx8fDA%3D',
    'desc':'Decadent chocolate cupcake infused with hazelnut richness, crowned with a luxurious Ferrero Rocher.',
    'price':200,
    'qty':' piece',
    'rating':'4',
  'reviews':'144'
  },
  {
    'name':'Red Velvet cupcake',
    'image':'https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y3VwJTIwY2FrZXN8ZW58MHx8MHx8fDA%3D',
    'desc':'Velvety rich, elegantly sweet, and finished with a luscious cream cheese swirl.',
    'price':150,
    'qty':' piece',
    'rating':'4',
  'reviews':'148'
  },
  {
    'name':'Blueberry muffins',
    'image':'https://images.unsplash.com/photo-1676021088023-1995f104af68?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fEJsdWViZXJyeSUyMG11ZmZpbnN8ZW58MHx8MHx8fDA%3D',
    'desc':'Elegantly baked with a soft crumb and generously studded with premium blueberries.',
    'price':200,
    'qty':' piece',
    'rating':'3',
  'reviews':'90'
  },

  {
    'name':'Chocolate Doughnut',
    'image':'https://images.unsplash.com/photo-1530016910220-faf7fab2125c?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGRvdWdobnV0fGVufDB8fDB8fHww',
    'desc':'Soft, golden dough wrapped in a luxurious layer of smooth chocolate glaze.',
    'price':100,
    'qty':' piece',
    'rating':'4',
  'reviews':'180'
  },
  
  {
    'name':'Strawberry Doughnut',
    'image':'https://plus.unsplash.com/premium_photo-1679341705517-67f35920eec5?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGRvdWdobnV0fGVufDB8fDB8fHww',
    'desc':'    Light, airy perfection finished with a smooth, vibrant strawberry glaze.',
    'price':90,
    'qty':' piece',
    'rating':'4',
  'reviews':'50'
  },
    
  {
    'name':'Doughnut Box ',
    'image':'https://images.unsplash.com/photo-1618411640018-972400a01458?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZG91Z2hudXR8ZW58MHx8MHx8fDA%3D',
    'desc':'A curated collection of six exquisite doughnuts, each handcrafted to deliver a unique burst of flavor and indulgence in every bite.',
    'price':550,
    'qty':' box',
    'rating':'5',
  'reviews':'100'
  },
  {
    'name':'Croissants ',
    'image':'https://plus.unsplash.com/premium_photo-1692809723031-98c72b1871c7?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y3JvaXNzYW50c3xlbnwwfHwwfHx8MA%3D%3D',
    'desc':'Golden, perfectly layered croissants with a rich buttery aroma and an irresistibly crisp, tender bite.',
    'price':180,
    'qty':' piece',
    'rating':'3',
  'reviews':'99'
  },
  {
    'name':'Brownies ',
    'image':'https://images.unsplash.com/photo-1636743715220-d8f8dd900b87?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8QnJvd25pZXN8ZW58MHx8MHx8fDA%3D',
    'desc':'Indulgent chocolate brownies with a rich, fudgy core and a smooth, glossy finish.',
    'price':250,
    'qty':' piece',
    'rating':'5',
  'reviews':'250'
  },
  {
    'name':'Tiramisu ',
    'image':'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8VGlyYW1pc3V8ZW58MHx8MHx8fDA%3D',
    'desc':'An elegant dessert of bold espresso notes, silky cream, and perfectly balanced sweetness.',
    'price':500,
    'qty':' piece',
    'rating':'4',
  'reviews':'100'
  },
  {
    'name':'Multigrain Bread ',
    'image':'https://images.unsplash.com/photo-1628809643520-7c20491d5324?q=80&w=985&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'desc':'A wholesome loaf crafted with a blend of premium grains, offering rich texture and natural goodness.',
    'price':250,
    'qty':' Loaf (10 inch)',
    'rating':'4',
  'reviews':'60'
  },
   {
    'name':'Cookie Tin ',
    'image':'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWjyvo0L0I-tnAf2_AgdPZgFhLYbUAwC66Sw&s',
    'desc':'A viral indulgence of rich, chocolate-filled cookies, elegantly curated in a premium tin.',
    'price':600,
    'qty':' tin',
    'rating':'5',
  'reviews':'300'
  },

   {
    'name':'Biscoff Cheesecake',
    'image':'https://images.unsplash.com/photo-1708980108288-151b6ba7159d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'desc':'A luxurious cheesecake infused with rich Biscoff and finished with a silky caramelized glaze.',
    'price':180,
    'qty':' piece',
    'rating':'3.5',
  'reviews':'180'
  },
  {
    'name':'Blueberry Cheesecake',
    'image':'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Ymx1ZWJlcnJ5JTIwY2hlZXNlY2FrZSUyMHBpZWNlfGVufDB8fDB8fHww',
    'desc':'A velvety cheesecake crowned with luscious blueberry compote and refined sweetness.',
    'price':230,
    'qty':' piece',
    'rating':'5',
  'reviews':'280'
  },
   
   
   {
    'name':'Bun',
    'image':'https://plus.unsplash.com/premium_photo-1671403964073-c8cfede9e3cc?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YnVufGVufDB8MXwwfHx8MA%3D%3D',
    'desc':'Soft, fluffy, and freshly baked, our buns are light and airy with a delicate sweetness—perfect for any time of the day.',
    'price':80,
    'qty':' 12 pieces',
    'rating':'3.5',
  'reviews':'100'
  },
   {
    'name':'Puff Pastry',
    'image':'https://images.unsplash.com/photo-1682263167429-0dbcf2c1e127?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'desc':'Light, crispy, and perfectly flaky, our khari is a buttery puff pastry treat that pairs beautifully with tea.',
    'price':320,
    'qty':' kg',
    'rating':'4',
  'reviews':'150'
  },
  
]

const App = () => {
  return (
   <>
    {/* <Homepage items={items}/> */}
    {/* <Products items={items}/> */}

    <Routes>

        {/* Home page */}

        <Route path="/" element={<Homepage items={items} />} />

        {/* Product page */}

        <Route path="/product" element={<Products items={items} />} />

        {/* Login page */}

        <Route path="/login" element={<Login_page/>} />
        
        {/* signUp page */}

        <Route path="/signup" element={<SignUpPage/>} />

      </Routes>
  </>
  )
}

export default App