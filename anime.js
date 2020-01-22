const base_url = "https://kitsu.io/api/edge/characters";

function searchCharacter(event){

    event.preventDefault();

    var offset = 0;
    const form = new FormData(this);
    const query = form.get("search");

    // console.log(query);

    fetch(`${base_url}?filter[name]=${query}&page[offset]=${offset}`)
    .then(res=>res.json())
    //.then(data=>console.log(data))
    .then(updateDom)
    // .then(navResult)
    .catch(err=>console.warn(err.message));

}

function updateDom(data){
    // data.data
    //     .forEach(item=>console.log(item));
   
    const searchResults = document.getElementById('search-results');

    // const form = new FormData(this);
    // const query = form.get("search");
    // console.log(query);
    
    searchResults.innerHTML = data.data
        .map(item=>{
            // console.log(data.meta.count);
            // console.log(item.attributes.image.original);
            if ((item.attributes.image && item.attributes.image.original)) {
                return `
                    
                    <div class="result-item">
                        
                        <div class="character">
                            <div class="image-div">
                                <img class="image" src="${item.attributes.image.original}" width="58px" height="58px">
                            </div>

                            <div class="name-div">
                                <span class="result-txt">${item.attributes.name}</span>
                            </div>
                            
                        </div>
                        <div class="description">
                            <p class="result-txt">${item.attributes.description}</p>    
                        </div>
                    </div>
                    <div class="details">
                        
                    </div>
                    <div class="result-divider"></div>
                `
            }
            else {
                return `
                    <div class="result-item">
                      
                        <div class="character">
                            <div class="image-div">
                                <img class="image" src="https://pbs.twimg.com/profile_images/807964865511862278/pIYOVdsl.jpg" width="58px" height="58px">
                            </div>
                            
                            <div class="name-div">
                                <span class="result-txt">${item.attributes.name}</span>
                            </div>
                            
                        </div>
                        <div class="description">
                            <p class="result-txt">${item.attributes.description}</p>    
                        </div>
                    </div>
                    <div class="details">
                    </div>
                    <div class="result-divider"></div>
                `
            }
            
    }).join('');

    navResult(data);
} 

function navResult(data){
    
    const resultsPage = document.getElementById('paginate-results');
    // const form = new FormData(this);
    const query = document.getElementById('search').value;
    // console.log(query);
    // resultsPage.innerHTML = data.data
    //     .map();
    // console.log(data.data);
    if (data.meta.count > 0) {
        resultsPage.innerHTML = 
            `
                <div>
                    <ul>
                            
                        <li>
                            <a href="#" id="first">
                                <i class="fas fa-caret-left fa-2x icon iconcolor"></i>
                            </a>
                        </li>
                    
                        <div id="page-nav">
                            <li>
                                <a href="#" class="txt" data-page="1" id="page1">1</a>
                            </li>
                    
                        
                            <li>
                                <a href="#" class="txt" data-page="2" id="page2">2</a>
                            </li>
                        
                            <li>
                                <a href="#" class="txt" data-page="3" id="page3">3</a>
                            </li>
                        
                            <li>
                                <a href="#" class="txt" data-page="4" id="page4">4</a>
                            </li>
                        
                            <li>
                                <a href="#" class="txt" data-page="5" id="page5">5</a>
                            </li>
                        
                            <li>
                                <a href="#" class="txt" data-page="6" id="page6">6</a>
                            </li>
                        </div>
                    
                        <li>
                            <a href="#" id="last">
                                <i class="fas fa-caret-right fa-2x icon iconcolor"></i>
                            </a>
                            
                        </li>
                    
                    </ul>
                </div>
            `
    }
    else {
        resultsPage.innerHTML = 
            `
                <a href="#" id="first">
                    <i class="fas fa-caret-left fa-2x icon iconcolor2"></i>
                </a>
                <a href="#" id="last">
                    <i class="fas fa-caret-right fa-2x icon iconcolor2"></i>
                </a>
            `    
    };
    
    document.getElementById('last').onclick = function() { 

        // console.log('AEEEEEEEEEEEEEEEEEE');
        
        event.preventDefault();
        

        const url_last = data.links.last;
        // console.log(url_last);
        
        pager("last", url_last);

    };

    document.getElementById('first').onclick = function() { 

        // console.log('AOOOOOOOOOOOOOOOOO');
        
        event.preventDefault();
        

        const url_first = data.links.first;
        // console.log(url_first);
        
        pager("first", url_first);

    };
    
    document.getElementById('page-nav').onclick = function(e) {
        // console.log('OI?')
        var page = e.srcElement.getAttribute("data-page");
        // console.log(page);
        var offset = page * 10 - 10;
        var url = base_url + '?filter[name]=' + query +'&page[offset]=' + offset;
        
        numclasse = 'page' + page;

        document.getElementById(numclasse).className = 'txt active';

        // console.log(page);
        // console.log(url);

        pager("goto", url);
        
        
    };
    
}

function pager(action, page){

    url = "";

    switch (action) {
        case "first":
            url = page;
         
        case "last":
            url = page;
        
        case "goto":
            url = page;
        
        default:
            break;
    }

    event.preventDefault();

    fetch(`${url}`)
        .then(res=>res.json())
        //.then(data=>console.log(data))
        .then(updateDom)
        // .then(navResult)
        .catch(err=>console.warn(err.message));

}

function pageLoaded(){
    const form = document.getElementById('search_form');
    form.addEventListener("submit", searchCharacter);
    
}

window.addEventListener("load", pageLoaded())