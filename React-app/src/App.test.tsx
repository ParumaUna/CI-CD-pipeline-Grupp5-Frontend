import { render, screen } from '@testing-library/react'
//import App from './App'
import { Header } from 'react-template-npm-coolbeans';
import ButtonGrupp from './components/ButtonsGroup';
import CurrentWeekActivities from './components/CurrentWeekActivities';
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





})
