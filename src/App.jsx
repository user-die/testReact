import Table from "./components/table/Table";
import Modal from "./components/modal/Modal";
import { useCallback, useEffect, useState } from "react";

function App() {
  const [users, setUsers] = useState([]);
  const [modal, setModal] = useState(false);
  const [item, setItem] = useState({});
  const [search, setSearch] = useState("");
  const [select, setSelect] = useState("lastName");
  const [error, setError] = useState(false);

  const changeModal = useCallback((boolean) => {
    setModal(boolean);
  }, []);

  const changeItem = useCallback((item) => {
    setItem(item);
  }, []);

  useEffect(() => {
    fetch("https://dummyjson.com/users")
      .catch(() => setError(true))
      .then((result) => result.json())
      .then((data) => setUsers(data.users));
  }, []);

  useEffect(() => {
    fetch(`https://dummyjson.com/users/filter?key=${select}&value=${search}`)
      .catch(() => setError(true))
      .then((result) => result.json())
      .then((data) => setUsers(data.users));
  }, [search, select]);

  return (
    <main onClick={() => setModal(false)}>
      <article className="inputs">
        <select
          value={select}
          onChange={(e) => setSelect(e.target.value)}
          name=""
          id=""
        >
          <option value="lastName">Фамилия</option>
          <option value="firstName">Имя</option>
          <option value="age">Возраст</option>
          <option value="gender">Пол</option>
          <option value="phone">Номер</option>
          <option value="address">Адрес</option>
        </select>

        <input
          placeholder="Поиск..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </article>

      {(error && <div>Ошибка запроса</div>) || (
        <Table
          users={users}
          changeModal={changeModal}
          changeItem={changeItem}
          modal={modal}
        />
      )}

      {modal && <Modal item={item} />}
    </main>
  );
}

export default App;
