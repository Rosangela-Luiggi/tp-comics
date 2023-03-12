const $ = (elemento) => document.querySelector(elemento);
/* variables */
//cards



window.addEventListener("load", function () {
    const $containerCards = $(".container-cards");

    let page = 1;
    let nameAll = "";
    let genderAll = "";
    let statusAll = "";
    let type = "character"

    /* let pageTotal =  */

    //filter
    const $filterGender = $("#select-gender");
    const $filterType = $("#select-type");
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
        fetch(`${url}${type}${"/?page=" + page}${nameAll}${genderAll}${statusAll}`)
            .then(response => response.json())
            .then(info => {

                paintCards(info);


            })
            .catch(error => console.log(error))
    }


    gethApi("https://rickandmortyapi.com/api/");



    const paintCards = (array) => {
        $containerCards.innerHTML = "";
        array.results.forEach(elem => {
            if(type = "location"){
                $containerCards.innerHTML += `<div class="card">
            <img src=${elem.residents.image}>
            <div>
            <p id="name">${elem.name}</p>
            <span>${elem.type}</span>
            <p><span>Dimensión:<br></span>${elem.dimension}</p></div>
        </div> `
            }else{
                $containerCards.innerHTML += `<div class="card">
                <img src=${elem.image}>
                <div>
                <p id="name">${elem.name}</p>
                <p><span>Status:<br></span>${elem.status}</p></div>
            </div> `
            }
           
        });
    }

//


    /* --------------------------------------------------Paginado---------------------------------------------- */

    $btnFirst.addEventListener("click", () => {
        if (page = 1) {
            page = 1;
            gethApi("https://rickandmortyapi.com/api/");
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
    $btnFilter.addEventListener("click", () => {
        if ($filterType.value === "character") {
            type = "character"
        } else {
            type = "location"

        }

        if ($inptSearch.value === "") {
            nameAll = ""
        } else {
            nameAll = `&name=${$inptSearch.value.toLowerCase()}`
            console.log($inptSearch.value)
            console.log(nameAll)
        }
        gethApi("https://rickandmortyapi.com/api/");
    });

    //filtrar por genero
    $filterGender.addEventListener("click", () => {
        if ($filterGender.value === "") {
            genderAll = ""
        } else {
            genderAll = `&gender=${$filterGender.value.toLowerCase()}`


        }
        gethApi("https://rickandmortyapi.com/api/");
    });

    //filtrado por status
    $filterStatus.addEventListener("click", () => {
        if ($filterStatus.value === "") {
            statusAll = ""
        } else {
            statusAll = `&status=${$filterStatus.value.toLowerCase()}`

        }
        gethApi("https://rickandmortyapi.com/api/");

    });

    /* ----------------------------------------------------filtro type----------------------------------------------------------- */
    /*   $filterType.addEventListener("click", () => {
          if ($filterType.value === "location") {
              
          }if($filterType.value === "character"){
              
              gethApi("https://rickandmortyapi.com/api/")
              console.log($filterType.value)
          }
      }) */


});




