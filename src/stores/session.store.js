import RootStore from './root.store';
import ToDoStore from './todo.store'

export default class SessionStore {
    constructor() {
        this.rootStore = new RootStore(this);
        this.toDoStore = new ToDoStore(this.rootStore);
    }
}
