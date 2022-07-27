import { useState } from 'react';

const Task = ({
  deleteCard,
  editCardStatus,
  data: {
    _id,
    title,
    createdAt,
    // deleted,
    // deletedAt,
    status,
    importance,
    // modifiedAt, => (Si es diferente a la fecha de creacion se condiciona un icono o algo que lo diferencie para que el usuarioa vea que fue modificiado)
    description,
    user: { userName },
  },
  data,
}) => {
  const [showMore, setShowMore] = useState(false);

  const limitString = (str) => {
    if (str.length > 370) {
      return { string: str.slice(0, 367).concat('...'), addButton: true };
    } else return { string: str, addButton: false };
  };

  const datetime = new Date(createdAt).toLocaleString() + ' hs.';

  return (
    <div className="card">
      <div
        className="card_close"
        onClick={() => {
          deleteCard(_id);
        }}
      >
        x
      </div>
      <h3>{title}</h3>
      <h6>{datetime}</h6>
      <h5>{userName}</h5>
      <div className="card_buttons">
        <button
          type="button"
          onClick={() => {
            editCardStatus(data);
          }}
        >
          {status}
        </button>
        <button type="button">{importance}</button>
      </div>
      {!showMore && (
        <p className="description">{limitString(description).string}</p>
      )}
      {showMore && (
        <>
          <p className="description">{description}</p>
          <button
            onClick={() => {
              setShowMore(false);
            }}
          >
            Ver Menos
          </button>
        </>
      )}
      {!showMore && limitString(description).addButton && (
        <button
          onClick={() => {
            setShowMore(true);
          }}
        >
          Ver Mas
        </button>
      )}
    </div>
  );
};
export default Task;
