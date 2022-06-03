import { HttpClient, HttpEventType, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Post } from "./post.model";
import { map, catchError, tap } from 'rxjs/operators';
import { Subject, throwError } from "rxjs";

@Injectable({ providedIn: 'root' })
export class PostsService {
  error = new Subject<String>();
  endpoint = 'https://';

  constructor(private http: HttpClient) {}

  createAndStorePost(title: string, content: string) {
    const postData: Post = {
      title: title,
      content: content
    };
    // Send Http request
    // onCreatePost(postData: { title: string; content: string }) {
    this.http
    .post<{name: string}>( // Name is from the response => {name: "-N3Z4_QVyAYMK-DGp_3k"}
      this.endpoint,
      postData,
      {
        observe: 'response'
      }
    )
    .subscribe(responseData => {
      console.log(responseData);
    }, error => {
      this.error.next(error.message);
    });
  }

  fetchPosts() {
    //MUltiple params
    let searchParams = new HttpParams();
    searchParams = searchParams.append('print', 'pretty');
    searchParams = searchParams.append('custom', 'key');

    return this.http
    .get<{ [key: string]: Post }>(this.endpoint,
      {
        headers: new HttpHeaders({'Custom-Header':'Hello'}),
        // params: new HttpParams().set('print', 'pretty'),
        params: searchParams,
        responseType: 'json'
      })
    .pipe(
      map(responseData => {
      // map((responseData: { [key: string]: Post }) => {
        const postsArray: Post[] = [];
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            postsArray.push({ ...responseData[key], id: key });
          }
        }
        return postsArray;
      }),
      catchError(errorRes => {
        //Send to analytics
        return throwError(errorRes);
      })
    );
  }

  deletePosts() {
    return this.http.delete(
      this.endpoint,
      {
        observe: 'events',
        responseType: 'json'
      }
    ).pipe(tap(event => {
      console.log(event);
      if(event.type === HttpEventType.Sent) {
        // ...
      }
      if (event.type === HttpEventType.Response) {
        console.log(event.body);
      }
    }));
  }
}