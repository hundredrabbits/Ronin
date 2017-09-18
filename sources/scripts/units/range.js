function Range(range_str)
{
  Unit.call(this);
  
  this.example = "10..50";
  this.range_str = range_str;
  
  this.from = parseFloat(this.range_str.split("..")[0]);
  this.to = parseFloat(this.range_str.split("..")[1]);
  
  this.toString = function()
  {
    return this.from+".."+this.to;
  }
}