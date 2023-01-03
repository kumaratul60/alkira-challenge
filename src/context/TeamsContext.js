import {
  useState,
  useEffect,
  useContext,
  createContext,
  useReducer,
} from "react";
import axios from "axios";
import { filterBySearch, sortByCity } from "../helper/filterUtils";

const TeamsContext = createContext();
const teamsURL = "https://www.balldontlie.io/api/v1/teams";
const gamesURL = "https://www.balldontlie.io/api/v1/games/";

function reducer(state, action) {
  switch (action.type) {
    case "LOADING":
      return { ...state, isLoading: action.payload };
    case "SEARCH":
      return { ...state, query: action.payload };
    case "SORT":
      return { ...state, sort: action.payload };
    case "CURR_PAGE":
      return { ...state, currentPage: action.payload };
    default:
      return state;
  }
}

const TeamsProvider = ({ children }) => {
  const [teams, setTeams] = useState([]);
  const [games, setGames] = useState([]);
  const [data, dispatchData] = useReducer(reducer, {
    isLoading: true,
    currentPage: 1,
    teamsPerPage: 10,
    query: "",
    sort: 0,
  });
  const [showCanvas, setShowCanvas] = useState(false);
  const [teamDetails, setTeamDetails] = useState({});
  const [selectedTeam, setSelectedTeam] = useState(null);
  const sortedData = sortByCity(teams, data.sort);
  const searchedData = filterBySearch(sortedData, data.query);
  const indexOfLastPost = data.currentPage * data.teamsPerPage;
  const indexOfFirstPost = indexOfLastPost - data.teamsPerPage;
  const currentTeams = searchedData.slice(indexOfFirstPost, indexOfLastPost);

  useEffect(() => {
    fetchTeams()
  }, []);

  const fetchTeams = async () => {
    try {
      const teamsData = await axios.get(teamsURL)
      const teamsResponse = await teamsData.data;
      // console.log(teamsResponse.data);
      setTeams(teamsResponse.data);
      dispatchData({ type: "LOADING", payload: false });
    } catch (err) {
      console.log(err);
    }

  }

  useEffect(() => {
    fetchGame()
  }, []);

  const fetchGame = async () => {
    try {
      const gameData = await axios.get(gamesURL)
      const gameResponse = await gameData.data;
      // console.log(gameResponse.data);
      setGames(gameResponse.data);
    } catch (err) {
      console.log(err);
    }

  }

  useEffect(() => {
    setTeamDetails(games.find((game) => game.home_team.id === selectedTeam));
  }, [selectedTeam, games]);

  const changePageHandler = (pageNum) => {
    dispatchData({ type: "CURR_PAGE", payload: pageNum });
  }

  return (
    <TeamsContext.Provider
      value={ {
        teams,
        showCanvas,
        setShowCanvas,
        currentTeams,
        changePageHandler,
        dispatchData,
        data,
        searchedData,
        selectedTeam,
        setSelectedTeam,
        teamDetails,
      } }
    >
      { children }
    </TeamsContext.Provider>
  );
};

const useTeams = () => {
  const context = useContext(TeamsContext);
  if (context === undefined) throw new Error("TeamsContext error!");

  return context;
};

export { TeamsProvider, useTeams };
