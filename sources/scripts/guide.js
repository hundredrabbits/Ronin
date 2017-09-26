function Guide()
{
  this.el = document.createElement('canvas'); this.el.id = "guide";

  this.install = function()
  {
    ronin.el.appendChild(this.el);
  }

  this.update = function()
  {
    console.log(ronin.commander.query());
  }
}