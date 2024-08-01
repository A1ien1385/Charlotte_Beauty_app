import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent {
  form: FormGroup;

  constructor(private http: HttpClient, private fb: FormBuilder) {
    this.form = this.fb.group({
      clientName: [''],
      appointmentTime: [''],
      notes: ['']
    });
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
}

