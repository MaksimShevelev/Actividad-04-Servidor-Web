const fs = require('fs/promises');
const path = './products.json';

class ProductManger{
    products = [];
    constructor(products=[]){
        this.products = products
    }
    randomID(){
        return crypto.randomUUID();
    }
    
    async addProduct(product){
        
        await this.getProducts();
        product.id = this.randomID();
        this.products.push( product);
        
        
        const data = JSON.stringify( this.products, null, 2);
        try {
            await fs.writeFile( path, data );
            return product.id;
        } catch (error) {
            console.error(error);
        }
    }
    async getProducts(){
        try {
            const data = await fs.readFile(path);
            this.products = JSON.parse( data);
        } catch (error) {
            console.error(error);
        }
    }

    getProductById(id){
        const product = this.products.find(  item => item.id == id  );
        return product ? product : {};
    }
}

const key = '1234';

module.exports = { ProductManger, key };
/* module.exports = { 
                    ProductManger: ProductManger, 
                    key: key  
                }; */

