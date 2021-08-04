const searchBar = document.querySelector('#search')
const submit = document.querySelector('.search-bar-button')

submit.addEventListener('click', () => {
  var xhr = new XMLHttpRequest()
  var url = ''

  if (searchBar.value == '') {
    url = '/filter-posts'
  } else {
    url = `/filter-posts/${searchBar.value}`
  }

  xhr.open('GET', url, true)

  xhr.onload = function () {
    if (this.status == 200) {
      var posts = JSON.parse(this.responseText)

      var output = ''
      for (var i in posts) {
        output +=
          '<a class="blog-card" href="/blogs/' +
          posts[i].slug +
          '">' +
          '<div class=""> ' +
          '<div class="blog-card-image"> ' +
          '<img src="' +
          posts[i].image +
          '" alt="tokyo">' +
          '</div>' +
          '<div class="blog-card-text">' +
          '<h5>' +
          posts[i].title +
          '</h5>' +
          '</div>' +
          '</div>' +
          '</a>'
      }
      document.querySelector('.blog-card-container').innerHTML = output
    }
  }

  xhr.send()
})

const tags = document.querySelectorAll('#tags')
const recent = document.querySelector('#recent')

for (let i = 0; i < tags.length; i++) {
  tags[i].addEventListener('click', () => {
    filterByTag(tags[i].innerHTML)
  })
}

recent.addEventListener('click', () => {
  var xhr = new XMLHttpRequest()
  var url = '/filter-posts'

  xhr.open('GET', url, true)

  xhr.onload = function () {
    if (this.status == 200) {
      var posts = JSON.parse(this.responseText)

      var output = ''
      for (var i in posts) {
        output +=
          '<a class="blog-card" href="/blogs/' +
          posts[i].slug +
          '">' +
          '<div class=""> ' +
          '<div class="blog-card-image"> ' +
          '<img src="' +
          posts[i].image +
          '" alt="tokyo">' +
          '</div>' +
          '<div class="blog-card-text">' +
          '<h5>' +
          posts[i].title +
          '</h5>' +
          '</div>' +
          '</div>' +
          '</a>'
      }
      document.querySelector('.blog-card-container').innerHTML = output
      console.log(posts)
    }
  }

  xhr.send()
})

function filterByTag(id) {
  var xhr = new XMLHttpRequest()
  var url = `/filter-posts/tag/${id}`

  xhr.open('GET', url, true)

  xhr.onload = function () {
    if (this.status == 200) {
      var posts = JSON.parse(this.responseText)

      var output = ''
      for (var i in posts) {
        output +=
          '<a class="blog-card" href="/blogs/' +
          posts[i].slug +
          '">' +
          '<div class=""> ' +
          '<div class="blog-card-image"> ' +
          '<img src="' +
          posts[i].image +
          '" alt="tokyo">' +
          '</div>' +
          '<div class="blog-card-text">' +
          '<h5>' +
          posts[i].title +
          '</h5>' +
          '</div>' +
          '</div>' +
          '</a>'
      }
      document.querySelector('.blog-card-container').innerHTML = output
      console.log(posts)
    }
  }

  xhr.send()
}

// module.exports = searchBar
