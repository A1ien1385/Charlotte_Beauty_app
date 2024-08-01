import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent {
  form: FormGroup;
  loadedPosts = [];

  constructor(private http: HttpClient, private fb: FormBuilder) {
    this.form = this.fb.group({
      clientName: [''],
      appointmentTime: [''],
      notes: ['']
    });
  }

  ngOnInit() {
    this.fetchPosts();
    // 
  }

  onSubmit() {
    if (this.form.valid) {
      const formData = this.form.value;
      console.log('Form Submitted!', formData);
      
      this.http.post('https://charlottebeautyapp-default-rtdb.europe-west1.firebasedatabase.app/data.json', formData)
        .subscribe(response => {
          console.log('Data saved successfully!', response);
        }, error => {
          console.error('Error saving data', error);
        });
    }
  }

  onFetchPosts() {
    this.fetchPosts();
  }


  private fetchPosts() {
    this.http.get('https://charlottebeautyapp-default-rtdb.europe-west1.firebasedatabase.app/data.json').subscribe(posts => {
      console.log(posts);
    })
  }
}

