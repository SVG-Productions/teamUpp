import { createBrowserRouter, RouterProvider } from "react-router-dom";
import axios from "axios";

import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import ErrorElement from "./components/ErrorElement";
import TeamsPage from "./pages/TeamsPage";
import UserPage from "./pages/UserPage";
import FavoritesPage from "./pages/FavoritesPage";
import UserSettingsPage from "./pages/UserSettingsPage";
import TeamPage from "./pages/TeamPage";
import CreateTeamPage from "./pages/CreateTeamPage";
import ListingDetailsPage from "./pages/ListingDetailsPage";
import ListingExperiencesPage from "./pages/ListingExperiencesPage";
import CreateListingPage from "./pages/CreateListingPage";
import CreateExperiencePage from "./pages/CreateExperiencePage";

const router = createBrowserRouter([
  {
    element: <HomePage />,
    path: "/",
    loader: async ({ request, params }) => {
      const { data } = await axios.get("/api/users");
      return data;
    },
    errorElement: <ErrorElement />,
  },
  {
    path: "/signup",
    element: <SignUpPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/:user",
        element: <UserPage />,
      },
      {
        path: "/:user/favorites",
        element: <FavoritesPage />,
        loader: async ({ request, params }) => {
          const { user } = params;
          try {
            const userFavorites = await axios.get(`/api/users/${user}/favorites`);
            return { userFavorites };
          } catch (error) {
            console.error(error);
            return { error };
          }
        },
      },
      {
        path: "/:user/settings",
        element: <UserSettingsPage />,
      },
      {
        path: "/teams",
        element: <TeamsPage />,
      },
      {
        path: "/teams/:teamId",
        element: <TeamPage />,
      },
      {
        path: "/teams/:teamId/listings/:listingId/details",
        element: <ListingDetailsPage />,
      },
      {
        path: "/teams/:teamId/listings/:listingId/experiences",
        element: <ListingExperiencesPage />,
      },
      {
        path: "/teams/create-team",
        element: <CreateTeamPage />,
      },
      {
        path: "/teams/:teamId/create-listing",
        element: <CreateListingPage />,
      },
      {
        path: "/teams/:teamId/listings/:listingId/create-experience",
        element: <CreateExperiencePage />,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
