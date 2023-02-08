window.addEventListener('load', function(){
    
    new Glider(document.querySelector('.carrousel_lista'),{
        slidesToScroll: 3,
        slidesToShow: 5,
       
        dots: '.carrousel--indicador',
        arrows: {
          prev: '.carrousel_anterior',
          next: '.carrousel_siguente'
        }








    })


  })