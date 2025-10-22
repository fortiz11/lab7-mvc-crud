export class ChatView {
  // forms the dom elements that will be
  constructor({
    model,
    listEl,
    emptyEl,
    formEl,
    inputEl,
    clearBtn,
    exportBtn,
    importInput,
    messageTemplate,
    messageCountEl,
    lastSavedEl,
  }) {
    this.model = model;
    this.listEl = listEl;
    this.emptyEl = emptyEl;
    this.formEl = formEl;
    this.inputEl = inputEl;
    this.clearBtn = clearBtn;
    this.exportBtn = exportBtn;
    this.importInput = importInput;
    this.messageTemplate = messageTemplate;
    this.messageCountEl = messageCountEl;
    this.lastSavedEl = lastSavedEl;

    this.handler = {
      submit: null,
      clearAll: null,
      export: null,
      import: null,
      edit: null,
      del: null,
    };

    // Subscribe to model events
    this.unsubscribe = this.model.subscribe((evt) => {
      // extracts info from the event
      const { type, payload } = evt;

      if (type === "loaded") {
        //if payload is defined then it is used. If not then use empty array
        this.renderAll(payload.messages ?? []);
        //updates message count
        this.setCount(this.model.messages.length);
      }

      if (type === "created") {
        this.appendMessage(payload.message);
        this.setCount(this.model.message.length);
      }

      if (type === "updated") {
        this.updateMessage(payload.message);
      }

      if (type === "deleted") {
        this.removeMessage(payload.message.id);
        this.setCount(this.model.message.length);
      }

      if (type === "cleared") {
        this.renderAll([]);
        this.setCounts(0);
      }
      if (type === "saved") {
        this.setLastSaved(payload.at);
      }

      //used when you import JSON
      //Re-renders the full chat
      if (type === "changed") {
        this.renderAll(this.model.messages);
        this.setCounts(this.model.messages.length);
      }
    });

    this.listEl.addEventListener("click", (e) => {
      //finds the nearest ancestor that matches CSS selector
      const btn = e.target.closet("button[data-action]");
      if (!btn) return;
      //once the button is clicked, finds which message it belongs to.
      const li = btn.closet("[data-message-id]");
      if (!li) return;
      const id = li.dataset.messageId;
      if (btn.dataset.action === "edit")
        //checks if this.handlers.edit exists
        this.handlers.edit?.(id);
      if (btn.dataset.action === "delete") this.handlers.del?.(id);
    });
  }


  //connects DOM event to a function that will be called by the controller 
  onSubmit(fn) {
    this.handlers.submit = fn;
    this.formEl.addEventListener("submit", fn);
  }
  onClearAll(fn) {
    this.handlers.clearAll = fn;
    this.clearBtn.addEventListener("click", fn);
  }
  onExport(fn) {
    this.handlers.export = fn;
    this.exportBtn.addEventListener("click", fn);
  }
  onImport(fn) {
    this.handlers.import = fn;
    this.importInput.addEventListener("change", fn);
  }
  onEdit(fn) {
    this.handlers.edit = fn;
  }
  onDelete(fn) {
    this.handlers.del = fn;
  }
}
