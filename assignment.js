// 1 - Retrieve the names of all customers
db.customers.find({}, { _id: 0, name: false, city:false })
db.customers.find({}, { _id: 0,  customername:1 })
db.customers.find({},{customername:1,_id:0})

=[
    { customername: 'John Doe' },
    { customername: 'Jane Smith' },
    { customername: 'David Wang' },
    { customername: 'Lisa Chen' }
]

db.customers.find().forEach((customer)=>{print(customer.customername)})
= "John Doe"
  "Jane Smith"
  "David Wang"
 " Lisa Chen"

db.customers.aggregate([{$project:{_id:0,customername:1}}])
= [
  { customername: 'John Doe' },
  { customername: 'Jane Smith' },
  { customername: 'David Wang' },
  { customername: 'Lisa Chen' }
]


// 2 - Retrieve the total number of orders placed.
db.orders.count()
db.orders.countDocuments()
db.orders.estimatedDocumentCount()
= 4

db.orders.aggregate([{$group:{_id:null,TotalOrders:{$sum:1}}},{$project:{_id:0,TotalOrders:"$TotalOrders"}}])
= [ { TotalOrders: 4 } ]

db.orders.aggregate([{$group:{_id:null,TotalOrders:{$sum:1}}}]).forEach((data)=>print("totalOrders : "+data.TotalOrders))
= 4

db.orders.aggregate([{$group:{_id:null,TotalOrders:{$sum:1}}}]).forEach((data)=>print("totalOrders : " + data.TotalOrders))
= totalOrders : 4

// 3 - Retrieve the details of the order with OrderID 1003.
db.orders.find({_id:1003})
= [ { _id: 1003, customerid: 3, total: 300 } ]


// 4 - Retrieve the names of customers who are from Beijing.
db.customers.findOne({city:"Beijing"}).customername
= "David Wang"

db.customers.find({city:"Beijing"},{_id:0,city:false})
= [ { customername: 'David Wang' } ]


// 5 - Retrieve the total price of all order
db.orders.aggregate([{$group:{'_id': null,TotalPrice: {$sum: '$total'}}}, {$project:{'_id': 0,TotalPrice: 1}}])
= [ { TotalPrice: 770 } ]


// 6 - Retrieve the product names and their prices.
db.products.find({}, {_id:0, productname: 1, price: 1 })
= [
  { productname: 'Laptop', price: 1000 },
  { productname: 'Smartphone', price: 800 },
  { productname: 'Tablet', price: 500 },
  { productname: 'TV', price: 1500 }
]


// 7 - Retrieve the names of customers along with their city.
db.customers.find({},{_id:0,customername:1,city:1})
= [
  { customername: 'John Doe', city: 'New York' },
  { customername: 'Jane Smith', city: 'London' },
  { customername: 'David Wang', city: 'Beijing' },
  { customername: 'Lisa Chen', city: 'shanghai' }
]


// 8 - Retrieve the orders placed by John Doe (CustomerID 1).
db.customers.aggregate([{$match:{customername:"John Doe"}},{$lookup:{from:'orders',localField:'_id',foreignField:'customerid',as:'result'}},{$unwind:'$result'},{$project:{_id:0,orders:"$result"}}])
= [
  { orders: { _id: 1001, customerid: 1, total: 200 } },
  { orders: { _id: 1004, customerid: 1, total: 120 } }
 ]


// 9 - Retrieve the customers who have placed orders
db.customers.aggregate([{$lookup:{from:'orders',localField:'_id',foreignField:'customerid',as:'result'}},{$match:{result:{$ne:[]}}},{$project:{result:0}}])
= [
  { _id: 1, customername: 'John Doe', city: 'New York' },
  { _id: 2, customername: 'Jane Smith', city: 'London' },
  { _id: 3, customername: 'David Wang', city: 'Beijing' }
 ]


// 10 - Retrieve the orders placed by customers from Shanghai.
db.orders.aggregate([{$lookup:{from:"customers",localField:"customerid",foreignField:"_id",as:"result"}},{$unwind:"$result"},{$match:{"result.city":"shanghai"}}])
= 0


// 11 - Retrieve the highest price from the Products table
db.products.aggregate([{$group:{_id:0,highestPrice:{$max:'$price'}}},{$project:{_id:0,highestPrice:1}}])
= [ { highestPrice: 1500 } ]


// 12 - Retrieve the average price of all products.
db.products.aggregate([{$group:{_id:null,avgPrice:{$avg:"$price"}}}])
= [ { _id: null, avgPrice: 950 } ]

db.products.aggregate([{$group:{_id:0,avgPrice:{$avg:"$price"}}},{$project:{_id:0,avgPrice:1}}])
= [ { avgPrice: 950 } ]


// 13 - Retrieve the details of customers who have placed orders

db.customers.aggregate([{$lookup:{from:'orders',localField:'_id',foreignField:'customerid',as:'result'}},{$match:{result:{$ne:[]}}},{$project:{result:0}}])
= [
  { _id: 1, customername: 'John Doe', city: 'New York' },
  { _id: 2, customername: 'Jane Smith', city: 'London' },
  { _id: 3, customername: 'David Wang', city: 'Beijing' }
]

// 14 - Retrieve the names of customers who have not placed any orders.
db.customers.aggregate([{$lookup:{from:'orders',localField:'_id',foreignField:'customerid',as:'result'}},{$match:{result:[]}},{$project:{_id:0,customername:1}}])
= [ { customername: 'Lisa Chen' } ]


// 15 - Retrieve the customer names along with the total order value.
db.customers.aggregate([{$lookup:{from:'orders',localField:'_id',foreignField:'customerid',as:'result'}},{$project:{_id:0,customername:1,totalOrderValue:{$sum:"$result.total"}}}])
= [
  { customername: 'John Doe', totalOrderValue: 320 },
  { customername: 'Jane Smith', totalOrderValue: 150 },
  { customername: 'David Wang', totalOrderValue: 300 },
  { customername: 'Lisa Chen', totalOrderValue: 0 }
 ]


// 16 - Retrieve the orders placed in descending order of their total value.
db.orders.aggregate([{$sort:{total:-1}}])
[
  { _id: 1003, customerid: 3, order: 300 },
  { _id: 1001, customerid: 1, order: 200 },
  { _id: 1002, customerid: 2, order: 150 },
  { _id: 1004, customerid: 1, order: 120 }
]


// 17 - Retrieve the product names along with their prices, sorted by price in descending order.
db.products.aggregate([{$sort:{price:-1}},{$project:{_id:0}}])
[
  { productname: 'TV', price: 1500 },
  { productname: 'Laptop', price: 1000 },
  { productname: 'Smartphone', price: 800 },
  { productname: 'Tablet', price: 500 }
]


// 18 -  Retrieve the names of customers along with the number of orders they have placed.
db.customers.aggregate([{$lookup:{from:'orders',localField:'_id',foreignField:'customerid',as:'result'}},{$project:{_id:0,customername:1,orders:{$size:"$result"}}}])
[
  { customername: 'John Doe', orders: 2 },
  { customername: 'Jane Smith', orders: 1 },
  { customername: 'David Wang', orders: 1 },
  { customername: 'Lisa Chen', orders: 0 }
]


// 19 - Retrieve the orders placed by customers from London.
db.orders.aggregate([{$lookup:{from:'customers',localField:'customerid',foreignField:'_id',as:'result'}},{$match:{'result.city':'London'}},{$project:{_id:0,order:{$size:"$result"}}}])      
= [ { order: 1 } ]


// 20 -  Insert a new customer with ID 5, name 'Emma Wilson', and city 'Paris'
db.customers.insertOne({_id:5,customername:'Emma Wilson',city:'Paris'})

// 21 - Update the city of the customer with ID 3 to 'Tokyo'
db.customers.updateOne({_id:3},{$set:{'city':"Tokyo"}})


// 22 - Update the price of the product with ID 2 to 900.
db.products.updateOne({_id:2},{$set:{price:900}})


// 23 - Delete the order with OrderID 1002.
db.orders.deleteOne({_id:1002})


// 24 - Retrieve the names of customers and their cities using aliases.
db.customers.aggregate([{$project:{_id:0,name:'$customername',customercity:'$city'}}])
= [
  { name: 'John Doe', customercity: 'New York' },
  { name: 'Jane Smith', customercity: 'London' },
  { name: 'David Wang', customercity: 'Tokyo' },
  { name: 'Lisa Chen', customercity: 'shanghai' },
  { name: 'Emma Wilson', customercity: 'Paris' }
]


// 25 - Retrieve the customer names along with their total order value, sorted by order value in descending order
db.customers.aggregate([{$lookup:{from:'orders',localField:'_id',foreignField:'customerid',as:'result'}},{$unwind:'$result'},{$group:{_id:{customerid:"$_id",name:'$customername'},totalOrderValue:{$sum:"$result.total"}}},{$sort:{totalOrderValue:-1}},{$project:{_id:0,name:"$_id.name",totalOrderValue:1}}])
= [
  { totalOrderValue: 320, name: 'John Doe' },
  { totalOrderValue: 300, name: 'David Wang' }
 ]


// 26 - Retrieve the customer names along with the number of orders they have placed, sorted by the number of orders in ascending or 
db.customers.aggregate([{$lookup:{from:'orders',localField:'_id',foreignField:'customerid',as:'result'}},{$project:{_id:0,customername:1,numberOfOrders:{$size:"$result"}}},{$sort:{numberOfOrders:1}}])
= [
  { customername: 'Jane Smith', numberOfOrders: 0 },
  { customername: 'Lisa Chen', numberOfOrders: 0 },
  { customername: 'Emma Wilson', numberOfOrders: 0 },
  { customername: 'David Wang', numberOfOrders: 1 },
  { customername: 'John Doe', numberOfOrders: 2 }
 ]


 // 27 - Retrieve the customer names along with the average order value, sorted by the average order value in descending order
 