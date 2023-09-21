import "./styles/OneActivity.css"

interface IOneActivity {

    id: string
    nameOfActivity: string
    week: number
    startTime: Date
    stopTime: Date
    day: string
    comment: string
}


const OneActivity = (props: IOneActivity) => {
    //-----------------------------------------------------------------------
    return(
        <>
        <tr className="tableRow">
            <td>{props.nameOfActivity}</td> 
            <td>{props.week}</td> 
            <td>{props.day}</td> 
            <td>{props.comment}</td>                      
        </tr>
    </>
    )
}

export default OneActivity