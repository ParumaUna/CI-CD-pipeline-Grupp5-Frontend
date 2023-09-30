interface IButtonGrupp {
    deleteActivity : () => void
    updateActivity : () => void
    markAllActivitiesAsDone : () => void
    showAllActivities : () => void
    buttonText : string

}

const ButtonGrupp = (props: IButtonGrupp) => {

    const deleteActivity = () => {
        props.deleteActivity()
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
    return(
        <>

<button id="btn-hide-current-activities"

          className='btnGetActivities'
          onClick={() => {markAllActivitiesAsDone}}>
          Mark as done
        </button>

        <button id="btn-hide-current-activities"
          className='btnGetActivities'
          onClick={() => deleteActivity()}>

          Delete activity
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
    </>
    
    )
}

export default ButtonGrupp