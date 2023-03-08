const $ = (elemento) => document.querySelector(elemento);


window.addEventListener("load", function () {
    const $containerCards = $(".container-cards");

    fetch("https://rickandmortyapi.com/api/character")
    .then(response => response.json())
    .then(data => { 
        paint(data)
    });

    const paint =(arr)=>{
       /*  $containerCards.innerHTML = ""; */
        arr.forEach(results => {
            $containerCards.innerHTML += `
        <div class="card">
            <img src=${results.imagen}>
            <p>${results.name}</p>
        </div> `
        });

    }



    
});