import "./styles/OneActivity.css"

interface ICustomButton {
    getAllActivities : () => void
    text: string

}

const CustomButton = (props : ICustomButton) => {

const getAllActivities = () => {
    props.getAllActivities();
}

    return(
        <>
        <button id="btn-get-activities" 
            className='btnGetActivities'
            onClick={ () => getAllActivities()}>
            {props.text}
        </button>
        </>
    )
}

export default CustomButton