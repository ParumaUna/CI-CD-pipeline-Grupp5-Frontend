import { render, screen } from '@testing-library/react'
//import App from './App'
import { Header } from 'react-template-npm-coolbeans';
import ButtonGrupp from './components/ButtonsGroup';

import CurrentWeekActivities from './components/CurrentWeekActivities';
import CreateActivityForm from './components/CreateActivityForm';
import { e } from 'vitest/dist/reporters-cb94c88b.js';
//import App from './App';

describe("Given website", () => {


//-----------------Header----------------------------------------------
    describe("When testing header content", () => {

        beforeAll(() => {
            render(<Header h1={'Fun Days of the Week Activities'} h2={'Weekly Activities Planner'} />)
        })
        it("Header should have elements and properties", () => {

            //render(<Header h1={'Fun Days of the Week Activities'} h2={'Weekly Activities Planner'}/>)

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

        beforeAll(() => {
            render(<ButtonGrupp deleteActivity={function (): void {
                throw new Error('Function not implemented.');
            }}
                updateActivity={function (): void {
                    throw new Error('Function not implemented.');
                }}
                markAllActivitiesAsDone={function (): void {
                    throw new Error('Function not implemented.');
                }}
                showAllActivities={function (): void {
                    throw new Error('Function not implemented.');
                }}
                buttonText={'All activities'} />)

        })
        it("ButtonGroup should have 4 buttons", () => {

            const buttons = screen.queryAllByRole("button");
            expect(buttons?.length).toBe(4);
            expect(buttons[0]).toHaveTextContent("Mark as done");
            expect(buttons[1]).toHaveTextContent("Delete activity");
            expect(buttons[2]).toHaveTextContent("Update activity");
            expect(buttons[3]).toHaveTextContent("All activities");
        })
    })


//-----------------CurrentWeekActivitiesContent----------------------------------------------
    describe("When testing CurrentWeekActivitiesContent content", () => {

        beforeAll(() => {
            render(<CurrentWeekActivities activities={[]} status={true} week={30} />)
        })

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

//-----------------CreateActivityForm----------------------------------------------
    describe("When testing CreateActivityForm content", () => {

        beforeAll(() => {
            render(<CreateActivityForm onActivitySubmit={function (formData: any): void {
                throw new Error('Function not implemented.')} } />)
        })

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

            const inputFields = screen.queryAllByRole("textbox");       
            expect(inputFields.length).toBe(2);

            const buttons = screen.queryAllByRole("button");
            expect(buttons.length).toBe(1);
            expect(buttons[0]).toHaveTextContent("Add Activity");
            expect(buttons[0]).toHaveAttribute("type", "submit");

            const checkboxes = screen.queryAllByRole("checkbox");
            expect(checkboxes.length).toBe(7);
        })

    })

})
