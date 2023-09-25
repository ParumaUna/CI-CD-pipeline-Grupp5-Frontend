
import { useEffect, useState } from 'react'
import './styles/App.css'
import Activity from './models/activity';

import OneActivity from './components/OneActivity';
//import CurrentWeekActivities from './components/CurrentWeekActivitiesTable';
import Header from './components/Header';
import { Button } from 'react-template-npm-coolbeans';
import Separator from './components/Separator';


function App() {

  const [activities, setActivities] = useState<Activity[]>([])
  const [showActivitiesStatus, setShowActivitiesStatus] = useState<boolean>(false)
  const [buttonText, setButtonText] = useState<string>("Click here to get all activities")
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
  // Function getActivities
  //********************************************************
  const showAllActivities = async () => {

    console.log("Inside showAllActivities");

    getActivities();

    if (!showActivitiesStatus) {
      setShowActivitiesStatus(!showActivitiesStatus);
      setButtonText("Click here to hide all activities");

      const weeks: number[] = [];

      // Get all weeks
      activities.forEach((activity) => {
        weeks.push(activity.week)
      });

      //Remove duplicates
      let weeksWithoutDuplicates: number[] = weeks.filter((week, index) => weeks.indexOf(week) === index);

      // Split activities into weeks
      const fun = (array: Activity[]) => {
        let temp = []
        for (let activity of array) {
          !temp[activity.week] ? temp[activity.week] = [activity] : temp[activity.week].push(activity)
        }
        return temp
      }

      // Set splited activities
      setSplitedActivities(fun(activities));

    }
    else {
      setActivities([]);
      setShowActivitiesStatus(!showActivitiesStatus);
      setButtonText("Click here to get all activities");
    }

  }    //-----------------------------------------------------------------------
  let existingActivities = splitedActivities.map((array) => (
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
      <Header h1={"Landing page"}
        h2={"hello world"}></Header>

      <aside id="aside-section">
        <p>Here is aside section</p>
        <p>To create or update activities</p>
      </aside>

      <div className="all-activities-section">

        <button id="btn-get-activities"
          className='btnGetActivities'
          onClick={() => showAllActivities()}>
          {buttonText}
        </button>

        <div>
          {showActivitiesStatus == true ?
            <table className='activities-table'>
              <tr className="header-row">
                <th className='activity'>Activity</th>
                <th className='week'>Week</th>
                <th>Days</th>
                <th>Comment</th>
              </tr>
              {existingActivities}
            </table> : null}
        </div>

      </div>
      <Button label="Custom Button"></Button>
    </>

  )
}

export default App
