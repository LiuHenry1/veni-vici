const DisplayCard = ({ dog, handleClick }) => {
  // Representation of each attribute for display
  const displayRepr = {
    breed_group: "Breed Group",
    weight: "Weight",
    height: "Height",
    life_span: "Life Span",
  };

  return (
    <div className="display-card">
      <h2>{dog.name}</h2>
      <div className="attribute-container">
        {Object.entries(dog.attributes).map(([key, value]) => {
          if (value != undefined) {
            return (
              <div className="attribute">
                <h4>{displayRepr[key]}</h4>
                <button data-attribute={key} data-value={value} onClick={handleClick}>
                  {value}
                </button>
              </div>
            );
          }
        })}
      </div>
      <img src={dog.url} width="600px" height="500px" />
    </div>
  );
};

export default DisplayCard;
