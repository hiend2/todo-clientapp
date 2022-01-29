import SessionStore from '../src/stores/session.store';
import toDoService from '../src/services/todo.service';
import Promise from './promise';
import { CurrentList } from '../src/constants';


describe('Get All Tasks', () => {
    let sessionStore, toDoStore;
    beforeEach(() => {
        sessionStore = new SessionStore();
        toDoStore = sessionStore.toDoStore;
    });

    it("calls the api to get all tasks in a list", () => {
        let promiseHelper = new Promise();
        let res = [
            {
                id: 1,
                description: 'Buy groceries',
                completed: false,
                position: 0
            }, 
            {
                id: 2,
                description: 'Put petrol in car',
                completed: false,
                position: 1
            }, 
            
        ]
        spyOn(toDoService, "getTasks").and.returnValue(promiseHelper);

        toDoStore.getTasks(CurrentList);
        promiseHelper.resolve(res);

        expect(toDoService.getTasks).toHaveBeenCalled();

        process.nextTick(() => {
            expect(toDoStore.toDoList.length).toEqual(2);
        });
    });

});