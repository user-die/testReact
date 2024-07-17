import "./modal.css";

function Modal({ item }) {
  return (
    <dialog open className="modal">
      <p>
        ФИО: {item.lastName} {item.firstName}
      </p>
      <p>Возраст: {item.age}</p>
      <p>
        Адрес: {item.address.city}, {item.address.address}
      </p>
      <p>Рост: {item.height}</p>
      <p>Вес: {item.weight}</p>
      <p>Номер: {item.phone}</p>
      <p>Email: {item.email}</p>
    </dialog>
  );
}

export default Modal;
