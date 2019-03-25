const Post = require('../models/post');

exports.createPost = (req,res,next)=>{
    const post = new Post({
        StartDate: req.body.StartDate,
        EndDate: req.body.EndDate,
        PlannedBandwidth: req.body.PlannedBandwidth,
        ActualBandwidth: req.body.ActualBandwidth,
        UserStory: req.body.UserStory,
        StoryType: req.body.StoryType,
        StoryStatus: req.body.StoryStatus,
        activity: req.body.activity,
        ActivityStatus: req.body.ActivityStatus,
        myDate: req.body.myDate,
        PlannedStoryPoint: req.body.PlannedStoryPoint,
        ActualStoryPoint: req.body.ActualStoryPoint,
        ConsumedSP: req.body.ConsumedSP,
        variance: req.body.variance,
        StoryMaturity: req.body.StoryMaturity,
        ActivityStartDate: req.body.ActivityStartDate,
        ActivityEndDate: req.body.ActivityEndDate,
        Resource: req.body.Resource,
        PercentageCompletion: req.body.PercentageCompletion,
        AccountableHour: req.body.AccountableHour,
        ReasonOfVariance: req.body.ReasonOfVariance,
        CorrectiveMeasures: req.body.CorrectiveMeasures,
        RiskIfAny: req.body.RiskIfAny,
        creator: req.userData.userId
    });
    post.save().then(createdPost=>{
        res.status(201).json({
            message: 'Posts Added Successfully',
            postId: createdPost._id
        });
    })
    .catch(error =>{
        res.status(500).json({
            message: "Creating a post failed!"
        })
    });
};

exports.updatePost = (req, res, next)=>{
    const post = new Post({
        _id: req.body.id,
        StartDate: req.body.StartDate,
        EndDate: req.body.EndDate,
        PlannedBandwidth: req.body.PlannedBandwidth,
        ActualBandwidth: req.body.ActualBandwidth,
        UserStory: req.body.UserStory,
        StoryType: req.body.StoryType,
        StoryStatus: req.body.StoryStatus,
        activity: req.body.activity,
        ActivityStatus: req.body.ActivityStatus,
        myDate: req.body.myDate,
        PlannedStoryPoint: req.body.PlannedStoryPoint,
        ActualStoryPoint: req.body.ActualStoryPoint,
        ConsumedSP: req.body.ConsumedSP,
        variance: req.body.variance,
        StoryMaturity: req.body.StoryMaturity,
        ActivityStartDate: req.body.ActivityStartDate,
        ActivityEndDate: req.body.ActivityEndDate,
        Resource: req.body.Resource,
        PercentageCompletion: req.body.PercentageCompletion,
        AccountableHour: req.body.AccountableHour,
        ReasonOfVariance: req.body.ReasonOfVariance,
        CorrectiveMeasures: req.body.CorrectiveMeasures,
        RiskIfAny: req.body.RiskIfAny,
        creator: req.userData.userId
    })
    Post.updateOne({_id:req.params.id, creator: req.userData.userId}, post)
    .then(result=>{
        if(result.n > 0) {
            res.status(200).json({message: "Update Successful!"});
        } else {
            res.status(401).json({message: "Not Authorized!"});
        }
    })
    .catch(error =>{
        res.status(500).json({
            message: "Couldn't update post!"
        });
    });
};

exports.getPosts = (req, res, next)=>{
    Post.find()
    .then(result=>{
        res.status(200).json({
            message: 'Posts Fetched Successfully',
            posts: result
         });
    })
    .catch(error =>{
        res.status(500).json({
            message: "Fetching posts failed!"
        })
    });
};

exports.getPost = (req,res,next)=>{
    Post.findById(req.params.id)
    .then(post=>{
        if(post){
            res.status(200).json(post);
        } else {
            res.status(404).json({ message: 'Post not found!'})
        }
    })
    .catch(error =>{
        res.status(500).json({
            message: "Fetching post failed!"
        })
    });
};

exports.deletePost = (req,res,next)=>{
    Post.deleteOne({_id:req.params.id, creator: req.userData.userId})
    .then(result=>{
        console.log(result);
        if(result.n > 0) {
            res.status(200).json({message: "Deletion Successful!"});
        } else {
            res.status(401).json({message: "Not Authorized!"});
        }
    })
    .catch(error =>{
        res.status(500).json({
            message: "Fetching posts failed!"
        })
    });
};