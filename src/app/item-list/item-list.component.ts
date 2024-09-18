import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {
  items: any[] = [];
  filteredItems: any[] = [];
  filterText: string = '';
  sortKey: string = 'setup'; 
  sortDirection: boolean = true; 

  constructor(private http: HttpClient) {}

  ngOnInit(): void {

    this.http.get<any[]>('https://official-joke-api.appspot.com/jokes/random/10')
      .subscribe(data => {
        this.items = data;
        this.filteredItems = [...this.items];
      });
  }

  // Filter based on joke 'type'
  filterItems() {
    this.filteredItems = this.items.filter(item =>
      item.type.toLowerCase().includes(this.filterText.toLowerCase())
    );
  }

  // Sort jokes based on selected key ('setup' or 'id')
  sortItems(key: string) {
    this.sortKey = key;
    this.sortDirection = !this.sortDirection;
    this.filteredItems.sort((a, b) => {
      const aValue = a[key];
      const bValue = b[key];

      if (aValue < bValue) {
        return this.sortDirection ? -1 : 1;
      } else if (aValue > bValue) {
        return this.sortDirection ? 1 : -1;
      }
      return 0;
    });
  }
}
