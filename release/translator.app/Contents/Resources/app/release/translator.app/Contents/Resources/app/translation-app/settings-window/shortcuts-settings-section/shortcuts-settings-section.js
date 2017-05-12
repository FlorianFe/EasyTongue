Polymer(
{
  is: 'shortcuts-settings-section',
  properties:
  {
    openWindowKeyCombination:
    {
      type: String,
      notify: true,
      value: 'ctrl+t'
    },
    swapLanguagesKeyCombination:
    {
      type: String,
      notify: true,
      value: 'ctrl+s'
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
    this.loadResources(this.resolveUrl('shortcuts-settings-section-locales.json'));
  },
  ready: function()
  {
    this.$['open-window-key-combination-storage'].addEventListener('iron-localstorage-load', () =>
    {
      let storedOpenWindowKeyCombination = this.$['open-window-key-combination-storage'].value;
      this.openWindowKeyCombination = storedOpenWindowKeyCombination;
    });

    this.$['swap-languages-key-combination-storage'].addEventListener('iron-localstorage-load', () =>
    {
      let storedSwapLanguagesKeyCombination = this.$['swap-languages-key-combination-storage'].value;
      this.swapLanguagesKeyCombination = storedSwapLanguagesKeyCombination;
    });
  }
})
