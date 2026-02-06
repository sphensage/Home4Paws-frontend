import "/src/stylesheets/new/homepage_new.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useAppStore } from "../../useAppStore"; // Import the store

const HomePageNavbarSearch = () => {
  // Get the current search query and the function to update it from the store
  const searchQuery = useAppStore(state => state.searchQuery);
  const setSearchQuery = useAppStore(state => state.setSearchQuery);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    // Note: The main data fetching logic in HomePage.tsx already has a 
    // debounced useEffect that detects changes to 'searchQuery' in the store
    // and automatically refetches the data after a short delay.
  };

  return (
    <div className="col-4">
      <div className="d-flex flex-row justify-content-center align-items-center gap-2">
        <input
          type="text"
          className="search-bg"
          placeholder="Chihuahuas, aspin, husky, etc.."
          value={searchQuery} // <-- Bind the input value to the store state
          onChange={handleInputChange} // <-- Update the store state on change
        />
        <button className="btn-invisible" id="search">
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className="search-icon"
            size="xl"
          />
        </button>
      </div>
    </div>
  );
};

export default HomePageNavbarSearch;
