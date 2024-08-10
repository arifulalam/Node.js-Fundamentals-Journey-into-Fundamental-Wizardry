const bcrypt = require("bcrypt");
//const path = require("path");

const User = require("../models/UserModel")
const Blog = require("../models/blogModel");

const blogController = async (req, res) => {
    const {title, description, userId, action} = req.body;

    let image = req.file.path;
    console.log(req.file);

    if(action == '' || action == undefined){
        res.status(400).json({
            status: {
                code: 400,
                message: "Bad Request",
            },
            message: `Something went wrong. Please, check and try again.`,
        });
    }else{
        if(action == 'view'){
            let blogs = (await Blog.find({}).populate({path: "authorId", select: '_id name email isVerified'}));
            
            res.status(200).json({
                status: {
                    code: 200,
                    message: "Ok",
                },
                message: (blogs) ? `List of blog posts.` : "No blog posts found.",
                data: blogs,
            });
        }

        if(action == 'create'){
            if(title == '' || title == undefined) 
                res.status(400).json({status:{code: 400, message: "Bad Request."}, message: "Title is required."});
        
            else if(description == '' || description == undefined) 
                res.status(400).json({status:{code: 400, message: "Bad Request."}, message: "Description is required."});
        
            else if(userId == '' || userId == undefined) 
                res.status(400).json({status:{code: 400, message: "Bad Request."}, message: "User info is required."});
        
            else {
                let blog = new Blog({
                    title: title,
                    description: description,
                    image: image,
                    authorId: userId
                });
        
                blog.save().then((result) => {        
                    res.status(200).json({
                        status: {
                            code: 200,
                            message: "Ok",
                        },
                        message: `Blog post created and published successfully.`,
                        data: result,
                    });
                });
            }
        }
    }
}

module.exports = blogController