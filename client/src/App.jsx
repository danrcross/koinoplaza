import { useState } from "react";
import "./App.css";
import { Outlet } from "react-router-dom";
import { setContext } from "@apollo/client/link/context";
import {
  ApolloProvider,
  InMemoryCache,
  ApolloClient,
  createHttpLink,
} from "@apollo/client";
import goatPic from "./assets/images/goat.jpg";

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: "/graphql",
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("id_token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  const [user, setUser] = useState("John Doe");
  const [userAll, setUserAll] = useState({
    imageLink: "http://www.sample.com",
    firstName: "John",
    lastName: "Doe",
    location: "Waynesville, OK",
    occupation: "Full-time farmer",
  });

  const [myProductData, setMyProductData] = useState([
    {
      id: 1,
      product: "Billy Goat (1)",
      condition: "Healthy, 1 year old",
      price: 50,
      image: goatPic,
      seller: {
        name: "John Doe",
        rating: 4.7,
      },
    },
    {
      id: 2,
      product: "Parsnips (1 Bushel)",
      condition: "Freshly harvested",
      price: 40,
      image: goatPic,
      seller: {
        name: "John Doe",
        rating: 4.7,
      },
    },
  ]);

  const [watchlistData, setWatchlistData] = useState([
    {
      id: 1,
      product: "Cabbage",
      condition: "Freshly harvested",
      price: 2,
      image: goatPic,
      seller: {
        name: "Randy Gardner",
        rating: 4.9,
      },
    },
    {
      id: 2,
      product: "Big Hoss Weed Eater",
      condition: "Like New",
      price: 75,
      image: goatPic,
      seller: {
        name: "Joe Homberg",
        rating: 4.9,
      },
    },
  ]);
  const [myCommunityData, setMyCommunityData] = useState([
    {
      id: 1,
      name: "Scott Co. Farmers",
      membership: "Creator",
      image: goatPic,
      location: "Scott County, OK",
      members: 15,
    },
  ]);
  const [otherCommunityData, setOtherCommunityData] = useState([
    {
      id: 1,
      name: "Waynesville Community",
      membership: "Member",
      location: "Waynesville, OK",
      image: goatPic,
      members: 124,
    },
    {
      id: 2,
      name: "Oklahoma City Produce",
      membership: "Member",
      location: "Oklahoma City, OK",
      image: goatPic,
      members: 853,
    },
  ]);
  return (
    <ApolloProvider client={client}>
      <Outlet
        context={{
          user,
          userAll,
          setUserAll,
          setUser,
          myProductData,
          setMyProductData,
          watchlistData,
          setWatchlistData,
          myCommunityData,
          setMyCommunityData,
          otherCommunityData,
          setOtherCommunityData,
        }}
      />
    </ApolloProvider>
  );
}

export default App;
