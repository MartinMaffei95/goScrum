import { useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
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
        <AiOutlineDelete />
      </div>
      <h3 className="title">{title}</h3>
      <div className="card_buttons">
        <button
          type="button"
          className={`button primary ${status}`}
          onClick={() => {
            editCardStatus(data);
          }}
        >
          {status}
        </button>
        <button type="button" className={`button primary ${importance}`}>
          {importance}
        </button>
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
            className="button terciary"
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
          className="button terciary"
        >
          Ver Mas
        </button>
      )}
      <div className="moreInfo">
        <h5 className="userName">{userName}</h5>
        <h6 className="date">{datetime}</h6>
      </div>
    </div>
  );
};
export default Task;
