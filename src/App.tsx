import React, { useEffect, useState } from "react";

import "./App.css";
import { http } from "./http.service";
import { TLog, TUser } from "./models";
import { User } from "./User";
import logs from "./logs.json";

function App() {
  const [users, setUsers] = useState<TUser[]>([]);
  const [view, setView] = useState<TUser[]>([]);
  const [pointer, setPointer] = useState(1);
  const [recordsOptions] = useState([10, 15, 20]);
  const [sortOptions] = useState(["Name", "Id"]);
  const [sort, setSort] = useState(sortOptions[0]);
  const [maxRecords, setMaxRecords] = useState(recordsOptions[0]);
  const [offset, setOffset] = useState("");

  const getUser = async () => {
    try {
      const res = await http.get("Users", {
        searchParams: {
          pageSize: maxRecords,
          offset,
          "sort[0][field]": sort,
        },
      });
      const data = await res.json<{ records: TUser[]; offset: string }>();
      setUsers([...users, ...data.records]);
      setView(data.records);
      setOffset(data.offset || "");
    } catch (error) {
      console.info(error);
    }
  };

  const handleSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMaxRecords(+e.target.value);
  };

  const handleNext = () => {
    if (pointer * maxRecords === users.length) {
      getUser();
    } else {
      setView(users.slice(pointer * maxRecords, (pointer + 1) * maxRecords));
    }
    setPointer(pointer + 1);
  };

  const handlePrevious = () => {
    const previous = users.slice(
      (pointer - 2) * maxRecords,
      (pointer - 1) * maxRecords
    );

    setView(previous);
    setPointer(pointer - 1);
  };

  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setOffset("");
    setPointer(1);
    setView([]);
    setUsers([]);
    if (e.target.value !== sort) {
      setSort(e.target.value);
    }
  };

  useEffect(() => {
    getUser();
  }, [maxRecords, sort]);

  return (
    <div className="App">
      <main className="App-main">
        <div className="App-settings">
          <div className="App-options">
            <div>
              <p>Size</p>
              <select onChange={handleSizeChange}>
                <option value={recordsOptions[0]}>{recordsOptions[0]}</option>
                <option value={recordsOptions[1]}>{recordsOptions[1]}</option>
                <option value={recordsOptions[2]}>{recordsOptions[2]}</option>
              </select>
            </div>
            <div>
              <p>Sort</p>
              <select onChange={handleSort}>
                <option value={sortOptions[0]}>Name</option>
                <option value={sortOptions[1]}>Id</option>
              </select>
            </div>
          </div>
          <div className="App-pagination">
            <button disabled={pointer === 1} onClick={handlePrevious}>
              Previus
            </button>
            <button disabled={!offset} onClick={handleNext}>
              Next
            </button>
          </div>
        </div>
        <div className="App-grid">
          {view.map((user) => (
            <User
              key={user.id}
              {...user}
              logs={(logs as TLog[]).filter(
                (log) => log.user_id === user.fields.Id
              )}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
