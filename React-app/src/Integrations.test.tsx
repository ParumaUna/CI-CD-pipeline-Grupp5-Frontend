import { render, screen, fireEvent, waitFor} from '@testing-library/react'
import App from './App';


//-----------------CreateActivityForm----------------------------------------------
describe("When testing CreateActivityForm content", () => {


    beforeAll(() => {
        render(<App/>)
    });

    //TODO: Fix this test
    it.skip("When testin integration Form and CurrentActivityTable", async () => {

        const formElement = screen.getByRole("form");
        expect(formElement).toBeVisible();

        const inputFields = screen.queryAllByRole("textbox");
        expect(inputFields.length).toBe(3);

        const spinButtons = screen.queryAllByRole("spinbutton");
        expect(spinButtons.length).toBe(1);

        fireEvent.change(inputFields[0], {target: {value : "Activity 2"}})
        expect(inputFields[0]).toHaveValue("Activity 2");

        fireEvent.change(inputFields[1], {target: {value : "Comment 1"}})
        expect(inputFields[1]).toHaveValue("Comment 1");


        fireEvent.change(spinButtons[0], {target: {value : 42}})
        expect(spinButtons[0]).toHaveValue(42);

        const checkboxes = screen.queryAllByRole("checkbox");
        checkboxes.forEach((checkbox) => { console.log(checkbox.getAttribute("name"))})
        fireEvent.click(checkboxes[0]);
        expect(checkboxes[0]).toBeChecked();

        let tableRows = screen.queryAllByRole("cell");
        expect(tableRows.length).toBe(8);

        
        fireEvent.submit(formElement);

        tableRows = await screen.getAllByRole("cell");

        await waitFor(() => expect(tableRows[0]).toHaveTextContent("Activity 2"));
        //expect(tableRows[0]).toHaveValue("Activity 1");

        tableRows.forEach((cell) => { console.log(cell.textContent)})

        const elementWithText = await screen.getByText(/Activity 2/); 
        await waitFor(() => expect(elementWithText).toBeInTheDocument());   


    })


})

//----------------- Get all activities table ----------------------------------------------
describe("When testing integration All activity button",  () => {

    beforeAll(() => {
        render(<App/>)
    });

    it("click on All activities button",  () => {

        const buttons = screen.queryAllByRole("button");

        buttons.forEach((button) => { console.log(button.textContent)})
        
        let tables = screen.queryAllByRole("table");
        expect(tables.length).toBe(1);

        fireEvent.click(buttons[4]);
        expect(buttons[4]).toHaveTextContent("Hide all activities");

        tables =  screen.queryAllByRole("table");
        expect(tables.length).toBe(2);

        const headerAllActivities = screen.queryByText(/All activities/);
        expect(headerAllActivities).toBeInTheDocument();

    })


})