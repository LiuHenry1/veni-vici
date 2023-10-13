const BannedList = ({ bannedAttributes, handleClick }) => {
  return (
    <div className="banned-list">
      <h2>Banned Attributes</h2>
      {Object.keys(bannedAttributes).map((attribute) => {
        return bannedAttributes[attribute].map((value) => {
          return (
            <button
              data-attribute={attribute}
              data-value={value}
              onClick={handleClick}
            >
              {value}
            </button>
          );
        });
      })}
    </div>
  );
};

export default BannedList;
