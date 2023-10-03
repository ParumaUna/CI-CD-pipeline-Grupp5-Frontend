import { Button } from 'react-template-npm-coolbeans';

interface IButtonGrupp {
  
  updateActivity: () => void
  markAllActivitiesAsDone: () => void
  showActivitiesToDelete: () => void
  showAllActivities: () => void
  customButtonOnClick: () => void
  buttonText: string
  deleteButtonText: string

}

const ButtonGrupp = (props: IButtonGrupp) => {

  const customButtonOnClick = () => {
    props.customButtonOnClick();
  }

  const showActivitiesToDelete = () => {
    props.showActivitiesToDelete()
  }

  const updateActivity = () => {
    props.updateActivity()
  }

  const markAllActivitiesAsDone = () => {
    props.markAllActivitiesAsDone()
  }

  const showAllActivities = () => {
    props.showAllActivities()
  }


  //-----------------------------------------------------------------------
  return (
    <>

      <button id="btn-hide-current-activities"

        className='btnGetActivities'
        onClick={() => { markAllActivitiesAsDone() }}>
        Mark as done
      </button>

      <button id="btn-hide-current-activities"
        className='btnGetActivities'
        onClick={() => showActivitiesToDelete()}>
        {props.deleteButtonText}
      </button>

      <button id="btn-hide-current-activities"
        className='btnGetActivities'
        onClick={() => updateActivity()}>
        Update activity
      </button>

      <button id="btn-get-activities"
        className='btnGetActivities'
        onClick={() => showAllActivities()}>
        {props.buttonText}
      </button>

      <Button label={'Custom button'} onClick={customButtonOnClick} />
    </>

  )
}

export default ButtonGrupp