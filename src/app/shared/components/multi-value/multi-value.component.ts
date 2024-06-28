import { Component, OnInit, Input, Output, EventEmitter, forwardRef, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, FormControl, Validator, AbstractControl, ValidationErrors, Validators } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { map, startWith, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-multi-value',
  templateUrl: './multi-value.component.html',
  styleUrls: ['./multi-value.component.sass'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MultiValueComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => MultiValueComponent),
      multi: true
    }
  ]
})
export class MultiValueComponent implements OnInit, OnChanges, OnDestroy, ControlValueAccessor, Validator {
  @Input() options: { id: string, text: string }[] = [];
  @Input() placeholderLabel: string = 'Search';
  @Input() noEntriesFoundLabel: string = 'No results found';
  @Input() label: string = '';
  @Output() selectionChange = new EventEmitter<string>();
  @Input() control: FormControl;
  @Input() required: boolean = false;
  @Input() disabled: boolean = false;
  @Input() errorMessage: string = '';
  selectedValue: any;

  filterCtrl = new FormControl('', this.required ? Validators.required : null);
  filteredOptions: Observable<{ id: string, text: string }[]>;
  private destroy$ = new Subject<void>();

  public _value: string | null = null;
  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};

  ngOnInit() {
    if (!this.control) {
      this.control = new FormControl('', this.required ? Validators.required : null);
    }

    this.filteredOptions = this.filterCtrl.valueChanges.pipe(
      startWith(''),
      map(value => this.filterOptions(value)),
      takeUntil(this.destroy$)
    );

    this.control.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(value => {
      this._value = value;
      const selectedOption = this.options.find(option => option.id === value);
      if (selectedOption) {
        this.filterCtrl.setValue(selectedOption.text, { emitEvent: false });
      }
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.options) {
      this.filterCtrl.setValue(this.filterCtrl.value); // Trigger filter to update options
    }
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
    this.selectedValue = value;

  }

  writeValue(value: any): void {
    if (this.options && value) {
      const selectedOption = this.options.find(option => option.id === value);
      if (selectedOption) {
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
    return '';
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
