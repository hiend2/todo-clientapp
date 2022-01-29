import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Typography, Grid, Button } from '@material-ui/core';
import { observer, inject } from 'mobx-react';

const styles = () => ({
    todo: {
        lineHeight: '50px'   
    },
    todoDone: {
        lineHeight: '50px',
        color: 'green',
        fontWeight: '600',
        textDecoration: 'line-through'
    },
    buttonContainer: {
        marginTop: 'auto',
        marginBottom: 'auto'
    },
    btn: {
        cursor: 'pointer'
    }
    
});

@inject('toDoStore')
@observer
class ToDo extends React.Component {
    handleDoneClick = (id) => {
        const { toDoStore } = this.props;
        toDoStore.toDoDone(id);
    }

    handleRemoveClick = (id) => {
        const { toDoStore } = this.props;
        toDoStore.remove(id);
    }

    handleUpClick = (id) => {
        const { toDoStore } = this.props;
        toDoStore.upPos(id);
    }

    handleDownClick = (id) => {
        const { toDoStore } = this.props;
        toDoStore.downPos(id);
    }

    render() {
        const { classes } = this.props;
        const { todo, pos, toDoStore } = this.props;
        const { toDoList } = toDoStore;
        return (
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Typography className={todo.completed ? classes.todoDone : classes.todo}>{pos + 1}. {todo.description}</Typography>
                </Grid>
                <Grid item xs={2} className={classes.buttonContainer}>
                    <Button variant="outlined" className={classes.btn} disabled={todo.completed} onClick={() => this.handleDoneClick(todo.id)}>Done</Button>
                </Grid>
                <Grid item xs={2} className={classes.buttonContainer}>
                    <Button variant="text" className={classes.btn} onClick={() => this.handleRemoveClick(todo.id)}>Remove</Button>
                </Grid>
                <Grid item xs={1} className={classes.buttonContainer}>
                    {pos > 0 &&
                        <Button variant="text" className={classes.btn} onClick={() => this.handleUpClick(todo.id)}>Up</Button>
                    }
                </Grid>
                <Grid item xs={1} className={classes.buttonContainer}>
                    {pos < toDoList.length - 1 && 
                        <Button variant="text" className={classes.btn} onClick={() => this.handleDownClick(todo.id)}>Down</Button>
                    }
                </Grid>
            </Grid>
        );
    }
}

ToDo.propTypes = {
    classes: PropTypes.object.isRequired,
    todo: PropTypes.object,
    pos: PropTypes.number,
    toDoStore: PropTypes.object
};

export default withStyles(styles)(ToDo);