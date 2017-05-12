Polymer(
{
  is: 'translation-request',
  properties:
  {
    from:
    {
      type: String,
      value: 'de',
      observer: '_generateRequest'
    },
    to:
    {
      type: String,
      value: 'en',
      observer: '_generateRequest'
    },
    text:
    {
      type: String,
      value: "Hello",
      observer: '_generateRequest'
    },
    translationText:
    {
      type: String,
      notify: true
    },
    _response:
    {
      type: Object,
      observer: "_onResponseChange"
    }
  },
  ready: function()
  {
    this.$['iron-ajax'].addEventListener('error', () =>
    {
      console.log("Error logged!")
      this.translationText = "Service is unavaiable at the moment"
    });
  },
  getTransltrURLParams: function(text, from, to)
  {
    return {
      text: text,
      from: from,
      to: to
    };
  },
  _onResponseChange: function(response)
  {
    if(response)
    {
      if(response.translationText)
      {
        if(response.text === this.text)
        {
          this.translationText = response.translationText;
        }
      }
    }
  },
  _generateRequest: function()
  {
    this.translationText = '';

    if(!this.from) return;
    if(!this.to) return;
    if(!this.text) return;

    if(this.from.length <=  0) return;
    if(this.to.length <=  0) return;
    if(this.text.length <=  0) return;

    this.$["iron-ajax"].generateRequest();
  }
})
