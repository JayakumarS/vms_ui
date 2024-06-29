import { Directive, ElementRef, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appNumericFormat]'
})
export class NumericFormatDirectiveDirective {

  constructor(private el: ElementRef, private control: NgControl) {}

  @HostListener('blur') onBlur() {
    let value: string = this.el.nativeElement.value;
    if (value) {
      value = value;
      this.control.control.setValue(value);
    }
  }

  @HostListener('input', ['$event']) onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    let value = input.value;

    value = value.replace(/[^0-9.]/g, '');

    const decimalParts = value.split('.');
    if (decimalParts.length > 2) {
      value = `${decimalParts[0]}.${decimalParts.slice(1).join('')}`;
    }

    this.control.control.setValue(value);
  }

  @HostListener('keydown', ['$event']) onKeyDown(event: KeyboardEvent) {
    if (['Backspace', 'Tab', 'End', 'Home', 'ArrowLeft', 'ArrowRight', 'Delete'].indexOf(event.key) !== -1) {
      return;
    }

    if ((event.shiftKey || (event.key < '0' || event.key > '9')) && event.key !== '.') {
      event.preventDefault();
    }
  }

}
