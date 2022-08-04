import { useState } from 'react';
import {
  AiOutlineDelete,
  AiOutlineCheckCircle,
  AiOutlineClockCircle,
  AiOutlineExclamationCircle,
} from 'react-icons/ai';
import { GoAlert } from 'react-icons/go';
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

  const statusIcon = (stat) => {
    switch (stat) {
      case 'NEW':
        return <AiOutlineExclamationCircle className="icon" />;
      case 'IN PROGRESS':
        return <AiOutlineClockCircle className="icon" />;
      case 'FINISHED':
        return <AiOutlineCheckCircle className="icon" />;
    }
  };

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
          className={`button primary status ${status}`}
          onClick={() => {
            editCardStatus(data);
          }}
        >
          {statusIcon(status)}
          {status}
        </button>
        <button
          type="button"
          className={`button primary importance ${importance}`}
        >
          {<GoAlert className="icon" />}
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
