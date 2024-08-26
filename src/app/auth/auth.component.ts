import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {

  isLoginMode = true;
  pinIsValid = false;
  enteredPin: string = '';

  // Poprawny PIN do walidacji
  private validPin = '5706';

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    
    console.log(form.value);
    form.reset();
    // Reset PIN po wysłaniu formularza
  }

  checkPin() {
    // Sprawdzanie poprawności PIN-u
    this.pinIsValid = this.enteredPin === this.validPin;
    console.log(`Entered PIN: ${this.enteredPin}, IsValid: ${this.pinIsValid}`);
  }

  ngOnInit() {
    // Inicjalizacja, PIN powinien być nieważny przy ładowaniu komponentu
    this.pinIsValid = false;
  }
}
