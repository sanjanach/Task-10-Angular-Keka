import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.css']
})
export class ContactDetailsComponent implements OnInit{

  contact:any;
  contacts:any[] = []
  id:any;
  constructor(private api:ApiService, private route: ActivatedRoute){}

  ngOnInit(){
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.api.getContact().subscribe((data) => {
        this.contacts = data;
        const selectedChat = data.find((chat: { id: any; }) => chat.id === this.id);
        if (selectedChat) {
          this.contacts = selectedChat;
        }
      });
    });
  }

  deleteContact(){
    this.api.removeContact().subscribe(() => {
      this.contacts = this.contacts.filter(c => c.id != this.id);
    });
  }


}
