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
            <td className="nameOfActivity">{props.nameOfActivity}</td> 
            <td className="week">{props.week}</td> 
            <td className="day">{props.day}</td> 
            <td className="comment">{props.comment}</td>                      
        </tr>
    </>
    )
}

export default OneActivity