import { createContext, useEffect, useState } from "react";
import { jobsData } from "../assets/assets";
export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const [searchFilter, setSearchFilter] = useState({
    title: "",
    location: "",
  });

  const [isSearched, setIsSearched] = useState(false);

  // function to fetch jobs :
  const [jobs, setJobs] = useState([]);

  const [showRecuriterLogin, setShowRecuriterLogin] = useState(false);

  const fetchjobs = async () => {
    setJobs(jobsData);
  };

  useEffect(() => {
    fetchjobs();
  }, []);

  const value = {
    searchFilter,
    setSearchFilter,
    isSearched,
    setIsSearched,
    jobs,
    setJobs,
    showRecuriterLogin,
    setShowRecuriterLogin,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
