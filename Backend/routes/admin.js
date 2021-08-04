const express = require('express')
const router = express.Router()
const passport = require('passport')
const bcrypt = require('bcrypt')
const { ensureAuthenticated } = require('../config/auth')


const Blogs = require('../models/Blogs')
const Tags = require('../models/Tags')


// @description -> Renders Login Page
// @route GET ->
router.get('/login', (req, res) => {
    res.render('admin-views/admin-login', {
        layout: 'admin/admin-login-layout'
    })
})

// @description -> Authenticates User Login
// @route POST ->
router.post('/login',
    passport.authenticate('local', {
        successRedirect: '/admin',
        failureRedirect: '/admin/login',
        failureFlash: true
    })
);

// @description -> Logs session out, and redirects
// @route GET ->
router.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/')
})

// @description -> Renders admin dashboard IF user is authenticated
// @route GET ->
router.get('/', ensureAuthenticated, async (req, res) => {
    try {
        const blogs = await Blogs.find({}).sort({ dateCreatedOn: -1 }).lean()

        res.render('admin-views/admin-dashboard', {
            layout: 'admin/admin-dashboard-layout',
            blogs
        })
    } catch (error) {
        console.log(error)
    }
})

// @ description -> Renders add blogs page IF user is authenticated
// @route GET ->
router.get('/add', ensureAuthenticated, (req, res) => {
    res.render('admin-views/admin-add', {
        layout: 'admin/admin-dashboard-layout',
        blogs: new Blogs()
    })
})


// @description -> Adds a new Blog Post to the database
// @route POST ->
router.post('/add', ensureAuthenticated, async (req, res) => {

    let newBlog = new Blogs({
        title: req.body.title,
        subtitle: req.body.subtitle,
        image: req.body.image,
        description: req.body.description,
        tags: req.body.tags,
        body: req.body.body
    })
    try {
        newBlog = await newBlog.save()
        res.redirect('/admin')
    } catch (error) {
        res.render('admin-views/admin-add', {
            layout: 'admin/admin-dashboard-layout',
            newBlog
        })
        console.log(error)
    }

})

// @description -> Renders the Blog post edit page IF user is authenticated
// @route GET ->
router.get('/edit/:id', ensureAuthenticated, async (req, res) => {
    try {
        const blogs = await Blogs.find({ _id: req.params.id }).limit(1).lean()
        res.render('admin-views/admin-edit', {
            layout: 'admin/admin-dashboard-layout',
            blogs
        })
    } catch (error) {
        console.log(error)
    }
})

// @description -> Modifies the blog post IF user is authenticated
// @route PUT ->
router.put('/edit/:id', ensureAuthenticated, async (req, res) => {
    try {
        const id = req.params.id
        req.blogs = await Blogs.findById(id)

        let updatedBlog = req.blogs
        updatedBlog.title = req.body.title
        updatedBlog.subtitle = req.body.subtitle
        updatedBlog.image = req.body.image
        updatedBlog.description = req.body.description
        updatedBlog.tags = req.body.tags
        updatedBlog.body = req.body.body

        updatedBlog = await updatedBlog.save()
        res.redirect('/admin')
    } catch (error) {
        res.render('admin-views/admin-edit', {
            layout: 'admin/admin-dashboard-layout',
            updatedBlog
        })
        console.log(error)
    }
})

// @description -> Queries and Deletes blog post by ID IF user is authenticated
// @route DELETE ->
router.delete('/:id', ensureAuthenticated, async (req, res) => {
    try {
        const id = req.params.id
        await Blogs.findByIdAndRemove(id)
        res.redirect('/admin')
    } catch (error) {

        console.log(error)
    }
})



// All Routes below pertain to the Tag model

// @description -> Displays all Tags on the dashboard IF user is authenticated
// @route GET ->
router.get('/tag/dashboard', ensureAuthenticated, async (req, res) => {
    try {
        const tags = await Tags.find({}).lean()
        res.render('admin-views/admin-tag-dashboard', {
            layout: 'admin/admin-dashboard-layout',
            tags
        })
    } catch (error) {
        console.log(error)
    }
})

// @description -> Displays ADD tag web page IF user is authenticated
// @route GET ->
router.get('/add/tag', ensureAuthenticated, async (req, res) => {
    try {
        res.render('admin-views/admin-add-tag', {
            layout: 'admin/admin-dashboard-layout'
        })
    } catch (error) {
        console.log(error)
    }
})

// @description -> ADDs a new tag to database IF user is authenticated
// @route POST ->
router.post('/add/tag', ensureAuthenticated, async (req, res) => {
    tags = req.body.tags
    tokenizer(tags)
    try {
        res.redirect('/admin/tag/dashboard')
    } catch (error) {
        console.log(error)
    }
})

// @description -> Queries and Deletes tag by ID IF user is authenticated
// @route DELETE ->
router.delete('/tag/:id', ensureAuthenticated, async (req, res) => {
    const id = req.params.id
    try {
        await Tags.findByIdAndDelete(id)
        res.redirect('/admin/tag/dashboard')
    } catch (error) {
        console.log(error)
    }
})

// @description -> Function allows for multiple additions of tags in one line that is separated by Commas
async function tokenizer(token) {
    tags = token.split(',')
    try {
        for (let i = 0; i < tags.length; i++) {
            let tag = new Tags({
                name: tags[i]
            })
            await Tags.create(tag)
        }
    } catch (error) {
        console.log(error)
    }

}


module.exports = router