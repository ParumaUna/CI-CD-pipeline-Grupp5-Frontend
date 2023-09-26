import {render,screen} from '@testing-library/react'
import App from './App'

it("Should have message Landning page", () => {
 render(<App/>)

 const message =  screen.queryByText("Fun Days of the Week Activities");
 expect(message).toBeVisible();

 const helloWorld =  screen.queryByText("Weekly Activities Planner");
 expect(helloWorld).toBeVisible();

})