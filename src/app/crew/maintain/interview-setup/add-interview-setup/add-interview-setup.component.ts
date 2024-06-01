import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-interview-setup',
  templateUrl: './add-interview-setup.component.html',
  styleUrls: ['./add-interview-setup.component.sass']
})
export class AddInterviewSetupComponent implements OnInit {
  addEditorFlag: boolean;
  editorList: any = [];
  constructor() { }

  ngOnInit(): void {

    this.editorList.push([])
  }
  config1 = {
    //startupFocus : true,
    tabSpaces: 10,
    extraPlugins: 'smiley,justify,indentblock,colordialog,font,exportpdf,pagebreak',
    font_names: 'कृति देवी/Kruti;Andale Mono;Arial; Arial Black; Arial Narrow; Comic Sans MS; Courier New; Georgia; Helvetica; Impact; Tahoma; Terminal; Times New Roman; Verdana;',
    removeButtons: 'Paste,PasteText,PasteFromWord',
    removePlugins: 'elementspath',
  }

  addEditor(){
       this.editorList.push([]);
    
  }
}
