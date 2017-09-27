function Module(name)
{
  this.name = name;
  this.methods = {};
  this.settings = {};
  this.routes = {};
  this.ports = {};

  this.hint = function()
  {
    var html = "";

    for(setting_id in this.settings){
      var setting_value = this.settings[setting_id];
      html += setting_id+"="+setting_value+" ";
    }

    for(route_id in this.routes){
      var route_val = this.routes[route_id];
      html += route_id+"->"+route_val+" ";
    }

    return html.trim() != "" ? "<b>"+this.name+"</b> "+html.trim() : "";
  }
}