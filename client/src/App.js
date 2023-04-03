import { createBrowserRouter, RouterProvider } from "react-router-dom";
import axios from "axios";
import Splash from "./pages/Splash";
import Layout from "./components/Layout";

const router = createBrowserRouter([
  /* COMPONENTS FROM PAGES DIRECTORY WILL BE INSERTED INTO THE ELEMENT PROPERTIES */
  {
    // It renders this element
    element: <Splash />,
    // When the URL matches this segment
    path: "/",
    // With this data loaded before rendering("get")
    loader: async ({ request, params }) => {
      const { data } = await axios.get("/api/users");
      return data;
    },
    // And renders this element in case something went wrong
    errorElement: <div>ERROR</div>,
  },
  {
    path: "/register",
    element: <div>REGISTER</div>,
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/teams",
        element: <div>TEAMS</div>,
      },
      {
        path: "/:user",
        element: (
          <div className="text-7xl">
            USER PROFILEUSER PROFILEUSER PROFILEUSER PROFILEUSER PROFILEUSER
            PROFILEUSER PROFILEUSER PROFILEUSER PROFILEUSER PROFILEUSER
            PROFILEUSER PROFILEUSER PROFILEUSER PROFILE
          </div>
        ),
      },
      {
        path: "/:user/favorites",
        element: <div>USER FAVORITES</div>,
      },
      {
        path: "/:user/posts/:postId",
        element: <div>USER FAVORITES</div>,
      },
      {
        path: "/:user/posts/create-post",
        element: <div>CREATE POST</div>,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
