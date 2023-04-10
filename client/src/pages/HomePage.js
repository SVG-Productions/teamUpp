import Dashboard from "../components/Dashboard";
import Splash from "../components/Splash";
import UnauthedLayout from "../components/UnauthedLayout";
import AuthedLayout from "../components/AuthedLayout";
import { useAuth } from "../context/AuthContext";

const HomePage = () => {
  const { authedUser } = useAuth();

  return authedUser ? (
    <AuthedLayout>
      <Dashboard />
    </AuthedLayout>
  ) : (
    <UnauthedLayout>
      <Splash />
    </UnauthedLayout>
  );
};

export default HomePage;
