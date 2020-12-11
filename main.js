

let  allPost = {}
$("#savePost").on("click", (event)=> {
    let newCover = $("#coverImage").val()
    let titlePost = $("#writePost").val()
    let tags = $("#newTags").val()
    let content = $("#contentPost").val()
    const holePost = {newCover,titlePost,tags,content}
    console.log(holePost)
    let newEntries = Object.keys(allPost).length + 1
    let otherEntries = newEntries.toString()
    allPost[otherEntries] = holePost
    console.log(allPost)
    console.log(newEntries)

    $.ajax({
        method: "POST",
        url: "https://ajaxclass-1ca34.firebaseio.com/desafio-front/posts/.json",
        data: JSON.stringify(allPost),
        success: (responses) => {
            console.log(responses)
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
            newPosts = response
        },
        error: error => {
            console.log( error )
        }
    });
}
getTheDatos()

const getNewDatos = dataToGet => {
    $("#fillThePost").empty()
    for (key in dataToGet) {
        let { newCover,titlePost,tags,content } = dataToGet

            let newCard = `
            <div class="container-profiles">
            <article class="card-profiles">
                <div class="profiles">
                    <img src="${newCover}"
                        alt="Foto de persona">
                    <div>
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
        }
    }



