Polymer(
{
  is: 'settings-window',
  properties:
  {
    ipc:
    {
      type: Object
    },
    selectedSettingsSection:
    {
      type: Number,
      value: 0
    },
    openWindowKeyCombination:
    {
      type: String,
      observer: "_onOpenWindowKeyCombinationChange",
      value: 'meta+shift+t'
    },
    swapLanguagesKeyCombination:
    {
      type: String,
      observer: "_onSwapLanguagesKeyCombinationChange",
      value: 'ctrl+tab'
    },
    language:
    {
      type: String
    }
  },
  behaviors:
  [
    Polymer.AppLocalizeBehavior
  ],
  attached: function()
  {
    this.loadResources(this.resolveUrl('settings-window-locales.json'));
  },
  created: function()
  {
    this.ipc = require('electron').ipcRenderer;
  },
  ready: function()
  {

  },
  _onOpenWindowKeyCombinationChange: function(value)
  {
    this.ipc.send('openWindowKeyCombinationChange', { keyCombination: value });
  },
  _onSwapLanguagesKeyCombinationChange: function(value)
  {
    this.ipc.send('swapLanguagesKeyCombinationChange', { keyCombination: value });
  }
})
