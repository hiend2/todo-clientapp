import React from 'react';
import { render } from 'react-dom';
import { observer, Provider } from "mobx-react";
import AppMain from "./components/app-main";
import SessionStore from "./stores/session.store";


export const stores = new SessionStore();

@observer
class Root extends React.Component {
    render() {
        return (
            <Provider {...stores}>
                <React.Fragment>
                    <AppMain />
                </React.Fragment>
            </Provider>
        );
    }
}

render(<Root />, document.getElementById('root'));