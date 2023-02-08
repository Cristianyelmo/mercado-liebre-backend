const fs = require('fs');
const path = require('path');

 const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8')); 
let minmax  = true
let ofertas = true



const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {

	
	// Root - Show all products
	index: (req, res) => {
		minmax=true
		ofertas = false
		res.render('products',{
			products,minmax,toThousand,ofertas
		})
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		// Do the magic
const Idrequerido = req.params.id

const encontrar = products.find(producto =>
	producto.id === +Idrequerido
)

const productoRelacionados = products.filter(prod => prod.category === encontrar.category && prod.id !== encontrar.id )
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

	
	
	filtrarOrden:(req,res) =>{

		const {type} =req.params
        
		const ProductoOrd =   products.sort((prevProduct,nextProduct) => {
		
					if(type === "min"){
		
				return   prevProduct.price - nextProduct.price
		
				} else {
		
				return    nextProduct.price - prevProduct.price
				}
		
				}
		
				)  

				minmax=true
				ofertas = false
		
				res.render('products', {
					ProductoOrd,
					products,minmax,ofertas

					
				  })
		  




	},
Uvisita:(req,res) =>{
	let visita = products
	const {intento} =req.params
if(intento === "ultima"){
	
	
	
visita =products.filter(prod => prod.category === "visited")

	
	
minmax=false
ofertas = false


} 



if(intento === "ofertas"){
	
	visita =products.filter(prod => prod.category === "in-sale")
	
	
	
	
	minmax=false
ofertas = true

} 


if(intento === "ultimamin"){
	visita = products.filter(prod => prod.category === "visited")
	visita.sort((prevProduct,nextProduct) => {
		
	return   prevProduct.price - nextProduct.price


})

	
	} 
	
	
if(intento === "ultimamax") {
		visita = products.filter(prod => prod.category === "visited")
	visita.sort((prevProduct,nextProduct) => {
		
	return   nextProduct.price - prevProduct.price

})


	
	}
 

	if(intento === "filtromin"){
		visita = products.filter(prod => prod.category === "in-sale")
		visita.sort((prevProduct,nextProduct) => {
			
		return   prevProduct.price - nextProduct.price
	
	})
	
		
		} 
		
if(intento === "filtromax") {
			visita = products.filter(prod => prod.category === "in-sale")
		visita.sort((prevProduct,nextProduct) => {
			
		return   nextProduct.price - prevProduct.price
	
	})
	

		
		}

		
		
		if(intento === "hogar"){

			visita = products.filter(prod => prod.categoria === "Hogar")
			
			

		}

		if(intento === "musica"){

			visita = products.filter(prod => prod.categoria === "musica")
			
		
		}

		if(intento === "electronica"){

			visita = products.filter(prod => prod.categoria === "electronica")
			
		
		}



		if(intento === "categoria+ofertas"){
			
			visita = products.filter(prod => prod.categoria === "musica" && prod.category === "in-sale")

			
			
			
		}
		
		
		res.render('products',{
	
	
	products:visita,minmax,ofertas
			
		})



	},

	
	
	
	
	
	
	
	


};



module.exports = controller;