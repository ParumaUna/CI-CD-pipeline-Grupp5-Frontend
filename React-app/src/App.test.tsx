import { render, screen } from '@testing-library/react'
//import App from './App'
import { Header } from 'react-template-npm-coolbeans';
import ButtonGrupp from './components/ButtonsGroup';
//import App from './App';

describe("Given website", () => {



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
            console.log("headers: ", headers);
            expect(headers).toHaveLength(2);
            expect(headers[0]).toHaveTextContent("Fun Days of the Week Activities");
            expect(headers[1]).toHaveTextContent("Weekly Activities Planner");


            const headerStyles = window.getComputedStyle(headers[0]);
            expect(headerStyles.color).toBe('rgb(128, 128, 128)');

        })
    })

    describe("When testing buttonGroup content", () => {

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
        it("ButtonGroup should have elements and properties", () => {

            const buttons = screen.queryAllByRole("button");
            expect(buttons?.length).toBe(4);
            expect(buttons[0]).toHaveTextContent("Mark as done");
            expect(buttons[1]).toHaveTextContent("Delete activity");
            expect(buttons[2]).toHaveTextContent("Update activity");
            expect(buttons[3]).toHaveTextContent("All activities");
        })
    })





})
