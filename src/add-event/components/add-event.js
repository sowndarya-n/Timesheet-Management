import React, { Component } from "react";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
// import FormControl from '@material-ui/core/FormControl';
// import Select from '@material-ui/core/Select';
// import InputLabel from '@material-ui/core/InputLabel';
import "./add-event.css";

class AddEventModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: this.props.showModal || false,
      toggleModal: this.props.toggleModal,
      eventToEdit: this.props.eventToEdit,
      handleFormSubmit: this.props.handleFormSubmit
    };
  }
  submitForm = e => {
    e.preventDefault();
    const { date, id, title, category, description, time } = this.state.eventToEdit;
    this.state.handleFormSubmit({
      id,
      title,
      category,
      description,
      date,
      time
    });
  };

  setTitle = t => {
    this.setState(prevState => ({
      eventToEdit: {
        ...prevState.eventToEdit,
        title: t
      }
    }));
  };
  setCategory = c => {
    this.setState(prevState => ({
      eventToEdit: {
        ...prevState.eventToEdit,
        category: c
      }
    }));
  };

  setDescription = d => {
    this.setState(prevState => ({
      eventToEdit: {
        ...prevState.eventToEdit,
        description: d
      }
    }));
  };

  setTime = t => {
    this.setState(prevState => ({
      eventToEdit: {
        ...prevState.eventToEdit,
        time: t
      }
    }));
  };

  render() {
    const { title, category, description, time } = this.state.eventToEdit;
    return (
      <div>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.showModal}
          onClose={this.state.toggleModal}
        >
          <div className="paper add-event-modal">
            <center>
              <h3 id="simple-modal-title" style={{margin:"4px"}}>Add your Task for the day!</h3>
            </center>
            <form onSubmit={this.submitForm}>
              <div>
                <TextField
                  required
                  id={title}
                  label="Enter Project SWON/ WON number"
                  defaultValue={title}
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  onChange={e => this.setTitle(e.target.value)}
                />
              </div>
              {/* <div>
                <FormControl >
                  <InputLabel id="demo-simple-select-label">Age</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    // value={age}
                    // onChange={handleChange}
                  >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
              </div> */}
              {/* <div>
                <FormControl required >
                  <InputLabel htmlFor="task-category-required">Task Category</InputLabel>
                  <Select
                    native
                    // value={state.age}
                    // onChange={handleChange}
                    name="Task Category"
                    inputProps={{
                      id: 'task-category-required',
                    }}
                  >
                    <option aria-label="None" value="" />
                    <option >Surgey</option>
                    <option >Paitent Check-up</option>
                    <option>Rounds</option>
                  </Select>
                </FormControl>
                </div> */}
                <div>
                  <TextField
                    required
                    id={category}
                    label="Task Category"
                    defaultValue={category}
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    onChange={e => this.setCategory(e.target.value)}
                  />
                </div>
                <div>
                  <TextField
                    required
                    id={description}
                    label="Task Description"
                    defaultValue={description}
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    onChange={e => this.setDescription(e.target.value)}
                  />
                </div>
                <div>
                  <TextField
                    required
                    id={time}
                    type="number"
                    // defaultValue=none
                    label="Task Duration (in hrs)"
                    // defaultValue={time}
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                      shrink: true
                    }}
                    inputProps={{
                      step: 300 // 5 min
                    }}
                    onChange={e => this.setTime(e.target.value)}
                  />
                </div>
                <div className="event-button">
                  <center>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={this.submitForm}
                    >
                      Add Task
                  </Button>
                  </center>
                </div>
            </form>
          </div>
        </Modal>
      </div>
    );
  }
}

export default AddEventModal;