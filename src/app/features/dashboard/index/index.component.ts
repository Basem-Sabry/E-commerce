import {  Component } from '@angular/core';
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
  isLoading:boolean = false
  constructor(private _shared:SharedService) {

  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
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
          limit: res.limit,
          skip: res.skip,
        }
        this._shared.paginationObj.next(paginationObj)
        console.log('All Products',res)
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
        console.log('All cate',res)
      })
    })
  }
  getFilteredProducts() {
      this.getProducts(this.selectedCategory ,10 , 1)
  }
  addToCart(product:any) {
    console.log('Add to cart clicked',product)
  }
}
