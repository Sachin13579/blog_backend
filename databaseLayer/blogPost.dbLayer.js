import mongoose from "mongoose";

const postBlog = async (data, files) => {
    try {

        let imageURI;
        if (files?.media[0]) {
            imageURI = files.media[0]?.location
        }
        data.imageURI = imageURI;
        let postData = await Models.blogsModel.create(data)
        return { status: true, data: postData, message: "blog posted successfully!" }
    } catch (error) {
        return { status: false, message: error.message }
    }
}
const fetchBlog = async (params) => {
    try {
        let { pageNo, limit, tagIdFilter, searchText } = params;
        let filterStage = {}
        if (tagIdFilter) {
            filterStage = {
                tagsId: { $in: [new mongoose.Types.ObjectId(tagIdFilter)] }
            }
        }
        let searchFilter = {}
        if (searchText) {
            searchFilter = {
                $or: [{ title: { $regex: new RegExp(searchText, "i") } },
                { description: { $regex: new RegExp(searchText, "i") } }
                ]
            }
        }

        let fetchData = await Models.blogsModel.aggregate([
            {
                $match: { $and: [filterStage, searchFilter] }
            }, {
                $lookup: {
                    foreignField: "_id",
                    localField: "tagsId",
                    from: "tags",
                    as: "tagsDetails",
                    pipeline: [
                        {
                            $project: {
                                tagName: 1
                            }
                        }
                    ]
                }
            },
            { $match: filterStage }
            ,
            {
                $project: {
                    title: 1,
                    description: 1,
                    imageURI: 1,
                    tagsDetails: 1,
                    createdAt: 1

                }
            }
            ,
            { $sort: { createdAt: -1 } },
            { $skip: Number(limit) * (Number(pageNo) - 1) },
            { $limit: Number(limit) }
        ]);
        const pageCount = await Models.blogsModel.aggregate([
            {
                $match: { $and: [filterStage, searchFilter] }
            },
            { $count: "pageCount" }
        ])
        const resp = {};
        resp.pageCount = pageCount[0]?.pageCount?pageCount[0]?.pageCount:0;
        resp.feedData = fetchData
        return { status: true, data: resp, message: "blog fetched successfully!" }
    } catch (error) {
        return { status: false, message: error.message }
    }
}
const createBlogTags = async (data) => {
    try {
        let createTag = await Models.tagsModel.create(data)
        return { status: false, data: createTag, message: "tag adde succesfully!" };
    } catch (error) {
        return { status: false, message: error.message };
    }
}
const fetchBlogTags = async (data) => {
    try {
        let fetchData = await Models.tagsModel.aggregate([
            {
                $match: {

                }
            },
            {
                $sort: {
                    createdAt: -1
                }
            }
        ])


        return { status: true, data: fetchData, message: "tags fetched successfully!" }
    } catch (error) {
        return { status: false, message: error.message }
    }
}
const blogDbFuncs = {
    postBlog,
    fetchBlog,
    createBlogTags,
    fetchBlogTags,

}
export default blogDbFuncs