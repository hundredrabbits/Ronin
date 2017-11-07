function Method(name,params,info = "Missing documentation",f)
{
  this.name = name;
  this.params = params;
  this.info = info;
  this.run = f;

  this.hint = function()
  {
    return "<b>"+this.name+"</b>:"+this.params+" ";
  }

  this.docs = function()
  {
    return "<b>"+this.params+"</b> <i>"+this.info+"</i>";
  }
}