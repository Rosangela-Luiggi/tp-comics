const $ = (elemento) => document.querySelector(elemento);
/* variables */
//cards



window.addEventListener("load", function () {
    const $containerCards = $(".container-cards");

    let page = 1;
    let nameAll = "";
    let genderAll = "";
    let statusAll = "";
    let speciesAll ="";
    let type = "character"

    /* let pageTotal =  */

    //filter
    const $filterGender = $("#select-gender");
    const $filterSpecies = $("#select-species");
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

    const gethCharacterApi = (url) => {
        fetch(`${url}${"/?page=" + page}${nameAll}${genderAll}${statusAll}${speciesAll
        
        }`)
            .then(response => response.json())
            .then(info => {
                paintCards(info);


            })
            .catch(error => console.log(error))
    }


    gethCharacterApi("https://rickandmortyapi.com/api/character");



    const paintCards = (array) => {
        $containerCards.innerHTML = "";
        array.results.forEach(elem => {
           
            $containerCards.innerHTML += `<div class="card">
            <img src=${elem.image}>
            <div>
            <p id="name">${elem.name}</p>
             <p><span>Location: <br></span>${elem.location.name}</p>
            <p><span>Status:<br></span> ${elem.status}</p></div> 
        </div> `
       
        });
    }

//
           


    /* --------------------------------------------------Paginado---------------------------------------------- */

    $btnFirst.addEventListener("click", () => {
        
            page = 1;
            gethCharacterApi("https://rickandmortyapi.com/api/character");
        
    });

    // boton siguiente
    $btnNext.addEventListener("click", () => {

        if (page < 42) {
            page = page + 1;
            gethCharacterApi("https://rickandmortyapi.com/api/character");
        }
    });


    // boton pag anterior
    $btnBefore.addEventListener("click", () => {
        if (page >= 1) {
            page = page - 1;
            gethCharacterApi("https://rickandmortyapi.com/api/character");
        }
    });

    // boton de ultima pagina
    $btnLast.addEventListener("click", () => {
        if (page = 42) {
            page = 42;
            gethCharacterApi("https://rickandmortyapi.com/api/character");
        }
    });

    //filtrado por input
    $btnFilter.addEventListener("click", () => {
        
        if ($inptSearch.value === "") {
            nameAll = ""
        } else {
            nameAll = `&name=${$inptSearch.value.toLowerCase()}`
            console.log($inptSearch.value)
            console.log(nameAll)
        }
        gethCharacterApi("https://rickandmortyapi.com/api/character");
    });

    //filtrar por genero
    $filterGender.addEventListener("click", () => {
        if ($filterGender.value === "") {
            genderAll = ""
        } else {
            genderAll = `&gender=${$filterGender.value.toLowerCase()}`


        }
        gethCharacterApi("https://rickandmortyapi.com/api/character");
    });

    //filtrado por status
    $filterStatus.addEventListener("click", () => {
        if ($filterStatus.value === "") {
            statusAll = ""
        } else {
            statusAll = `&status=${$filterStatus.value.toLowerCase()}`

        }
        gethCharacterApi("https://rickandmortyapi.com/api/character");

    });


// filtrar por especie
    
    $filterSpecies.addEventListener("click", () => {
        if ($filterSpecies.value === "") {
            speciesAll = ""
        } else {
            speciesAll= `&species=${$filterSpecies.value.toLowerCase()}`
            console.log(speciesAll)
            

        }
        gethCharacterApi("https://rickandmortyapi.com/api/character");
        console.log(gethCharacterApi("https://rickandmortyapi.com/api/character"))
       

    });

});




