import { BrowserRouter as Router, Routes } from "react-router-dom"
import { AllRoutes } from "./routes/routes";
import { Config } from "./remotes/config";
function App() {
  Config();

  return <Router><Routes>{AllRoutes}</Routes></Router>
}

export default App;
