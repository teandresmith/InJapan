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