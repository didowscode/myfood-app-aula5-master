import { Component, OnInit } from '@angular/core';
import { RadioOption } from './../shared/radio-option/radio-option.model'
import { OrderService } from './order.service'
import { CartItem } from './../restaurant-detail/shopping-cart/shopping-cart.model'
import { Order, OrderItem } from './order.model'

@Component({
  selector: 'mf-order',
  templateUrl: './order.component.html'
})
export class OrderComponent implements OnInit {

  paymentOptions : RadioOption[] = [
      { label: 'Dinheiro', value: 'DIN'},
      { label: 'Débito', value: 'DEB'},
      { label: 'Vale refeição', value: 'VLR'}
  ]

  delivery : number = 8

  listItems(){
    return this.orderService.listItems()
  }

  decreaseQty(item : CartItem){
    this.orderService.decreaseQty(item)
  }

  increaseQty(item : CartItem){
    this.orderService.increaseQty(item)
  }

  remove(item : CartItem){
    this.orderService.remove(item)
  }

  total() : number {
    return this.orderService.total()
  }

  checkoutOrder(order : Order){
    order.items = this.listItems()
        .map((cItem : CartItem) => new OrderItem(cItem.quantity, cItem.menuItem.id))
    this.orderService.checkoutOrder(order).subscribe(orderId => {
      console.log(orderId)
    })
  }

  constructor(private orderService : OrderService) { }

  ngOnInit() {
  }

}
