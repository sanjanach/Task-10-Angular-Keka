import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {

  id:any;
  contact:any;
  contacts:any[] = []
  constructor(private api: ApiService, private route: ActivatedRoute){}

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

  displayContact(){
    this.api.postContact(this.contact)
  }
}
