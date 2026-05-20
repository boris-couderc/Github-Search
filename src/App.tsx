import { Header } from "./components/Header/Header";
import { SearchBar } from "./features/search/components/SearchBar/SearchBar";
import { SearchView } from "./features/search/components/SearchView/SearchView";
import { SearchProvider } from "./features/search/context";

export function App() {
  return (
    <SearchProvider>
      <Header />
      <SearchBar />
      <main>
        <SearchView />
      </main>
    </SearchProvider>
  );
}

export default App;
