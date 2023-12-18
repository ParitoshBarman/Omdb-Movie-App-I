let key = "bce3e291";
let search = document.querySelector("#search");
let form = document.querySelector("form");
let moviedetails = document.querySelector("#moviedetails");


function lodingFunc(){
    let loadingHtml = `<div id="loding">
        <div class="container">
            <h1>Loading...</h1>
            <div class="loading-spinner"></div>
            <p class="message">Please wait while movie is loading...</p>
        </div>
    </div>`;
    moviedetails.innerHTML = loadingHtml;
}

function movieNotfound(){
    let notfoundHtml = `<div id="Fail">
    <div class="container">
        <i class="fail-icon">&#10008;</i>
        <h1>Movie Not Found!</h1>
        <p>Sorry! Please try a another movie.</p>
    </div>
</div>`;
    moviedetails.innerHTML = notfoundHtml;
}


function displayFunc(arr){
    moviedetails.innerHTML = null;
    console.log(typeof(arr));
    if(arr!=undefined){
    arr.forEach((element, index) => {
        
        let card = document.createElement("div");
        let imgDiv = document.createElement("div");
        let img = document.createElement("img");
        let contentDiv = document.createElement("div");
        let title = document.createElement("h2");
        let Year = document.createElement("p");
        let type = document.createElement("p");
    
    
        img.src = element.Poster;
        title.textContent = `Title: ${element.Title}`;
        Year.textContent = `Year: ${element.Year}`;
        type.textContent = `Type: ${element.Type}`;
    
        imgDiv.append(img);
        contentDiv.append(title, Year, type);
        card.append(imgDiv, contentDiv);
        if(index==1){
            let relHeading = document.createElement("h2");
            relHeading.textContent = "Related Results";
            moviedetails.append(relHeading);
        }
        moviedetails.append(card);
        
    });
}else{
    movieNotfound()
}
}


form.addEventListener("submit", (e)=>{
    e.preventDefault()
    lodingFunc()
    fetch(`http://www.omdbapi.com/?s=${search.value}&apikey=${key}`).then((res)=>res.json()).then((res)=>{
        displayFunc(res.Search);
    });
});
