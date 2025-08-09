import { useEffect, useState, useRef } from "react";
import Sidebar from "../components/Layout/Sidebar";
import axios from "axios";

const API_URL = "http://localhost:3000";

function Notes() {
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  // Only used for add form
  const [form, setForm] = useState({ title: "", content: "", tags: "" });
  // For in-place editing
  const [editNoteId, setEditNoteId] = useState(null);
  const [editForm, setEditForm] = useState({
    title: "",
    content: "",
    tags: "",
  });
  // Store highlight text and file inputs per note ID to avoid cross-note interference
  const [highlightTexts, setHighlightTexts] = useState({});
  const [files, setFiles] = useState({});
  const fileInputRefs = useRef({});

  const fetchNotes = async (searchValue = "") => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(
        `${API_URL}/api/notes${
          searchValue ? `?search=${encodeURIComponent(searchValue)}` : ""
        }`
      );
      setNotes(res.data);
    } catch {
      setError("Failed to fetch notes");
    }
    setLoading(false);
  };

  // Fetch all notes on initial mount only
  useEffect(() => {
    fetchNotes();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const tagsArray = form.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);
      await axios.post(`${API_URL}/api/notes`, {
        title: form.title,
        content: form.content,
        tags: tagsArray,
      });
      setForm({ title: "", content: "", tags: "" });
      fetchNotes();
    } catch {
      setError("Failed to save note");
    }
    setLoading(false);
  };

  // Start in-place editing for a note
  const handleEdit = (note) => {
    setEditNoteId(note._id);
    setEditForm({
      title: note.title,
      content: note.content,
      tags: note.tags ? note.tags.join(", ") : "",
    });
    setHighlightTexts((prev) => ({ ...prev, [note._id]: "" }));
    setFiles((prev) => ({ ...prev, [note._id]: null }));
    if (fileInputRefs.current[note._id]) {
      fileInputRefs.current[note._id].value = "";
    }
  };

  // Cancel in-place editing
  const handleCancelEdit = () => {
    setEditNoteId(null);
    setEditForm({ title: "", content: "", tags: "" });
    setError("");
  };

  // Handle in-place edit form changes
  const handleEditFormChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  // Submit in-place note update
  const handleUpdateNote = async (noteId) => {
    setLoading(true);
    setError("");
    try {
      const tagsArray = editForm.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);
      await axios.put(`${API_URL}/api/notes/${noteId}`, {
        title: editForm.title,
        content: editForm.content,
        tags: tagsArray,
      });
      setEditNoteId(null);
      setEditForm({ title: "", content: "", tags: "" });
      fetchNotes();
    } catch {
      setError("Failed to update note");
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this note?")) return;
    setLoading(true);
    setError("");
    try {
      await axios.delete(`${API_URL}/api/notes/${id}`);
      fetchNotes();
    } catch {
      setError("Failed to delete note");
    }
    setLoading(false);
  };

  const handleHighlight = async (noteId) => {
    if (!highlightTexts[noteId] || !highlightTexts[noteId].trim()) return;
    setLoading(true);
    setError("");
    try {
      await axios.post(`${API_URL}/api/notes/${noteId}/highlight`, {
        highlight: highlightTexts[noteId],
      });
      setHighlightTexts((prev) => ({ ...prev, [noteId]: "" }));
      fetchNotes();
    } catch {
      setError("Failed to highlight");
    }
    setLoading(false);
  };

  const handleAttach = async (noteId) => {
    const file = files[noteId];
    if (!file) return;
    setLoading(true);
    setError("");
    try {
      const formData = new FormData();
      formData.append("file", file);
      await axios.post(`${API_URL}/api/notes/${noteId}/attach`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setFiles((prev) => ({ ...prev, [noteId]: null }));
      if (fileInputRefs.current[noteId]) {
        fileInputRefs.current[noteId].value = "";
      }
      fetchNotes();
    } catch {
      setError("Failed to attach file");
    }
    setLoading(false);
  };

  const renderHighlights = (content, highlights) => {
    if (!highlights || highlights.length === 0) return content;
    let result = content;
    highlights.forEach((hl) => {
      const regex = new RegExp(
        `(${hl.replace(/[.*+?^${}()|[\\]\\\\]/g, "\\\\$&")})`,
        "gi"
      );
      result = result.replace(
        regex,
        '<mark class="bg-yellow-200 p-0.5 rounded">$1</mark>'
      );
    });
    return <span dangerouslySetInnerHTML={{ __html: result }} />;
  };

  return (
    <div className="flex flex-row h-screen bg-gradient-to-br from-blue-50 to-purple-100 overflow-x-auto">
      <Sidebar />
      <main className="flex-1 min-w-0 overflow-y-auto ml-20 md:ml-40 px-2 sm:px-4 md:px-10 py-4 sm:py-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold mb-4 sm:mb-6 text-center text-blue-800 drop-shadow-md">
          Notes
        </h1>

        {/* Search */}
        <div className="max-w-3xl mx-auto mb-4 sm:mb-6 flex flex-col sm:flex-row gap-2 sm:gap-3 items-center">
          <input
            type="text"
            placeholder="Search notes..."
            className="flex md:w-2xl w-full border border-blue-300 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-shadow text-sm sm:text-base"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") fetchNotes(search);
            }}
            disabled={loading}
          />
          <button
            className="bg-blue-600 text-white md:w-25 md:h-10 w-full rounded-lg px-4 py-2"
            onClick={() => fetchNotes(search)}
            disabled={loading}
          >
            Search
          </button>
        </div>

        {/* Note Form */}
        <form
          onSubmit={handleSubmit}
          className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-4 sm:p-6 mb-8 sm:mb-10 border border-blue-200 flex flex-col gap-3 sm:gap-4"
        >
          <input
            name="title"
            type="text"
            placeholder="Title"
            className="border border-blue-300 rounded-md px-3 py-2 text-base sm:text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-blue-300"
            value={form.title}
            onChange={handleChange}
            required
            disabled={loading}
          />
          <textarea
            name="content"
            placeholder="Content"
            className="resize-y border border-blue-300 rounded-md px-3 py-2 sm:py-3 min-h-[80px] sm:min-h-[100px] text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm sm:text-base"
            value={form.content}
            onChange={handleChange}
            required
            disabled={loading}
          />
          <input
            name="tags"
            type="text"
            placeholder="Tags (comma separated)"
            className="border border-blue-300 rounded-md px-3 py-2 text-xs sm:text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
            value={form.tags}
            onChange={handleChange}
            disabled={loading}
          />
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-end">
            <button
              type="submit"
              className="bg-green-600 px-4 sm:px-6 py-2 rounded-md text-white font-semibold hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300 transition text-sm"
              disabled={loading}
            >
              Add Note
            </button>
          </div>
        </form>

        {/* Error */}
        {error && (
          <div className="max-w-3xl mx-auto mb-4 text-center text-red-600 font-medium">
            {error}
          </div>
        )}

        {/* Notes List */}
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <svg
                className="animate-spin h-10 w-10 text-blue-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8z"
                ></path>
              </svg>
            </div>
          ) : notes.length === 0 ? (
            <p className="text-center text-gray-500">No notes.</p>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 sm:gap-6">
              {notes.map((note) => (
                <div
                  key={note._id}
                  className="relative bg-white rounded-xl shadow-md p-4 sm:p-5 flex flex-col gap-2 sm:gap-3 border border-blue-200 hover:shadow-xl transition-shadow"
                >
                  {editNoteId === note._id ? (
                    // In-place edit form
                    <>
                      <input
                        name="title"
                        type="text"
                        placeholder="Title"
                        className="border border-blue-300 rounded-md px-3 py-2 text-base sm:text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-blue-300 mb-2"
                        value={editForm.title}
                        onChange={handleEditFormChange}
                        required
                        disabled={loading}
                      />
                      <textarea
                        name="content"
                        placeholder="Content"
                        className="resize-y border border-blue-300 rounded-md px-3 py-2 sm:py-3 min-h-[80px] sm:min-h-[100px] text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm sm:text-base mb-2"
                        value={editForm.content}
                        onChange={handleEditFormChange}
                        required
                        disabled={loading}
                      />
                      <input
                        name="tags"
                        type="text"
                        placeholder="Tags (comma separated)"
                        className="border border-blue-300 rounded-md px-3 py-2 text-xs sm:text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-300 mb-2"
                        value={editForm.tags}
                        onChange={handleEditFormChange}
                        disabled={loading}
                      />
                      <div className="flex gap-2 justify-end">
                        <button
                          className="bg-gray-400 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-300"
                          onClick={handleCancelEdit}
                          disabled={loading}
                          type="button"
                        >
                          Cancel
                        </button>
                        <button
                          className="bg-green-600 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-300"
                          onClick={() => handleUpdateNote(note._id)}
                          disabled={loading}
                          type="button"
                        >
                          Update
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <h2
                        className="font-semibold text-lg sm:text-xl truncate text-blue-800 select-text"
                        title={note.title}
                      >
                        {note.title}
                      </h2>
                      <div className="text-gray-700 break-words min-h-[48px] sm:min-h-[60px] select-text text-xs sm:text-sm leading-relaxed">
                        {renderHighlights(note.content, note.highlights)}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {note.tags &&
                          note.tags.map((tag, i) => (
                            <span
                              key={i}
                              className="bg-blue-200 text-blue-800 px-2 sm:px-3 py-1 rounded-full text-xs font-medium select-text"
                            >
                              #{tag}
                            </span>
                          ))}
                      </div>

                      {/* Attachments */}
                      {note.attachments && note.attachments.length > 0 && (
                        <div className="mt-2">
                          <span className="font-semibold text-xs text-gray-600">
                            Attachments:
                          </span>
                          <ul className="list-disc ml-5 text-xs">
                            {note.attachments.map((att, i) => (
                              <li key={i}>
                                <a
                                  href={att.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-600 underline"
                                >
                                  {att.filename}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Highlights List */}
                      {note.highlights && note.highlights.length > 0 && (
                        <div className="mt-2">
                          <span className="font-semibold text-xs text-yellow-700">
                            Highlights:
                          </span>
                          <ul className="list-disc ml-5 text-xs text-yellow-800">
                            {note.highlights.map((hl, i) => (
                              <li key={i}>{hl}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-3 mt-3 sm:mt-4 justify-between items-stretch sm:items-center">
                        <div className="flex gap-2 mb-2 sm:mb-0">
                          <button
                            className="bg-yellow-500 text-white px-3 py-1 rounded-md text-xs font-semibold hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-300 transition"
                            onClick={() => handleEdit(note)}
                            disabled={loading}
                          >
                            Edit
                          </button>
                          <button
                            className="bg-red-600 text-white px-3 py-1 rounded-md text-xs font-semibold hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300 transition"
                            onClick={() => handleDelete(note._id)}
                            disabled={loading}
                          >
                            Delete
                          </button>
                        </div>

                        {/* Highlight & Attach Inputs */}
                        <div className="flex flex-col gap-2 w-full sm:w-auto">
                          <div className="flex gap-2">
                            <input
                              type="text"
                              placeholder="Highlight text"
                              className="border border-yellow-400 rounded-md px-2 py-1 text-xs flex-grow focus:outline-none focus:ring-2 focus:ring-yellow-300"
                              value={highlightTexts[note._id] || ""}
                              onChange={(e) =>
                                setHighlightTexts((prev) => ({
                                  ...prev,
                                  [note._id]: e.target.value,
                                }))
                              }
                              disabled={loading}
                            />
                            <button
                              className="bg-yellow-500 text-white px-3 py-1 rounded-md text-xs font-semibold hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-300 disabled:opacity-60 transition"
                              onClick={() => handleHighlight(note._id)}
                              disabled={
                                loading ||
                                !(
                                  highlightTexts[note._id] &&
                                  highlightTexts[note._id].trim()
                                )
                              }
                            >
                              Highlight
                            </button>
                          </div>
                          <div className="flex gap-2 items-center">
                            <input
                              type="file"
                              className="text-xs border border-blue-300 rounded-md px-2 py-1 w-full sm:w-auto"
                              ref={(el) => {
                                fileInputRefs.current[note._id] = el;
                              }}
                              onChange={(e) =>
                                setFiles((prev) => ({
                                  ...prev,
                                  [note._id]: e.target.files[0],
                                }))
                              }
                              disabled={loading}
                            />
                            <button
                              className="bg-blue-600 text-white px-3 py-1 rounded-md text-xs font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-60 transition"
                              onClick={() => handleAttach(note._id)}
                              disabled={loading || !files[note._id]}
                            >
                              Attach
                            </button>
                          </div>
                        </div>
                        <div className="w-full sm:w-auto mt-2 sm:mt-0"></div>
                      </div>

                      {/* Timestamp */}
                      <div className="absolute top-3 right-3 text-xs text-gray-400 select-none">
                        {note.updatedAt
                          ? new Date(note.updatedAt).toLocaleString()
                          : ""}
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default Notes;
