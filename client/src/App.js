import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import { useAuth } from "./context/AuthContext";
import AuthedLayout from "./layouts/AuthedLayout";
import UnauthedLayout from "./layouts/UnauthedLayout";
import LoadingSpinner from "./components/LoadingSpinner";
import { SignUpPage } from "./pages/SignUpPage";
import { LoginPage } from "./pages/LoginPage";
import { HomePage, homeLoader } from "./pages/HomePage";
import { UserPage, userLoader } from "./pages/UserPage";
import { FavoritesPage, favoritesLoader } from "./pages/FavoritesPage";
import {
  UserSettingsLayout,
  userSettingsLoader,
} from "./layouts/UserSettingsLayout";
import {
  TeamSettingsLayout,
  teamSettingsLoader,
} from "./layouts/TeamSettingsLayout";
import { UserProfileSettingsPage } from "./pages/UserProfileSettingsPage";
import { UserPhotoSettingsPage } from "./pages/UserPhotoSettingsPage";
import { UserAccountSettingsPage } from "./pages/UserAccountSettingsPage";
import { UserAppearanceSettingsPage } from "./pages/UserAppearanceSettingsPage";
import { TeamsPage, teamsLoader } from "./pages/TeamsPage";
import { TeamPage, teamLoader } from "./pages/TeamPage";
import { TeamProfileSettingsPage } from "./pages/TeamProfileSettingsPage";
import { TeamPhotoSettingsPage } from "./pages/TeamPhotoSettingsPage";
import { TeamPrivacySettingsPage } from "./pages/TeamPrivacySettingsPage";
import { TeamMembersSettingsPage } from "./pages/TeamMembersSettingsPage";
import { ListingPage, listingLoader } from "./pages/ListingPage";
import NotFoundPage from "./pages/NotFoundPage";
import ErrorElement from "./components/ErrorElement";
import { Toaster } from "react-hot-toast";
import {
  confirmAccountLoader,
  ConfirmAccountPage,
} from "./pages/ConfirmAccountPage";
import { ForgotPasswordPage } from "./pages/ForgotPasswordPage";
import { ResetPasswordPage } from "./pages/ResetPasswordPage";

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
      {
        path: "confirm/:confirmationCode",
        element: <ConfirmAccountPage />,
        loader: confirmAccountLoader,
      },
      {
        path: "forgot-password",
        element: <ForgotPasswordPage />,
      },
      {
        path: "reset-password/:resetPassword",
        element: <ResetPasswordPage />,
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
        path: "/:username/favorites",
        element: <FavoritesPage />,
        loader: favoritesLoader,
      },
      {
        path: "/:username/settings",
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
            element: <UserProfileSettingsPage />,
          },
          {
            path: "photo",
            element: <UserPhotoSettingsPage />,
          },
          {
            path: "account",
            element: <UserAccountSettingsPage />,
          },
          {
            path: "appearance",
            element: <UserAppearanceSettingsPage />,
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
        element: <TeamSettingsLayout />,
        loader: teamSettingsLoader,
        id: "teamSettings",
        children: [
          {
            path: "/teams/:teamId/settings",
            element: <Navigate to="../profile" replace={true} />,
          },
          {
            path: "profile",
            element: <TeamProfileSettingsPage />,
          },
          {
            path: "photo",
            element: <TeamPhotoSettingsPage />,
          },
          {
            path: "privacy",
            element: <TeamPrivacySettingsPage />,
          },
          {
            path: "members",
            element: <TeamMembersSettingsPage />,
          },
        ],
      },
      {
        path: "/teams/:teamId/listings/:listingId",
        element: <ListingPage />,
        loader: listingLoader,
        errorElement: <ErrorElement />,
      },
      { path: "/*", element: <NotFoundPage /> },
    ],
  },
]);

const App = () => {
  const { setAuthedUser, setTheme } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const restoreUser = async () => {
      const { data: user } = await axios.get("/api/session");
      setAuthedUser(user);
      setTheme(user?.theme);
      setLoading(false);
    };
    restoreUser();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <Toaster />
      <RouterProvider router={router} />
    </>
  );
};

export default App;
