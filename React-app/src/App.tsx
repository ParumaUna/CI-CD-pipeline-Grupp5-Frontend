
import { useEffect, useState } from 'react'
import './styles/App.css'
import Activity from './models/activity';

import OneActivity from './components/OneActivity';
import CurrentWeekActivities from './components/CurrentWeekActivities';

import { Button, Header } from 'react-template-npm-coolbeans';
import Separator from './components/Separator';


function App() {

  const [activities, setActivities] = useState<Activity[]>([])
  const [showAllActivitiesStatus, setAllShowActivitiesStatus] = useState<boolean>(false)
  //const [showWeekActivitiesStatus, setShowWeekActivitiesStatus] = useState<boolean>(true)
  const [buttonText, setButtonText] = useState<string>("All activities")
  const [splitedActivities, setSplitedActivities] = useState<Activity[][]>([])

  const baseURL: string = "https://backend-ci-cd-pipeline-gruppfem-production.up.railway.app/api/plans";
  //const baseURL: string = "http://localhost:3000/api/plans";

  useEffect(() => {
    getActivities();

  }, [])

  //******************************************************** 
  // Function getActivities
  //********************************************************
  const getActivities = async () => {

    console.log("Inside getAllActivities");

    try {
      const resp = await fetch(baseURL);
      const data = await resp.json();
      //console.log("Data");
      //console.log(data.data);
      setActivities(data.data);
    }
    catch (error) {
      console.log(error);
    }
  }

  //******************************************************** 
  // Function showAllActivities
  //********************************************************
  const showAllActivities = async () => {

    console.log("Inside showAllActivities");

    getActivities();

    if (!showAllActivitiesStatus) {
      setAllShowActivitiesStatus(!showAllActivitiesStatus);
      setButtonText("Hide all activities");

      const weeks: number[] = [];

      // Get all weeks
      activities.forEach((activity) => {
        weeks.push(activity.week)
      });

      //Remove duplicates
      //let weeksWithoutDuplicates: number[] = weeks.filter((week, index) => weeks.indexOf(week) === index);

      // Split activities into weeks
      const fun = (array: Activity[]) => {
        const temp = []
        for (const activity of array) {
          !temp[activity.week] ? temp[activity.week] = [activity] : temp[activity.week].push(activity)
        }
        return temp
      }

      // Set splited activities
      setSplitedActivities(fun(activities));

    }
    else {
      //setActivities([]);
      setAllShowActivitiesStatus(!showAllActivitiesStatus);
      setButtonText("All activities");
    }
  } 
  
  //******************************************************** 
  // Add a new activity through a form with check boxes
  //********************************************************
  const [formData, setFormData] = useState({
    nameOfActivity: "",
    week: 0,
    startTime: null,
    stopTime: null,
    day: [] as string[],
    comment: "",
  });

  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  const handleInputChange = (e: { target: any }) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      // Handle checkbox input separately
      let updatedDays = formData.day.slice(); // Create a copy of the selected days array

      if (checked) {
        updatedDays.push(name); // Add the day to the array if checked
      } else {
        updatedDays = updatedDays.filter((day) => day !== name); // Remove the day if unchecked
      }

      setFormData({
        ...formData,
        day: updatedDays,
      });
    } else {
      // Handle other inputs
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    try {
      const response = await fetch(baseURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // If POST is successful, refresh the activity states
        // console.log("Activity created successfully");
        getActivities();
        setAllShowActivitiesStatus(!showAllActivitiesStatus);
        // Clear the submit form
        setFormData({
          nameOfActivity: "",
          week: 0,
          startTime: null,
          stopTime: null,
          day: [],
          comment: "",
        });
      } else {
        console.error("Failed to create activity");
      }
    } catch (error) {
      console.error("Error creating activity:", error);
    }
  };

  //-----------------------------------------------------------------------
  const existingActivities = splitedActivities.map((array) => (
    <>
      {array.map((activity) => (
        <OneActivity
          key={activity._id}
          id={activity._id}
          nameOfActivity={activity.nameOfActivity}
          week={activity.week}
          startTime={activity.startTime}
          stopTime={activity.stopTime}
          day={activity.day.toString().split(",").join(", ")}
          comment={activity.comment}></OneActivity>
      ))}
      <Separator></Separator>
    </>

  ))

  //-------------------------------------------------------------------
  return (
    <>
      <Header h1={"Fun Days of the Week Activities"} h2={"Weekly Activities Planner"}></Header>

      <aside id="aside-section">
        <h2>Create New Activity</h2>
        <form onSubmit={handleSubmit} className="activity-form">
          <div className="form-group">
            <label>
              Activity:
              <input
                type="text"
                name="nameOfActivity"
                value={formData.nameOfActivity}
                onChange={handleInputChange}
                required
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              Week:
              <br/>
              <input
                type="number"
                name="week"
                value={formData.week}
                onChange={handleInputChange}
                required
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              Comment:
              <input
                type="text"
                name="comment"
                value={formData.comment}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div className="form-group">
            <fieldset className="days-fieldset">
              <legend>Select Days:</legend>
              {daysOfWeek.map((day) => (
                <label key={day}>
                  <input
                    type="checkbox"
                    name={day}
                    checked={formData.day.includes(day)}
                    onChange={handleInputChange}
                  />
                  {day}
                </label>
              ))}
            </fieldset>
          </div>
          <button type="submit" className="submit-button">Add Activity</button>
        </form>
      </aside>

      <div >
        <CurrentWeekActivities activities={activities} status={true} week={35}></CurrentWeekActivities>
      </div>

      <div className="all-activities-section">

        <button id="btn-get-activities"
          className='btnGetActivities'
          onClick={() => showAllActivities()}>
          {buttonText}
        </button>

        <div>
          {showAllActivitiesStatus == true ?
            <>
              <h2>All activities</h2>
              <table className='all-activities-table'>
                <tr className="all-activities-table-header-row">
                  <th className='activity'>Activity</th>
                  <th className='week'>Week</th>
                  <th>Days</th>
                  <th>Comment</th>
                </tr>
                {existingActivities}
              </table> </>
            : null}
        </div>

      </div>
      <Button label="Custom Button"></Button>
    </>

  )
}

export default App
