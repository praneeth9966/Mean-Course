const express = require('express');

const router = express.Router();

const Post = require('../models/post');
const checkAuth = require('../middleware/check-auth');

router.post("", checkAuth, (req,res,next)=>{
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
    });
});

router.get('', (req, res, next)=>{
    Post.find()
    .then(result=>{
        res.status(200).json({
            message: 'Posts Fetched Successfully',
            posts: result
         });
    });
});

router.put("/:id", checkAuth, (req, res, next)=>{
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
    Post.updateOne({_id:req.params.id, creator: req.userData.userId}, post).then(result=>{
        if(result.nModified > 0) {
            res.status(200).json({message: "Update Successful!"});
        } else {
            res.status(401).json({message: "Not Authorized!"});
        }
    })
});

router.get('/:id', (req,res,next)=>{
    Post.findById(req.params.id).then(post=>{
        if(post){
            res.status(200).json(post);
        } else {
            res.status(404).json({ message: 'Post not found!'})
        }
    })
});

router.delete('/:id', checkAuth, (req,res,next)=>{
    Post.deleteOne({_id:req.params.id, creator: req.userData.userId}).then(result=>{
        console.log(result);
        if(result.n > 0) {
            res.status(200).json({message: "Deletion Successful!"});
        } else {
            res.status(401).json({message: "Not Authorized!"});
        }
    });
    
})

module.exports = router;