import { Component ,OnInit} from '@angular/core';
import {Task } from './task';


@Component({
  selector: 'app-root',
  templateUrl:'app.component.html',
  styleUrls:['app.component.css'],
})




export class AppComponent implements OnInit {
    title = "Aplicativo Todo"
     flag=1;
     toDoTaskCount=0;
     completedTaskCount=0;
     Tasks:Task[]=[];
     dTask:Task[]=[];
     taskText:string="";
     msg:string;
     errMsg:string;
     totalTaskToComplete:number;
     completedTask:number;
     today:number;
     alreadyAddedTask:string;
    

     addTask(msg:string){
       
         if(msg.length==0){
             
             this.errMsg = "O campo está em branco";
         }
         else if(this.duplicateTask(msg) && this.flag ){
              this.errMsg="Esta tarefa já está na lista";
         }
             
         else{
              
              this.today=Date.now();
              this.Tasks.push(new Task(msg,this.toDoTaskCount,this.today));
              this.errMsg="";
              this.taskText="";
              this.totalTaskToComplete=this.Tasks.length;
              this.toDoTaskCount+=1;
         }    
           
        
     }

     duplicateTask(msg:string):number{

          for(var i=0;i<this.Tasks.length;i++)
          {
             if( msg==this.Tasks[i].name)
             {
                return 1;
             }
              
          }
            
          return 0;
     }
     
     markAsComplete(task:Task){
           
           this.addDTask(task);
           this.deleteTask(task);
           

     }



     editTask(task:Task){
       this.taskText=task.name;
       this.deleteTask(task);
       this.totalTaskToComplete=this.Tasks.length;
     }
     

     deleteTask(task:Task){
       
        this.Tasks = this.Tasks.filter(Tasks => Tasks.id !== task.id);
         this.totalTaskToComplete=this.Tasks.length;
        
     }
    
    reset(){
      this.taskText="";
    }

    dismiss(){
      this.errMsg="";
      this.taskText="";
    }

    addAnyWay(msg:string){
          if(msg.length==0){
            msg="[I N V Á L I D O]";
          }
          
          this.flag=0;
          this.addTask(msg);

          this.taskText="";
    }

    addDTask(task:Task){
       
       this.dTask.push(new Task(task.name,this.completedTaskCount,Date.now()));
       this.msg=task.name;
       this.completedTask=this.dTask.length;
       this.completedTaskCount+=1;
     }

    deleteDTask(task:Task){
       
        this.dTask = this.dTask.filter(dTask => dTask.id !== task.id);
        this.completedTask=this.dTask.length;
       
     }

   
    ngOnInit(){
      
     
      this.addTask("Preciso terminar esse teste");
      this.addTask("Estudar Angular, Django e DRF");

      this.addDTask(new Task("Esta tarefa foi completada",this.completedTaskCount,Date.now()));

    }
    
   
}


