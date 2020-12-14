let posts = {}
 $.ajax({
     url:"https://desafio-js-default-rtdb.firebaseio.com/.json",
     method:"GET", //Recibe datos del servidor
     success: (response)=>{
         console.log("response", response) //Que es lo que nos manda el servidor como respuesta
         posts = response
     }
 })
  let filteredPost = {} //variable que guarda los resultados
   const filterByTitle = (searchWord, data)=>{ //nombre del elemento y donde quiero guardarlo
       filteredPost = {}
    for(post in data){  // Itera dentro de cada objeto
        let title = data[post].titlePost
        console.log(title)
        console.log(title.toLowerCase().includes(searchWord.toLowerCase()))
        let containsSearch = title.toLowerCase().includes(searchWord.toLowerCase())
      if (containsSearch == true){
          filteredPost[post] = data[post]     //aqui se guarda el post completo
      }
    }
    console.log(filteredPost)
    getNewDatos(filteredPost)
   }
$("#inputSearch").keyup(event=>{
     let search = $(event.target).val()
     filterByTitle(search, posts)
     console.log(search)
 })



$(".filters li").click(event => {
    filterActivated = true
    let filter = $(event.target).text()
    let today = new Date().getTime()
    let minDate = 0
    switch (filter) {
        case "Week":
            minDate = today - 518400000
            break
        case "Month":
            minDate = today - 2592000000
            break
        case "Year":
            minDate = today - 31622400000
            break
        case "Infinity":
            filterActivated = false
            break
        case "Feed":
            filterActivated = false
            break
    }
    getTheDatos(filter, minDate)
})
$("#filterFeed").keyup(event=>{
    let search = $(event.target).val()
    filterByTitle(search, posts)
    console.log(search)
})

$(".filters select").change(event => {
    filterActivated = true
    let filter = event.target.value
    let today = new Date()
    let minDate = 0
    switch (filter) {
        case "Week":
            minDate = today - 518400000
            break
        case "Month":
            minDate = today - 2592000000
            break
        case "Year":
            minDate = today - 31622400000
            break
        case "Infinity":
            filterActivated = false
            break
        case "Feed":
            filterActivated = false
            break
    }
    getTheDatos(filter, minDate)
})




let  allPost = {}
$("#savePost").on("click", (event)=> {
    let newCover = $("#coverImage").val()
    let titlePost = $("#titlePost").val()
    let tags = $("#newTags").val()
    let content = $("#contentPost").val()
    const holePost = {newCover,titlePost,tags,content}
  

    $.ajax({
        method: "POST",
        url: "https://desafio-js-default-rtdb.firebaseio.com/.json",
        data: JSON.stringify(holePost),
        success: (responses) => {
            console.log(responses)
            window.location.reload()
        },
        error: (error) => {
            console.log(error)
        }


    })
})


const getTheDatos = () => {
    $.ajax({
        url: "https://desafio-js-default-rtdb.firebaseio.com/.json",
        method: "GET",
        success: response => {
            console.log (response)
            getNewDatos(response)
        },
        error: error => {
            console.log( error )
        }
    });
}
getTheDatos()


const getNewDatos = dataToGet => {
    $("#fillThePost").empty()
    let contador = 0
    for (key in dataToGet) {
        console.log("data to get", dataToGet)
        console.log("key", key)
        let { newCover,titlePost,tags,content } = dataToGet[key]
        console.log(dataToGet[key])
        let imageHtml = `
        <.img-fluid. max-width: 100%;  height: auto; src="${newCover}" class="card-img-top" alt="icono-profile">
        `   
        let newCard = `
            <div class="">
                            ${contador === 0 ? imageHtml : "" } 
                            <div class="container-profiles">
                                <article class="card-profiles">
                                    <div class="profiles">
                                        <img src="https://res.cloudinary.com/practicaldev/image/fetch/s--SrNNpKXV--/c_fill%2Cf_auto%2Cfl_progressive%2Ch_90%2Cq_auto%2Cw_90/https%3A//dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/462336/fe75dae2-ca31-4999-8a10-17bb44c1b04a.jpeg"
                                            alt="Foto de persona">
                                        <div class="nombre-perfil">
                                            <span>
                                                Shari Andrade
                                            </span>
                                            <p class="small">
                                                Nov 8 (10 hours ago)
                                            </p>
                                        </div>
                                    </div>
                                    <div class="p-profiles">
                                        <h2>${titlePost}</h2>
                                        <class class="d-flex">
                                            <span class="hashtag">${tags}</span>
                                            
                                        </class>
                                        <div class="card-reacciones">
                                            <div class="initial-card">
                                                <i class="far fa-heart"></i>
                                                <p class="small">87 reaction</p>
                                                <i class="far fa-comment"></i>
                                                <p class="small">17 comments</p>
                                            </div>
                                            <div class="final-card">
                                                <p class="small">15 min read</p>
                                                <button  data-id-post="${key}" type="button" class="btn btn-secondary  reading-list-button">Save</button>
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            </div>
                        </div>
                `
            $("#fillThePost").append(newCard) 
            contador++
        }
        eventSaveButton()
    }

   /* getNewDatos()

    let newPostEntry = {
        featured:true
    }
    
    let readLaterPosts = []
    $("input, textarea, select").change( event => {
        console.log(event.target)
        let property = event.target.name
        let value = event.target.type === "button" 
                    ? !readPostEntry.featured 
                    : event.target.value
        newPostEntry[property] = value
        console.log(newPostEntry)
    }) */ 

let toReadLaterList = [] 

const eventSaveButton = () => { 
    $(".reading-list-button").click(event=>{ 
     console.log(event.target) 
     $(event.target).text("Saved")
     let readlaterIdPost = $(event.target).data("id-post") 
     let isInReadLaterList = toReadLaterList.includes(readlaterIdPost)
     toReadLaterList = isInReadLaterList 
                       ? toReadLaterList.filter( (id)=>{ return id !== readlaterIdPost} )
                       : [...toReadLaterList, readlaterIdPost] 
    if (isInReadLaterList) { $(event.target).text("Save")

    }
     console.log(readlaterIdPost)
     console.log(toReadLaterList)
    }) 

}

$(".print-reading-list").click(event => {
    event.preventDefault()
    $("#fillThePost").empty()
    toReadLaterList.forEach(value => {
        console.log(posts[key]) 
    let { newCover,titlePost,tags,content } = posts[key]
    let contador = 0
    let imageHtml = `
    <img src="${newCover}" class="card-img-top" alt="icono-profile">
    `   
    let newCard = `
        <div class="">
                        ${contador === 0 ? imageHtml : "" } 
                        <div class="container-profiles">
                            <article class="card-profiles">
                                <div class="profiles">
                                    <img src="https://res.cloudinary.com/practicaldev/image/fetch/s--SrNNpKXV--/c_fill%2Cf_auto%2Cfl_progressive%2Ch_90%2Cq_auto%2Cw_90/https%3A//dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/462336/fe75dae2-ca31-4999-8a10-17bb44c1b04a.jpeg"
                                        alt="Foto de persona">
                                    <div class="nombre-perfil">
                                        <span>
                                            Shari Andrade
                                        </span>
                                        <p class="small">
                                            Nov 8 (10 hours ago)
                                        </p>
                                    </div>
                                </div>
                                <div class="p-profiles">
                                    <h2>${titlePost}</h2>
                                    <class class="d-flex">
                                        <span class="hashtag">${tags}</span>
                                        
                                    </class>
                                    <div class="card-reacciones">
                                        <div class="initial-card">
                                            <i class="far fa-heart"></i>
                                            <p class="small">87 reaction</p>
                                            <i class="far fa-comment"></i>
                                            <p class="small">17 comments</p>
                                        </div>
                                        <div class="final-card">
                                            <p class="small">15 min read</p>
                                            <button  data-id-post="${key}" type="button" class="btn btn-secondary  reading-list-button">Save</button>
                                        </div>
                                    </div>
                                </div>
                            </article>
                        </div>
                    </div>
            `
        $("#fillThePost").append(newCard) 
        contador++

    } )  

    
})
