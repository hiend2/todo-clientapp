import { observable, action } from 'mobx';

export default class RootStore {
    constructor(sessionStore) {
        this.sessionStore = sessionStore;
    }

    @observable isBusy = false;
    
    @action setBusy() {
        this.isBusy = true;
    }
    @action resetBusy() {
        this.isBusy = false;
    }
}
