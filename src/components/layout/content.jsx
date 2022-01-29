import React from "react";
import PropTypes from "prop-types";
import { observer, inject } from 'mobx-react';
import { withStyles } from "@material-ui/core/styles";
import { Box, TextField, InputAdornment, Button } from '@material-ui/core';
import { CurrentList } from '../../constants';
import ToDoList from './todo-list';
import SearchIcon from "@material-ui/icons/Search";


const styles = () => ({
    container: {
        marginBottom: '50px',
        marginTop: '100px'
    },
    searchInput: {
        marginBottom: '20px',
        "& input": {
            "&::-ms-clear": {
                display: "none" // remove the built-in close button in ie
            }
        }
    },
    newToDoInput: {
        marginRight: '20px'
    }
  
});

@inject('toDoStore')
@observer
class Content extends React.Component {
    componentDidMount() {
        const { toDoStore } = this.props;
        toDoStore.getTasks(CurrentList);
    }

    handleSearch = (e) => {
        const { toDoStore } = this.props;
        toDoStore.searchToDo(e.target.value)
    }

    handleNewToDoTextChange = (e) => {
        const { toDoStore } = this.props;
        toDoStore.setNewToDoText(e.target.value);
    }

    handleAddClick = () => {
        const { toDoStore } = this.props;
        toDoStore.addNewToDo();
    }

    render() {
        const { classes } = this.props;
        const { toDoStore } = this.props;
        const { toDoList, filterToDoList, filterValue, newToDoText } = toDoStore;
        return (
            <Box className={classes.container}>
                <TextField
                    className={classes.searchInput}
                    placeholder="Search"
                    onChange={this.handleSearch}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        )
                 }} />
                                
                <ToDoList toDoList={filterValue && filterValue != "" ? filterToDoList : toDoList} />
                <br />
                <div className={classes.addContainer}>
                    <TextField className={classes.newToDoInput}
                        placeholder="New To-Do Task"
                        onChange={this.handleNewToDoTextChange}
                        value={newToDoText}
                    />
                    <Button variant="outlined" disabled={!newToDoText || newToDoText == ""} onClick={this.handleAddClick}>Add</Button>
                </div>

            </Box>
        );
    }
}

Content.propTypes = {
    classes: PropTypes.object.isRequired,
    toDoStore: PropTypes.object
};

export default withStyles(styles)(Content);
