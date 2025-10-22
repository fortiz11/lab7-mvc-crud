export class ChatView {
    // forms the dom elements that will be
    constructor({
        model, listEl, emptyEl, formEl, inputEl,
        clearBtn, exportBtn, importInput, messageTemplate,
        messageCountEl, lastSavedEl
    }) {
        this.model = model;
        this.listEl= listEl;
        this.emptyEl=emptyEl;
        this.formEl=formEl;
        this.inputEl=inputEl;
        this.clearBtn=clearBtn;
        this.exportBtn=exportBtn;
        this.importInput=importInput;
        this.messageTemplate=messageTemplate;
        this.messageCountEl=messageCountEl;
        this.lastSavedEl=lastSavedEl;

        this.handler = {submit: null, clearAll: null, export: null, import: null,
            edit: null, del: null
        };

        // Subscribe to model events and keep the unsubscribe function
        this.unsubscribe = this.model.subscribe((evt) => {
            // extracts info from the event 
            const { type, payload } = evt;

            if (type === 'loaded') {
                //if payload is defined then it is used. If not then use empty array
                this.renderAll(payload.messages ?? []);
                //updates message count 
                this.setCount(this.model.messages.length);
            }

            if(type === 'created') {
                this.appendMessage(payload.message);
            }
        });
     }
} 
