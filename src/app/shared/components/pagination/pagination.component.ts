import { Component, EventEmitter, Input, input, Output, SimpleChanges } from '@angular/core';
import { SharedService } from 'src/app/core/services/shared.service';


@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss'
})
export class PaginationComponent {
  @Output() changePageEvent = new EventEmitter()

  @Input() loadingState: any;


  pointers = {start:0 , end:3}

  isButtonDisabled = false;

  isLinksDisable  = false

  paginationOptionsData: any;
  pagesLinks:any = []
  perPageValue = 20;
  pagesLinksVisible = []
  isVisibleStart = 0;
  isVisibleEnd = 3;


  constructor(private _shared : SharedService) {

  }

  ngOnInit(): void {
    this._shared.paginationObj.subscribe({
        next: (res:any) => {

            if (res) {
              this.paginationOptionsData = res;
              const pagesNumber = Math.ceil(this.paginationOptionsData?.total / this.paginationOptionsData?.limit)
              this.pagesLinks = Array(pagesNumber).fill(null).map((acc, i) => i + 1)
                if (this.paginationOptionsData?.skip > pagesNumber) {
                  this.pagesLinksVisible = this.pagesLinks
                }
                else {
                  if (this.pagesLinks.length > 3) {

                    this.pagesLinksVisible = this.pagesLinks.slice(this.pointers.start , this.pointers.end)
                  }
                  else {
                  this.pagesLinksVisible = this.pagesLinks

                  }

                }
                this.isButtonDisabled = false;
                this.isLinksDisable = false
            }

        }
    })
}

get totalPages(): number {
  return Math.ceil(this.paginationOptionsData?.total / this.paginationOptionsData?.limit);
}

  nextPage() {
    const pagesNumber = Math.ceil(this.paginationOptionsData?.total/this.paginationOptionsData?.limit)

  if (this.paginationOptionsData.skip < pagesNumber  ) {

      this.paginationOptionsData.skip = this.paginationOptionsData.skip + 1;

      if (this.paginationOptionsData.skip > this.pagesLinksVisible[this.pagesLinksVisible.length - 2] ) {
          // this.isNextDisabled = true
          if (this.paginationOptionsData.skip !== this.pagesLinks[this.pagesLinks.length - 1]) {
              this.nextPointer()
          }
      }



      this.isButtonDisabled = true;
      this.isLinksDisable = true
      this.changePageEvent.emit(this.paginationOptionsData)
      this.pagesLinksVisible = this.pagesLinks.slice(this.pointers.start , this.pointers.end)
  }
}

prevPage() {
  if (this.paginationOptionsData.skip > 1) {
      this.paginationOptionsData.skip = this.paginationOptionsData.skip - 1;
      if (this.paginationOptionsData.skip < this.pagesLinksVisible[1]) {
          if (this.paginationOptionsData.skip >= this.pagesLinks[1]) {
              this.prevPointer()
          }
      }




      this.isButtonDisabled = true;
      this.isLinksDisable = true
      this.changePageEvent.emit(this.paginationOptionsData)
      this.pagesLinksVisible = this.pagesLinks.slice(this.pointers.start , this.pointers.end)
  }
}




setSelectedPage(page: any) {

  this.isButtonDisabled = true
  this.isLinksDisable = true
    this.paginationOptionsData.skip = page;
  this.changePageEvent.emit(this.paginationOptionsData)
  if (this.pagesLinksVisible[this.pagesLinksVisible.length - 1] == page && page != this.pagesLinks[this.pagesLinks.length - 1]) {
      this.nextPointer()
  }

  if (this.pagesLinksVisible[0] == page && page !== this.pagesLinks[0] ) {
      this.prevPointer()
  }

  if (page == this.pagesLinks[this.pagesLinks.length - 1]) {
      this.pagesLinksVisible = this.pagesLinks.slice(this.pagesLinks.length - 3)
      this.pointers.start = this.pagesLinks.length - 3
      this.pointers.end =this.pagesLinks.length

  }

}

nextPointer() {
  this.pointers.start++;
  this.pointers.end++;
}
prevPointer() {
  this.pointers.start--;
  this.pointers.end--;
}
}
