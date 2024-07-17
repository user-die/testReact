import "./table.css";
import { useMemo, useState, memo } from "react";
import image from "./../../assets/arrow-down-up.svg";

const Table = memo(function TableFunc({
  users,
  changeModal,
  changeItem,
  modal,
}) {
  const [sortKey, setSortKey] = useState("lastName");
  const [type, setType] = useState("default");

  const sorted = useMemo(() => {
    const sorted = [...users].sort((a, b) => {
      if (sortKey === "address")
        return a.address.city.localeCompare(b.address.city);

      return sortKey === "age"
        ? a[sortKey] - b[sortKey]
        : a[sortKey].localeCompare(b[sortKey]);
    });

    switch (type) {
      case "increase":
        return sorted;
      case "decreasing":
        return sorted.reverse();
      default:
        return users;
    }
  }, [users, sortKey, type]);

  const changeType = () => {
    setType((state) => {
      switch (state) {
        case "increase":
          return "decreasing";
        case "decreasing":
          return "default";
        default:
          return "increase";
      }
    });
  };

  return (
    <table className="table" style={{ opacity: modal && "0.5" }}>
      <thead>
        <tr>
          <th>
            <div className="cell">
              <p>ФИО</p>
              <button
                className="btn"
                onClick={() => {
                  setSortKey("lastName");

                  changeType();
                }}
              >
                <img src={image} alt="" />
              </button>
            </div>
          </th>
          <th>
            <div className="cell">
              <p>Возраст</p>
              <button
                className="btn"
                onClick={() => {
                  setSortKey("age");

                  changeType();
                }}
              >
                <img src={image} alt="" />
              </button>
            </div>
          </th>
          <th>
            <div className="cell">
              <p>Пол</p>
              <button
                className="btn"
                onClick={() => {
                  setSortKey("gender");

                  changeType();
                }}
              >
                <img src={image} alt="" />
              </button>
            </div>
          </th>
          <th>Номер телефона</th>
          <th>
            <div className="cell">
              <p>Адрес проживания</p>

              <button
                className="btn"
                onClick={() => {
                  setSortKey("address");

                  changeType();
                }}
              >
                <img src={image} alt="" />
              </button>
            </div>
          </th>
        </tr>
      </thead>

      {users && (
        <tbody>
          {sorted.map((element) => (
            <tr
              key={element.id}
              onClick={(event) => {
                event.stopPropagation();
                changeItem(element);
                changeModal(true);
              }}
            >
              <td>
                {element.lastName} {element.firstName} {element.maidenName}
              </td>

              <td>{element.age}</td>

              <td>{element.gender}</td>

              <td>{element.phone}</td>

              <td>
                {element.address.city}, {element.address.address}
              </td>
            </tr>
          ))}
        </tbody>
      )}
    </table>
  );
});

export default Table;
