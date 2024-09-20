document.addEventListener('DOMContentLoaded', () => {
    const addNoteButton = document.getElementById('addNote');
    const noteEditor = document.getElementById('noteEditor');
    const saveNoteButton = document.getElementById('saveNote');
    const noteContent = document.getElementById('noteContent');
    const notesContainer = document.getElementById('notesContainer');

    let currentNoteId = null;

    // Function to create a new note
    const createNote = (content = '') => {
        const note = document.createElement('div');
        note.className = 'note';
        note.innerHTML = `
            <div class="note-content">${content}</div>
            <button class="delete-btn">X</button>
        `;
        notesContainer.appendChild(note);

        // Add event listener to the delete button
        note.querySelector('.delete-btn').addEventListener('click', () => {
            notesContainer.removeChild(note);
        });

        // Add click event to open the note in the editor
        note.addEventListener('click', () => {
            noteEditor.classList.add('show');
            noteContent.value = content;
            currentNoteId = note;
        });
    };

    // Add note button click event
    addNoteButton.addEventListener('click', () => {
        noteEditor.classList.add('show');
        noteContent.value = '';
        currentNoteId = null;
    });

    // Save note button click event
    saveNoteButton.addEventListener('click', () => {
        if (currentNoteId) {
            currentNoteId.querySelector('.note-content').innerHTML = noteContent.value;
        } else {
            createNote(noteContent.value);
        }
        noteEditor.classList.remove('show');
        noteContent.value = '';
    });

    // Basic text formatting buttons
    document.getElementById('boldBtn').addEventListener('click', () => {
        document.execCommand('bold');
    });

    document.getElementById('italicBtn').addEventListener('click', () => {
        document.execCommand('italic');
    });

    document.getElementById('underlineBtn').addEventListener('click', () => {
        document.execCommand('underline');
    });
});
