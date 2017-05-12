Polymer(
{
  is: 'language-selection',
  properties:
  {
    iso:
    {
      type: String,
      notify: true,
      value: 'en'
    },
    _opened:
    {
      type: Boolean,
      value: false
    }
  },
  ready: function()
  {
    this.$['iron-selector'].addEventListener('click', () =>
    {
      this.$['paper-dialog'].close();
      this._opened = false;
    });

    this.$['flag-button'].addEventListener('click', () =>
    {
      this.$['paper-dialog'].open();
      this._opened = true;
    });
  },
  attached: function()
  {

  }
})
