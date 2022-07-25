const Task = ({ description }) => {
  const limitString = (str) => {
    if (str.length > 370) {
      return { string: str.slice(0, 367).concat('...'), addButton: true };
    } else return { string: str, addButton: false };
  };

  return (
    <div className="card">
      <div className="card_close">x</div>
      <h3>Tarea1</h3>
      <h6>24/05/1995 16:40hs</h6>
      <h5>Martin Maffei</h5>
      <div className="card_buttons">
        <button type="button">Nueva</button>
        <button type="button">Alta</button>
      </div>
      <p className="description">{limitString(description).string}</p>
    </div>
  );
};
export default Task;
