define('extplug/p3-shortcut-buttons/main',['exports', 'module', 'jquery', 'plug/store/settings', 'plug/core/Events', 'lang/Lang', 'extplug/Plugin', 'extplug/store/settings'], function (exports, module, _jquery, _plugStoreSettings, _plugCoreEvents, _langLang, _extplugPlugin, _extplugStoreSettings) {
  'use strict';

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _$ = _interopRequireDefault(_jquery);

  var _plugSettings = _interopRequireDefault(_plugStoreSettings);

  var _Events = _interopRequireDefault(_plugCoreEvents);

  var _Lang = _interopRequireDefault(_langLang);

  var _Plugin = _interopRequireDefault(_extplugPlugin);

  var _settings = _interopRequireDefault(_extplugStoreSettings);

  var ShortcutButtons = _Plugin['default'].extend({
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

    enable: function enable() {
      this.$stream = (0, _$['default'])('<div />').addClass('chat-header-button p3-s-stream')
      // this is a little bit ugly but we don't have to include our own icon
      // this way :eyes:
      .append((0, _$['default'])('<i />').addClass('icon icon-room'), (0, _$['default'])('<i />').addClass('icon icon-x-white')).on('click', this.onStream.bind(this)).attr({
        'data-tooltip': _Lang['default'].userSettings.audioVideo,
        'data-tooltip-dir': 'left'
      });

      this.$clearChat = (0, _$['default'])('<div />').addClass('chat-header-button p3-s-clear').append((0, _$['default'])('<i />').addClass('icon icon-chat'), (0, _$['default'])('<i />').addClass('icon icon-delete')).on('click', this.onClear.bind(this)).attr({
        'data-tooltip': 'Clear Chat History',
        'data-tooltip-dir': 'left'
      });

      (0, _$['default'])('#chat-header').append(this.$stream, this.$clearChat);

      this.listenTo(_settings['default'], 'change:streamDisabled', this.onStreamChange);

      this.onStreamChange();
    },

    disable: function disable() {
      this.$stream.remove();
      this.$clearChat.remove();
      this.$stream = null;
      this.$clearChat = null;
    },

    onStream: function onStream() {
      _plugSettings['default'].settings.streamDisabled = !_plugSettings['default'].settings.streamDisabled;
      _plugSettings['default'].save();
      _Events['default'].trigger('change:streamDisabled');
    },

    onStreamChange: function onStreamChange() {
      this.$stream.toggleClass('selected', _settings['default'].get('streamDisabled'));
    },

    onClear: function onClear() {
      (0, _$['default'])('#chat-messages').empty();
    }
  });

  module.exports = ShortcutButtons;
});
