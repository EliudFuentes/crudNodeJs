/* Importacion de modulos */
const express = require("express");
const morgan = require("morgan");

/* app para invocar express  */
const app = express();

/* Middelers */
app.use(morgan("dev"));
app.use(express.json());

/* Data de la api */
let products = [
  {
    id: 1,
    name: "laptop",
    price: 3000,
  },
];

/* Metodo get para listar productos */
app.get("/products", (req, res) => {
  res.json(products);
});

/* Metodo post para anadir productos */
app.post("/products", (req, res) => {
  const newProduct = { ...req.body, id: products.length + 1 };
  products.push(newProduct);
  res.send(newProduct);
});

/* Metodo put para actualizar producto */
app.put("/products/:id", (req, res) => {
  const newData = req.body;
  const productFound = products.find((p) => p.id === parseInt(req.params.id));

  if (!productFound)
    return res.status(404).json({
      message: "Product not found",
    });
  products = products.map((p) =>
    p.id === parseInt(req.params.id) ? { ...p, ...newData } : p
  );
  res.json({
    message: "Producto actualizado",
  });
});

/* Metodo delete para eliminar productos */
app.delete("/products/:id", (req, res) => {
  const productFound = products.find((p) => p.id === parseInt(req.params.id));

  if (!productFound)
    return res.status(404).json({
      message: "Product not found",
    });

  products = products.filter((p) => p.id !== parseInt(req.params.id));
  res.sendStatus(204);
});

/* Metodo get por id para listar un producto */
app.get("/products/:id", (req, res) => {
  const productFound = products.find((p) => p.id === parseInt(req.params.id));

  if (!productFound)
    return res.status(404).json({
      message: "Product not found",
    });
  res.json(productFound);
});

/* Puerto del sever y escuchando */
app.listen(3000);
console.log(`server on port ${3000}`);
