console.log('working todo')
// IIFE function 
var todolistapp=(function(){
    let tasks=[]
    const tasksList=document.getElementById('list')
    const addTaskInput=document.getElementById('add')
    const taskcounter=document.getElementById('tasks-counter')
    async function fetchTodos(){
        try{
            const response=await fetch('https://jsonplaceholder.typicode.com/todos');
            const data= await response.json();
            tasks=data.slice(0,10);
            renderList();
        } catch(error){
            console.log(error);
        }    
    }
    // render the list item
    function addTasktoDOM(task){
        const li=document.createElement('li');
        li.innerHTML=`
        <input type="checkbox"  id="${task.id}" ${task.completed ? 'checked': ''} class="custom-checkbox">
        <label for="${task.id}">${task.title}</label> 
        <i class="fa fa-trash-o delete" style="font-size:36px" data-id="${task.id}"></i>
        `;
        tasksList.append(li)
    }
    
    function renderList () {
        tasksList.innerHTML="";
        for(let i=0;i<tasks.length;i++){
            addTasktoDOM(tasks[i])
        }
        taskcounter.innerHTML=tasks.length;
    }
    // task is done or not
    function toggleTask(taskId) {
        const task=tasks.filter(function(task){
            return task.id===Number(taskId)
        })
        if (task.length>0){
            const currentTask=task[0]
            console.log(currentTask)
            currentTask.completed=!currentTask.completed
            renderList()
            showNotification('task toggle successfully!')
            return
        } 
        showNotification('could not toggle task')
    
    }
    // for delete the task
    function deleteTask (taskId) {
        const newTasks=tasks.filter(function(task){
            return task.id!==Number(taskId) 
        }) 
        tasks=newTasks;
        renderList()
        showNotification("deleted successfully!")
    }
    // add the task
    function addTask (task) {
        if(task){
            tasks.push(task)
            renderList();
            showNotification("task added successfully")
            return;
        }
        showNotification('task can not be added')
        
    }
    // for alert notification
    function showNotification(text) {
        alert(text)
    }
    // handel event and fetch that value
    function handelInput(e){
        if(e.key==="Enter"){
            const text =e.target.value;
            console.log(text)
            if(!text){
                showNotification("task can not be empty");
                return;
            }
            const task={
                title:text,
                id: Date.now(),
                completed:false
            }
            console.log(task)
            e.target.value="";
            addTask(task);
        }
    }
    // handel click event
    function handelClickListner(e){
        const target=e.target;
        if (target.className==='fa fa-trash-o delete'){
            const taskId=target.dataset.id;
            deleteTask(taskId)
            return;
        }
        else if(target.className==="custom-checkbox"){
            const taskId=target.id;
            toggleTask(taskId);
            return;
        }
    }

    function initialization(){
    fetchTodos();
    addTaskInput.addEventListener('keyup',handelInput); 
    document.addEventListener('click',handelClickListner);
    }
    return{
        initialize:initialization
    }
})()


