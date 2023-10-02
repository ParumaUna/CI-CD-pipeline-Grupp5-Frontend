import { render, screen, fireEvent} from '@testing-library/react'
//import App from './App'
import { Header } from 'react-template-npm-coolbeans';
import ButtonGrupp from './components/ButtonsGroup';
import CurrentWeekActivities from './components/CurrentWeekActivities';
import CreateActivityForm from './components/CreateActivityForm';
import Footer from './components/Footer';


describe("Given website", () => {


    //-----------------Header----------------------------------------------
    describe("When testing header content", () => {

        //--------------------
        beforeAll(() => {
            render(<Header h1={'Fun Days of the Week Activities'} h2={'Weekly Activities Planner'} />)
        })

        //--------------------
        it("Header should have elements and properties", () => {

            const message = screen.queryByText("Fun Days of the Week Activities");
            expect(message).toBeVisible();

            const helloWorld = screen.queryByText("Weekly Activities Planner");
            expect(helloWorld).toBeVisible();

            const headers = screen.getAllByRole("heading");
            expect(headers).toHaveLength(2);
            expect(headers[0]).toHaveTextContent("Fun Days of the Week Activities");
            expect(headers[1]).toHaveTextContent("Weekly Activities Planner");


            const headerStyles = window.getComputedStyle(headers[0]);
            expect(headerStyles.color).toBe('rgb(128, 128, 128)');

        })
    })


    //-----------------ButtonGroup----------------------------------------------
    describe("When testing ButtonGroup content", () => {

        //--------------------
        beforeAll(() => {

            render(<ButtonGrupp 
                showActivitiesToDelete={function (): void {throw new Error('Function not implemented.');} }
                updateActivity={function (): void {throw new Error('Function not implemented.');} }
                markAllActivitiesAsDone={function (): void {throw new Error('Function not implemented.');} }
                showAllActivities={function (): void {throw new Error('Function not implemented.');} }
                buttonText={'All activities'} 
                deleteButtonText={"Delete activity"}
                customButtonOnClick={function (): void {throw new Error('Function not implemented.');} } />)

        })
        //--------------------
        it("ButtonGroup should have 4 buttons", () => {

            const buttons = screen.queryAllByRole("button");

            expect(buttons?.length).toBe(5);
            expect(buttons[0]).toHaveTextContent("Mark as done");
            expect(buttons[1]).toHaveTextContent("Delete activity");
            expect(buttons[2]).toHaveTextContent("Update activity");
            expect(buttons[3]).toHaveTextContent("All activities");
        })
    })


    //-----------------CurrentWeekActivitiesContent----------------------------------------------
    describe("When testing CurrentWeekActivitiesContent content", () => {
    
        //--------------------
        beforeAll(() => {
            render(<CurrentWeekActivities activities={[]} status={true} week={30} />)
        })

        //--------------------
        it("CurrentWeekActivities has elements and properties", () => {

            const headings = screen.queryAllByRole("heading");
            expect(headings.length).toBe(2);
            expect(headings[0]).toHaveTextContent("Current week: 30");
            expect(headings[1]).toHaveTextContent("Current week activities");

            const table = screen.queryAllByRole("table");
            expect(table.length).toBe(1);

            const tableHeaders = screen.queryAllByRole("columnheader");
            expect(tableHeaders.length).toBe(8);
            expect(tableHeaders[0]).toHaveTextContent("Monday");
            expect(tableHeaders[1]).toHaveTextContent("Tuesday");
            expect(tableHeaders[2]).toHaveTextContent("Wednesday");
            expect(tableHeaders[3]).toHaveTextContent("Thursday");
            expect(tableHeaders[4]).toHaveTextContent("Friday");
            expect(tableHeaders[5]).toHaveTextContent("Saturday");
            expect(tableHeaders[6]).toHaveTextContent("Sunday");
            expect(tableHeaders[7]).toHaveTextContent("");
        })

    })

    //-----------------CreateActivityForm input fields----------------------------------------------
    describe("When testing CreateActivityForm content", () => {

        // Function to mock handleSubmit
        const handleSubmitMock = () => {
            console.log("handleSubmit is called");
        };

        //--------------------
        beforeAll(() => {
            render(<CreateActivityForm onActivitySubmit={handleSubmitMock} />)
        });

        //--------------------
        it("CurrentWeekActivities has elements and properties", () => {

            const formElement = screen.getByRole("form");
            expect(formElement).toBeVisible();

            const headings = screen.queryAllByRole("heading");
            expect(headings.length).toBe(1);
            expect(headings[0]).toHaveTextContent("Create New Activity");


            const label1 = screen.queryByText("Activity Name:");
            const label2 = screen.queryByText("Week:");
            const label3 = screen.queryByText("Comment:");
            expect(label1).toBeVisible();
            expect(label2).toBeVisible();
            expect(label3).toBeVisible();

            const buttons = screen.queryAllByRole("button");
            expect(buttons.length).toBe(1);
            expect(buttons[0]).toHaveTextContent("Add Activity");
            expect(buttons[0]).toHaveAttribute("type", "submit");


            const checkboxes = screen.queryAllByRole("checkbox");
            expect(checkboxes.length).toBe(7);

            const inputFields = screen.queryAllByRole("textbox");
            expect(inputFields.length).toBe(2);

            const spinButtons = screen.queryAllByRole("spinbutton");
            expect(spinButtons.length).toBe(1);


            buttons.forEach((button) => { console.log(button.textContent)})

            fireEvent.change(inputFields[0], {target: {value : "Activity 1"}})
            expect(inputFields[0]).toHaveValue("Activity 1");
            expect(inputFields[0]).toHaveAttribute("type", "text");


            fireEvent.change(inputFields[1], {target: {value : "Comment 1"}})
            expect(inputFields[1]).toHaveValue("Comment 1");
            expect(inputFields[1]).toHaveAttribute("type", "text");

            fireEvent.change(spinButtons[0], {target: {value : 42}})
            expect(spinButtons[0]).toHaveValue(42);
            expect(spinButtons[0]).toHaveAttribute("type", "number");


            fireEvent.submit(formElement);
            expect(handleSubmitMock).toHaveBeenCalledOnce;
        })
    })


    //----------------- Footer ----------------------------------------------
    describe("When testing Footer content", () => {


        //--------------------
        beforeAll(() => {
            render(<Footer div={''}/>)
        })

        //--------------------
        it("CurrentWeekActivities has elements and properties", () => {
            
            const footerElement = screen.getByRole("contentinfo");
            expect(footerElement).toBeVisible();

            const listElements = screen.queryAllByRole("list");
            expect(listElements.length).toBe(3);

            const headings = screen.queryAllByRole("heading");
            expect(headings.length).toBe(5);

            expect(headings[0]).toHaveTextContent("USEFULL LINKS");
            expect(headings[0].tagName).toBe("H5");

            expect(headings[1]).toHaveTextContent("AboutServicesContact");
            expect(headings[1].tagName).toBe("H6");  

            expect(headings[2]).toHaveTextContent("NEWSLETTER");
            expect(headings[2].tagName).toBe("H5");

            expect(headings[3]).toHaveTextContent("CONTACT");
            expect(headings[3].tagName).toBe("H5");

            expect(headings[4]).toHaveTextContent("Isafjordsgatan 30A, 164 40 Kista075624178");
            expect(headings[4].tagName).toBe("H6");

            const listItemElements = screen.queryAllByRole("listitem");
            expect(listItemElements.length).toBe(5);

            const buttons = screen.queryAllByRole("button");
            expect(buttons.length).toBe(1);
            expect(buttons[0]).toHaveTextContent("Subscribe");

            const inputFields = screen.queryAllByRole("textbox");
            expect(inputFields.length).toBe(1); 

        })
    })

})

