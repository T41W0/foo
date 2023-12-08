import { ListCat } from "./components/list/listcaterogy";

function App() {
  return (
    <ListCat
      children={[
        { href: "http//", text: "mens" },
        { href: "http//ndnnd", text: "children" },
        { href: "http//", text: "ladies" },
        { href: "http//", text: "guys" },
      ]}
    />
  );
}

export default App;
