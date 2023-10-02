import "./styles/ActivityToDelete.css"

interface IActivityToDelete {
    id: string
    nameOfActivity: string
    week: number
    startTime: Date
    stopTime: Date
    day: string
    comment: string
    onDeleteActivity : (id : string) => void
}


const ActivityToDelete = (props: IActivityToDelete) => {
    const days = props.day.split(",").join(" ")

       //-----------------------------------------------------------------------
       const onDeleteActivity = () => {
        props.onDeleteActivity(props.id);
    }

    //-----------------------------------------------------------------------
    return(
        <>
        <tr className="tableRow">
            <td>{props.nameOfActivity}</td> 
            <td>{props.week}</td> 
            <td>{days}</td> 
            <td>{props.comment}</td>  
            <td className="td-actions">
                <button 
                className="btnDelete"
                onClick={onDeleteActivity}><i>Delete</i></button>
            </td>                    
        </tr>
    </>
    )
}

export default ActivityToDelete