import React, { Component } from "react";
import { Fab, Tooltip } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import {
  format,
  addDays,
  startOfMonth,
  endOfMonth,
  // startOfWeek,
  // endOfWeek,
 // getYear,
  isSameMonth,
  isSameDay,
  addYears,
  subYears,
  addMonths,
  subMonths
} from "date-fns";
import AddEventModal from "../../add-event";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { withTranslation } from "react-i18next";
import "./calendar.css";
import Dashboard from '../../Authorization/Dashboard'
const EVENT_LIMIT = 5;

class Calendar extends Component {
  constructor() {
    super();
    //Handles state by getting current month and date using js date function
    this.state = {
      currentMonth: new Date(),
      selectedDate: new Date(), 
      currentYear: new Date(), 
      events: [], //Stores all the tasks
      showEventModal: false, //Initially the add task modal is not displayed by setting showEventModal to false
      eventToEdit: {}
    };
  }
//Loads the tasks added(if any) when component is loaded
componentDidUpdate(){
  const user = localStorage.getItem('myValueInLocalStorage') 
  console.log(user)
  
 }
  componentDidMount() {
    const user = localStorage.getItem('myValueInLocalStorage')
    let events =
      localStorage.getItem(`CalendarEvents${user}`) !== ("undefined" && null)
        ? JSON.parse(localStorage.getItem(`CalendarEvents${user}`))
        : [];
    this.setState({ events: events });
    
  }


  handleLanguageChange(lang) {
    this.props.i18n.changeLanguage(lang);
  }

  rendeChangeLanguageButtons() {
    const languages = ["en", "de", "ru"];
    let buttons = [];
    for (let language of languages) {
      buttons.push(
        <Button
          key={language}
          variant="contained"
          color="secondary"
          onClick={() => {
            this.handleLanguageChange(language);
          }}
        >
          {language}
        </Button>
      );
    }
    return (
      <div className="language-div">
        <nav className="language-header">
          <ButtonGroup
            color="secondary"
            aria-label="outlined primary button group"
          >
            {buttons}
          </ButtonGroup>
        </nav>
      </div>
    );
  }

  //Loads the Navigation Header with logo, username and logout button
 renderNavHeader()
 {
   return(
    <Dashboard username={this.props.username} />
   );
 }
   //Loads the header of calendar with Month name and prev&next buttons
  renderHeader() {
    const dateFormat = "MMMM";
    // const yearFormat= "yyyy";
    const month = format(this.state.currentMonth, dateFormat) + "";
    // const year = format(this.state.currentYear, yearFormat)+"";
    const t = this.props.t;
    const i18n = this.props.i18n;
    return (
      <div className="header row flex-middle">
        <div className="col col-start">
          <div className="icon" onClick={this.prevMonth} >
            chevron_left
          </div>
        </div>
        <div className="col col-center">
          <span>
            {t(month,{
              lng: i18n.language
            })}
          </span>
        </div>
        <div className="col col-end" onClick={this.nextMonth}>
          <div className="icon">chevron_right</div>
        </div>
      </div>
    );
  }
  //Loads the row with week days according to the dates
  renderDays() {
    const daysOfWeek = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
    const days = [];
    const t = this.props.t;
    const i18n = this.props.i18n;
    for (let day of daysOfWeek) {
      days.push(
        <div className="col col-center" key={day}>
          {t(day, { lng: i18n.language })}
        </div>
      );
    }
    return <div className="days row">{days}</div>;
  }
  //Loads the rows with dates of current month
  renderCells() {
    const { currentMonth, selectedDate, events } = this.state;
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfMonth(monthStart);
    const endDate = endOfMonth(monthEnd);

    const dateFormat = "d";
    const rows = [];

    let days = [];
    let day = startDate;
    let formattedDate = "";

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, dateFormat, {
          useAdditionalDayOfYearTokens: false
        });
        const cloneDay = day;

        days.push(
          <div
            className={`col cell ${!isSameDay(day, selectedDate)
              ? "disabled"
              : isSameDay(day, selectedDate)
                ? "selected"
                : ""
              }`}
            key={day}
          >
            <span className="number">{formattedDate}</span>
            {isSameMonth(day, monthStart) ? (
              <div>
                <div>
                  {events
                    .filter(e => isSameDay(cloneDay, new Date(e.date)))
                    .sort((a, b) => (a.time > b.time ? 1 : -1))
                    .map((e, i) => (
                      <div
                        onClick={() => this.editEvent(e)}
                        key={i}
                        className="event-data"
                      >
                        {e.time} hr- {e.category}
                      </div>
                    ))}
                </div>
                <div key={"add-event-" + day} className="add-event-button">
                  <Fab className="fab-button"
                    color="primary"
                    size="small"
                    aria-label="add"
                    onClick={() => this.onAddEventClick(cloneDay)}
                  >
                    <AddIcon />
                  </Fab>
                 
                </div>
               
              </div>
            ) : (
                ""
              )}
               <Tooltip title="You can't edit the previous / future events" className="edit-tooltip" placement="top">
                    <span>
                      <Button disabled> </Button>
                    </span>
                  </Tooltip>
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="row" key={day}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className="body">{rows}</div>;
  }

  editEvent = e => {
    this.setState({ eventToEdit: e }, this.toggleModal);
  };
//Loads next month using add Months module of date-fns 
  nextMonth = () => {
    this.setState({
      currentMonth: addMonths(this.state.currentMonth, 1)
    });
  };
//Loads previous month using sub Months module of date-fns 
  prevMonth = () => {
    this.setState({
      currentMonth: subMonths(this.state.currentMonth, 1)
    });
  };
  //Loads next year using next Year module of date-fns 
  nextYear = () => {
    this.setState({
      currentMonth: addYears(this.state.currentYear, 1)
    });
  };
 //Loads previous year using prev Year module of date-fns 
  prevYear = () => {
    this.setState({
      currentMonth: subYears(this.state.currentYear, 1)
    });
  };
//Switches between hide &show add event modal based on state 
  toggleModal = () => {
    const { showEventModal } = this.state;
    const newState = { showEventModal: !showEventModal };
    if (showEventModal) {
      newState.eventToEdit = {};
    }
    this.setState(newState);
  };
//Adds events based on event limit if not alerts the user
  onAddEventClick = date => {
    this.setState({ selectedDate: date });
    const { events } = this.state;
    if (
      events.filter(e => isSameDay(date, new Date(e.date))).length >=
      EVENT_LIMIT
    ) {
      alert(`You have reached maximum events limit for the selected day`);
    } else {
      this.setState({ selectedDate: date }, this.toggleModal);
    }
  };
//Task data is stored after add task button is clicked
  handleFormSubmit = ({ id, title, category, description, date, time }) => {
    // console.log(title);
    const { selectedDate, events } = this.state;
    if (id) {
      const updatedEvent = {
        id,
        title,
        category,
        description,
        date,
        time
      };
      const user = localStorage.getItem('myValueInLocalStorage')
      const eventIndex = events.findIndex(e => e.id === id);
      events.splice(eventIndex, 1, updatedEvent);
      this.setState({ events }, () => {
        this.toggleModal();
        const { events } = this.state;
        localStorage.setItem(`CalendarEvents${user}`, JSON.stringify(events));
      });
    } else {
      const lastEvent = events[events.length - 1];
      const newEvent = {
        id: ((lastEvent && lastEvent.id) || 0) + 1,
        title,
        category,
        description,
        time,
        date: selectedDate,
        
      };
      this.setState({ events: events.concat(newEvent) }, () => {
        this.toggleModal();
        const { events } = this.state;
        const user = localStorage.getItem('myValueInLocalStorage')
        localStorage.setItem(`CalendarEvents${user}`, JSON.stringify(events));
      });
    }
  };
//main render function that loads nav, calendar header & body
  render() {
    const { showEventModal, eventToEdit } = this.state;
    return (
      <div>
      {this.renderNavHeader()}
      <div className="calendar">
        {showEventModal && (
          <AddEventModal
            showModal={showEventModal}
            toggleModal={this.toggleModal}
            handleFormSubmit={this.handleFormSubmit}
            eventToEdit={eventToEdit}
          />
        )}
       
        {/* {this.rendeChangeLanguageButtons()} */}
        {this.renderHeader()}
        {this.renderDays()}
        {this.renderCells()}
      </div>
      </div>
    );
  }
}
export default withTranslation()(Calendar);