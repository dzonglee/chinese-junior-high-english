Component({
 options:{styleIsolation:'apply-shared'},
 properties:{view:Object,busy:Boolean},
 methods:{
  action(event){const {action,value}=event.currentTarget.dataset;this.triggerEvent('action',{action,value:String(value??'')});},
  input(event){this.triggerEvent('input',{name:event.currentTarget.dataset.name,value:event.detail.value});}
 }
});
