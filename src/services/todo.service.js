import { wrappedFetch } from '../helpers';
import 'regenerator-runtime/runtime'

class ToDoService {
    getTasks = async (listId) => {
        let url = `lists/${listId}/tasks`;
        return await wrappedFetch(url, 'GET');
    }

    add(todo, listId) {
        let url = `lists/${listId}/tasks`;
        return wrappedFetch(url, 'POST', JSON.stringify(todo));
    }

    remove(id, listId) {
        let url = `lists/${listId}/tasks/${id}`;
        return wrappedFetch(url, 'DELETE');
    }

    toDoDone(id, listId) {
        let url = `lists/${listId}/tasks/${id}`;
        return wrappedFetch(url, 'PATCH', JSON.stringify({completed:true}));
    }

    save(id, listId, newTodo) {
        let url = `lists/${listId}/tasks/${id}`;
        return wrappedFetch(url, 'PATCH', JSON.stringify(newTodo));
    }
}

const toDoService = new ToDoService();

export default toDoService;