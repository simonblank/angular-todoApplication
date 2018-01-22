import { Component,Directive, OnInit} from '@angular/core';






@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  inputValue: string = "";
  selectedItem = "";

  selectList =[
      {text: 'checked'   },
      {text: 'unChecked'   },
      {text: 'all'   }
  ];

   editedItem = null;
   tempList=[];
   todos =[
    {text: 'i have todo 1 thing ' , checked:false ,editable:false},
    {text: 'i have todo 1 thing ' , checked:true ,editable:false},
    {text: 'i have todo 1 thing ' , checked:false ,editable:false},
    {text: 'i have todo 2 things' , checked:true ,editable:false},
    {text: 'i have todo 3 things' , checked:false ,editable:false},
    {text: 'i have todo 5 things' , checked:false ,editable:false},
    {text: 'i have todo 8 things' , checked:true  ,editable:false}
  ];

  setEditable = function(item){
    item.editable=true;
    this.editedItem = item;
  }

  doneEditing = function(item){
      item.editable=false;
      this.editedItem = null;
      this.sortList();

  }
  sortList(){
      // sort list alphabetically
      this.todos.sort((a, b) => {
      if (a.text < b.text) return -1;
      else if (a.text > b.text) return 1;
      else return 0;
    });
  }

  selectHandler(){
    if(this.selectedItem =="unChecked")
      this.sortshow_unChecked();

    else if(this.selectedItem =="checked")
      this.sortshow_Checked();

    else if(this.selectedItem =="all")
        this.showAll();
  }

  checkAll(){
    this.todos.map(item=> item.checked=true);
  }

  unCheckAll(){
    this.todos.map(item=> item.checked=false);
  }

  addToCollection(){
    if(this.inputValue.replace(/\s/g, "") != ""){
      this.todos.push({text: this.inputValue , checked:false , editable:false});
      this.inputValue="";
      this.sortList();
    }
  }

  removeFromCollection(item){
    this.todos.splice(this.todos.indexOf(item),1);
  }

  sortshow_unChecked(){
    this.tempList.map((item)=>{ this.todos.push(item); })
    this.tempList = this.todos.filter((item) =>{ if(item.checked)return item });
    this.todos = this.todos.filter((item) =>{  if(!item.checked)return item  });
    this.sortList();
  }

  sortshow_Checked(){
    this.tempList.map((item)=>{ this.todos.push(item); })
    this.tempList = this.todos.filter((item) =>{ if(!item.checked)return item });
    this.todos = this.todos.filter((item) =>{  if(item.checked)return item });
    this.sortList();
  }

  showAll(){
    this.tempList.map((item)=>{ this.todos.push(item); })
    this.tempList=[];
    this.sortList();
  }


  constructor() {}


  ngOnInit() {
  }

}
