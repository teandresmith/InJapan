
const stickyArrow = document.querySelector('.sticky-arrow')

let browser = navigator.userAgent
const indexStylesheet = document.getElementById('css-sheet-index')



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

            indexStylesheet.setAttribute("href", "./css/InJapan/index-firefox.css")
            break;
        case "Google Chrome":
            indexStylesheet.setAttribute("href", "./css/InJapan/index-chrome.css")
            break
        default:
            indexStylesheet.setAttribute("href", "./css/InJapan/index-firefox.css")
            break
    }
}



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

// Displays
const blogList = document.querySelectorAll('.blog-post')

window.addEventListener('load', () => {
    for (var i = 0; i < blogList.length; i++) {
        if (i == 1) {
            blogList[i].classList.add('blog-post-reverse')
        }
    }
})