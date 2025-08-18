import React, { useState, ChangeEvent } from "react";
import InputField from "./Components/Users/InputField";
import DataTable, { Column } from "./Components/Users/DataTable";
import Card from "./Components/UI/Card";
import Button from "./Components/UI/Button";
import ErrorModal from "./Components/UI/ErrorModal";

interface User {
  id: string;
  name: string;
  email: string;
  age: number;
}

const initialUsers: User[] = [
  { id: "1", name: "Alice", email: "alice@example.com", age: 25 },
  { id: "2", name: "Bob", email: "bob@example.com", age: 30 },
  { id: "3", name: "Charlie", email: "charlie@example.com", age: 28 },
];

const columns: Column<User>[] = [
  { key: "name", title: "Username" },
  { key: "email", title: "Email" },
  { key: "age", title: "Age" },
];

export default function App() {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [error, setError] = useState<{ title: string; message: string } | null>(null);

  const addUserHandler = (name: string, email: string, age: number) => {
    if (!name.trim() || !email.trim() || age <= 0) {
      setError({ title: "Invalid input", message: "Please enter a valid name, email, and age (>0)." });
      return;
    }
    setUsers((prev) => [...prev, { id: Math.random().toString(), name, email, age }]);
    setName("");
    setEmail("");
    setAge("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-600 to-indigo-700 flex items-center justify-center px-4 py-8">
      <div className="flex flex-col items-center w-full max-w-3xl mx-auto space-y-10">

        {error && (
          <ErrorModal title={error.title} message={error.message} onConfirmError={() => setError(null)} />
        )}

        {/* Input Form */}
        <Card className="w-full sm:w-[26rem] p-6 space-y-4 bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 text-gray-900 rounded-2xl shadow-2xl">
          <h1
            className="text-4xl font-extrabold text-center mb-4 drop-shadow-lg"
            style={{ color: "#e8491d", textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}
          >
            ADD USER
          </h1>


          <InputField
            label="Username"
            placeholder="Enter username"
            value={name}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
            className="w-3/4 mx-auto rounded-xl border-2 border-transparent bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300 p-2 text-gray-900 placeholder-gray-700 shadow-lg focus:outline-none focus:ring-4 focus:ring-pink-400 focus:border-transparent transition-all duration-300"
          />

          <InputField
            label="Email"
            placeholder="Enter email"
            value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            type="text"
            className="
              w-90                /* 20rem width */
              mx-auto             /* center horizontally */
              rounded-2xl         /* smooth rounded corners */
              border-none
              bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300
              p-3                  /* padding */
              text-gray-900
              placeholder-gray-700
              shadow-lg
              focus:outline-none
              focus:ring-4 focus:ring-pink-400
              transition-all duration-300
              mt-6                 /* top margin */
            "

          />

          <InputField
            label="Age"
            placeholder="Enter age"
            value={age}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setAge(e.target.value)}
            type="number"
            className="w-3/4 mx-auto rounded-xl border-2 border-transparent bg-gradient-to-r from-yellow-300 via-orange-300 to-red-300 p-2 text-gray-900 placeholder-gray-700 shadow-lg focus:outline-none focus:ring-4 focus:ring-yellow-400 focus:border-transparent transition-all duration-300"
          />


          <Button
            type="button"
            className="w-3/4 mx-auto bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 text-white font-bold py-2 rounded-xl shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-300"
            style={{ backgroundColor: "#e8491d", color: "#fff", paddingLeft: "2rem", paddingRight: "2rem", marginTop: "1rem", margin: "3rem", height: "3rem", width: "20rem", borderRadius: "20px", border: "none"}}
            onClick={() => addUserHandler(name, email, Number(age))}
          >
            Add User
          </Button>
        </Card>

        {/* DataTable */}
        <Card className="w-full sm:w-[36rem] p-4 bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 text-gray-900 rounded-2xl shadow-2xl">
          <DataTable<User>
            data={users}
            columns={columns}
            selectable
            onRowSelect={(rows) => console.log("Selected:", rows)}
          />
        </Card>
      </div>
    </div>
  );
}
