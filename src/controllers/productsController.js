const fs = require('fs');
const path = require('path');

 const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8')); 



const toThousand =n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const writeJson=( data ={})=> fs.writeFileSync(path.join(__dirname,"../data/queries.json"),JSON.stringify(data),"utf-8");









const controller = {

	
	// Root - Show all products
	

	index: (req, res) => {
		if(!req.query.order && !req.query.state && !req.query.category){
			writeJson();  


		}

		let queries = require('../data/queries.json');

		
		
		writeJson({...queries, ...req.query})

		
		
		

		
		

		const{order,state,category} ={...queries, ...req.query}


let allproducts = products;




if(category){

	
	
	
	
	allproducts = allproducts.filter((products)=>{
 return products.category === category


	})
}




if(order){
	
	
	
	
	if(order === "asc"){
		
		
		

		allproducts = allproducts.sort((before,after)=>{
		return before.price - after.price;
		
		
		})

		

	}else {
	
		allproducts = allproducts.sort((before,after)=>{
			return after.price - before.price;
			
			
			})
	
	
	}



}





if(state){
	
	

	allproducts = allproducts.filter((product)=>{
	return product.state === state
	
	
	})

}




		
		res.render('products',{
			products:allproducts,
			queries:{...queries, ...req.query}
		})
            
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		// Do the magic
const Idrequerido = req.params.id

const encontrar = products.find(producto =>
	producto.id === +Idrequerido
)

const productoRelacionados = products.filter(prod => prod.state === encontrar.state && prod.id !== encontrar.id )
	return res.render('detail',{

			 ...encontrar,
			 productoRelacionados,toThousand
		})
	},

	// Create - Form to create
	create: (req, res) => {
		// Do the magic

		
		res.render('product-create-form',{
			
		})


		
	},
	
	
	// Create -  Method to store
	store: (req, res) => {

 
	
		const{name,price,discount,category,description}=req.body
		
		const NuevoProducto = {

			id:products[products.length -1].id +1,
			name:name.trim(),
			description:description.trim(),
			price:+price,
			discount:+discount,
			image:"default-image.png",
			category:category.trim(),
			

			


		}

		 products.push(NuevoProducto)
		
		fs.writeFileSync('./src/data/productsDataBase.json',JSON.stringify(products,null,3),'utf-8')
		return res.redirect(`/products`)


		

	},

	// Update - Form to edit
	edit: (req, res) => {
		const Idrequerido = req.params.id

		const encontrar2 = products.find(producto =>
			producto.id === +Idrequerido
		)
		
			return res.render('product-edit-form',{
		
					 ...encontrar2 
				})
			},
		
	
	// Update - Method to update
	update: (req, res) => {
		const Idrequerido = req.params.id
		const{name,price,discount,category,description}=req.body
		const prod = products.find(prod =>prod.id === +Idrequerido)
		const edicion = {

			id:+Idrequerido,
			name:name.trim(),
			description:description.trim(),
			price:+price,
			discount:+discount,
			image:prod.image,
			category:category.trim(),
			

			


		}
		
		
		
		
		
		
		const update = products.map(prod =>{
         
		if(prod.id === +Idrequerido){
			
			
			

return edicion


			}

			return prod

		})


		fs.writeFileSync('./src/data/productsDataBase.json',JSON.stringify(update,null,3),'utf-8')

		
		
		 
		res.redirect(`/products`)

		


		
		

		
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		
		
		const Idrequerido = req.params.id
  
  const productoEliminado = products.filter(prod =>prod.id !== +Idrequerido)
fs.writeFileSync('./src/data/productsDataBase.json',JSON.stringify(productoEliminado,null,3),'utf-8')
  
  res.redirect(`/products`)
	},

	
	
	

	
	
	
	
	
	
	
	


};



module.exports = controller;