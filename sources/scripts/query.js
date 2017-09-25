function Query(query_str)
{
  this.method_name = query_str.split(" ")[0];
  var parts = query_str.split(" ").splice(1);
  this.parameters = {};
  for(part_id in parts){
    var part = parts[part_id];
    var key = part.indexOf(":") > -1 ? part.split(":")[0] : "any";
    var value = part.indexOf(":") > -1 ? part.split(":")[1] : part;
    this.parameters[key] = value;
  }
}