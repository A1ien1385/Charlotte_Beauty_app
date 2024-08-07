import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Post } from '../post.model';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {
  form: FormGroup;
  loadedPosts: Post[] = [];
  isFetching = false;

  constructor(private http: HttpClient, private fb: FormBuilder) {
    this.form = this.fb.group({
      clientName: [''],
      appointmentTime: [''],
      notes: ['']
    });
  }

  ngOnInit() {
    this.fetchPosts();
  }

  onSubmit() {
    if (this.form.valid) {
      const formData = this.form.value;
      formData.appointmentTime = +formData.appointmentTime; // Ensure the time is a number

      console.log('Form Submitted!', formData);
      
      this.http.post<{ name: string }>('https://charlottebeautyapp-default-rtdb.europe-west1.firebasedatabase.app/data.json', formData)
        .subscribe(response => {
          console.log('Data saved successfully!', response);
          // Add the new post to the loadedPosts array
          this.loadedPosts.push({ ...formData, id: response.name });
          // Clear the form
          this.form.reset();
        }, error => {
          console.error('Error saving data', error);
        });
    }
  }

  onFetchPosts() {
    this.fetchPosts();
  }

  private fetchPosts() {
    this.isFetching = true;
    this.http.get<{ [key: string]: Post }>('https://charlottebeautyapp-default-rtdb.europe-west1.firebasedatabase.app/data.json')
      .pipe(map(responseData => {
        const postsArray: Post[] = [];
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            postsArray.push({ ...responseData[key], id: key });
          }
        }
        return postsArray;
      }))
      .subscribe(posts => {
        this.isFetching = false;
        this.loadedPosts = posts;
        console.log(posts);
      });
  }

  onClearPosts() {
    // Implement functionality to clear posts if needed
  }
}
