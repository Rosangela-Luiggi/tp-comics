const $ = (elemento) => document.querySelector(elemento);
/* variables */
//cards



window.addEventListener("load", function () {
    const $containerCards = $(".container-cards");
    
    let page = 1;
    let nameAll = "";
    let garder = "";

    /* let pageTotal =  */

    //filter
    const $filterGerder = $("#select-gender");
    const $filterLocation = $("#select-location");
    const $filterStatus = $("#select-status");
    const $firterOrder = $("#select-order");
    const $inptSearch = $("#ipt-search");
    const $btnFilter = $("#btn-search");

    //buttons page
    const $btnFirst = $("#first-page");
    const $btnBefore = $("#page-before");
    const $btnNext = $("#next-page");
    const $btnLast = $("#last-page");



    /* ----------------------------------------------------Pintar las cards------------------------------------------------------------------- */

    const gethApi = (url) => {
        fetch(`${url}${"/?page=" + page}${nameAll}${garder}`)
            .then(response => response.json())
            .then(info => {

                paintCards(info);
            })
            .catch(error => console.log(error))
    }


    gethApi("https://rickandmortyapi.com/api/character");

    const paintCards = (array) => {
        $containerCards.innerHTML = "";
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

    /*  let paintResul = ()=>{
         $("#totalResult").innerText += `${total}`
 
     }
 paintResul() */
    /* --------------------------------------------------Paginado---------------------------------------------- */

    $btnFirst.addEventListener("click", () => {
        if (page = 1) {
            page = 1;
            gethApi("https://rickandmortyapi.com/api/character");
        }
    });

    // boton siguiente
    $btnNext.addEventListener("click", () => {

        if (page < 42) {
            page = page + 1;
            gethApi("https://rickandmortyapi.com/api/character");
        }
    });


    // boton pag anterior
    $btnBefore.addEventListener("click", () => {
        if (page >= 1) {
            page = page - 1;
            gethApi("https://rickandmortyapi.com/api/character");
        }
    });

// boton de ultima pagina
    $btnLast.addEventListener("click", () => {
        if (page = 42) {
            page = 42;
            gethApi("https://rickandmortyapi.com/api/character");
        }
    });

//filtrado por input
    $btnFilter.addEventListener("click",()=>{
        if($inptSearch.value === ""){
            nameAll = ""
        }else{
        nameAll = `&name=${$inptSearch.value.toLowerCase()}`
        console.log($inptSearch.value)
        console.log(nameAll)
        }
        gethApi("https://rickandmortyapi.com/api/character");
    });

//filtrar por genero
    $filterGerder.addEventListener("blur",()=>{
        if($filterGerder.value === ""){
            garder = ""
        }else{
        garder = `&gender=${$filterGerder.value.toLowerCase()}`
        
       
        }
        gethApi("https://rickandmortyapi.com/api/character");
    });

    
    

});




