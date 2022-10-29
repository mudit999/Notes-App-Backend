const Note = require("./../models/noteModel");

const getAllUserNotes = async (req,res) => {
    const notes = await Note.find({ user: req.params.userId });
    res.json(notes);
};

const createNote = async (req,res) => {
    const { title, content, category } = req.body;

    if(!title || !content || !category){
        res.status(400);
        throw new Error("Please fill all the Fields");
    }else{
        const note = new Note({
            user: req.params.userId, title, content, category
        });

        const createdNote = await note.save();

        res.status(201).json(createdNote);
    }
}

const getNote = async (req,res) => {
    const note = await Note.findById(req.params.noteId);

    if(note){
        res.json(note);
    }else{
        res.status(404).json({ message: "Note not found" });
    }
}

const updateNote = async (req,res) => {
    // user will provide this
    const { title, content, category } = req.body;

    const note = await Note.findById(req.params.noteId);

    if(note){
        // updating note
        note.title = title;
        note.content = content;
        note.category = category;

        const updatedNote = await note.save();
        res.json(updatedNote);
    }else{
        res.status(404);
        throw new Error("Note not found");
    }
}

const deleteNote = async (req,res) => {

    const note = await Note.findById(req.params.noteId);

    if(note){
        await note.remove();
        res.json({ message: "Note Removed" });
    }else{
        res.status(404);
        throw new Error("Note not found");
    }
}

module.exports = {getAllUserNotes,createNote,getNote,updateNote,deleteNote};