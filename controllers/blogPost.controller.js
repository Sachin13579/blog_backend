import dblayerFuncs from '../databaseLayer/blogPost.dbLayer.js'

const postBlog = async (req, res) => {
    try {

        let resultValue = await dblayerFuncs.postBlog(req.body, req.files)
        if (!resultValue.status) {
            return res.status(400).json({ status: false, message: resultValue.message })
        }
        return res.status(200).json({ status: true, message: "blog posted successfully!" })
    } catch (error) {
        return res.status(500).json({ status: false, message: error.message })
    }
}
const fetchBlog = async (req, res) => {
    try {
        let resultValue = await dblayerFuncs.fetchBlog(req.query)
        if (!resultValue.status) {
            return res.status(400).json({ status: false, message: resultValue.message })
        }
        return res.status(200).json({
            status: true, data: resultValue.data, message: resultValue.message
        })
    } catch (error) {
        return res.status(500).json({ status: false, message: error.message })
    }
}
const createBlogTags = async (req, res) => {
    try {

        let resultValue = await dblayerFuncs.createBlogTags(req.body)
        if (!resultValue.status) {
            return res.status(400).json({ status: false, message: resultValue.message })
        }
        return res.status(200).json({
            status: true, data: resultValue.data, message: resultValue.message
        })
    } catch (error) {
        return res.status(500).json({ status: false, message: error.message })
    }
}
const fetchBlogTag = async (req, res) => {
    try {

        let resultValue = await dblayerFuncs.fetchBlogTags(req.body)
        if (!resultValue.status) {
            return res.status(400).json({ status: false, message: resultValue.message })
        }
        return res.status(200).json({
            status: true, data: resultValue.data, message: resultValue.message
        })
    } catch (error) {
        return res.status(500).json({ status: false, message: error.message })
    }
}
const fetchParticularBlog = async (req, res) => {
    try {
        // console.log(params)
        let resultValue = await dblayerFuncs.fetchParticularBlog(req.query)
        if (!resultValue.status) {
            return res.status(400).json({ status: false, message: resultValue.message })
        }
        return res.status(200).json({
            status: true, data: resultValue.data, message: resultValue.message
        })
    } catch (error) {
        return res.status(500).json({ status: false, message: error.message })
    }
}


const blogFuncs = {
    postBlog,
    fetchBlog,
    createBlogTags,
    fetchBlogTag,
    fetchParticularBlog
}
export default blogFuncs