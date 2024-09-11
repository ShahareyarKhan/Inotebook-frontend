import React, { useState, useEffect } from 'react';
import { MdClose, MdDelete, MdEdit } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import Modal from 'react-modal';

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

    const fetchData = async () => {
        try {
            const response = await fetch('https://i-notebook-api-eight.vercel.app/api/notes/fetchallnotes', {
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
            const response = await fetch("https://i-notebook-api-eight.vercel.app/api/notes/addnote", {
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
                await fetch(`https://i-notebook-api-eight.vercel.app/api/notes/deletenote/${id}`, {
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
            const response = await fetch(`https://i-notebook-api-eight.vercel.app/api/notes/updatenote/${id}`, {
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
        <div className={`main min-h-screen ${mode === "light" ? "bg-white" : "bg-[#000000]"}`}>
            <div className='w-full md:w-4/5 lg:w-2/3 mx-auto'>
                <div className={`text-center text-2xl font-bold pt-9 ${mode === "light" ? "text-black" : "text-white"}`}>
                    Your Notes
                </div>

                {message !== "" ? (<div className='text-center text-[#ff1e1e] font-semibold text-xl  my-3'>{message}</div>
                ) : (<div className={`text-center text-xs my-2 ${mode !== "light" ? "text-white" : "text-black"} `}>
              Hover over a note block to edit or delete it.
              </div>
              )}

                {notes.length === 0 ? (
                    <div className={`text-center text-xl  pt-9 ${mode === "light" ? "text-gray-600" : "text-gray-300"}`}>
                        No Notes
                    </div>
                ) : ""}

                <div className='grid grid-cols-1 md:grid-cols-2 gap-8 lg:grid-cols-3 p-8  '>
                    {notes.map(note => (
                        <div key={note.id} className={` ${mode === "light" ? "note" : "notedark"} rounded-xl relative p-2 overflow-auto`} >
                            <div className='flex flex-col' onClick={() => handleShow(note.title, note.description)}>
                                <div className='text-xl font-semibold text-center'>
                                    {note.title.length > 20 ? note.title.slice(0, 20) + "..." : note.title}
                                </div>
                                <div className='text-sm text-center'>
                                    {note.description.length > 100 ? note.description.slice(0, 100) + "..." : note.description}
                                </div>
                            </div>


                            <div className='absolute top-0 text-2xl right-0  flex-col  bg-[#ff8102] hidden '>
                                <div className='p-2  bg-red-600'>

                                    <MdDelete
                                        className=' text-gray-300   cursor-pointer '
                                        style={{ transition: "1s all ease" }}
                                        onClick={() => deleteNote(note._id)}
                                    />
                                </div>
                                <div className='p-2  bg-blue-600'>
                                    <MdEdit className=' text-gray-300   cursor-pointer '
                                        style={{ transition: "1s all ease" }}
                                        onClick={() => handleupdateNote(note._id, note.title, note.description)} />
                                </div>
                            </div>

                        </div>
                    ))}

                </div>

                <div className={`fixed w-[50px] h-[50px] border-2  rounded-full right-9 bottom-9 lg:right-[100px] lg:bottom-[100px] flex items-center justify-center cursor-pointer ${mode !== "light" ? "bg-white" : "bg-black"}`} onClick={openModal}>
                    <FaPlus className={`text-2xl ${mode === "light" ? "text-white" : "text-black"}`} />
                </div>
                <div>
                    <Modal
                        isOpen={modalIsOpen}
                        z onRequestClose={closeModal}
                        style={customStyles}
                        contentLabel="Add Note Modal"

                    >
                        <h2 className='text-2xl font-semibold text-center my-5'>Add Task</h2>
                        <form onSubmit={addNote}>
                            <div className='w-full my-4'>
                                <input type="text" className='w-full border-b border-black outline-none' placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required minLength={5} />
                            </div>
                            <div className='w-full my-5'>
                                <textarea placeholder="Description" className='w-full p-1 border resize-none h-[70px] border-black outline-none' value={description} required onChange={(e) => setDescription(e.target.value)} minLength={5} />
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
                    <h1 className='text-2xl font-bold text-center'>Update Notes</h1>

                    <div className=' mx-auto '>
                        <input type="text" className='w-full p-2 border-b border-black outline-none' value={title} onChange={(e) => setTitle(e.target.value)} required minLength={5} />
                    </div>
                    <div className=' mx-auto'>
                        <textarea className='w-full p-2 border mt-3 border-black outline-none resize-none' value={description} required onChange={(e) => setDescription(e.target.value)} minLength={5} />
                    </div>

                    <div className='mx-auto my-4'>
                        <button className='w-full border p-2 rounded-xl font-semibold bg-blue-500 border-black outline-none' onClick={() => updateNote(id)} >Update</button>
                    </div>

                </div>
            </div>}
            {show && <div className='absolute top-0 h-screen w-full  flex justify-center items-center bg-black bg-opacity-90'>
                <div className='max-w-[600px] w-3/4  bg-white p-7 rounded-xl border-2 border-black'>
                    <MdClose className='text-2xl cursor-pointer' onClick={() => setshow(false)} />
                    <h1 className='text-xl text-center font-semibold'>Notes</h1>
                    <div className='mt-3'>
                        <h1 className='text-xl'>Title</h1>
                        <p>{stitle}</p>
                    </div>
                    <div className='mt-3'>
                        <h1 className='text-xl'>Description</h1>
                        <p>{sdescription}</p>
                    </div>
                </div>
            </div>
            }
        </div>
    );
};

export default Notes;
