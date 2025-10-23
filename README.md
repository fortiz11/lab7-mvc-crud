# 💬 Chat Bot (MVC JavaScript App)

A lightweight browser-based chatbot built using the **Model–View–Controller (MVC)** architecture.  
Users can send, edit, delete, and import/export chat messages that persist in the app.  
The bot uses a simple **Eliza-like response system** (`eliza.js`) to simulate conversation.

---

## 🚀 Live Demo
_Deployed on [Netlify](https://www.netlify.com/)_  
👉 

---

## 🧩 Project Structure

```
project/
│
├── src/
│   ├── index.html        # Main HTML file (entry point)
│   ├── styles.css        # App styling
│   └── js/
│       ├── app.js        # Entry script (wires everything together)
│       ├── controller.js # Handles user actions and connects model/view
│       ├── model.js      # Manages data (messages, persistence)
│       ├── view.js       # Renders the chat interface
│       └── eliza.js      # Simple chatbot logic
│
└── README.md
```

---

## ⚙️ Features

✅ **Send Messages** — type a message and the bot responds  
✏️ **Edit Messages** — modify existing user messages  
🗑️ **Delete Messages** — remove messages from chat  
📁 **Import/Export Chats** — save or load conversations as `.json`  
🤖 **Eliza Bot** — provides simple automatic responses  
🧠 **MVC Pattern** — separates logic (Model), UI (View), and events (Controller)




## 🧠 Technical Overview

### Model
- Stores all messages in memory.
- Emits events like `'message:created'`, `'message:updated'`, `'changed'`.
- Supports replacing all messages on import.

### View
- Renders chat messages dynamically.
- Updates the DOM efficiently when new messages are added or edited.

### Controller
- Subscribes to model events and updates the view.
- Handles form submission, editing, deleting, import/export, etc.

### Eliza
- Generates simple keyword-based responses.

---


## 🧾 License

MIT License © 2025  
You’re free to modify and share this project.

---
