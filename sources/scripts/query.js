function Query(query_str)
{
  this.module = query_str.split(" ")[0];
  var parts = query_str.split(" ").splice(1);
  this.raw = parts.join(" ");
  this.methods = {};
  this.settings = {};

  for(part_id in parts){
    var part = parts[part_id];
    if(part.indexOf(":") > -1){
      var key = part.indexOf(":") > -1 ? part.split(":")[0] : "any";
      var value = part.indexOf(":") > -1 ? part.split(":")[1] : part;
      this.methods[key] = value;
    }
    if(part.indexOf("=") > -1){
      var key = part.indexOf("=") > -1 ? part.split("=")[0] : "any";
      var value = part.indexOf("=") > -1 ? part.split("=")[1] : part;
      this.settings[key] = value;
    }
  }
}