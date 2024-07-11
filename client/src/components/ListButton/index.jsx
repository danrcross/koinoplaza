import { TriangleDownIcon, TriangleRightIcon } from "@radix-ui/react-icons";

function ListButton({ id, openLists, onClick }) {
  if (openLists[id]) {
    switch (id) {
      case "myproducts":
        return (
          <button onClick={onClick} id={id}>
            My Products <TriangleDownIcon />
          </button>
        );
    }
  } else {
    switch (id) {
      case "myproducts":
        return (
          <button onClick={onClick} id={id}>
            My Products <TriangleRightIcon />
          </button>
        );
    }
  }
}

export default ListButton;
