function MyProducts({ myProductData }) {
  return (
    <div className="myProductsList">
      {myProductData.map((item) => (
        <div key={item.id}>
          <div>
            <h4>{item.product}</h4>
            <ul>
              <li>Price: ${item.price}</li>
              <li>Condition: {item.condition}</li>
              <li>
                Seller: {item.seller.name} {`(${item.seller.rating})`}
              </li>
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MyProducts;
