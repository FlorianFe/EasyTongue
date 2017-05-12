Polymer(
{
  is: 'key-binding-selector',
  properties:
  {
    selectedKeyCombination:
    {
      type: String,
      notify: true,
      value: "T"
    }
  },
  ready: function()
  {
    this.$["key-button"].addEventListener('click', () =>
    {
      this.$["paper-dialog"].open();

      Mousetrap.record({recordSequence: false}, (sequence) =>
      {
        if(sequence[0] != undefined)
        {
          this.selectedKeyCombination = sequence[0];
          this.$["paper-dialog"].close();
        }
      });

      this.$["paper-dialog"].addEventListener('close', () =>
      {
        Mousetrap.stopRecord();
      })

    });
  }
})
