class Activity {
    _id: string;
    nameOfActivity: string;
    week: number;
    startTime: Date;
    stopTime: Date;
    day: string[];
    comment: string


    constructor(
                _id: string,
                nameOfActivity : string, 
                week: number, 
                startTime: Date, 
                stopTime: Date, 
                day: string[], 
                comment: string)
    {
        this._id = _id;
        this.nameOfActivity = nameOfActivity;
        this.week = week;
        this.startTime = startTime;
        this.stopTime = stopTime;
        this.day = day;
        this.comment = comment
    }
}
export default Activity;