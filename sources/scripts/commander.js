function Commander()
{
  this.el = document.createElement('yu');
  this.el.id = "commander";
  this.input_el = document.createElement('input');
  this.input_el.value = "rescale s:0.5 rect:300x300";

  this.install = function()
  {
    this.el.appendChild(this.input_el);
    ronin.el.appendChild(this.el);
    this.input_el.focus();
  }

  this.validate = function(query_str = ronin.commander.input_el.value)
  {
    var q = new Query(query_str);
    console.log(q);
  }
}