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
      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-lg p-8">
        <h1 className="text-4xl font-bold text-center text-purple-700 mb-10 tracking-tight">
          📚 Book Manager
        </h1>


        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
     
          <label className="block">
            <span className="text-purple-700 font-medium">Book Name</span>
            <input
              type="text"
              name="name"
              placeholder="Enter book name"
              value={input.name}
              onChange={(e) => setInput({ ...input, name: e.target.value })}
              className="mt-1 w-full px-4 py-2 border border-purple-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all"
            />
          </label>

   
          <label className="block">
            <span className="text-purple-700 font-medium">ISBN</span>
            <input
              type="number"
              name="Isbn"
              placeholder="Enter ISBN"
              value={input.Isbn}
              onChange={(e) => setInput({ ...input, Isbn: e.target.value })}
              className="mt-1 w-full px-4 py-2 border border-purple-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all"
            />
          </label>

    
          <label className="block">
            <span className="text-purple-700 font-medium">Author</span>
            <input
              type="text"
              name="author"
              placeholder="Enter author name"
              value={input.author}
              onChange={(e) => setInput({ ...input, author: e.target.value })}
              className="mt-1 w-full px-4 py-2 border border-purple-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all"
            />
          </label>
        </div>

  
        <div className="text-center mb-10">
          <button
            onClick={editId ? updateBook : addBook}
            className={`px-8 py-3 rounded-md text-white font-semibold shadow-md hover:shadow-lg transition-all duration-300 ${
              editId
                ? "bg-yellow-500 hover:bg-yellow-600"
                : "bg-purple-600 hover:bg-purple-700"
            }`}
          >
            {editId ? "Update Book" : "Add Book"}
          </button>
        </div>


        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 rounded-md overflow-hidden shadow-md bg-white">
            <thead className="bg-purple-200 text-purple-900">
              <tr>
                <th className="py-3 px-4 text-left">#</th>
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">ISBN</th>
                <th className="py-3 px-4 text-left">Author</th>
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book, idx) => (
                <tr
                  key={book.id}
                  className="hover:bg-purple-50 transition duration-200"
                >
                  <td className="py-3 px-4 border-t">{idx + 1}</td>
                  <td className="py-3 px-4 border-t">{book.name}</td>
                  <td className="py-3 px-4 border-t">{book.Isbn}</td>
                  <td className="py-3 px-4 border-t">{book.author}</td>
                  <td className="py-3 px-4 border-t space-x-2">
                    <button
                      onClick={() => handleEdit(book)}
                      className="px-4 py-1 text-sm bg-yellow-400 hover:bg-yellow-500 text-white rounded-md shadow-sm transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteBook(book.id)}
                      className="px-4 py-1 text-sm bg-red-500 hover:bg-red-600 text-white rounded-md shadow-sm transition"
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
