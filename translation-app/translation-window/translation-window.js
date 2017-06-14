Polymer(
{
  is: 'translation-window',
  property:
  {
    sourceLanguageIso: String,
    destinationLanguageIso: String
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
    this.$['source-language-iso-storage'].addEventListener('iron-localstorage-load', () =>
    {
      let sourceLanguageIso = this.$['source-language-iso-storage'].value;
      this.sourceLanguageIso = sourceLanguageIso;
      console.log(this.sourceLanguageIso);
    });

    this.$['source-language-iso-storage'].addEventListener('iron-localstorage-load-empty', () =>
    {
      this.sourceLanguageIso = 'en';
      console.log("empty");
    });

    this.$['destination-language-iso-storage'].addEventListener('iron-localstorage-load', () =>
    {
      let destinationLanguageIso = this.$['destination-language-iso-storage'].value;
      this.destinationLanguageIso = destinationLanguageIso;
    });

    this.$['destination-language-iso-storage'].addEventListener('iron-localstorage-load-empty', () =>
    {
      this.destinationLanguageIso = 'de';
      console.log("empty");
    });

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

    const {ipcRenderer} = require('electron');

    this.$['settings-icon'].addEventListener('click', () =>
    {
      ipcRenderer.send('settings-icon-click', {});
    });

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
    document.getElementById('source-input').focus();
  },
  add: function(summand1, summand2)
  {
    return summand1 + summand2;
  },
  _escapePressed: function(data)
  {
    let remote = require('electron').remote;
    let currentWindow = remote.getCurrentWindow();

    this.$["source-input"].value = '';
    this.$["destination-input"].value = '';

    currentWindow.hide();
  }
});
