const $ = (elemento) => document.querySelector(elemento);

window.addEventListener("load", function () {
    const $containerCards = $(".container-cards");

    /* Variables auxiliares */
    let page = 1;
    let nameAll = "";
    let genderAll = "";
    let statusAll = "";
    let speciesAll = "";
    let allCharacters = "";

    /* let pageTotal =  */

    //filter
    const $filterGender = $("#select-gender");
    const $filterSpecies = $("#select-species");
    const $filterStatus = $("#select-status");
    const $inptSearch = $("#ipt-search");
    const $btnFilter = $("#btn-search");

    //buttons page
    const $btnFirst = $("#first-page");
    const $btnBefore = $("#page-before");
    const $btnNext = $("#next-page");
    const $btnLast = $("#last-page");




    /* ----------------------------------------------------Pintar las cards------------------------------------------------------------------- */

    const gethCharacterApi = (url) => {

        buttonsPagControl()

        fetch(`${url}${"/?page=" + page}${nameAll}${genderAll}${statusAll}${speciesAll}`)
            .then(response => response.json())
            .then(info => {

                /* Una vez con la info, pinto la lista */
                paintCards(info)
            })
            .catch(error => console.log(error))
    }

    /* Ejecuto el get */
    gethCharacterApi("https://rickandmortyapi.com/api/character");




    /* Pinta la lista de cards */
    const paintCards = (array) => {
        $containerCards.innerHTML = "";
        array.results.forEach(elem => {

            $containerCards.innerHTML += `<div class="card" id=${elem.id}>
                <img src=${elem.image} alt=${elem.name} id=${elem.id}>
                <div>
                    <p id="name-card">${elem.name}</p>
                    <p><span>Location: <br></span>${elem.location.name}</p>
                    <p><span>Status:<br></span> ${elem.status}</p>
                </div> 
            </div>`

        });
        $("#totalResult").innerText = array.info.count;

        /* Una vez generadas todas las cards, agrego los eventos click que le corresponde a cada una,
        Le paso el array de personajes */
        addClick(array)
    }





    /* --------------------------------------------------Paginado---------------------------------------------- */

    // Boton primera pagina
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


    /* Funcion para activar o desactivar paginado con css */
    function buttonsPagControl() {
        if (page <= 1) {
            $btnFirst.classList.add("desactived")
            $btnBefore.classList.add("desactived")
        } else {
            $btnBefore.classList.remove("desactived")
            $btnFirst.classList.remove("desactived")
        }

        if (page + 1 >= 42) {
            $btnNext.classList.add("desactived")
            $btnLast.classList.add("desactived")
        } else {
            $btnNext.classList.remove("desactived")
            $btnLast.classList.remove("desactived")
        }

    }


    /* filtrado por input */
    $btnFilter.addEventListener("click", () => {
        $(".container-description").innerHTML = "";
        if ($inptSearch.value === "") {
            nameAll = ""
        } else {
            nameAll = `&name=${$inptSearch.value.toLowerCase()}`

        }
        gethCharacterApi("https://rickandmortyapi.com/api/character");
    });


    /* filtrar por genero */
    $filterGender.addEventListener("blur", () => {
        if ($filterGender.value === "") {
            genderAll = ""
        } else {
            genderAll = `&gender=${$filterGender.value.toLowerCase()}`


        }
        gethCharacterApi("https://rickandmortyapi.com/api/character");
    });


    /* filtrado por status */
    $filterStatus.addEventListener("click", () => {
        if ($filterStatus.value === "") {
            statusAll = ""
        } else {
            statusAll = `&status=${$filterStatus.value.toLowerCase()}`

        }
        gethCharacterApi("https://rickandmortyapi.com/api/character");

    });


    /* Filtrar por especie */
    $filterSpecies.addEventListener("click", () => {
        if ($filterSpecies.value === "") {
            speciesAll = ""
        } else {
            speciesAll = `&species=${$filterSpecies.value.toLowerCase()}`
        }
        gethCharacterApi("https://rickandmortyapi.com/api/character");
    });



});
/* Pinto descripcion, recibe un objeto despues de hacer el find */
const paintDescription = (obj) => {
    /* Vacia el .container-description */
    $(".container-description").innerHTML = "";

    /* Pinta el .container-description */
    $(".container-description").innerHTML = `
        <div class="card-descrip">
            <div class="img-large">
                <img src="${obj.image}" >
            </div>
            <div class="content">
                <h3>${obj.name}</h3>
                <p>Status: <span id ="text-status">${obj.status}</span></p>
                <p>Spacies: <span>${obj.species}</span></p>
                <p>Gender: <span>${obj.gender}</span></p>
                <p>Location: <span>${obj.location.name}</span>
                <p>Origen: <span>${obj.origin.name}</span></p>
                <p>Create: <span>${obj.created}</span></p>
            </div>
        </div> 
    `
  
    if(obj.status === "Alive"){
        $("#text-status").style.color = "green";
        $("#text-status").style.fontWeight="bold";
    }else if(obj.status === "Dead"){
        $("#text-status").style.color = "red";
        $("#text-status").style.fontWeight="bold";
    }else{
        $("#text-status").style.color = "blue";
        $("#text-status").style.fontWeight="bold";
    }
}

/* Agrega el evento click para mostrar el detalle de cada card */
const addClick = (array) => {
    let $cardAll = document.querySelectorAll(".card");
    console.log($cardAll)
    $cardAll.forEach((card) => {
        card.addEventListener("click", (e) => {
            console.log(e)
            let chosenCard = array.results.find((item) => item.id === Number(e.target.id));
            paintDescription(chosenCard)
        });
    });
}