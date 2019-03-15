import { Component, OnInit, Input, OnDestroy} from '@angular/core';
import {Post} from '../post.model'
import { PostsService } from '../posts.service';
import {Subscription} from 'rxjs';
import { Router } from '@angular/router';
import { PageEvent } from '@angular/material';
@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit, OnDestroy {

  constructor(public postsService: PostsService, private router: Router) { }

  posts: Post[] = [];
  isLoading = false;
  totalPosts = 0;
  postsPerPage = 2;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10];
  private postsSub:Subscription;

  edit(postId){
    console.log(postId);
    this.router.navigateByUrl('/edit/'+ postId);
  }

  ngOnInit() {
    this.isLoading=true;
   this.postsService.getPosts(this.postsPerPage, this.currentPage);
    this.postsSub = this.postsService.getPostUpdateListener()
    // .subscribe((posts:Post[])=>{
    //   this.isLoading=false;
    //   this.posts = posts;
    // });
    .subscribe((postData:{posts:Post[], postCount: number})=>{
      this.isLoading=false;
      this.totalPosts=postData.postCount;
      this.posts = postData.posts;
    });
  }

  onChangedPage(pageData: PageEvent){
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.postsPerPage = pageData.pageSize;
    this.postsService.getPosts(this.postsPerPage, this.currentPage);
  }

  // onDelete(postId:string){
  //   this.postsService.deletePost(postId);
  // }

  onDelete(postId:string){
    this.isLoading = true;
    this.postsService.deletePost(postId).subscribe(()=>{
      this.postsService.getPosts(this.postsPerPage, this.currentPage);
    });
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }

  // posts = [
  //   {title: "First Post", content: "This is the First posts content"},
  //   {title: "Second Post", content: "This is the Second posts content"},
  //   {title: "Third Post", content: "This is the Third posts content"}
  // ];

//  @Input() posts: Post[] = [];

}
