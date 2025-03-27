import { Route, Routes } from "react-router";
import BasicInformationCard from "./features/characterSheet/basicInformation/BasicInformationCard";

function App() {
  return (
    <Routes>
      <Route index element={<BasicInformationCard />} />
    </Routes>
  );
}

export default App;
