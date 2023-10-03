
import "./styles/CurrentWeekActivities.css"
import Activity from "../models/activity"

interface ICurrentWeekActivities {
  activities: Activity[]
  status: boolean
  week: number
}


const CurrentWeekActivities = (props: ICurrentWeekActivities) => {

  const week = props.week;

  const mondayActivities = props.activities.filter(activity => (activity.day.includes("Monday") && activity.week == props.week)).map((activity) => (
    <p className="activity">{activity.nameOfActivity}</p>
  ));
  const tuesdayActivities = props.activities.filter(activity => (activity.day.includes("Tuesday") && activity.week == props.week)).map((activity) => (
    <p className="activity">{activity.nameOfActivity}</p>
  ));
  const wednesdayActivities = props.activities.filter(activity => (activity.day.includes("Wednesday") && activity.week == props.week)).map((activity) => (
    <p className="activity">{activity.nameOfActivity}</p>
  ))
  const thursdayActivities = props.activities.filter(activity => (activity.day.includes("Thursday") && activity.week == props.week)).map((activity) => (
    <p className="activity">{activity.nameOfActivity}</p>
  ));
  const fridayActivities = props.activities.filter(activity => (activity.day.includes("Friday") && activity.week == props.week)).map((activity) => (
    <p className="activity">{activity.nameOfActivity}</p>
  ));
  const saturdayActivities = props.activities.filter(activity => (activity.day.includes("Saturday") && activity.week == props.week)).map((activity) => (
    <p className="activity">{activity.nameOfActivity}</p>
  ));
  const sandayActivities = props.activities.filter(activity => (activity.day.includes("Sunday") && activity.week == props.week)).map((activity) => (
    <p className="activity">{activity.nameOfActivity}</p>
  ));

  //-----------------------------------------------------------------------
  return (
    <>
      <h3 className="current-week-activities-number">Current week: {props.week === 0 ? "--" : week}</h3>
      {!props.status ? <p className="done-message">You have marked this week as done</p> : null}
      <div>
        <h2 className="current-week-activities-header">Current week activities</h2>

        <table className='current-week-activities-table'>
          <tbody>
            <tr className="header-row-current-activity">
              <th>Monday</th>
              <th>Tuesday</th>
              <th>Wednesday</th>
              <th>Thursday</th>
            </tr>
            <tr>
              {props.status ? <td>{mondayActivities}</td> : <td></td>}
              {props.status ? <td>{tuesdayActivities}</td> : <td></td>}
              {props.status ? <td>{wednesdayActivities}</td> : <td></td>}
              {props.status ? <td>{thursdayActivities}</td> : <td></td>}
            </tr>
            <tr className="header-row-current-activity">
              <th>Friday</th>
              <th>Saturday</th>
              <th>Sunday</th>
              <th></th>
            </tr>
            <tr>
              {props.status ? <td>{fridayActivities}</td> : <td></td>}
              {props.status ? <td>{saturdayActivities}</td> : <td></td>}
              {props.status ? <td>{sandayActivities}</td> : <td></td>}
              <td></td>
            </tr>

          </tbody>

        </table>

      </div>
    </>
  )
}

export default CurrentWeekActivities 