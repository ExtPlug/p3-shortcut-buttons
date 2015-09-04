import Plugin from 'extplug/Plugin';

const ShortcutButtons = Plugin.extend({
  name: 'Toggle Stream/Clear Chat Buttons',
  description: 'Adds stream toggle and chat clear buttons above the chat, similar to plug³.',

  enable() {
    // code to start your plugin
  },

  disable() {
    // code to undo what you did in enable()
  }
});

export default ShortcutButtons;
