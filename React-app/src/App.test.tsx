import {render,screen} from '@testing-library/react'
import App from './App'

it("Should have message Landning page", () => {
 render(<App/>)

 const message =  screen.queryByText("Landing page");
 expect(message).toBeVisible();

 const helloWorld =  screen.queryByText("by world");
 expect(helloWorld).toBeVisible();

})