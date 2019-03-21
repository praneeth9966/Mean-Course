import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Post } from '../post.model'
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { PostsService } from '../posts.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
})
export class PostCreateComponent implements OnInit {

  enteredTitle = '';
  enteredContent = '';
  private mode = 'create';
  private postId: string;
  public post: Post;
  isLoading = false;
  form: FormGroup;

  constructor(public postsService: PostsService, public route: ActivatedRoute) { }

  ngOnInit() {
    this.form = new FormGroup({
      'StartDate': new FormControl(null, {
        validators: [Validators.required]
      }),
      'EndDate': new FormControl(null, {
        validators: [Validators.required]
      }),
      'PlannedBandwidth': new FormControl(null, {
        validators: [Validators.required]
      }),
      'ActualBandwidth': new FormControl(null),

      'UserStory': new FormControl(null, {
        validators: [Validators.required]
      }),
      'StoryType': new FormControl(null, {
        validators: [Validators.required]
      }),
      'StoryStatus': new FormControl(null, {
        validators: [Validators.required]
      }),
      'activity': new FormControl(null, {
        validators: [Validators.required]
      }),
      'ActivityStatus': new FormControl(null, {
        validators: [Validators.required]
      }),

      'myDate': new FormControl(null),

      'PlannedStoryPoint': new FormControl(null),

      'ActualStoryPoint': new FormControl(null),

      'ConsumedSP': new FormControl(null),

      'variance': new FormControl(null),

      'StoryMaturity': new FormControl(null, {
        validators: [Validators.required]
      }),
      'ActivityStartDate': new FormControl(null, {
        validators: [Validators.required]
      }),
      'ActivityEndDate': new FormControl(null, {
        validators: [Validators.required]
      }),

      'Resource': new FormControl(null),

      'PercentageCompletion': new FormControl(null),

      'AccountableHour': new FormControl(null, {
        validators: [Validators.required]
      }),

      'ReasonOfVariance': new FormControl(null),

      'CorrectiveMeasures': new FormControl(null),

      'RiskIfAny': new FormControl(null),

    });

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        console.log(this.postId);
        this.isLoading = true;
         this.postsService.getPost(this.postId).subscribe(postData=>{
          this.isLoading = false;
           this.post = {
             id: postData._id,
            StartDate: postData.StartDate,
            EndDate: postData.EndDate,
            PlannedBandwidth: postData.PlannedBandwidth,
            ActualBandwidth: postData.ActualBandwidth,
            UserStory: postData.UserStory,
            StoryType: postData.StoryType,
            StoryStatus: postData.StoryStatus,
            activity: postData.activity,
            ActivityStatus: postData.ActivityStatus,
            myDate: postData.myDate,
            PlannedStoryPoint: postData.PlannedStoryPoint,
            ActualStoryPoint: postData.ActualStoryPoint,
            ConsumedSP: postData.ConsumedSP,
            variance: postData.variance,
            StoryMaturity: postData.StoryMaturity,
            ActivityStartDate: postData.ActivityStartDate,
            ActivityEndDate: postData.ActivityEndDate,
            Resource: postData.Resource,
            PercentageCompletion: postData.PercentageCompletion,
            AccountableHour: postData.AccountableHour,
            ReasonOfVariance: postData.ReasonOfVariance,
            CorrectiveMeasures: postData.CorrectiveMeasures,
            RiskIfAny: postData.RiskIfAny,
            creator: postData.creator
           }
         });
      } else {
        this.mode = 'create';
        this.postId = null;
      }
    });
  }

  onSavePost() {
    if (this.form.invalid) {
      return;
    }
    if (this.mode === "create") {
      this.postsService.addPosts(this.form.value.StartDate, this.form.value.EndDate, this.form.value.PlannedBandwidth,
        this.form.value.ActualBandwidth, this.form.value.UserStory, this.form.value.StoryType, this.form.value.StoryStatus, this.form.value.activity,
        this.form.value.ActivityStatus, this.form.value.myDate, this.form.value.PlannedStoryPoint,
        this.form.value.ActualStoryPoint, this.form.value.ConsumedSP, this.form.value.variance, this.form.value.StoryMaturity,
        this.form.value.ActivityStartDate, this.form.value.ActivityEndDate, this.form.value.Resource,
        this.form.value.PercentageCompletion, this.form.value.AccountableHour, this.form.value.ReasonOfVariance,
        this.form.value.CorrectiveMeasures, this.form.value.RiskIfAny);
    } else {
      this.postsService.updatePost(
        this.postId,
        this.form.value.StartDate, this.form.value.EndDate, this.form.value.PlannedBandwidth,
        this.form.value.ActualBandwidth, this.form.value.UserStory, this.form.value.StoryType, this.form.value.StoryStatus, this.form.value.activity,
        this.form.value.ActivityStatus, this.form.value.myDate, this.form.value.PlannedStoryPoint,
        this.form.value.ActualStoryPoint, this.form.value.ConsumedSP, this.form.value.variance, this.form.value.StoryMaturity,
        this.form.value.ActivityStartDate, this.form.value.ActivityEndDate, this.form.value.Resource,
        this.form.value.PercentageCompletion, this.form.value.AccountableHour, this.form.value.ReasonOfVariance,
        this.form.value.CorrectiveMeasures, this.form.value.RiskIfAny
      );
    }
    this.form.reset();
  }

}

