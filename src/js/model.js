/**
 * Allows for the ChatModel to be called in other files 
 * Default key of Lab7-chat but can also allows to be called with no parameters
 */

export class ChatModel {
    constructor({storageKey = 'Lab7-chat'}={}){
        this.storageKey= storageKey;
        this.messages= [];
        this.lastSavedAt = null;
        this.listeners ={};
    }

    //Function that subscribes to an event 
    //callback is a function that will be defined depending on the event
    on(event, callback){
        if(!this.listeners[event]){
            this.listeners[event].push(callback);
        }
    }

    //function to unsubscribe to an event
    Off(event, callback){
        if(!this.listeners[event]) return;
        //checks each stored function and keeps the ones not equal to the one we're removing
        this.listeners[event]=this.listeners[event].filter(fn=> fn !==callback);
    }
//Used to announce any data changes for each event 
    emit(event, payload){
        if(!this.listeners[event]) return;
        for (const fn of this.listeners[event]) fn(payload);
    }
}