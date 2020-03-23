import { Component } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  page = 0;
  resultsCount = 10;
  data = [];
  bulkEdit = false;
  sortDirection = 0;
  sortKey = null;
  edit = {};
  totalPages = 3;

  constructor(private http: HttpClient) {
    this.loadData();
  }


  loadData() {
    const id = 2;
    this.http.get<any[]>(`http://localhost:8080/api/findAllTypes/${id}/?page=${this.page}&size=${this.resultsCount}`).subscribe(res => {
      this.data = res;
      this.sort();
    });
  }

  sortBy(name: string) {
    this.sortKey = name;
    this.sortDirection++;
    this.sort();
  }

  sort() {
     if (this.sortDirection === 1) {
        this.data = this.data.sort((a, b) => {
            const valA = a[this.sortKey];
            const valB = b[this.sortKey];
            return valA.localeCompare(valB);
        });
     } else if (this.sortDirection === 2) {
       this.data = this.data.sort((a, b) => {
         const valA = a[this.sortKey];
         const valB = b[this.sortKey];
         return valB.localeCompare(valA);
       });
     } else {
       this.sortDirection = 0;
       this.sortKey = null;
     }
  }

  toggleBulkDelete() {
     const toDelete = Object.keys(this.edit);
     const reallyDelete = toDelete.filter(index => this.edit[index]).map(key => +key);
     while (reallyDelete.length) {
       this.data.splice(reallyDelete.pop(), 1);
     }
     this.toggleBulkEdit();
  }

  toggleBulkEdit() {
      this.bulkEdit = !this.bulkEdit;
      this.edit = {};
  }

  removeRow(i: number) {
    this.data.splice(i, 1);
  }

  nextPage() {
    this.page++;
    this.loadData();
  }
  prevPage() {
    this.page--;
    this.loadData();
  }
  goFirst() {
    this.page = 0;
    this.loadData();
  }
  goLast() {
    this.page = this.totalPages - 1;
    this.loadData();
  }
}
