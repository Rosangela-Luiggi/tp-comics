const $ = (elemento) => document.querySelector(elemento);
 /* variables */
    //cards
  


window.addEventListener("load", function () {
    const $containerCards = $(".container-cards");
    //paginado
    let page = 1;

    //filter
    const $filterGerder= $("#select-gender");
    const $filterLocation = $("#select-location");
    const $filterStatus = $("#select-status");
    const $firterOrder = $("#select-order");

    //buttons page
    const $btnFirst= $("#first-page");
    const $btnBefore = $("#page-before");
    const $btnNext= $("#next-page");
    const $btnLast= $("#last-page");
   
    

/* ----------------------------------------------------Pintar las cards------------------------------------------------------------------- */
   
    const fetchApi = (url)=>{
        fetch(`${url}${"/?page="+ page}`)
    .then(response => response.json())
    .then(info => { 
       
        paintCards(info);
        })
    .catch (error => console.log(error) )
    }

 
    fetchApi("https://rickandmortyapi.com/api/character");

    const  paintCards = (array) => {
        $containerCards.innerHTML = "";
        console.log(array.results)
        array.results.forEach(elem => {
            $containerCards.innerHTML += `<div class="card">
            <img src=${elem.image}>
            <div>
            <p id="name">${elem.name}</p>
            <span>${elem.species}</span>
            <p><span>Location: <br></span>${elem.location.name}</p>
            <p><span>Status:<br></span>${elem.status}</p></div>
        </div> `
        }); 
    }

    /* --------------------------------------------------Paginado---------------------------------------------- */

   
    $btnNext.addEventListener("click",()=>{
        page = page + 1;
        fetchApi("https://rickandmortyapi.com/api/character");

    });




   
});




/* const paintCards = (array) => {
    $containerCards.innerHTML = ""
    array.forEach(elem => {
        $containerCards.innerHTML += `<div class="card">
        <img src=${elem.results.imagen}>
        <p>${elem.results.name}</p>
    </div> `
    }); 
}



const loadAPI = async ()=>{
    try {
     const response = await fetch("https://rickandmortyapi.com/api/character"); 
     const info = response.json();
     console.log(info.results
        
        )
     paintCards(info.results)
    } catch (error) {
        console.log(error);
    }
    
    
}


console.log(paintCards(info.results)) */