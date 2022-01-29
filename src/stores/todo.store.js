import { observable, action } from "mobx";
import toDoService from '../services/todo.service'
import { CurrentList } from '../constants';

export default class ToDoStore {
    constructor(rootStore) {
        this.rootStore = rootStore;
    }

    @observable toDoList = [];
    @observable filterToDoList = [];
    @observable filterValue = "";

    @observable newToDoText = "";

    @action 
    getTasks(listId) {
        this.rootStore.setBusy();
        toDoService.getTasks(listId).then(res => {
            this.toDoList = res;
            this.rootStore.resetBusy();
        })
        .catch(() => {
            this.rootStore.resetBusy();
        });
    }

    @action 
    searchToDo(value) {
        this.filterValue = value.toLowerCase();
        if (this.filterValue && this.filterValue != "") {
            this.filterToDoList = this.toDoList.filter(todo => todo.description.toLowerCase().includes(this.filterValue));
        } else {
            this.filterToDoList = [];
        }
    }

    @action
    setNewToDoText(value) {
        this.newToDoText = value;
    }

    @action
    addNewToDo() {
        this.rootStore.setBusy();
        let todo = {};
        todo.description = this.newToDoText;
        toDoService.add(todo, CurrentList).then(res => {
            this.toDoList.push(res);
            this.rootStore.resetBusy();
            this.newToDoText = "";
        })
        .catch(() => {
            this.rootStore.resetBusy();
        });
    }

    findToDo(id) {
        this.toDoList = this.toDoList.sortBy("position");
        return this.toDoList.findIndex(todo => todo.id==id);
    }

    @action
    toDoDone(id) {
        this.rootStore.setBusy();
        toDoService.toDoDone(id, CurrentList).then(res => {
            const index = this.findToDo(res.id);
            this.toDoList[index].completed = true;
            this.rootStore.resetBusy();
        })
        .catch(() => {
            this.rootStore.resetBusy();
        });
    }

    @action
    remove(id) {
        const index = this.findToDo(id);
        this.rootStore.setBusy();
        toDoService.remove(id, CurrentList).then(res => {
            if (res === "") {
                this.toDoList.splice(index, 1);
            }
            this.rootStore.resetBusy();
        })
        .catch(() => {
            this.rootStore.resetBusy();
        });
    }

    @action
    upPos(id) {
        const index = this.findToDo(id);
        const temp = this.toDoList[index].position;
        this.toDoList[index].position = this.toDoList[index-1].position; 
        this.toDoList[index-1].position = temp;
    }

    @action
    downPos(id) {
        const index = this.findToDo(id);
        const temp = this.toDoList[index].position;
        this.toDoList[index].position = this.toDoList[index+1].position; 
        this.toDoList[index+1].position = temp;
    }
}