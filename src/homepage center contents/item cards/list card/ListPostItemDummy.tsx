import DummyInboxItem from "../../../components/dummies/DummyInboxItem";
import DummyPostItem from "../DummyPostItem";

const ListPostItemsDummy = () => {
  return (
    <div
      className="d-flex flex-column gap-2"
      style={{ height: "75vh", minHeight: "75vh", overflowY: "auto" }}
    >
      <DummyPostItem />
      <DummyPostItem />
      <DummyPostItem />
      <DummyPostItem />
      <DummyPostItem />
      <DummyPostItem />
    </div>
  );
};

export default ListPostItemsDummy;
