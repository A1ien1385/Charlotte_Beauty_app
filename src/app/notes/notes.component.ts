import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NotesService } from '../notes.service';
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
  

  constructor(private notesService: NotesService, private fb: FormBuilder) {
    this.form = this.fb.group({
      clientName: [''],
      appointmentTime: [''],
      data: [''],
      prior: [''],
      notes: ['']
    });
  }

  ngOnInit() {
    this.fetchPosts();
  }

  onSubmit() {
    if (this.form.valid) {
      
      const formData = { ...this.form.value, data: this.form.value.data.toISOString() }; // Konwertuj datę na ISO string
      // formData.appointmentTime = +formData.appointmentTime; // Ensure the time is a number

      console.log('Form Submitted!', formData);
      
      
      this.notesService.addPost(formData).subscribe(response => {
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
    this.notesService.fetchPosts().subscribe(posts => {
      this.isFetching = false;
      this.loadedPosts = posts;
      console.log(posts);
    }, error => {
      this.isFetching = false;
      console.error('Error fetching data', error);
    });
  }

  onClearPosts() {
    // Implement functionality to clear posts if needed
    this.notesService.deletePosts().subscribe(() => {
      this.loadedPosts = [];
    });
  }

  deletePost(id: string) {
    this.notesService.deletePost(id).subscribe(() => {
      this.loadedPosts = this.loadedPosts.filter(post => post.id !== id);
    }, error => {
      console.error('Error deleting post', error);
    });
  }

  
}
