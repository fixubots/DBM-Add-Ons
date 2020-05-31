module.exports = {

//---------------------------------------------------------------------
// Event Name
//
// This is the name of the event displayed in the editor.
//---------------------------------------------------------------------

name: "Dispatcher started",

//---------------------------------------------------------------------
// Is Event
//
// Must be true for this to be an event.
//---------------------------------------------------------------------

isEvent: true,

//---------------------------------------------------------------------
// Event Variables
//
// The variables associated with this event. Can only have 0, 1, or 2.
//---------------------------------------------------------------------

fields: ["Item Type", "Options (Object)", "Item URL"],

//---------------------------------------------------------------------
// Action Bot Mod
//
// Upon initialization of the bot, this code is run. Using the bot's
// DBM namespace, one can add/modify existing functions if necessary.
// In order to reduce conflictions between mods, be sure to alias
// functions you wish to overwrite.
//
// This is absolutely necessary for custom event triggers since it
// allows us to setup callbacks for the necessary events we would
// like to be notified about.
//
// The client object can be retrieved from: `const bot = DBM.Bot.bot;`
// Classes can be retrieved also using it: `const { Actions, Event } = DBM;`
//---------------------------------------------------------------------

mod: function(DBM) {
    DBM.Events.onDispatcherStart = function(item, id) {
        const { Bot, Actions } = DBM;
        const events = Bot.$evts[this.name];

        if(!events) return;

        for(var i = 0; i < events.length; i++) {
            const event = events[i];
            const server = Bot.bot.guilds.get(id);
            const temp = {};

            if(event.temp) temp[event.temp] = item[0];
            if(event.temp2) temp[event.temp2] = item[1];
            if(event.temp3) temp[event.temp3] = item[2];

            Actions.invokeEvent(event, server, temp);
        }
    }

    DBM.Bot.bot.on('DispatcherStart', DBM.Events.onDispatcherStart);
}

}; // End of module