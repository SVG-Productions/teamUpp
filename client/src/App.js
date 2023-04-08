import { createBrowserRouter, RouterProvider } from "react-router-dom";
import axios from "axios";

import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
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
import { useAuth } from "./context/AuthContext";
import { useEffect } from "react";

const router = createBrowserRouter([
  {
    element: <HomePage />,
    path: "/",
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
        path: "/:userId",
        element: <UserPage />,
        loader: async ({ request, params }) => {
          const { userId } = params;
          const userData = await axios.get(`/api/users/${userId}`);
          const userTeamData = await axios.get(`/api/users/${userId}/teams`);
          const userTeammates = await axios.get(
            `/api/users/${userId}/teammates`
          );
          return { userData, userTeamData, userTeammates };
        },
      },
      {
        path: "/:userId/favorites",
        element: <FavoritesPage />,
        loader: async ({ request, params }) => {
          const { userId } = params;
          try {
            const userFavorites = await axios.get(
              `/api/users/${userId}/favorites`
            );
            return { userFavorites };
          } catch (error) {
            console.error(error);
            return { error };
          }
        },
      },
      {
        path: "/:userId/settings",
        element: <UserSettingsPage />,
        loader: async ({ request, params }) => {
          const { userId } = params;
          const { data } = await axios.get(`/api/users/${userId}`);
          return data;
        },
      },
      {
        path: "/:userId/settings/delete-account",
        element: <div>DELETE ACCOUNT</div>,
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
  const { setAuthedUser } = useAuth();

  useEffect(() => {
    const restoreUser = async () => {
      const { data: user } = await axios.get("/api/session");
      setAuthedUser(user);
    };
    restoreUser();
  }, []);
  return <RouterProvider router={router} />;
};

export default App;
