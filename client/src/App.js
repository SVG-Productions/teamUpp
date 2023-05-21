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
import { TeamsPage, teamsLoader } from "./pages/TeamsPage";
import { TeamPage, teamLoader } from "./pages/TeamPage";
import { TeamSettingsPage, teamSettingsLoader } from "./pages/TeamSettingsPage";
import { DeleteTeamPage, deleteTeamLoader } from "./pages/DeleteTeamPage";
import {
  listingDetailsLoader,
  ListingDetailsPage,
} from "./pages/ListingDetailsPage";
import {
  listingExperiencesLoader,
  ListingExperiencesPage,
} from "./pages/ListingExperiencesPage";
import { EditListingPage, editListingLoader } from "./pages/EditListingPage";
import NotFoundPage from "./pages/NotFoundPage";
import ErrorElement from "./components/ErrorElement";
import TeamMemberAuthorization from "./components/TeamMemberAuthorization";
import { ListingPage, listingLoader } from "./pages/ListingPage";

const router = createBrowserRouter([
  {
    element: <HomePage />,
    path: "/",
    loader: homeLoader,
    errorElement: <ErrorElement />,
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
        errorElement: <ErrorElement />,
        loader: userLoader,
      },
      {
        path: "/:username",
        element: <UserAuthorization />,
        errorElement: <ErrorElement />,
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
        ],
      },
      {
        path: "/teams",
        element: <TeamsPage />,
        loader: teamsLoader,
      },
      {
        path: "/teams/:teamId",
        element: <TeamPage />,
        loader: teamLoader,
        errorElement: <ErrorElement />,
      },
      {
        path: "/teams/:teamId/settings",
        element: (
          <TeamAdminAuthorization>
            <TeamSettingsPage />
          </TeamAdminAuthorization>
        ),
        loader: teamSettingsLoader,
        errorElement: <ErrorElement />,
      },
      {
        path: "/teams/:teamId/settings/delete-team",
        element: (
          <TeamAdminAuthorization owner={true}>
            <DeleteTeamPage />
          </TeamAdminAuthorization>
        ),
        loader: deleteTeamLoader,
        errorElement: <ErrorElement />,
      },
      {
        path: "/teams/:teamId/listings/:listingId",
        element: (
          <TeamMemberAuthorization>
            <ListingPage />
          </TeamMemberAuthorization>
        ),
        loader: listingLoader,
        errorElement: <ErrorElement />,
      },
      {
        path: "/teams/:teamId/listings/:listingId/details",
        element: (
          <TeamMemberAuthorization>
            <ListingDetailsPage />
          </TeamMemberAuthorization>
        ),
        loader: listingDetailsLoader,
        errorElement: <ErrorElement />,
      },
      {
        path: "/teams/:teamId/listings/:listingId/experiences",
        element: (
          <TeamMemberAuthorization>
            <ListingExperiencesPage />
          </TeamMemberAuthorization>
        ),
        loader: listingExperiencesLoader,
        errorElement: <ErrorElement />,
      },
      {
        path: "/teams/:teamId/listings/:listingId/edit",
        element: (
          <TeamMemberAuthorization>
            <EditListingPage />
          </TeamMemberAuthorization>
        ),
        loader: editListingLoader,
        errorElement: <ErrorElement />,
      },
      { path: "/*", element: <NotFoundPage /> },
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
