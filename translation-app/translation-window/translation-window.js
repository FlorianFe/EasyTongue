Polymer(
{
  is: 'translation-window',
  property:
  {
    sourceLanguageIso: String,
    destinationLanguageIso: String,
    languageShortcuts: Array,
    textToTranslate: String
  },
  behaviors:
  [
    Polymer.AppLocalizeBehavior
  ],
  attached: function()
  {
    this.loadResources(this.resolveUrl('translation-window-locales.json'));
  },
  ready: function()
  {
    let from = document.getElementById('source-input');
    let to = document.getElementById('destination-input');

    this.$['source-language-selection'].addEventListener('iso-changed', (data) =>
    {
      let languageIso = data.detail.value;
      this.sourceLanguageIso = languageIso;
    });

    this.$['destination-language-selection'].addEventListener('iso-changed', (data) =>
    {
      let languageIso = data.detail.value;
      this.destinationLanguageIso = languageIso;
    });

    let remote = require('electron').remote;
    let currentWindow = remote.getCurrentWindow();

    currentWindow.on('show', () =>
    {
      from.value = '';
      to.value = '';

      from.focus();
    });

    document.body.addEventListener('keyup', (e) =>
    {
      if(e.keyCode === 27)
      {
        from.value = '';
        to.value = '';

        currentWindow.hide();
      }
    });

    this.$['settings-icon'].addEventListener('click', () =>
    {
      const {ipcRenderer} = require('electron');
      ipcRenderer.send('settings-icon-click', {});
    });

    const {ipcRenderer} = require('electron');
    ipcRenderer.on('swapLanguagesKeyCombinationChange', (e, arg) =>
    {
      let keyCombination = arg.keyCombination;

      Mousetrap.bind(keyCombination, () =>
      {
        let swapContainer = this.sourceLanguageIso;
        this.sourceLanguageIso = this.destinationLanguageIso;
        this.destinationLanguageIso = swapContainer;
      });
    });
  },
  attached: function()
  {
    this.sourceLanguageIso = 'en';
    this.destinationLanguageIso = 'de';

    document.getElementById('source-input').focus();
  },
  add: function(summand1, summand2)
  {
    return summand1 + summand2;
  }
});
