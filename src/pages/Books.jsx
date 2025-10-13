import { addDoc, deleteDoc, doc, getDocs, updateDoc, collection } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../config/firebase";
import { motion } from "framer-motion";

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
    await addDoc(collection(db, "book"), input);
    setInput({ name: "", Isbn: "", author: "" });
    fetchData();
  };

  const deleteBook = async (id) => {
    await deleteDoc(doc(db, "book", id));
    fetchData();
  };

  const updateBook = async () => {
    if (!editId) return;
    await updateDoc(doc(db, "book", editId), input);
    setEditId(null);
    setInput({ name: "", Isbn: "", author: "" });
    fetchData();
  };

  const handleEdit = (book) => {
    setEditId(book.id);
    const { id, ...rest } = book;
    setInput(rest);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-blue-100 flex flex-col items-center py-10 px-4">
      <div className="w-full max-w-6xl bg-white/70 backdrop-blur-md shadow-2xl rounded-3xl p-8 border border-indigo-200">
        <h1 className="text-4xl font-extrabold text-center text-indigo-700 mb-10">
          📚 Book Inventory System
        </h1>

        <motion.div
          initial={{ opacity: 0, y: -25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white/80 border border-indigo-200 rounded-2xl shadow-lg p-8 mb-14"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            <div className="relative">
              <label className="block text-sm font-semibold text-gray-600 mb-1">
                Book Name
              </label>
              <input
                type="text"
                placeholder="Enter book name"
                value={input.name}
                onChange={(e) => setInput({ ...input, name: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none placeholder-gray-400"
              />
            </div>

    
            <div className="relative">
              <label className="block text-sm font-semibold text-gray-600 mb-1">
                ISBN Number
              </label>
              <input
                type="number"
                placeholder="Enter ISBN"
                value={input.Isbn}
                onChange={(e) => setInput({ ...input, Isbn: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none placeholder-gray-400 appearance-none"
              />
            </div>

            <div className="relative">
              <label className="block text-sm font-semibold text-gray-600 mb-1">
                Author Name
              </label>
              <input
                type="text"
                placeholder="Enter author name"
                value={input.author}
                onChange={(e) => setInput({ ...input, author: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none placeholder-gray-400"
              />
            </div>
          </div>

      
          <div className="text-center mt-8">
            <button
              onClick={editId ? updateBook : addBook}
              className={`px-10 py-3 font-semibold text-white rounded-lg shadow-md transition-all duration-300 ${
                editId
                  ? "bg-yellow-500 hover:bg-yellow-600"
                  : "bg-indigo-600 hover:bg-indigo-700"
              }`}
            >
              {editId ? "Update Book" : "Add Book"}
            </button>
          </div>
        </motion.div>


        {books.length === 0 ? (
          <p className="text-center text-gray-500 italic text-lg mt-10">
            No books added yet. 📘 Start by adding one above.
          </p>
        ) : (
          <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {books.map((book) => (
              <motion.div
                key={book.id}
                layout
                whileHover={{ scale: 1.03 }}
                className="bg-white/80 rounded-2xl shadow-lg p-6 border border-indigo-100 hover:border-indigo-400 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-indigo-700 truncate">
                    {book.name}
                  </h2>
                </div>
                <div className="space-y-1">
                  <p className="text-gray-700">
                    <span className="font-semibold">ISBN:</span> {book.Isbn}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-semibold">Author:</span> {book.author}
                  </p>
                </div>
                <div className="flex justify-end space-x-3 mt-5">
                  <button
                    onClick={() => handleEdit(book)}
                    className="px-4 py-1.5 bg-yellow-400 hover:bg-yellow-500 text-white text-sm rounded-md shadow-sm transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteBook(book.id)}
                    className="px-4 py-1.5 bg-red-500 hover:bg-red-600 text-white text-sm rounded-md shadow-sm transition"
                  >
                    Delete
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Books;
