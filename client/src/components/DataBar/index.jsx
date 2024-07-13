function DataBar({ barData }) {
  return (
    <div className="dataBar">
      {barData.map((item) => (
        <div key={item.id} className="dbSet">
          <h6 className="dbHeader">{item.name}</h6>
          <span className="dbVal">{item.value}</span>
        </div>
      ))}
    </div>
  );
}

export default DataBar;
