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
import TeamSettingsPage from "./pages/TeamSettingsPage";
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
    loader: async ({ request, params }) => {
      const { data } = await axios.get("/api/session");
      if (data) {
        const userTeamsData = await axios.get(
          `/api/users/${data.id}/user-teams`
        );
        const userTeams = userTeamsData.data.filter(
          (team) => team.status !== "invited" && team.status !== "requested"
        );
        const invites = userTeamsData.data.filter(
          (team) => team.status === "invited"
        );
        return { userTeams, invites };
      }
      return null;
    },
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
        loader: async ({ request, params }) => {
          const { username } = params;
          const { data: userId } = await axios.get(
            `/api/users/usernames/${username}`
          );
          const [userData, userTeamsData, userTeammates] = await Promise.all([
            axios.get(`/api/users/${userId}`),
            axios.get(`/api/users/${userId}/user-teams`),
            axios.get(`/api/users/${userId}/teammates`),
          ]);

          const user = userData.data;
          const teammates = userTeammates.data;
          const userTeams = userTeamsData.data.filter(
            (team) => team.status !== "invited" && team.status !== "requested"
          );
          return { user, teammates, userTeams };
        },
      },
      {
        path: "/:username/favorites",
        element: <FavoritesPage />,
        loader: async ({ request, params }) => {
          const { username } = params;
          const { data: userId } = await axios.get(
            `/api/users/usernames/${username}`
          );
          const userFavorites = await axios.get(
            `/api/users/${userId}/favorites`
          );
          const favorites = userFavorites.data;

          return { favorites };
        },
      },
      {
        path: "/:username/settings",
        element: (
          <UserAuthorization>
            <UserSettingsPage />
          </UserAuthorization>
        ),
        loader: async ({ request, params }) => {
          const { username } = params;
          const { data: userId } = await axios.get(
            `/api/users/usernames/${username}`
          );
          const userData = await axios.get(`/api/users/${userId}`);
          const user = userData.data;

          return { user };
        },
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
        loader: async ({ request, params }) => {
          const { data } = await axios.get("/api/session");
          if (data) {
            const { id: userId } = data;
            const [userTeamsData, allTeamsData] = await Promise.all([
              axios.get(`/api/users/${userId}/user-teams`),
              axios.get("/api/teams"),
            ]);
            const teams = allTeamsData.data;
            const userTeams = userTeamsData.data;
            return { teams, userTeams };
          }
          return null;
        },
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
          return { teamData, teammatesData };
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
