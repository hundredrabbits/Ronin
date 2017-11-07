function Method(name,params,info = "Missing documentation")
{
  this.name = name;
  this.params = params;
  this.info = info;

  this.run = null;

  this.hint = function()
  {
    return "<b>"+this.name+"</b>:"+this.params+" ";
  }

  this.docs = function()
  {
    return "["+this.params+"] <i>"+this.info+"</i>";
  }
}