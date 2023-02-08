const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");



const controller = {
    
	

	Jsonparseado: function() {

		const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
		const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));


	},

	index: (req, res) => {
		
		
		res.render('index',{
			
			products,
			toThousand
			


		})
	},
	search: (req, res) => {
		
		const{keywords}=req.query

		
		let buscar = products.filter(prod => prod.name.toLowerCase().includes(keywords.toLowerCase()))
		
		
	
		res.render('results',{
			
			products:buscar,
			keywords
		})
	},
	
	filtrarOrdenBuscador:(req,res)=> {

		
		const{products}=req.query

		
		let buscar = products.filter(prod => prod === products)
		

		
	

		
		
		
		
		const {typi} =req.params
        
		const ProductoOrdUvx = buscar.sort((prevProduct,nextProduct) => {
		
					if(typi === "min"){
		
				return   prevProduct.price - nextProduct.price
		
				} else {
		
				return    nextProduct.price - prevProduct.price
				}
		
				}
		
				)  

				
			   
		
				res.render('results', {
					products:ProductoOrdUvx,
					keywords
					

					
				  })

	}
};

module.exports = controller;
