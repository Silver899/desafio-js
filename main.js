$("#newPost").click(()=> {
    saveEntry(newEntry)
})

$.ajax({
    url: "https://ajaxclass-1ca34.firebaseio.com/desafio-front/posts/.json",
    method: action,
    data: dataValue,
    success: data => {
        getData("All")
    },
    error: "",
});





