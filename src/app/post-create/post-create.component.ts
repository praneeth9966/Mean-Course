import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import {Post} from '../post.model'
import { NgForm, FormGroup, FormControl, Validators} from '@angular/forms';
import { PostsService } from '../posts.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import {mimeType} from './mime-type-validator';
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
  imagePreview: string | ArrayBuffer;

  // @Output() postCreated = new EventEmitter<Post>();
 

  constructor(public postsService: PostsService, public route:ActivatedRoute) { }

  ngOnInit() {
    this.form = new FormGroup({
      'title': new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      'content': new FormControl(null, {
        validators: [Validators.required]
      }),
      'image': new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType]
      })
    });

    this.route.paramMap.subscribe((paramMap:ParamMap)=>{
      if(paramMap.has('postId')){
          this.mode = 'edit';
          this.postId = paramMap.get('postId');
          console.log(this.postId);
          this.isLoading = true;
          this.postsService.getPost(this.postId).subscribe(postData=>{
            this.isLoading = false;
            this.post = { 
              id: postData._id, 
              title: postData.title, 
              content: postData.content,
              imagePath: postData.imagePath
            };
            console.log(this.post);
            this.form.setValue({
              title: this.post.title,
              content: this.post.content,
              image: this.post.imagePath
            });
          });
         
          
      } else {
        this.mode = 'create';
        this.postId = null;
      }
    });
  }


  onImagePicked(event){
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({image:file});
    this.form.get('image').updateValueAndValidity();
    console.log(file);
    console.log(this.form);
      const reader = new FileReader();
      console.log(reader);
      
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
  }

  

  onSavePost(){
    if(this.form.invalid){
      return;
    }
    this.isLoading=true;
    if(this.mode === "create"){
      this.postsService.addPosts(this.form.value.title, this.form.value.content, this.form.value.image);
    } else {
      this.postsService.updatePost(
        this.postId, 
        this.form.value.title, 
        this.form.value.content,
        this.form.value.image);
    }
    this.form.reset();

    // const post: Post = {
    //   title: form.value.title,
    //   content: form.value.content
    //   };
      
      
      // this.postCreated.emit(post);
  }

}
