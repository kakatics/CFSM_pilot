
const mainBgColor = getComputedStyle(document.documentElement).getPropertyValue('--main-bg-color');
const secondBgColor = getComputedStyle(document.documentElement).getPropertyValue('--second-bg-color');
const mainFgColor = getComputedStyle(document.documentElement).getPropertyValue('--main-fg-color');
const secondFgColor = getComputedStyle(document.documentElement).getPropertyValue('--second-fg-color');

const toggle = document.querySelector('.toggle');
const indicator = document.querySelector('.toggle .indicator');
const instalogo = document.querySelector('.instagram svg');
const facelogo = document.querySelector('.facebook svg');
const nora = document.querySelectorAll('.nora-social svg');
const mate = document.querySelectorAll('.mate-social svg');
const dorian = document.querySelectorAll('.dorian-social svg');
const comp_indicator = window.getComputedStyle(indicator);

function setLight() {
    indicator.style.left = '20px';
    document.documentElement.style.setProperty('--main-bg-color', mainFgColor);
    document.documentElement.style.setProperty('--main-fg-color', secondBgColor);
    document.documentElement.style.setProperty('--second-bg-color', secondFgColor);
    facelogo.style.fill = secondBgColor; 
    instalogo.style.fill = secondBgColor;
    nora[0].style.fill = nora[1].style.fill = secondBgColor;
    mate[0].style.fill = mate[1].style.fill = secondBgColor;
    dorian[0].style.fill = dorian[1].style.fill = secondBgColor;
    window.localStorage.setItem('theme', 'light');
}

function setDark() {
    indicator.style.left = '';
    document.documentElement.style.setProperty('--main-bg-color', mainBgColor);
    document.documentElement.style.setProperty('--main-fg-color', mainFgColor);
    document.documentElement.style.setProperty('--second-bg-color', secondBgColor);
    facelogo.style.fill = mainFgColor; 
    instalogo.style.fill = mainFgColor; 
    nora[0].style.fill = nora[1].style.fill = mainFgColor;
    mate[0].style.fill = mate[1].style.fill = mainFgColor;
    dorian[0].style.fill = dorian[1].style.fill = mainFgColor;
    window.localStorage.setItem('theme', 'dark');
}

window.addEventListener('load', () => {
    if(window.localStorage.getItem('theme') === "light")
        setLight();
});

toggle.addEventListener('click', () => {
    if(indicator.style.left === "") {
        setLight();    
    } else {
        setDark();       
    }
});

// Language switcher
let defaultLocale = navigator.language.split("-")[0];
const supportedLocales = ["en", "hu", "de"];
let locale;
let translations = {};

document.addEventListener("DOMContentLoaded", () => {
    if(!supportedLocales.includes(defaultLocale)) {
        defaultLocale = "en";
    }
    setLocale(defaultLocale);

    bindLocaleSwitcher(defaultLocale);
});

async function setLocale(newLocale) {
    if (newLocale == locale) return;
    const newTranslations = await fetchTranslationsFor(newLocale);

    locale = newLocale;
    translations = newTranslations;

    translatePage();
    setMenuLanguage();
}

function setMenuLanguage() {
    document.querySelectorAll(".lang").forEach((element) => {
        if (element.classList.contains("active")) {
            element.classList.remove("active");
        }
        if (element.innerHTML == locale) {
            element.classList.add("active");
        }
    });
}

async function fetchTranslationsFor(newLocale) {
    const response = await fetch(`/lang/${newLocale}.json`);
    return await response.json();
}

function translatePage() {
    document.querySelectorAll("[data-i18n-key]").forEach(translateElement);
}

function translateElement(element) {
    const key = element.getAttribute("data-i18n-key");
    const translation = translations[key];
    element.innerText = translation;
}

function bindLocaleSwitcher(initialValue) {
    const switcher = document.querySelectorAll("[data-i18n-switcher]").forEach(item => {
        item.addEventListener('click', e => {
            setLocale(item.innerHTML);
        });
    });
    
}

