import { createContext } from "react";

export const AppContext = createContext();

const AppContextProvider = (props) => {

    const months = [
        "",
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
    
      const slotDateFormat = (slotDate) => {
        const dateArray = slotDate.split("_");
        return (
          dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
        );
      };

    const calculateAge = (dob) => {
        const date = new Date();
        const birthDate = new Date(dob);

        let age = date.getFullYear() - birthDate.getFullYear()
        return age
    }

    const value = {
       calculateAge,
       slotDateFormat,
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;