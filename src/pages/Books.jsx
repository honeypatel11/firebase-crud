import { addDoc, deleteDoc, doc, getDocs, updateDoc, collection } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../config/firebase";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [input, setInput] = useState({ name: "", Isbn: "", author: "" });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const snapshot = await getDocs(collection(db, "book"));
    const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setBooks(data);
  };

  const addBook = async () => {
    if (!input.name || !input.Isbn || !input.author) return;
    try {
      await addDoc(collection(db, "book"), input);
      setInput({ name: "", Isbn: "", author: "" });
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteBook = async (id) => {
    try {
      await deleteDoc(doc(db, "book", id));
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const updateBook = async () => {
    if (!editId) return;
    try {
      await updateDoc(doc(db, "book", editId), input);
      setEditId(null);
      setInput({ name: "", Isbn: "", author: "" });
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (book) => {
    setEditId(book.id);
    const { id, ...rest } = book;
    setInput(rest);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-100 to-pink-100 p-6">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-4xl font-bold text-center text-purple-700 mb-8">
          📚 Book Manager
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <input
            type="text"
            name="name"
            placeholder="Book Name"
            value={input.name}
            onChange={(e) => setInput({ ...input, name: e.target.value })}
            className="px-4 py-2 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input
            type="number"
            name="Isbn"
            placeholder="ISBN"
            value={input.Isbn}
            onChange={(e) => setInput({ ...input, Isbn: e.target.value })}
            className="px-4 py-2 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input
            type="text"
            name="author"
            placeholder="Author"
            value={input.author}
            onChange={(e) => setInput({ ...input, author: e.target.value })}
            className="px-4 py-2 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div className="text-center mb-10">
          <button
            onClick={editId ? updateBook : addBook}
            className={`px-6 py-2 rounded-md text-white transition duration-300 ${
              editId
                ? "bg-yellow-500 hover:bg-yellow-600"
                : "bg-purple-600 hover:bg-purple-700"
            }`}
          >
            {editId ? "Update Book" : "Add Book"}
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 shadow-md rounded-md overflow-hidden">
            <thead className="bg-purple-200 text-purple-900">
              <tr>
                <th className="py-3 px-4 border-b text-left">Number</th>
                <th className="py-3 px-4 border-b text-left">Name</th>
                <th className="py-3 px-4 border-b text-left">ISBN</th>
                <th className="py-3 px-4 border-b text-left">Author</th>
                <th className="py-3 px-4 border-b text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book, idx) => (
                <tr
                  key={book.id}
                  className="hover:bg-purple-50 transition duration-200"
                >
                  <td className="py-3 px-4 border-b">{idx + 1}</td>
                  <td className="py-3 px-4 border-b">{book.name}</td>
                  <td className="py-3 px-4 border-b">{book.Isbn}</td>
                  <td className="py-3 px-4 border-b">{book.author}</td>
                  <td className="py-3 px-4 border-b space-x-2">
                    <button
                      onClick={() => handleEdit(book)}
                      className="px-3 py-1 text-sm bg-yellow-400 hover:bg-yellow-500 text-white rounded-md"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteBook(book.id)}
                      className="px-3 py-1 text-sm bg-red-500 hover:bg-red-600 text-white rounded-md"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

              {books.length === 0 && (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center py-6 text-gray-500 italic bg-gray-50"
                  >
                    No books found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Books;
