import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Post } from './post.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  private baseUrl = 'https://charlottebeautyapp-default-rtdb.europe-west1.firebasedatabase.app/data.json';

  constructor(private http: HttpClient) {}

  addPost(postData: Post): Observable<{ name: string }> {
    return this.http.post<{ name: string }>(this.baseUrl, postData);
  }

  fetchPosts(): Observable<Post[]> {
    return this.http.get<{ [key: string]: Post }>(this.baseUrl)
      .pipe(map(responseData => {
        const postsArray: Post[] = [];
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            postsArray.push({ ...responseData[key], id: key });
          }
        }
        return postsArray;
      }));
  }

  deletePosts() {
    return this.http.delete('https://charlottebeautyapp-default-rtdb.europe-west1.firebasedatabase.app/data.json');
  }

  deletePost(id: string) {
    return this.http.delete(`https://charlottebeautyapp-default-rtdb.europe-west1.firebasedatabase.app/data/${id}.json`);
  }
}
