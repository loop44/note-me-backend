import Note from '../models/noteModel.js';

const noteCtrl = {
  getNotes: async (req, res) => {
    try {
      const notes = await Note.find({ user_id: req.user.id });
      res.json(notes);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  createNote: async (req, res) => {
    try {
      const { id, content, index, date } = req.body;
      const newNote = new Note({
        id,
        content,
        index,
        date,
        user_id: req.user.id
      });
      console.log(newNote);
      await newNote.save();
      res.json({ msg: 'Created a Note' });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteNote: async (req, res) => {
    try {
      console.log(req.params.id);
      await Note.findOneAndDelete({ id: req.params.id });
      res.json({ msg: 'Deleted a Note' });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateNote: async (req, res) => {
    try {
      const { content } = req.body;
      await Note.findOneAndUpdate(
        { id: req.params.id },
        {
          content
        }
      );
      res.json({ msg: 'Updated a Note' });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateIndexes: async (req, res) => {
    try {
      const { indexes } = req.body;
      console.log(indexes);
      indexes.forEach(async (id, index) => {
        await Note.findOneAndUpdate(
          { id },
          {
            index
          }
        );
      });

      // const notes = await Note.find({ user_id: req.user.id });
      // console.log(notes);
      res.json({ msg: 'Updated Indexes' });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  }
};

export default noteCtrl;
