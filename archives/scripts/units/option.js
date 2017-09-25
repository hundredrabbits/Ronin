function Option(name)
{
  Unit.call(this);
  
  this.name = name.split("=")[0];
  this.value = name.split("=")[1];
}