const errorHandle = document.getElementById("error");
const searchBook = () => {
    const searchInput = document.getElementById("search-input");
    const searchText = searchInput.value;
    //  clear data
    searchInput.value = "";
    if (searchText === "") {
        errorHandle.innerText = "Search input field cannot be empty";
    } else {
        // load data
        const url = `https://openlibrary.org/search.json?q=${searchText}`;

        // total search result
        fetch(url)
            .then((res) => res.json())
            .then((data) => displayTotalSearchFound(data.numFound));

        // search input result
        fetch(url)
            .then((res) => res.json())
            .then((data) => displaySearchResult(data.docs));
    }
};
const displayTotalSearchFound = (numFound) => {
    const searchFound = document.getElementById("search-found");
    // clear 
    searchFound.textContent = "";

    const div = document.createElement("div");
    div.innerHTML = `
    <h4 class = "mt-3 mb-5 text-danger text-center" >Total search result found: ${numFound} </h4>
   `;
    searchFound.appendChild(div);
};

const displaySearchResult = (docs) => {
    const searchResult = document.getElementById("search-result");
    // clear
    searchResult.textContent = "";
    errorHandle.innerText = "";
    docs.forEach((doc) => {
        console.log(doc);
        const div = document.createElement("div");
        div.classList.add("col");
        // dynamic input
        div.innerHTML = `
        <div  class = "card w-75 ms-5 h-100">
            <img src="https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg" class = "card-img-top w-100 mx-auto" alt = "..." >
            <div class = "card-body" >
                  <h4 class = "card-title text-primary" > ${doc.title} </h4>
                  <h5 class = "card-title" >Author name: ${doc.author_name} </h5>
                  <h6 class = "card-title" >Publisher name: ${doc.publishar} </h6>
                  <h6 class = "card-title" >Publish date: ${doc.publish_date} </h6>
                  <h6 class = "card-title" >First publish year: ${doc.first_publish_year} </h6>
            
                </div>
            </div>
        `;
        searchResult.appendChild(div);
    });
};