import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import { useAuth } from "./context/AuthContext";
import AuthedLayout from "./components/AuthedLayout";
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
import LoadingSpinner from "./components/LoadingSpinner";
import UnauthedLayout from "./components/UnauthedLayout";

const router = createBrowserRouter([
  {
    element: <HomePage />,
    path: "/",
  },
  {
    path: "/",
    element: <UnauthedLayout />,
    children: [
      {
        path: "/signup",
        element: <SignUpPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
    ],
  },

  {
    path: "/",
    element: <AuthedLayout />,
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
        loader: async ({ request, params }) => {
          const allTeamsData = await axios.get("/api/teams");
          return { allTeamsData };
        },
      },
      {
        path: "/teams/:teamId",
        element: <TeamPage />,
        loader: async ({ request, params }) => {
          const { teamId } = params;
          const singleTeamData = await axios.get(`/api/teams/${teamId}`);
          return { singleTeamData };
        },
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const restoreUser = async () => {
      const { data: user } = await axios.get("/api/session");
      setAuthedUser(user);
      setLoading(false);
    };
    restoreUser();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return <RouterProvider router={router} />;
};

export default App;
