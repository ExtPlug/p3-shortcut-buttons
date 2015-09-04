import $ from 'jquery';
import plugSettings from 'plug/store/settings';
import Events from 'plug/core/Events';
import Lang from 'lang/Lang';
import Plugin from 'extplug/Plugin';
import settings from 'extplug/store/settings';

const ShortcutButtons = Plugin.extend({
  name: 'Toggle Stream/Clear Chat Buttons',
  description: 'Adds stream toggle and chat clear buttons above the chat, similar to plug³.',

  style: {
    '.p3-s-clear': {
      '.icon-chat': { 'left': '-3px' },
      '.icon-delete': { 'left': '8px', 'top': '2px' }
    },
    '.p3-s-stream.selected': {
      '.icon-x-white': { 'display': 'block' }
    },
    '.p3-s-stream': {
      '.icon-room': { 'transform': 'scale(0.8) translateY(1px)' },
      '.icon-x-white': { 'display': 'none' }
    },
    '.chat-header-button': {
      'margin-right': '18px'
    }
  },

  enable() {
    this.$stream = $('<div />')
      .addClass('chat-header-button p3-s-stream')
      // this is a little bit ugly but we don't have to include our own icon
      // this way :eyes:
      .append(
        $('<i />').addClass('icon icon-room'),
        $('<i />').addClass('icon icon-x-white')
      )
      .on('click', this.onStream.bind(this))
      .attr({
        'data-tooltip': Lang.userSettings.audioVideo,
        'data-tooltip-dir': 'left'
      });

    this.$clearChat = $('<div />')
      .addClass('chat-header-button p3-s-clear')
      .append(
        $('<i />').addClass('icon icon-chat'),
        $('<i />').addClass('icon icon-delete')
      )
      .on('click', this.onClear.bind(this))
      .attr({
        'data-tooltip': 'Clear Chat History',
        'data-tooltip-dir': 'left'
      });

    $('#chat-header').append(this.$stream, this.$clearChat);

    this.listenTo(settings, 'change:streamDisabled', this.onStreamChange);

    this.onStreamChange();
  },

  disable() {
    this.$stream.remove();
    this.$clearChat.remove();
    this.$stream = null;
    this.$clearChat = null;
  },

  onStream() {
    plugSettings.settings.streamDisabled = !plugSettings.settings.streamDisabled;
    plugSettings.save();
    Events.trigger('change:streamDisabled');
  },

  onStreamChange() {
    this.$stream.toggleClass('selected', settings.get('streamDisabled'));
  },

  onClear() {
    $('#chat-messages').empty();
  }
});

export default ShortcutButtons;
