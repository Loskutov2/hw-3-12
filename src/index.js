const lC = {
    base : 'https://pixabay.com/api?',
    key : '39207417-4a4d560adaeee6a2eb970c13a'
}

const elems = {
    form : document.querySelector('.js-search-form'),
    list : document.querySelector('.js-articles-container'),
    btn : document.querySelector('[data-action="load-more"]')
}

let page = 1
let query=''

function searchImgs(query, page){
    if(query){return fetch(`${lC.base}key=${lC.key}&q=${query}&page=${page}&per_page=20`)
    .then((r)=>r.json())
    .then((r)=>r.hits)
}
}
function onFormSubmit(e){
    clearPage()
    e.preventDefault()
    query = e.currentTarget.elements.query.value
    searchImgs(query, page)
    .then(createMarkup)
}
function clearPage() {
    page=1
    elems.list.innerHTML=''
}
function loadMore(){
    page++
    searchImgs(query, page)
    .then(createMarkup)
}
function createMarkup(hits) {  
    const markup = hits.map(({previewURL})=> `<li><img src="${previewURL}" alt=""></li>` ).join(" ")
    elems.list.insertAdjacentHTML('beforeend', markup)  
}

elems.form.addEventListener('submit', onFormSubmit)

elems.btn.addEventListener('click', loadMore)

