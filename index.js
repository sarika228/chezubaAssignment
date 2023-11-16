const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;


app.use(bodyParser.json());


const orders = []; 

app.get('/api/order/:orderid', (req, res) => {
  const order = orders.find((o) => o.id === parseInt(req.params.orderid));
  if (!order) {
    res.status(404).json({ error: 'Order not found' });
  } else {
    res.json(order);
  }
});

app.post('/api/order', (req, res) => {
  const newOrder = {
    id: orders.length + 1,
    itemType: req.body.itemType,
    orderState: req.body.orderState,
  };
  orders.push(newOrder);
  res.json({ orderId: newOrder.id });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});