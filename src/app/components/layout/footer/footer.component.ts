import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  isMobile: boolean;
  
  ngOnInit(): void {
    this.isMobile = window.innerWidth <= 765;
  }

}
