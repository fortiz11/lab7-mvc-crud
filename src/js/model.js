/**
 * Allows for the ChatModel to be called in other files
 * Default key of Lab7-chat but can also allows to be called with no parameters
 */

export class ChatModel {
  constructor({ storageKey = "Lab7-chat" } = {}) {
    this.storageKey = storageKey;
    this.messages = [];
    this.lastSavedAt = null;
    this.listeners = {};
  }

  //Function that subscribes to an event
  //callback is a function that will be defined depending on the event
  on(event, callback) {
    if (!this.listeners[event]) {
      this.listeners[event].push(callback);
    }
  }

  //function to unsubscribe to an event
  Off(event, callback) {
    if (!this.listeners[event]) return;
    //checks each stored function and keeps the ones not equal to the one we're removing
    this.listeners[event] = this.listeners[event].filter(
      (fn) => fn !== callback
    );
  }
  //Used to announce any data changes for each event
  emit(event, payload) {
    if (!this.listeners[event]) return;
    for (const fn of this.listeners[event]) fn(payload);
  }

  //CRUD Operations

  save() {
    localStorage.setItem(
      this.storageKey,
      JSON.stringify({ messages: this.messages })
    );
    this.lastSavedAt = new Date();
    //this is so view can update "last saved"
    this.emit("saved", { at: this.lastSavedAt });
  }

  load() {
    const raw = localStorage.getItem(this.storageKey);
    if (!raw) return;
    this.message = JSON.parse(raw).messages || [];
    this.emit("loaded", { messages: this.messages });
  }

  createMessage({ text, isUser }) {
    const msg = {
      //this generates a unique identifier for the message via browser built in function
      id: crypto.randomUUID(),
      text,
      isUser,
      timestamp: new Date(),
      edited: false,
    };
    this.message.push(msg);
    this.save();
    this.emit("created", msg);
    return msg;
  }

  //updates parameter is used for the specific info we want to change
  updateMessage(id, updates) {
    //loops through messages to find the ID of the message we want to update
    const i = this.messages.findIndex((m) => m.id === id);
    if (i < 0) return;
    this.messages[i] = { ...this.messages[i], ...updates, edited: true };
    this.save();
    this.emit("updated", this.messages[i]);
  }

  deletedMessage(id) {
    this.message = this.message.filter((m) => m.id !== id);
    this.save();
    this.emit("deleted", { id });
  }

  clearAll() {
    this.message = [];
    localStorage.removeItem(this.storageKey);
    this.emit("cleared");
  }
}
