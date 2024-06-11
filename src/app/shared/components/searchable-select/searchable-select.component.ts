import { Component, OnInit, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, FormControl, Validator, AbstractControl, ValidationErrors, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-searchable-select',
  templateUrl: './searchable-select.component.html',
  styleUrls: ['./searchable-select.component.sass'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SearchableSelectComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => SearchableSelectComponent),
      multi: true
    }
  ]
})
export class SearchableSelectComponent implements OnInit, ControlValueAccessor, Validator {
  @Input() options: { id: string, text: string }[] = [];
  @Input() placeholderLabel: string = 'Search';
  @Input() noEntriesFoundLabel: string = 'no results found';
  @Input() label: string = 'Select an option';
  @Output() selectionChange = new EventEmitter<string>();
  @Input() control: FormControl;
  @Input() required: boolean = false;
  @Input() errorMessage: string = '' || 'This field is required';

  filterCtrl = new FormControl('', this.required ? Validators.required : null);
  filteredOptions: Observable<{ id: string, text: string }[]>;

  public _value: string | null = null;
  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};

  ngOnInit() {
    if (!this.control) {
      this.control = new FormControl('', this.required ? Validators.required : null);
    }

    this.filteredOptions = this.filterCtrl.valueChanges.pipe(
      startWith(''),
      map(value => this.filterOptions(value))
    );

    this.control.valueChanges.subscribe(value => {
      this._value = value;
      const selectedOption = this.options.find(option => option.id === value);
      if (selectedOption) {
        this.filterCtrl.setValue(selectedOption.text, { emitEvent: false });
      }
    });
  }

  private filterOptions(value: string): { id: string, text: string }[] {
    const filterValue = value ? value.toLowerCase() : '';
    return this.options.filter(option => option.text.toLowerCase().includes(filterValue));
  }

  onSelectionChange(value: string) {
    this._value = value;
    this.onChange(value);
    this.onTouched();
    this.selectionChange.emit(value);
  }

  writeValue(value: any): void {
    // this._value = value;
    if (this.options && value) {
      const selectedOption = this.options.find(option => option.id === value);
      if (selectedOption) {
        //this.filterCtrl.setValue(selectedOption.text, { emitEvent: false });
        this.control.setValue(selectedOption.id, { emitEvent: false });
      }
    } else {
      this.filterCtrl.reset('', { emitEvent: false });
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    isDisabled ? this.filterCtrl.disable() : this.filterCtrl.enable();
  }

  validate(control: AbstractControl): ValidationErrors | null {
    return this.required && !control.value ? { required: true } : null;
  }

  getErrorMessage() {
    if (this.control.hasError('required')) {
      return this.errorMessage;
    }
    return this.errorMessage;
  }
}