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
  // private postsUpdated = new Subject<Post[]>();
  private postsUpdated = new Subject<{posts:Post[], postCount:number}>();

  getPosts(postsPerPage: number, currentPage: number) {
    // return [...this.posts]; //this will create the new posts array with data without effecting the old one 
    const queryParams = `?pagesize=${postsPerPage}&page=${currentPage}`
    this.http.get<{message:string, posts: any, maxPosts: number}>('http://localhost:3000/api/posts' + queryParams)
    // .pipe(map((postData)=>{
    //   return postData.posts.map(post=>{
    //     return {
    //       title:post.title,
    //       content:post.content,
    //       id:post._id,
    //       imagePath: post.imagePath
    //     };
    //   });
    // }))

    .pipe(map((postData)=>{
      return { posts: postData.posts.map(post=>{
        return {
          title:post.title,
          content:post.content,
          id:post._id,
          imagePath: post.imagePath
        };
      }), 
      maxPosts: postData.maxPosts
      };
    }))
    // .subscribe(transformedPosts=>{
    //   this.posts =transformedPosts;
    //   this.postsUpdated.next([...this.posts]);  
    // });

    .subscribe(transformedPostData=>{
      this.posts =transformedPostData.posts;
      this.postsUpdated.next({
        posts:[...this.posts], 
        postCount: transformedPostData.maxPosts
      });  
    });
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  getPost(id: string) {
    return this.http.get<{_id: string, title:string, content: string, imagePath: string}>(
      'http://localhost:3000/api/posts/' + id
      );
  }

  addPosts(title: string, content: string, image:File) {
    const postData =  new FormData();
    postData.append("title", title) ;
    postData.append("content", content) ;
    postData.append("image", image, title) ;
    // const post: Post = {
    //   id: null,
    //   title: title,
    //   content: content
    // };
    // postId: string
    this.http.post<{message: string, post: Post}>('http://localhost:3000/api/posts', postData)
    .subscribe((responseData)=>{
      console.log(responseData);
      
    //   const post = {
    //     // id: responseData.postId, 
    //     id: responseData.post.id, 
    //     title: title, 
    //     content: content,
    //     imagePath: responseData.post.imagePath
    //   }
    // //  const id = responseData.postId;
    // //  post.id = id;
    //   this.posts.push(post);
    // this.postsUpdated.next([...this.posts]);
    this.router.navigate(["/"]);
    });
  }

  updatePost(id: string, title: string, content: string, image: File | string){
    // const post: Post = { id: id, title:title, content: content, imagePath: null};
    let postData: Post | FormData;
    if(typeof(image)=== 'object'){
      postData = new FormData();
      postData.append("id", id),
      postData.append("title", title);
      postData.append("content", content);
      postData.append("image", image, title);
    } else {
      postData= {
        id: id,
        title: title,
        content: content,
        imagePath: image
      };
    }
    this.http.put('http://localhost:3000/api/posts/' + id, postData)
    .subscribe((response)=>{
      // const updatedPosts = [...this.posts];
      // // const oldPostIndex = updatedPosts.findIndex(p=> p.id === post.id);
      // const oldPostIndex = updatedPosts.findIndex(p=> p.id === id);
      // const post: Post = {
      //   id: id,
      //   title: title,
      //   content: content,
      //   imagePath: ""
      // }
      // updatedPosts[oldPostIndex] = post;
      // this.posts = updatedPosts;
      // this.postsUpdated.next([...this.posts]);
      this.router.navigate(["/"]);
    })
  }

  // deletePost(postId:string){
  //   this.http.delete("http://localhost:3000/api/posts/" + postId)
  //   .subscribe(()=>{
  //     const updatedPosts = this.posts.filter(post=>post.id !== postId);
  //     this.posts = updatedPosts;
  //     this.postsUpdated.next([...this.posts]);
  //   })
  // }

  deletePost(postId:string){
    return this.http
    .delete("http://localhost:3000/api/posts/" + postId)
  }
}
