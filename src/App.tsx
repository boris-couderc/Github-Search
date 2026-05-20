import { Header } from "./components/Header/Header";
import { SearchBar } from "./features/search/components/SearchBar/SearchBar";
import { StyleGuide } from "./components/StyleGuide/StyleGuide";

export function App() {
  return (
    <>
      <Header />
      <SearchBar />
      <main>
        <StyleGuide />
      </main>
    </>
  );
}

export default App;
