import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import {selectAuthenticated} from '../store/selectors/session';
import {
    createBrowserRouter,
    RouterProvider,
    Route,
    Link,
  } from "react-router-dom";

const selectSessionDetails = createSelector(
    selectAuthenticated,
    (isAuthorized) => ({
      isAuthorized,
    })
  );

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <div>
          <h1>Hello World</h1>
          <Link to="about">About Us</Link>
        </div>
      ),
    },
    {
      path: "about",
      element: <div>About</div>,
    },
  ]);
  
export const Routes = (() => {
    const { isAuthorized } = useSelector(selectSessionDetails);


    return (
        <RouterProvider router={router} />
    );

});