const http = require('http');
const port = 3000;

const { ProductManger } = require('./ProductManager.js');

const admin =  new ProductManger(); 

const server = http.createServer(async (request, response) => {
    const url = request.url;
    let body = '';
    let status = 0;
  
    console.log(url);
  
    if (url === '/') {
      body = '<h1>Bienvenido</h1>';
      status = 200;
  

    } else if (url === '/products') {
      
      await admin.getProducts();
      const list = admin.products;
  
      if (list.length > 0) {
        body = `<h1>Lista de productos</h1><ul>${list.map(product => 
          `<li>${product.name} - $${product.price}</li>`
        ).join('')}</ul>`;
      } else {
        body = '<h1>No hay productos disponibles</h1>';
      }
      status = 200;
  
    
    } else if (url.startsWith('/products/')) {
      const id = url.split('/')[2];
      await admin.getProducts(); 
      const product = admin.getProductById(id);
  
      if (product && Object.keys(product).length > 0) {
        body = `<h1>Producto</h1><p>ID: ${product.id}, Nombre: ${product.name}, Precio: $${product.price}</p>`;
        status = 200;
      } else {
        body = '<h1>Producto no encontrado</h1>';
        status = 404;
      }
  
    // Обработка маршрута '/login'
    } else if (url === '/login') {
      body = '<h1>Login</h1>';
      status = 200;
  
    // Обработка маршрута, который не найден
    } else {
      body = '<h1>Página no encontrada</h1>';
      status = 404;
    }
  
    // Отправка ответа
    response.writeHead(status, { 'Content-Type': 'text/html' });
    response.end(body);
    console.log('Un cliente conectado...');
  });
  
  server.listen(port, () => {
    console.log(`Servidor web corriendo en el puerto ${port}`);
  });