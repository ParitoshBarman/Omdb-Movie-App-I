let key = "bce3e291";
let search = document.querySelector("#search");
let form = document.querySelector("form");
let moviedetails = document.querySelector("#moviedetails");
let searchresults = document.querySelector("#searchresults");

var debouncingId;

// for movie loading Animation
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

// movie not fount error handeling
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

// display the search result to the web page
function displayFunc(arr){
    moviedetails.innerHTML = null;
    searchresults.innerHTML = null;
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

// add submit event for the final search result
form.addEventListener("submit", (e)=>{
    e.preventDefault()
    lodingFunc()
    fetch(`https://www.omdbapi.com/?s=${search.value}&apikey=${key}`).then((res)=>res.json()).then((res)=>{
        displayFunc(res.Search);
    });
});


function debouncing(func, delay){
    if(debouncingId){
        clearTimeout(debouncingId);
    }
    debouncingId = setTimeout(func, delay);
}

// add the list of debounchin result to the search list
function addsearchresult(arr){
    searchresults.innerHTML = null;
    if(arr!=undefined){
        arr.forEach((element) => {
        let singleLine = document.createElement("div");
        let name = document.createElement("p");
        let img = document.createElement("img");
        // name.textContent = search.value;
        img.src = element.Poster;
        name.textContent = element.Title;
        singleLine.append(img, name);
        searchresults.append(singleLine);
        singleLine.addEventListener("click",()=>{
            // console.log(element.Title);
            search.value = element.Title;
            searchresults.innerHTML = null;
            lodingFunc()
            fetch(`https://www.omdbapi.com/?s=${search.value}&apikey=${key}`).then((res)=>res.json()).then((res)=>{
        displayFunc(res.Search);
    });
        })
        });
    }
}

// apply debouncing technich on search event
search.addEventListener("input",()=>{
    debouncing(()=>{
        fetch(`https://www.omdbapi.com/?s=${search.value}&apikey=${key}`).then((res)=>res.json()).then((res)=>{
        addsearchresult(res.Search);
    });
    }, 1000);
});