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

// 5 - Retrieve the total price of all orders.