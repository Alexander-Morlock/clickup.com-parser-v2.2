import AuthForm from "./components/AuthForm";
import Timing from "./components/Timing";
import { useTypedSelector } from "./hooks";

function App() {
  const { isAuth } = useTypedSelector((state) => state.auth);

  return !isAuth ? <AuthForm /> : <Timing />;
}

export default App;
