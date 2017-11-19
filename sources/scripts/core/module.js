function Module(name,docs = "Missing documentation.")
{
  this.name = name;
  this.methods = {};

  this.routes = {};
  this.ports = {};
  this.docs = docs;

  this.hint = function()
  {
    var html = "";

    for(id in this.methods){
      var v = this.methods[id];
      html += v.hint();
    }
    
    for(route_id in this.routes){
      var route_val = this.routes[route_id];
      html += route_id+"->"+route_val+" ";
    }

    return html.trim() != "" ? " "+html.trim() : "";
  }
}