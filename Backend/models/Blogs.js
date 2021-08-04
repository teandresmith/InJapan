const mongoose = require('mongoose')
const slugify = require('slugify')

const BlogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    subtitle: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    dateCreatedOn: {
        type: Date,
       default: Date.now
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    tags: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
})

BlogSchema.pre('validate', function(next) {
    if (this.title) {
        this.slug = slugify(this.title, { lower: true, strict: true})
    }
    next()
})

module.exports = mongoose.model('Blogs', BlogSchema)