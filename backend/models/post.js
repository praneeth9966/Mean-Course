const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    StartDate: { type:String, required:true },
    EndDate: { type:String, required:true },
    PlannedBandwidth: { type:String},
    ActualBandwidth: { type:String },
    UserStory: { type:String, required:true },
    StoryType: { type:String, required:true },
    StoryStatus: { type:String, required:true },
    activity: { type:String, required:true },
    ActivityStatus: { type:String, required:true },
    myDate: { type:String},
    PlannedStoryPoint: { type:String},
    ActualStoryPoint: { type:String},
    ConsumedSP: { type:String},
    variance: { type:String},
    StoryMaturity: { type:String, required:true },
    ActivityStartDate: { type:String, required:true },
    ActivityEndDate: { type:String, required:true },
    Resource: { type:String},
    PercentageCompletion: { type:String},
    AccountableHour: { type:String, required:true },
    ReasonOfVariance: { type:String},
    CorrectiveMeasures: { type:String},
    RiskIfAny: { type:String},
    creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required:true}
})

module.exports = mongoose.model('Post', postSchema);