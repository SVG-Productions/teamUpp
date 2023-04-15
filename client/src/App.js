import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import { useAuth } from "./context/AuthContext";
import AuthedLayout from "./components/AuthedLayout";
import { HomePage, homeLoader } from "./pages/HomePage";
import { UserPage, userLoader } from "./pages/UserPage";
import { FavoritesPage, favoritesLoader } from "./pages/FavoritesPage";
import { UserSettingsPage, userSettingsLoader } from "./pages/UserSettingsPage";
import { TeamsPage, teamsLoader } from "./pages/TeamsPage";
import TeamPage from "./pages/TeamPage";
import { TeamSettingsPage, teamSettingsLoader } from "./pages/TeamSettingsPage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import DeleteTeamPage from "./pages/DeleteTeamPage";
import CreateTeamPage from "./pages/CreateTeamPage";
import ListingDetailsPage from "./pages/ListingDetailsPage";
import ListingExperiencesPage from "./pages/ListingExperiencesPage";
import CreateListingPage from "./pages/CreateListingPage";
import CreateExperiencePage from "./pages/CreateExperiencePage";
import DeleteAccountPage from "./pages/DeleteAccountPage";
import LoadingSpinner from "./components/LoadingSpinner";
import UnauthedLayout from "./components/UnauthedLayout";
import UserAuthorization from "./components/UserAuthorization";
import TeamAdminAuthorization from "./components/TeamAdminAuthorization";

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
        path: "/:username/favorites",
        element: <FavoritesPage />,
        loader: favoritesLoader,
      },
      {
        path: "/:username/settings",
        element: (
          <UserAuthorization>
            <UserSettingsPage />
          </UserAuthorization>
        ),
        loader: userSettingsLoader,
      },
      {
        path: "/:username/settings/delete-account",
        element: (
          <UserAuthorization>
            <DeleteAccountPage />
          </UserAuthorization>
        ),
      },
      {
        path: "/teams",
        element: <TeamsPage />,
        loader: teamsLoader,
      },
      {
        path: "/teams/:teamId",
        element: <TeamPage />,
        loader: async ({ request, params }) => {
          const { teamId } = params;
          const [singleTeamData, teammatesData] = await Promise.all([
            axios.get(`/api/teams/${teamId}`),
            axios.get(`/api/teams/${teamId}/teammates`),
          ]);
          const singleTeam = singleTeamData.data;
          const teammates = teammatesData.data.filter(
            (tm) => tm.status !== "invited" && tm.status !== "requested"
          );
          const requested = teammatesData.data.filter(
            (tm) => tm.status === "requested"
          );
          return { singleTeam, teammates, requested, teammatesData };
        },
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
        loader: async ({ request, params }) => {
          const { teamId } = params;
          const [teamData, teammatesData] = await Promise.all([
            axios.get(`/api/teams/${teamId}`),
            axios.get(`/api/teams/${teamId}/teammates`),
          ]);
          const team = teamData.data;
          const teammates = teammatesData.data;
          return { team, teammates };
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
