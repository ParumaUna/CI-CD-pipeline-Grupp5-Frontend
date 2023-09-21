
import { useState } from 'react'
import './styles/App.css'
import Activity from './models/activity';

import OneActivity from './components/OneActivity';
//import CurrentWeekActivities from './components/CurrentWeekActivitiesTable';
import CustomButton from './components/CustomButton';
import Header from './components/Header';
function App() {

  const [activities, setActivities] = useState<Activity[]>([])
  const [showMessage, setShowMessage] = useState<String>("Here should be all activities")
  const [showActivitiesStatus, setShowActivitiesStatus] = useState<Boolean>(false)
  const [buttonText, setButtonText] = useState<string>("Click here to get all activities")


  const getAllActivities = async () => {

    console.log("Inside getAllActivities");
    //const baseURL :string  = "https://backend-ci-cd-pipeline-gruppfem-production.up.railway.app/api/plans";
    const baseURL: string = "http://localhost:3000/api/plans";

    if (!showActivitiesStatus) {
      try {
        const resp = await fetch(baseURL);
        const data = await resp.json();
        console.log("Data");
        console.log(data.data);
        setActivities(data.data);
        setShowMessage("");
        setShowActivitiesStatus(!showActivitiesStatus);
        setButtonText("Click here to hide all activities");
      }
      catch (error) {
        console.log(error);
      }
    }
    else {
      setActivities([]);
      setShowMessage("Here should be all activities");
      setShowActivitiesStatus(!showActivitiesStatus);
      setButtonText("Click here to get all activities");
    }

  }    //-----------------------------------------------------------------------
  const existingActivities = activities.map((activity) => (
    <OneActivity
      key={activity._id}
      id={activity._id}
      nameOfActivity={activity.nameOfActivity}
      week={activity.week}
      startTime={activity.startTime}
      stopTime={activity.stopTime}
      day={activity.day.toString()}
      comment={activity.comment}></OneActivity>
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
        <CustomButton
          text={buttonText}
          getAllActivities={() => getAllActivities()}></CustomButton>

        <div>
          {showActivitiesStatus == true ?
            <table className='activities-table'>
              <tr className="header-row">
                <th>Activity</th>
                <th>Week</th>
                <th>Days</th>
                <th>Comment</th>
              </tr>
              {existingActivities}
            </table> : null}
        </div>

        {showActivitiesStatus == false ? <p>{showMessage}</p> : null}
      </div>
    </>

  )
}

export default App
