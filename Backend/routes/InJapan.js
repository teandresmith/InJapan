const express = require('express')
const router = express.Router()
const nodemailer = require('nodemailer')



const Blogs = require('../models/Blogs')
const Tags = require('../models/Tags')


// @Description Home Page
// @route GET /
router.get('/', async (req, res) => {
    try {
        const blogPosts = await Blogs.find({}).sort({dateCreatedOn: -1}).limit(3).lean()
        res.render('InJapan-views/home', {
            blogPosts
        })
    } catch (error) {
        console.log(error)
    }
})

// @Description -> Collects user input from Contact Form & sends dummy email
// @route POST -> Contact Form
router.post('/', (req, res) => {
    try {
        const name = req.body.name
        const email = req.body.email
        const message = req.body.message
        var mailOptions = {
            from: email,
            to: 'InJapan@mail.io',
            subject: `From a Person named ${name}`,
            text: message
          }
          var transporter = nodemailer.createTransport({
            host: "smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: process.env.EMAIL_USERNAME,
              pass: process.env.EMAIL_PASSWORD
            }
          });

          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
              res.redirect('/')
            }
          }); 
    } catch (error) {
        console.log(error)
    }

})

// @Description -> Renders Blog Page
// @route GET -> 
router.get('/blogs', async (req, res) => {

    try {
        const featuredBlogPost = await Blogs.find({}).sort({"dateCreatedOn": -1}).limit(1).lean()
        const allBlogPosts = await Blogs.find({}).limit(6).lean()
        const tags = await Tags.find({}).lean()
        res.render('InJapan-views/blogs', {
            layout: 'InJapan/blog-layout',
            featuredBlogPost,
            allBlogPosts,
            tags
        })
    } catch (error) {
        console.log(error)
    }
    
})

// @Description -> Renders View All Blogs Page
// @route GET ->
router.get('/blogs/view', async (req, res) => {
    try {
        const blogs = await Blogs.find({}).lean()
        res.render('InJapan-views/all-blogs', {
            layout: 'InJapan/view-blogs-layout',
            blogs
        })
    } catch (error) {
        console.log(error)
    }
})

// @description -> Renders blog post dependent on blog's slug
// @route GET ->
router.get('/blogs/:slug', async (req,res) => {
    try {
        var blogSlug = req.params.slug
        const blogPost = await Blogs.find({slug: blogSlug}).limit(1).lean()
        res.render('InJapan-views/blog-view', {
            layout: 'InJapan/blog-template-layout',
            blogPost
        })
    } catch (error) {
        console.log(error)
    }
})



// @description -> Queries database and sends the 6 most recent posts
// @route GET ->
router.get('/filter-posts', async (req, res)=> {
    
    try {
        var blogs = await Blogs.find({}).limit(6)
        res.json(blogs)
    } catch (error) {
        console.log(error)
    }
})

// @description -> Queries database and filters by the user input inside search bar and returns as json object
// @route GET ->
router.get('/filter-posts/:search', async (req, res)=> {
    
    try {
        const searchBar = req.params.search
        const blogs = await Blogs.find({title: {$regex: searchBar, $options: 'i'}})
        res.json(blogs)
    } catch (error) {
        console.log(error)
    }
})

// @description -> Queries database and filters by tag
// @route GET ->
router.get('/filter-posts/tag/:tag', async (req, res)=> {
    
    try {
        const tagFilter = req.params.tag
        console.log(tagFilter)
        const blogs = await Blogs.find({tags: {$regex: tagFilter, $options: 'i'}})
        res.json(blogs)
    } catch (error) {
        console.log(error)
    }
})








module.exports = router