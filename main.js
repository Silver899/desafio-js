

let  allPost = {}
$("#savePost").on("click", (event)=> {
    let newCover = $("#coverImage").val()
    let titlePost = $("#titlePost").val()
    let tags = $("#newTags").val()
    let content = $("#contentPost").val()
    const holePost = {newCover,titlePost,tags,content}
  

    $.ajax({
        method: "POST",
        url: "https://ajaxclass-1ca34.firebaseio.com/desafio-front/posts/.json",
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
        url: "https://ajaxclass-1ca34.firebaseio.com/desafio-front/posts/.json",
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
                                                <button type="button" class="btn btn-secondary">Save</button>
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
    }

    getNewDatos()






