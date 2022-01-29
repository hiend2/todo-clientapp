import React from "react";
import PropTypes from "prop-types";
import { observer } from 'mobx-react';
import { withStyles } from "@material-ui/core/styles";
import ToDo from './todo';


const styles = () => ({
    toDoContainer: {
        textAlign: 'left',
        padding: '10px',
        '&:hover' : {
            backgroundColor: '#EBEBEB'
        }
    }
    
});

@observer
class ToDoList extends React.Component {
    render() {
        const { classes, toDoList } = this.props;
        return (
            <React.Fragment>
                {toDoList.sortBy("position").map((todo, i) => {
                    return (
                        <div key={todo.id} className={classes.toDoContainer}>
                            <ToDo pos={i} todo={todo} />
                        </div>
                    )
                })}
            </React.Fragment>
        );
    }
}

ToDoList.propTypes = {
    classes: PropTypes.object.isRequired,
    toDoList: PropTypes.object
};

export default withStyles(styles)(ToDoList);