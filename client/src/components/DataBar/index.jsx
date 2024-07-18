import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
function DataBar({ currentUser }) {
  const [barData, setBarData] = useState([{ id: "1", name: "Data", value: 0 }]);
  const location = useLocation();

  useEffect(() => {
    const chooseData = () => {
      const wlCount = currentUser.watchlist.length;
      const commCount = currentUser.communities.length;
      const prodCount = currentUser.products.length;

      switch (location.pathname) {
        case "/home":
          return [
            { id: "1", name: "Watchlist", value: wlCount },
            { id: "2", name: "My Products", value: commCount },
            { id: "3", name: "Communities", value: prodCount },
          ];
        case "/products":
          return [
            { id: "1", name: "My Products", value: prodCount },
            { id: "2", name: "Watchlist", value: wlCount },
          ];

        case "/communities":
          return [
            { id: "1", name: "Created", value: commCount },
            { id: "2", name: "Joined", value: commCount },
          ];
        default:
          break;
      }
    };
    const theData = chooseData();
    setBarData(theData);
  }, [setBarData, currentUser, location]);

  return (
    <div className="dataBar">
      {barData.length &&
        barData.map((item) => (
          <div key={item.id} className="dbSet">
            <h6 className="dbHeader">{item.name}</h6>
            <span className="dbVal">{item.value}</span>
          </div>
        ))}
    </div>
  );
}

export default DataBar;
