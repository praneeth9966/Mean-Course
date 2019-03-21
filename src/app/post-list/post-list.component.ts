import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Post } from '../post.model'
import { PostsService } from '../posts.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit, OnDestroy{

  constructor(public postsService: PostsService, private router: Router, private authService: AuthService) { }

  @Input() editable: boolean = false;

  butDisabled: boolean = true;

  userIsAuthenticated = false;
  userId: string;

  private postsSub: Subscription;
  private authStatusSub: Subscription;

  posts: Post[] = [];
  isLoading = false;

  edit(postId) {
    console.log(postId);
    this.router.navigateByUrl('/edit/' + postId);
  }

  ngOnInit() {
    this.isLoading = true;
    this.postsService.getPosts();
    this.userId = this.authService.getUserId();
    this.postsSub = this.postsService.getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        this.isLoading = false;
        this.posts = posts;
      });

      this.userIsAuthenticated = this.authService.getIsAuth();

      this.authStatusSub = this.authService.getAuthStatusListener().subscribe(isAuthenticated=>{
        this.userIsAuthenticated = isAuthenticated;
        this.userId = this.authService.getUserId();
      });
  }

  
  onDelete(postId: string) {
    this.isLoading = true;
    this.postsService.deletePost(postId);
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }
}
