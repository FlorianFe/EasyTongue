Polymer(
{
  is: 'general-settings-section',
  properties:
  {
    autoLaunchEnabled:
    {
      type: Boolean,
      value: false
    },
    language:
    {
      type: String,
      notify: true,
      value: 'en'
    }
  },
  behaviors:
  [
    Polymer.AppLocalizeBehavior
  ],
  attached: function()
  {
    this.loadResources(this.resolveUrl('general-settings-section-locales.json'));
  },
  ready: function()
  {
    this.$['language-storage'].addEventListener('iron-localstorage-load', () =>
    {
      let language = this.$['language-storage'].value;
      this.language = language;
    });

    const app = require('electron').remote.app;
    const AutoLaunch = require('auto-launch');

    let autoLaunch = new AutoLaunch({ name: 'Translater' });

    this.$["exit-button"].addEventListener('click', () =>
    {
      console.log("Exit")
      app.quit();
    });

    this.$["autostart-checkbox"].addEventListener('click', () =>
    {
      autoLaunch.isEnabled()
      .then(function(isEnabled)
      {
        if(isEnabled)
        {
          autoLaunch.disable();
          console.log("Translator autostart disabled!");
        }
        else
        {
          autoLaunch.enable();
          console.log("Translator autostart enabled!");
        }
      });

      autoLaunch.isEnabled().then(function(isEnabled)
      {
        this.autoLaunchEnabled = isEnabled;
      });

    });
  }
})
