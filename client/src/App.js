import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import { useAuth } from "./context/AuthContext";
import AuthedLayout from "./components/AuthedLayout";
import UnauthedLayout from "./components/UnauthedLayout";
import UserAuthorization from "./components/UserAuthorization";
import TeamAdminAuthorization from "./components/TeamAdminAuthorization";
import LoadingSpinner from "./components/LoadingSpinner";
import { SignUpPage } from "./pages/SignUpPage";
import { LoginPage } from "./pages/LoginPage";
import { HomePage, homeLoader } from "./pages/HomePage";
import { UserPage, userLoader } from "./pages/UserPage";
import { FavoritesPage, favoritesLoader } from "./pages/FavoritesPage";
import { UserSettingsPage, userSettingsLoader } from "./pages/UserSettingsPage";
import { DeleteAccountPage } from "./pages/DeleteAccountPage";
import { TeamsPage, teamsLoader } from "./pages/TeamsPage";
import { TeamPage, teamLoader } from "./pages/TeamPage";
import { TeamSettingsPage, teamSettingsLoader } from "./pages/TeamSettingsPage";
import { DeleteTeamPage, deleteTeamLoader } from "./pages/DeleteTeamPage";
import { CreateTeamPage } from "./pages/CreateTeamPage";
import {
  listingDetailsLoader,
  ListingDetailsPage,
} from "./pages/ListingDetailsPage";
import { ListingExperiencesPage } from "./pages/ListingExperiencesPage";
import {
  CreateListingPage,
  createListingLoader,
} from "./pages/CreateListingPage";
import { CreateExperiencePage } from "./pages/CreateExperiencePage";

const router = createBrowserRouter([
  {
    element: <HomePage />,
    path: "/",
    loader: homeLoader,
  },
  {
    path: "/",
    element: <UnauthedLayout />,
    children: [
      {
        path: "signup",
        element: <SignUpPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
    ],
  },
  {
    path: "/",
    element: <AuthedLayout />,
    children: [
      {
        path: "/:username",
        element: <UserPage />,
        loader: userLoader,
      },
      {
        path: "/:username",
        element: <UserAuthorization />,
        children: [
          {
            path: "/:username/favorites",
            element: <FavoritesPage />,
            loader: favoritesLoader,
          },
          {
            path: "/:username/settings",
            element: <UserSettingsPage />,
            loader: userSettingsLoader,
          },
          {
            path: "/:username/settings/delete-account",
            element: <DeleteAccountPage />,
          },
        ],
      },
      {
        path: "/teams",
        element: <TeamsPage />,
        loader: teamsLoader,
      },
      {
        path: "/teams/create-team",
        element: <CreateTeamPage />,
      },
      {
        path: "/teams/:teamId",
        element: <TeamPage />,
        loader: teamLoader,
      },
      {
        path: "/teams/:teamId/settings",
        element: (
          <TeamAdminAuthorization>
            <TeamSettingsPage />
          </TeamAdminAuthorization>
        ),
        loader: teamSettingsLoader,
      },
      {
        path: "/teams/:teamId/settings/delete-team",
        element: (
          <TeamAdminAuthorization owner={true}>
            <DeleteTeamPage />
          </TeamAdminAuthorization>
        ),
        loader: deleteTeamLoader,
      },
      {
        path: "/teams/:teamId/listings/:listingId/details",
        element: <ListingDetailsPage />,
        loader: listingDetailsLoader,
      },
      {
        path: "/teams/:teamId/listings/:listingId/experiences",
        element: <ListingExperiencesPage />,
      },
      {
        path: "/teams/:teamId/create-listing",
        element: <CreateListingPage />,
        loader: createListingLoader,
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
