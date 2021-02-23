// collect my left and right buttons 
let prev = document.querySelector(".left-button")
let next = document.querySelector(".right-button")

let urlNext = 0;
let number = 0;
let items = "";

let listItem = Array.from(document.querySelector('.right-container__screen').children);

// recovery html tag to send Pokemon's attributes dynamically : name, weight, height, type/types, front pictures, back pictures, background ID 
let pokeName = document.querySelector('.poke-name')
let pokeWeight = document.querySelector('.poke-weight')
let pokeHeight = document.querySelector('.poke-height')
let pokeType = Array.from(document.querySelector('.stats__types').children)
let pokeTypeTwo = document.querySelector('.poke-type-two')
let pokeImgFront = document.querySelector('.screen__image').children[0]
let pokeImgBack = document.querySelector('.screen__image').children[1]
let background = document.querySelector('.main-screen')




// function returnUrl(urlCallBack, url) {

//     urlCallBack(url)
// }

// function firstLetterCapitalize (){
//     const string = string.name.charAt(0).toUpperCase() + string.name.slice(1)
//     return string;
// }
// firstLetterCapitalize();

// const controller = new AbortController();
// const  signal = controller;
// /////////////// Probleme 
// Séparer l'éxution des 20 premiers pokemon et faire fonctions qui génere les données des pokemons
//////////////////////// Function in   ///////////////////////
function getPokemon() {
    fetch(`https://pokeapi.co/api/v2/pokemon?offset=${urlNext}&limit=20`)

        .then(function (response) {

            response.json()


                .then(function (data) {

                    // display 20 pokemons by default 
                    for (let index = 0; index <= data.results.length; index++) {

                        number += 1

                        listItem[index].textContent = `${number}.${data.results[index].name}`

                        // display information based on pokemon click
                        data.results.forEach((e, index) => {



                            let urlSplit = e.url.split("/pokemon")
                            let urlSplitTwoo = urlSplit[1].split("/")
                            let numberOfPoke = urlSplitTwoo[1]



                            listItem[index].textContent = `${numberOfPoke}.${e.name.charAt(0).toUpperCase() + e.name.slice(1)}`

                            listItem[index].addEventListener('click', function () {

                                fetch(e.url)

                                    .then(function (response) {
                                        response.json()

                                            .then(function (data) {

                                                // recovery of pokemon's Name , Weight and Height 
                                                pokeName.textContent = data.name.charAt(0).toUpperCase() + data.name.slice(1)
                                                pokeWeight.textContent = data.weight
                                                pokeHeight.textContent = data.height

                                                //recovery of pokemon's ID and display with this form "000#"
                                                function transformId() {

                                                    let idInString = `${data.id}`

                                                    if (idInString.length == 1) idInString = `#00${idInString}`

                                                    else if (idInString.length == 2) idInString = `#0${idInString}`

                                                    else idInString = `#${data.id}`

                                                    return document.querySelector('.poke-id').textContent = idInString

                                                }
                                                transformId()

                                                //change bakground dinamically

                                                background.setAttribute("class", `main-screen ${data.types[0].type.name}`)

                                                //condition if pokemon's are of just one type, hide second content 

                                                if (data.types[1] == null) {

                                                    document.querySelector('.poke-type-two').classList.add('hidePoke')

                                                    if (pokeTypeTwo.classList.contains('showPoke')) {
                                                        pokeTypeTwo.classList.replace('showPoke', 'hidePoke')
                                                    }


                                                }
                                                else if (data.types[1] !== null) {
                                                    document.querySelector('.poke-type-two').classList.replace('hidePoke', 'showPoke')


                                                }


                                                data.types.forEach((e, index) => {


                                                    //recovery of types:
                                                    pokeType[index].textContent = e.type.name.charAt(0).toUpperCase() + e.type.name.slice(1)

                                                    //recovery of images:
                                                    pokeImgFront.src = `${data.sprites.front_default}`
                                                    pokeImgBack.src = `${data.sprites.back_default}`
                                                })

                                            })
                                    })

                            });
                        })
                    }

                })
        })
}
getPokemon();

//Next button
next.addEventListener('click', function () {
    urlNext += 20
    if (urlNext >= 20 && urlNext < 1082) {
        fetch(`https://pokeapi.co/api/v2/pokemon?offset=${urlNext}&limit=20`)

            .then(function (response) {

                response.json()

                    .then(function (donneeNext) {

                        console.log(donneeNext)
                        getPokemon();

                    })
            })
    } else if (urlNext == 1082) {
        urlNext = null
    }

})

// Previous button
prev.addEventListener('click', function () {

    urlNext -= 20
    if (urlNext > 20)
        fetch(`https://pokeapi.co/api/v2/pokemon?offset=${urlNext}&limit=20`)

            .then(function (response) {

                response.json()

                    .then(function (donneePrev) {

                        console.log(donneePrev)
                        getPokemon();

                    })
            })
    else if (urlNext > -20)
        urlNext = null

})
// Function
// ////////////////// Se renseigner sur la methode Signal pour stopper l'éxécutions des requête 
// //////////////////  Reste à gérer le style et envoyer le projet sur SimplonOnline
// function stopPageExecution (numberUrl){
//     if(numberUrl === 1100)
//        numberUrl = false

//     else if(numberUrl > -20) 
//         numberUrl = console.error("plus de page disponible")
//     else 
//     return numberUrl  

// }
// stopPageExecution(urlNext);



