import { HttpClient, HttpEventType, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, Subject, tap, throwError } from "rxjs";
import { Post } from "./post.model";

@Injectable({providedIn: 'root'})
export class PostService {
    errorSubject = new Subject<string>();

    constructor(private httpClient: HttpClient){}

    createAndStorePost(title: string, content: string) {
        const postData: Post = {title: title, content: content};
        this.httpClient.post<{name: string}>(
            'https://system-pos-2b92c-default-rtdb.firebaseio.com/posts.json',
            postData,
            {
                observe: 'body',
                // observe: 'response'
            }
        ).subscribe(responseData => {
            console.log(responseData)
        }, error => {
            this.errorSubject.next(error.message);
        });
    }

    fetchPosts(){
        return this.httpClient.get<{[key: string]: Post }>(
            'https://system-pos-2b92c-default-rtdb.firebaseio.com/posts.json',
            {
                headers: new HttpHeaders({'custom-headers': 'hello'}),
                params: new HttpParams().set('print', 'pretty')
            }
          ).pipe(
            map((responseData) => {
      
              const postsArray:Post[] = [];
              for(const key in responseData) {
                if(responseData.hasOwnProperty(key)) {
                  postsArray.push({...responseData[key], id: key});
                }  
              }
      
              return postsArray;
            }),
            catchError((errorResponse) => {
                // Catch error and do stuff
                return throwError(errorResponse);
            })
        );
    }

    deletePosts() {
        return this.httpClient.delete(
            'https://system-pos-2b92c-default-rtdb.firebaseio.com/posts.json',
            {
                observe: 'events',
                // responseType: 'text'
                responseType: 'json'
            }
        ).pipe(tap(event  => {
            console.log(event);
            if(event.type == HttpEventType.Sent) {

            }

            if(event.type == HttpEventType.Response) {
                console.log(event.body);
            }
        }));
    }
}