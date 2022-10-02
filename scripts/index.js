// const BASE_URL = 'https://filltext.com/?rows=10&fname={firstName}&lname={lastName}&category=[%22Category1%22,%22Category2%22,%22Category3%22,%22Category4%22]&pretty=true'
const BASE_URL = 'https://filltext.com/'
// var dataList;
// var dataCategories = [];


window.onload = async function () {
    const url = getUrl(10, ['Category1', 'Category2', 'Category3']);
    const [dataList, dataCategories] = await getDatafromApi(url);
    renderFilters(dataCategories);
    renderCards(dataList);
};

const getUrl = (rows, categories) => {
    var categoryConst = "";
    var i;
    for (i = 0; i < categories.length; i++) {
        categoryConst += `\"${categories[i]}\"`
        if (i < categories.length - 1)
            categoryConst += ","
    }
    return (`${BASE_URL}?rows=${rows}&fname={firstName}&lname={lastName}&category=[${categoryConst}]&pretty=true`)
}


const getDatafromApi = async (url = BASE_URL) => {
    const response = await fetch(url)
    const list = await response.json();
    const dataCategories = []
    list.forEach((cate) => {
        if (!dataCategories.includes(cate.category))
            dataCategories.push(cate.category)
    })
    dataCategories.sort()
    return [list, dataCategories];
}

const renderFilters = (dataCategories) => {
    const filtersContainer = document.getElementById('filtersContainer')
    dataCategories.forEach((item) => {
        const card = `
            <button id="${item}" class="categoryButton" onclick="filterData('${item}')">${item}</button>
        `
        filtersContainer.innerHTML += card;
    })
}


const renderCards = (dataList) => {
    const dataContainer = document.getElementById('dataContainer')
    dataList.forEach((item) => {
        const card = `
        <div class="card filter ${item.category}">
        <h1 class="avatar">${item.fname.charAt(0) + item.lname.charAt(0)
            }</h1>
        <h3 class="name">${item.fname + ' ' + item.lname}</h3>
        <h3 class="categoryTag">${item.category}</h3>
        </div>
        `
        dataContainer.innerHTML += card;
    })
}


const filterData = (category) => {
    var i;
    var allCards = document.getElementsByClassName("filter")
    if (category === 'All') {
        for (i = 0; i < allCards.length; i++) {
            allCards[i].classList.remove('hide')
            allCards[i].classList.add('show')
        }
    } else {
        for (i = 0; i < allCards.length; i++) {
            allCards[i].classList.remove('show')
            allCards[i].classList.add('hide')
        }
        var filteredCards = document.getElementsByClassName(category)
        for (i = 0; i < filteredCards.length; i++) {
            filteredCards[i].classList.remove('hide')
            filteredCards[i].classList.add('show')
        }
    }

    var allButtons = document.getElementsByClassName("categoryButton")
    for (i = 0; i < allButtons.length; i++) {
        if (allButtons[i].id === category)
            allButtons[i].classList.add('active')
        else
            allButtons[i].classList.remove('active')
    }
}