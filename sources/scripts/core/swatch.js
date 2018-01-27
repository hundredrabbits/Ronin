function Swatch()
{
  this.index = 0;
  this.colors = [];
  
  this.start = function()
  {
    this.update();
  }
  
  this.update = function()
  {
    this.colors = [ronin.theme.active.f_high,ronin.theme.active.f_med,ronin.theme.active.f_low];
  }

  this.swap = function()
  {
    this.index += 1;
  }

  this.color = function(offset = 0)
  {
    return this.colors[(this.index + offset) % this.colors.length];
  }

  this.hint = function()
  {
    this.update();
    return `<svg width="20px" height="20px" xmlns="http://www.w3.org/2000/svg" baseProfile="full" version="1.1" id='swatch' style='background-color:${this.color(1)}'><circle cx='10' cy='10' r='${ronin.cursor.size * 0.75}' fill='${this.color()}'/></svg>`;
  }
}