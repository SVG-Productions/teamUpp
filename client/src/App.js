import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
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
import {
  UserSettingsLayout,
  userSettingsLoader,
} from "./components/UserSettingsLayout";
import { ProfileSettingsPage } from "./pages/ProfileSettingsPage";
import { AccountSettingsPage } from "./pages/AccountSettingsPage";
import { AppearanceSettingsPage } from "./pages/AppearanceSettingsPage";
import { TeamsPage, teamsLoader } from "./pages/TeamsPage";
import { TeamPage, teamLoader } from "./pages/TeamPage";
import { TeamSettingsPage, teamSettingsLoader } from "./pages/TeamSettingsPage";
import { ListingPage, listingLoader } from "./pages/ListingPage";
import NotFoundPage from "./pages/NotFoundPage";
import ErrorElement from "./components/ErrorElement";
import TeamMemberAuthorization from "./components/TeamMemberAuthorization";

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
            path: "favorites",
            element: <FavoritesPage />,
            loader: favoritesLoader,
          },
          {
            path: "settings",
            element: <UserSettingsLayout />,
            loader: userSettingsLoader,
            id: "userSettings",
            children: [
              {
                path: "/:username/settings",
                element: <Navigate to="../profile" replace={true} />,
              },
              {
                path: "profile",
                element: <ProfileSettingsPage />,
              },
              {
                path: "account",
                element: <AccountSettingsPage />,
              },
              {
                path: "appearance",
                element: <AppearanceSettingsPage />,
              },
            ],
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
        path: "/teams/:teamId/listings/:listingId",
        element: (
          <TeamMemberAuthorization>
            <ListingPage />
          </TeamMemberAuthorization>
        ),
        loader: listingLoader,
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
      // const {data: user} = await axios.get("/api/users/:userId")
      setAuthedUser(user);
      // setTheme(user.theme)
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
