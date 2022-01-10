import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from './post.model';
import { PostService } from './post.service';

@Component({
  selector: 'app-http-request',
  templateUrl: './http-request.component.html',
  styleUrls: ['./http-request.component.css']
})
export class HttpRequestComponent implements OnInit, OnDestroy {

  loadedPosts:Post[] = [];
  error = null;
  private errorSubscription: Subscription;

  constructor(private postService: PostService) {}
 

  ngOnInit() {
    this.postService.fetchPosts().subscribe(posts => {
      console.log(posts);
      this.loadedPosts = posts;
    }, error => {
      this.error = error.message;
    });

    this.errorSubscription = this.postService.errorSubject.subscribe(errorMessage => {
      this.error = errorMessage;
    });
  }

  ngOnDestroy(): void {
    this.errorSubscription.unsubscribe();
  }

  onCreatePost(postData: Post) {
    // Send Http request
    console.log(postData);
    this.postService.createAndStorePost(postData.title, postData.content)
  }

  onFetchPosts() {
    this.postService.fetchPosts().subscribe(posts => {
      console.log(posts);
      this.loadedPosts = posts;
    }, error => {
      this.error = error.message;
    });
  }

  onClearPosts() {
    this.postService.deletePosts().subscribe(() => {
      this.loadedPosts = [];
    });
  }

}
