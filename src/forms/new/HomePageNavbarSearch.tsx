import "/src/stylesheets/new/homepage_new.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const HomePageNavbarSearch = () => {
  return (
    <div className="col-4">
      <div className="d-flex flex-row justify-content-center align-items-center gap-2">
        <input
          type="text"
          className="search-bg"
          placeholder="Chihuahuas, aspin, husky, etc.."
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
