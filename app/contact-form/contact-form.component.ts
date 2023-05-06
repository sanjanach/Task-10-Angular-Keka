import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { concatAll } from 'rxjs';
import { ApiService } from '../api.service';


@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit{

  id:any;
  contact:any;
  contacts: any[]=[]

  constructor(private api: ApiService, private route:ActivatedRoute){}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    })

    this.contact = this.api.getContact();
    
    this.editContact();
  }

  contactForm = new FormGroup({
    contactName : new FormControl('' , [Validators.required]),
    contactEmail : new FormControl('', [Validators.required, Validators.email]),
    contactMobile : new FormControl('', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
    contactLandline : new FormControl(),
    contactWebsite : new FormControl(),
    contactAddress : new FormControl()
  })

  
  get contactName(){
    return this.contactForm.get('contactName');
  }

  get contactEmail(){
    return this.contactForm.get('contactEmail');
  }

  get contactMobile(){
    return this.contactForm.get('contactMobile')
  }

  get contactLandline(){
    return this.contactForm.get('contactLandline')
  }
  get contactWebsite(){
    return this.contactForm.get('contactWebsite')
  }
  get contactAddress(){
    return this.contactForm.get('contactAddress')
  }
  
  addContact(){
    this.api.postContact(this.contactForm.value)
    .subscribe({
      next: (res) =>{
        this.contactForm.reset()
      }
    })
  }

  editContact(){

    const user = this.contacts[this.id];

    this.api.postContact(this.contactForm.value)
    .subscribe({
      next: (res) =>{
        if (this.contact) {
          console.log('hi')
          this.contactForm.setValue({
            contactName: user.contactName,
            contactEmail: user.contactEmail,
            contactMobile: user.contactMobile,
            contactLandline: user.contactLandline,
            contactWebsite: user.contactWebsite,
            contactAddress: user.contactAddress
          });
        }
        console.log('ygfbe')
      }
      
    })
  }  
}