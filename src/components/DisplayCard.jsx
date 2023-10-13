const DisplayCard = ({ dog, handleClick }) => {
  // Representation of each attribute for display
  const displayRepr = {
    breed_group: "Breed Group",
    weight: "Weight",
    height: "Height",
    life_span: "Life Span",
    origin: "Origin",
  };

  return (
    <div className="display-card">
      <h2>{dog.name}</h2>
      <div className="attribute-container">
        {Object.entries(dog.attributes).map(([attribute, value]) => {
          if (value != undefined && value != "") {
            return (
              <div className="attribute">
                <h4>{displayRepr[attribute]}</h4>
                <button
                  data-attribute={attribute}
                  data-value={value}
                  onClick={handleClick}
                >
                  {value}
                </button>
              </div>
            );
          }
        })}
      </div>
      <img src={dog.url} width="500px" height="400px" />
      <p>{dog.temperament}</p>
    </div>
  );
};

export default DisplayCard;
