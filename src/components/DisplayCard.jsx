const DisplayCard = ({ dog }) => {
  return (
    <>
      <h3>{dog.name}</h3>
      <div className="attribute-container">
      </div>
      <img src={dog.url} width="600px" height="500px" />
    </>
  );
};

export default DisplayCard;
