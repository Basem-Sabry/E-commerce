import {  Component } from '@angular/core';
import { debounceTime } from 'rxjs';
import { SharedService } from 'src/app/core/services/shared.service';
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss',

})
export class IndexComponent  {
  categoryList: string[] = []
  filteredProducts: any[] = []
  selectedCategory:string = ''
  isLoading: boolean = false
  searchText:string = ''
  constructor(private _shared:SharedService) {

  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this._shared.searchSubject.pipe(debounceTime(300)).subscribe((searchText) => {
      if (searchText) {
        this.searchText = searchText
        this.searchProducts(searchText)
      }
      else {
        searchText == '' ? this.getProducts('all',10,1):''
      }
  });
    this.getProducts('all', 10, 1)
    this.getCategories()

  }
  getProducts(category: string, limit: number, skip: number, search?: string) {
    this.isLoading = true
    this._shared.getProducts(category,limit,skip,search).subscribe({
      next: (res => {
        this.filteredProducts = res.products
        this.isLoading = false

        const paginationObj = {
          total: res.total,
          limit: 10,
          skip: res.skip,
        }
        this._shared.paginationObj.next(paginationObj)
      }),
      error: (err => {
        this.isLoading = false

      })
    })
  }
  getCategories() {
    this._shared.getCategories().subscribe({
      next: (res => {

        this.categoryList = res
         this.categoryList.unshift('all')
        this.selectedCategory = 'all'
      })
    })
  }
  getFilteredProducts() {
      this.getProducts(this.selectedCategory ,10 , 1)
  }
  addToCart(product: any) {
    this._shared.myCart.next(product)
    this._shared.toasterSubject.next({
      title:'Success',
      message: 'Product added to cart',
      type: 'fi fi-rr-cloud-check',
      state:'in'

    })
  }
  searchProducts(searchText: string,paginationObj?:any ) {
    this.isLoading = true

    this._shared.searchProduct(10,paginationObj?.skip ? paginationObj?.skip : 1,searchText).subscribe({
      next: (res => {
        this.isLoading = false
        this.filteredProducts = res.products

        const paginationObj = {
          total: res.total,
          limit: 10,
          skip: res.skip,
        }
        this._shared.paginationObj.next(paginationObj)
      }),
      error: (err => {
        this.isLoading = false

      })
      })
  }

  updateProducts(e: any) {
    if (this.searchText) {
      this.searchProducts(this.searchText,e)
    }
    else {

      this.getProducts(this.selectedCategory,e.limit,e.skip,this.searchText)
    }
  }
}
