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


// 2 - Retrieve the total number of orders placed.
db.orders.count()
db.orders.countDocuments()
db.orders.estimatedDocumentCount()
= 4


// 3 - Retrieve the details of the order with OrderID 1003.
db.orders.find({_id:1003})
= [ { _id: 1003, customerid: 3, total: 300 } ]


// 4 - Retrieve the names of customers who are from Beijing.
db.customers.findOne({city:"Beijing"}).customername
= "David Wang"

db.customers.find({city:"Beijing"},{_id:0,city:false})
= [ { customername: 'David Wang' } ]


// 5 - Retrieve the total price of all order
db.orders.aggregate([{'$group':{'_id': null,'fieldN': {'$sum': '$total'}}}, {'$project':{'_id': 0,'fieldN': 1}}])
= [ { fieldN: 770 } ]


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
db.orders.findOne({customerid:1},{_id:0,customerid:0})
= { total: 200 }




// 9 - Retrieve the customers who have placed orders
db.customers.aggregate([{$lookup:{from:"orders",localField:"_id",foreignField:"customerid",as:"orderplaced"}},{$match:{orderplaced:{$ne:[]}}}])
= [
  {
    _id: 1,
    customername: 'John Doe',
    city: 'New York',
    orderplaced: [
      { _id: 1001, customerid: 1, total: 200 },
      { _id: 1004, customerid: 1, total: 120 }
    ]
  },
  {
    _id: 2,
    customername: 'Jane Smith',
    city: 'London',
    orderplaced: [ { _id: 1002, customerid: 2, total: 150 } ]
  },
  {
    _id: 3,
    customername: 'David Wang',
    city: 'Beijing',
    orderplaced: [ { _id: 1003, customerid: 3, total: 300 } ]
  }
]

// 10 - Retrieve the orders placed by customers from Shanghai.