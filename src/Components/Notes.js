import React, { useState, useEffect, useRef } from 'react';
import { MdClose, MdDelete, MdEdit } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import Modal from 'react-modal';
import { BsThreeDotsVertical } from 'react-icons/bs';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        width: "90%",
        border: "1px solid black",
        transform: 'translate(-50%, -50%)',
        maxWidth: "600px",
    },
};

const Notes = ({ mode, setmode }) => {
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [title, setTitle] = useState("");
    const [stitle, setsTitle] = useState("");
    const [sdescription, setsDescription] = useState("");
    const [description, setDescription] = useState("");
    const [notes, setNotes] = useState([]);
    const [message, setmessage] = useState("");
    const [menuOpenId, setMenuOpenId] = useState(null);

    const menuRef = useRef(null);
    const toggleMenu = (id) => {
        setMenuOpenId(prev => prev === id ? null : id);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuOpenId(null);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch('https://inotebook-api-cyan.vercel.app//api/notes/fetchallnotes', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': localStorage.getItem('token')
                }
            });
            if (!response.ok) {
                throw new Error('Failed to fetch notes');
            }
            const data = await response.json();
            setNotes(data);
            setTitle("")
            setDescription("")
        } catch (error) {
            console.error('Error fetching notes:', error.message);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const addNote = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("https://inotebook-api-cyan.vercel.app//api/notes/addnote", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    authorization: localStorage.getItem("token"),
                },
                body: JSON.stringify({ title, description }),
            });
            if (!response.ok) {
                throw new Error("Failed to add note");
            }
            const newNote = await response.json();
            setNotes([...notes, newNote]);
            fetchData();
            setmessage("Notes Added Successfully.")
            setTimeout(() => {
                setmessage("")
            }, 1500);
            closeModal();
        } catch (error) {
            console.error("Error adding note:", error.message);
        }
    };

    const deleteNote = async (id) => {
        try {
            const c = window.confirm("Are you sure you want to delete this note?");
            if (c) {
                await fetch(`https://inotebook-api-cyan.vercel.app//api/notes/deletenote/${id}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        authorization: localStorage.getItem("token"),
                    },
                });
                fetchData();
                setmessage("Notes deleted successfully.")
                setTimeout(() => {
                    setmessage("")
                }, 1500);
                setNotes(notes.filter((note) => note._id !== id));
            }
        } catch (error) {
            console.error("Error deleting note:", error.message);
        }
    };

    const updateNote = async (id) => {
        try {
            const response = await fetch(`https://inotebook-api-cyan.vercel.app//api/notes/updatenote/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    authorization: localStorage.getItem("token"),
                },
                body: JSON.stringify({ title, description }), // Include the updated title and description
            });
            if (!response.ok) {
                throw new Error("Failed to update note");
            }
            setNotes(
                notes.map((note) =>
                    note._id === id ? { ...note, title, description } : note
                )
            );
            setmessage("Note updated successfully.");
            setTimeout(() => {
                setmessage("");
            }, 1500);
            closeModal();
            setopenEdit(false);

        } catch (error) {
            console.error("Error updating note:", error.message);
        }
    };

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    const [id, setid] = useState();
    const [openEdit, setopenEdit] = useState(false);

    const handleupdateNote = (id, title, description) => {
        setTitle(title);
        setDescription(description);
        setid(id);
        setopenEdit(true);
        // openModal();
    }

    const handleShow = (title, description) => {
        setshow(true);
        setsTitle(title)
        setsDescription(description)
    }
    const [show, setshow] = useState(false);

    return (
        <div className={` min-h-screen ${mode === "light" ? "" : ""}`}>
            <div className='w-full max-w-[95%] md:max-w-[85%] mx-auto'>
                <div className={`text-center text-2xl font-bold pt-9 ${mode === "light" ? "text-black" : "text-white"}`}>
                    Your Notes
                </div>

                {message !== "" ? (<div className='text-center text-[#ff1e1e] font-semibold text-xl  my-3'>{message}</div>
                ) : (<div className={`text-center text-xs my-2 ${mode !== "light" ? "text-gray-400" : "text-gray-700"} `}>
                    Hover over a note block to edit or delete it.
                </div>
                )}

                {notes.length === 0 ? (
                    <div className={`text-center text-sm  pt-9 ${mode === "light" ? "text-gray-600" : "text-gray-300"}`}>
                        No Notes
                    </div>
                ) : ""}

                <div className='grid grid-cols-2 md:grid-cols-3 gap-8 lg:grid-cols-3 p-8  w-full'>
                    <div className={` ${mode === "light" ? "" : ""} rounded-xl relative p-2 w-[100%] mx-auto overflow-auto addnote cursor-pointer`} onClick={openModal}>
                        <FaPlus className='text-3xl' />
                    </div>

                   
                    {notes.map(note => (
  <div key={note._id} className={` ${mode === "light" ? "note" : "notedark"} rounded-xl relative p-2 w-[100%] mx-auto overflow-auto`}>

    <div className='flex flex-col' onClick={() => handleShow(note.title, note.description)}>
      <div className='md:text-xl font-semibold text-center'>
        {note.title.length > 20 ? note.title.slice(0, 20) + "..." : note.title}
      </div>
      <div className='text-xs px-4 py-4 text-center'>
        {note.description.length > 100 ? note.description.slice(0, 100) + "..." : note.description}
      </div>
    </div>

    {/* Three-dot menu */}
    <div className="absolute top-2 right-2" ref={menuRef}>
      <BsThreeDotsVertical
        className="cursor-pointer text-xl"
        onClick={(e) => {
          e.stopPropagation(); // prevent note card click
          toggleMenu(note._id);
        }}
      />

      {menuOpenId === note._id && (
        <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-md text-sm z-10 w-[100px]">
          <div
            className="px-4 py-2 hover:bg-red-100 cursor-pointer text-red-600"
            onClick={(e) => {
              e.stopPropagation();
              setMenuOpenId(null);
              deleteNote(note._id);
            }}
          >
            Delete
          </div>
          <div
            className="px-4 py-2 hover:bg-blue-100 cursor-pointer text-blue-600"
            onClick={(e) => {
              e.stopPropagation();
              setMenuOpenId(null);
              handleupdateNote(note._id, note.title, note.description);
            }}
          >
            Edit
          </div>
        </div>
      )}
    </div>
  </div>
))}



                </div>


                <div>
                    <Modal
                        isOpen={modalIsOpen}
                        z onRequestClose={closeModal}
                        style={customStyles}
                        contentLabel="Add Note Modal"
                    >
                        <h2 className='text-xl font-semibold text-center my-5'>Add Task</h2>
                        <form onSubmit={addNote}>
                            <div className='w-full my-4'>
                                <input type="text" className='w-full border-b p-2 text-sm border-black outline-none' placeholder="Enter notes title..." value={title} onChange={(e) => setTitle(e.target.value)} required minLength={5} />
                            </div>
                            <div className='w-full my-5'>
                                <textarea placeholder="Enter notes description..." className='w-full text-sm p-2 border-0 border-b resize-none  h-[70px] border-black outline-none' value={description} required onChange={(e) => setDescription(e.target.value)} minLength={5} />
                            </div>
                            <div className='my-5'>
                                <button type="submit" className='w-full btn bg-[#ff9719]  p-2 rounded'>Add </button>
                            </div>
                        </form>
                    </Modal>
                </div>
            </div>

            {openEdit && <div className='absolute top-0 h-screen w-full  flex justify-center items-center bg-black bg-opacity-90'>
                <div className='max-w-[600px] w-3/4  bg-white p-7 rounded-xl border-2 border-black'>
                    <div>
                        <MdClose className='text-2xl cursor-pointer' onClick={() => setopenEdit(false)} />
                    </div>
                    <h1 className='text-xl font-semibold text-center mb-5'>Update Notes</h1>

                    <div className=' mx-auto '>
                        <input type="text" className='w-full p-2 border-b border-black outline-none' value={title} onChange={(e) => setTitle(e.target.value)} required minLength={5} />
                    </div>
                    <div className=' mx-auto'>
                        <textarea className='w-full p-2 border mt-3 border-black outline-none resize-none' value={description} required onChange={(e) => setDescription(e.target.value)} minLength={5} />
                    </div>

                    <div className='mx-auto my-4'>
                        <button className='w-full border p-2 text-sm rounded hover:rounded-xl font-semibold  border-black outline-none' onClick={() => updateNote(id)} >Update</button>
                    </div>

                </div>
            </div>}
            {show && <div className={`fixed top-0 h-screen w-full  flex justify-center items-center bg-opacity-90 ${mode === "light" ? "bg-white text-black" : "bg-black text-white"}`}>
                <div className='max-w-[600px] w-full overflow-auto h-screen p-7 '>
                    <MdClose className='text-2xl cursor-pointer' onClick={() => setshow(false)} />
                    <h1 className='text-2xl text-center font-semibold'>Notes</h1>
                    <div className='mt-3'>
                        <h1 className='text-xl'>Title</h1>
                        <p className='text-sm'>{stitle}</p>
                    </div>
                    <div className='mt-3'>
                        <h1 className='text-xl'>Description</h1>
                        <p className='text-sm'>{sdescription}</p>
                    </div>
                </div>
            </div>
            }
        </div>
    );
};

export default Notes;
