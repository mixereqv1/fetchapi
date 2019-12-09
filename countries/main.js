const countrySelect = document.querySelector('#countrySelect');
const baseURL = 'https://restcountries.eu/rest/v2/';
//ZADANIE 1
const getCountries = async () => {
    try {
        const response = await fetch(`${baseURL}all?fields=iso2Code;name`);
        const data = await response.json();
        return data;
    } catch (err) {
        console.log(err);
    }
}

getCountries().then((data) => {
    data.forEach((country) => {
        const {name} = country;

        const optionElement = document.createElement('option');
        optionElement.value = name;
        optionElement.innerText = name;

        countrySelect.appendChild(optionElement);
    })
    countrySelect.disabled = false;
})


//ZADANIE 2
const countrySidebar = document.querySelector('#countrySidebar');
const countryFlag = document.querySelector('#countryFlag');
const countryData = document.querySelector('#countryData');
let mymap = null;
let i =0;
const getCountry = async(name) => {
    try {
        const response = await fetch(`${baseURL}name/${name}`);
        const data = await response.json();
        return data;
    } catch (err) {
        console.log(err);
    }
}
const createCountryInfo = (countryInfo) => {
    const {capital, flag, name, population, region, subregion, timezones, latlng} = countryInfo;
    const latitude = latlng[0];
    const longtitude = latlng[1];

    const countryNameh3 = document.querySelector('#countryName');
    const capitalNameDiv = document.querySelector('#capital');
    const regionNameDiv = document.querySelector('#region');
    const subregionNameDiv = document.querySelector('#subregion');
    const populationDiv = document.querySelector('#population');
    const timezonesDiv = document.querySelector('#timezone');
    let map = document.querySelector('#mapid');

    countryNameh3.innerText = name;
    capitalNameDiv.innerText = `Stolica: ${capital}`;
    regionNameDiv.innerText = `Region ${region}`;
    subregionNameDiv.innerText = `Podregion: ${subregion}`;
    populationDiv.innerText = `Liczba ludności: ${population}`;
    timezonesDiv.innerText = `Strefa czasowa: ${timezones[0]}`;
    
    countryFlag.src = flag;

    if(i == 0) {
        i = 1;
        mymap = L.map(map);
        mymap.setView([latitude,longtitude],5);
        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox/streets-v11',
            accessToken: 'pk.eyJ1IjoibWl4ZXJlcSIsImEiOiJjazN5cDY4NnUwbzY5M2RxY3pubzVzOW02In0.Cr238Qs_oCQ3gv5rQgcf-w'
        }).addTo(mymap);
    } else {
        mymap.setView([latitude,longtitude],5);
    }
}
getCountry('Afghanistan').then((data) => {
    const [countryInfo] = data;
    createCountryInfo(countryInfo);
})
countrySelect.addEventListener('change', (event) => {
    const name = event.target.selectedOptions[0].value; 
    getCountry(name).then((data) => {
        const [countryInfo] = data;
        createCountryInfo(countryInfo);
    })
})