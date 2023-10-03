
import { useEffect, useState } from 'react'
import './styles/App.css'
import Activity from './models/activity';

import OneActivity from './components/OneActivity';
import CurrentWeekActivities from './components/CurrentWeekActivities';

import { Header } from 'react-template-npm-coolbeans';
import Separator from './components/Separator';
import CreateActivityForm from './components/CreateActivityForm';

import Footer from "./components/Footer.tsx"
import ButtonGrupp from './components/ButtonsGroup.tsx';
import ActivityToDelete from './components/ActivityToDelete.tsx';

function App() {

  const [buttonText, setButtonText] = useState<string>("All activities")
  const [deleteButtonText, setDeleteButtonText] = useState<string>("Delete activity")
  const [week, setWeek] = useState<number>(0)

  const [activities, setActivities] = useState<Activity[]>([])
  const [splitedActivities, setSplitedActivities] = useState<Activity[][]>([])

  const [customButtonStatus, setCustomButtonStatus] = useState<boolean>(false)
  const [showAllActivitiesStatus, setAllShowActivitiesStatus] = useState<boolean>(false)
  //const [showWeekActivitiesStatus, setShowWeekActivitiesStatus] = useState<boolean>(true)
  const [deleteActivitiesStatus, setDeleteActivitiesStatus] = useState<boolean>(false)

  //********************************************************
  const baseURL = `${import.meta.env.VITE_BASE_URL}/api/plans`

  //******************************************************** 
  // useEffect()
  //********************************************************
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
    setDeleteActivitiesStatus(false);

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
  // Function markAsDone
  //********************************************************
  const markAllActivitiesAsDone = () => {
    console.log("Inside function markAllActivitiesAsDone");
    setWeek(0);
    //setShowWeekActivitiesStatus(false);
  }

  //******************************************************** 
  // Function showActivitiesToDelete
  //********************************************************
  const showActivitiesToDelete = () => {
    setAllShowActivitiesStatus(false);
    setDeleteActivitiesStatus(!deleteActivitiesStatus);
    setDeleteButtonText("Delete activity")
    setButtonText("All activities");
  }

  //******************************************************** 
  // Function deleteActivity
  //********************************************************
  const deleteActivity = async (id: string) => {

    console.log("Inside deleteActivity function ");
    const url = `${baseURL}/${id}`
    try {
      await fetch(url,
        {
          method: 'DELETE',
        })
    }
    catch (error) {
      console.log(error);
    }
    getActivities()
  }

  //******************************************************** 
  // Function updateActivity
  //********************************************************
  const updateActivity = async () => {
    console.log("Inside function update activity");
  }

  //******************************************************** 
  // Function  customButtonOnClick
  //********************************************************
  const customButtonOnClick = async () => {
    console.log("Inside function customButtonOnClick activity");
    setCustomButtonStatus(!customButtonStatus);
  }


  //******************************************************** 
  // Add a new activity through a form with check boxes
  //********************************************************
  const handleActivitySubmit = async (formData: any) => {

    setWeek(formData.week);
    try {
      const response = await fetch(baseURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        getActivities();
        setAllShowActivitiesStatus(false);
        setButtonText("All activities");
      } else {
        console.error('Failed to create activity');
      }
    } catch (error) {
      console.error('Error creating activity:', error);
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

  //-----------------------------------------------------------------------
  const activtiesToDelete = activities.filter(activity => (activity.week == week)).map((activity) => (
    <ActivityToDelete
      key={activity._id}
      id={activity._id}
      nameOfActivity={activity.nameOfActivity}
      week={activity.week}
      startTime={activity.startTime}
      stopTime={activity.stopTime}
      day={activity.day.toString()}
      comment={activity.comment}
      onDeleteActivity={() => deleteActivity(activity._id)}></ActivityToDelete>
  ))


  //-------------------------------------------------------------------
  return (
    <>
      <Header h1={"Fun Days of the Week Activities"} h2={"Weekly Activities Planner"}></Header>
      <CreateActivityForm onActivitySubmit={handleActivitySubmit}></CreateActivityForm>

      <div >
        <CurrentWeekActivities activities={activities} status={true} week={week}></CurrentWeekActivities>
      </div>

      <div className='button-section-wrapper'>

        <ButtonGrupp

          showActivitiesToDelete={showActivitiesToDelete}
          updateActivity={updateActivity}
          markAllActivitiesAsDone={markAllActivitiesAsDone}
          showAllActivities={showAllActivities}
          buttonText={buttonText}
          deleteButtonText={deleteButtonText}
          customButtonOnClick={customButtonOnClick}></ButtonGrupp>

      </div>

      {customButtonStatus ? <h1>Jag är en custom Button</h1> : null}

      <div className="all-activities-section">

        <div>
          {showAllActivitiesStatus == true ?
            <>
              <div className='all-activities-table-header'>
                <h2>All activities</h2>
              </div>

              <table className='all-activities-table'>
                <tbody>
                  <tr className="all-activities-table-header-row">
                    <th className='all-activities-activity'>Activity</th>
                    <th className='week'>Week</th>
                    <th>Days</th>
                    <th>Comment</th>
                  </tr>
                  {existingActivities}
                </tbody>
              </table>
            </>
            : null}
        </div>


        <div className='delete-activities-section'>
          {deleteActivitiesStatus == true && activtiesToDelete.length != 0 ?
            <>
              <div className='all-activities-table-header'>
                <h2>Activities to delete</h2>
              </div>
              <table className='all-activities-table'>
                <tbody>
                  <tr className="all-activities-table-header-row">
                    <th>Activity</th>
                    <th className='week'>Week</th>
                    <th>Days</th>
                    <th>Comment</th>
                    <th>Action</th>
                  </tr>
                  {activtiesToDelete}
                </tbody>
              </table></> : null}
        </div>

      </div >

      <Footer div={''}></Footer>

    </>

  )
}

export default App
