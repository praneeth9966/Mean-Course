import { Injectable } from '@angular/core';
import {Post} from './post.model';
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http'
import {map} from 'rxjs/operators';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http: HttpClient, private router: Router) { }

  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();
  // private postsUpdated = new Subject<{posts:Post[], postCount:number}>();

  getPosts() {
    this.http.get<{ message: string, posts: any }>(
      'http://localhost:3000/api/posts'
      )
      .pipe(map((postData)=>{
        return postData.posts.map(post=>{
          return {
        StartDate: post.StartDate,
        EndDate: post.EndDate,
        PlannedBandwidth: post.PlannedBandwidth,
        ActualBandwidth: post.ActualBandwidth,
        UserStory: post.UserStory,
        StoryType: post.StoryType,
        StoryStatus: post.StoryStatus,
        activity: post.activity,
        ActivityStatus: post.ActivityStatus,
        myDate: post.myDate,
        PlannedStoryPoint: post.PlannedStoryPoint,
        ActualStoryPoint: post.ActualStoryPoint,
        ConsumedSP: post.ConsumedSP,
        variance: post.variance,
        StoryMaturity: post.StoryMaturity,
        ActivityStartDate: post.ActivityStartDate,
        ActivityEndDate: post.ActivityEndDate,
        Resource: post.Resource,
        PercentageCompletion: post.PercentageCompletion,
        AccountableHour: post.AccountableHour,
        ReasonOfVariance: post.ReasonOfVariance,
        CorrectiveMeasures: post.CorrectiveMeasures,
        RiskIfAny: post.RiskIfAny,
        id: post._id,
        creator: post.creator
          }
        });
      }))
    .subscribe(transformedPosts=>{
      console.log(transformedPosts);
      this.posts = transformedPosts;
      this.postsUpdated.next([...this.posts]);
    });
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  getPost(id: string) {
    // return {...this.posts.find(p=>p.id === id)};
    return this.http.get<{_id: string, StartDate: string, EndDate:string,PlannedBandwidth:string, ActualBandwidth:string,UserStory:string,StoryType:string, StoryStatus:string,activity:string, ActivityStatus:string, myDate:string, PlannedStoryPoint:string,ActualStoryPoint:string, ConsumedSP:string, variance:string, StoryMaturity: string, ActivityStartDate:string,ActivityEndDate:string, Resource: string, PercentageCompletion:string, AccountableHour: string, ReasonOfVariance:string,CorrectiveMeasures:string, RiskIfAny: string, creator: string }>(
      'http://localhost:3000/api/posts/' + id
      );
  }

  addPosts(StartDate:string, EndDate:string, PlannedBandwidth:string, ActualBandwidth:string,UserStory:string,
    StoryType:string, StoryStatus:string, activity:string, ActivityStatus:string, myDate:string, PlannedStoryPoint:string,
    ActualStoryPoint:string, ConsumedSP:string, variance:string, StoryMaturity: string, ActivityStartDate:string,
    ActivityEndDate:string, Resource: string, PercentageCompletion:string, AccountableHour: string, ReasonOfVariance:string,
    CorrectiveMeasures:string, RiskIfAny: string){
      const sprintData: Post = {
        id:null,
        StartDate: StartDate,
        EndDate: EndDate,
        PlannedBandwidth: PlannedBandwidth,
        ActualBandwidth: ActualBandwidth,
        UserStory: UserStory,
        StoryType: StoryType,
        StoryStatus: StoryStatus,
        activity: activity,
        ActivityStatus: ActivityStatus,
        myDate: myDate,
        PlannedStoryPoint: PlannedStoryPoint,
        ActualStoryPoint: ActualStoryPoint,
        ConsumedSP: ConsumedSP,
        variance: variance,
        StoryMaturity: StoryMaturity,
        ActivityStartDate: ActivityStartDate,
        ActivityEndDate: ActivityEndDate,
        Resource: Resource,
        PercentageCompletion: PercentageCompletion,
        AccountableHour: AccountableHour,
        ReasonOfVariance: ReasonOfVariance,
        CorrectiveMeasures: CorrectiveMeasures,
        RiskIfAny: RiskIfAny,
        creator: null
      }
      this.http.post<{message: string, postId: string}>('http://localhost:3000/api/posts', sprintData)
      .subscribe((responseData)=>{
        const id = responseData.postId;
        sprintData.id = id;
        console.log(responseData);
        this.posts.push(sprintData);
        console.log(this.posts);
        this.postsUpdated.next([...this.posts]);
        this.router.navigate(["/"]);
      });  
  }

  updatePost(id: string, StartDate:string, EndDate:string, PlannedBandwidth:string, ActualBandwidth:string,UserStory:string,
    StoryType:string, StoryStatus:string, activity:string, ActivityStatus:string, myDate:string, PlannedStoryPoint:string,
    ActualStoryPoint:string, ConsumedSP:string, variance:string, StoryMaturity: string, ActivityStartDate:string,
    ActivityEndDate:string, Resource: string, PercentageCompletion:string, AccountableHour: string, ReasonOfVariance:string,
    CorrectiveMeasures:string, RiskIfAny: string) {
      const post: Post = {
        id: id,
        StartDate: StartDate,
        EndDate: EndDate,
        PlannedBandwidth: PlannedBandwidth,
        ActualBandwidth: ActualBandwidth,
        UserStory: UserStory,
        StoryType: StoryType,
        StoryStatus: StoryStatus,
        activity: activity,
        ActivityStatus: ActivityStatus,
        myDate: myDate,
        PlannedStoryPoint: PlannedStoryPoint,
        ActualStoryPoint: ActualStoryPoint,
        ConsumedSP: ConsumedSP,
        variance: variance,
        StoryMaturity: StoryMaturity,
        ActivityStartDate: ActivityStartDate,
        ActivityEndDate: ActivityEndDate,
        Resource: Resource,
        PercentageCompletion: PercentageCompletion,
        AccountableHour: AccountableHour,
        ReasonOfVariance: ReasonOfVariance,
        CorrectiveMeasures: CorrectiveMeasures,
        RiskIfAny: RiskIfAny,
        creator: null
      };
      this.http.put('http://localhost:3000/api/posts/' + id, post)
      .subscribe(response=>{
        console.log(response);
        const updatedPosts = [...this.posts];
        const oldPostIndex = updatedPosts.findIndex(p=>p.id === post.id);
        updatedPosts[oldPostIndex] = post;
        this.posts = updatedPosts;
        this.postsUpdated.next([...this.posts]);
        this.router.navigate(["/"]);
      })
    }

  deletePost(postId:string){
     this.http
    .delete("http://localhost:3000/api/posts/" + postId).subscribe((response)=>{
      console.log(response);
      const updatedPosts = this.posts.filter(post=>post.id !== postId);
          this.posts = updatedPosts;
          this.postsUpdated.next([...this.posts]);
    })
  }
}
