const blogSidebar = document.querySelector('.blog-sidebar')
const searchIcon = document.querySelector('.search-icon')
const minimizeIcon = document.querySelector('.minimize-icon')
const searchbar = document.querySelector('.search-bar')
const taglist = document.querySelector('.tag-list-wrapper')

searchIcon.addEventListener('click', () => {
    searchIcon.classList.remove('hide')
    searchIcon.classList.add('show')
    blogSidebar.classList.add('show')
    minimizeIcon.classList.add('show')
    searchbar.classList.add('show')
    taglist.classList.add('show')
})

minimizeIcon.addEventListener('click', () => {
    minimizeIcon.classList.remove('show')
    searchbar.classList.remove('show')
    taglist.classList.remove('show')
    blogSidebar.classList.remove('show')
    searchIcon.classList.remove('show')
    searchIcon.classList.add('hide')

})

const stickyArrow = document.querySelector('.sticky-arrow')

window.onscroll = function () { scrollFunction() }

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {

        if (stickyArrow.classList.contains('hide')) {
            stickyArrow.classList.remove('hide')
            stickyArrow.classList.add('show')
        }
        else {
            stickyArrow.classList.add('show')
        }
    } else {
        if (stickyArrow.classList.contains('show')) {
            stickyArrow.classList.remove('show')
            stickyArrow.classList.add('hide')
        }
        else {
            stickyArrow.classList.add('hide')
        }
    }
}

function topfunction() {
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
}


const blogStylesheet = document.getElementById('css-sheet-index')
let browser = navigator.userAgent

window.addEventListener('load', changeStyleSheet() )

function changeStyleSheet() {
    if (browser.indexOf("Firefox") > -1) {
        browser = "Mozilla Firefox";
    }

    if (browser.indexOf("Chrome") > -1) {
        browser = "Google Chrome"
    }

    switch (browser) {
        case "Mozilla FireFox":
            blogStylesheet.setAttribute("href", "./css/InJapan/blog-firefox.css")
            break;
        case "Google Chrome":
            blogStylesheet.setAttribute("href", "./css/InJapan/blog-chrome.css") 
            break
        default:
            blogStylesheet.setAttribute("href", "./css/InJapan/blog-firefox.css")
            break
    }
}


const icon = document.querySelector('.icon')
const mobileLinks = document.querySelector('.mobile-links')

icon.addEventListener('click', () => {
    if(icon.classList.contains('active')) {
        icon.classList.remove('active')
        mobileLinks.classList.remove('active')
    } else {
        icon.classList.add('active')
        mobileLinks.classList.add('active')
    }
})