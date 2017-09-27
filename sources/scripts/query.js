function Query(query_str)
{
  this.module = query_str.split(" ")[0];
  var parts = query_str.split(" ").splice(1);
  this.raw = parts.join(" ");
  this.methods = {};
  this.settings = {};
  this.routes = {};

  for(part_id in parts){
    var part = parts[part_id];
    if(part.indexOf(":") > -1){
      var key = part.indexOf(":") > -1 ? part.split(":")[0] : "any";
      var value = part.indexOf(":") > -1 ? part.split(":")[1] : part;
      this.methods[key] = parse_parameters(value);
    }
    else if(part.indexOf("=") > -1){
      var key = part.indexOf("=") > -1 ? part.split("=")[0] : "any";
      var value = part.indexOf("=") > -1 ? part.split("=")[1] : part;
      this.settings[key] = value;
    }
    else if(part.indexOf("->") > -1){
      var key = part.indexOf("->") > -1 ? part.split("->")[0] : "any";
      var value = part.indexOf("->") > -1 ? part.split("->")[1] : part;
      this.routes[key] = value;
    }
  }

  function parse_parameters(param_str)
  {
    if(param_str.indexOf(">>") > -1){
      return parse_modifier(param_str);
    }
    else{
      if(param_str.indexOf("&") > -1){
        return parse_sequence(param_str);
      }
      else{
        return parse_unit(param_str);
      }
    }
    return param_str;
  }

  function parse_modifier(mod_str)
  {
    var h = {};

    var parts = mod_str.split(">>");

    if(parts[0].indexOf("&") > -1){
      h.from = parse_sequence(parts[0]);
    }
    else{
      h.from = parse_unit(parts[0]);
    }

    if(parts[1].indexOf("&") > -1){
      h.to = parse_sequence(parts[1]);
    }
    else{
      h.to = parse_unit(parts[1]);
    }
    return h;
  }

  function parse_sequence(seq_str)
  {
    var a = [];

    var parts = seq_str.split("&");
    for(part_id in parts){
      var part = parts[part_id];
      a.push(parse_unit(part));
    }
    return a;
  }

  function parse_unit(unit_str)
  {
    if(unit_str.indexOf("|") > -1 && unit_str.indexOf(",") > -1 && unit_str.indexOf("x") > -1){
      return Object.assign(parse_unit(unit_str.split("|")[0]), parse_unit(unit_str.split("|")[1]));
    }
    if(unit_str.indexOf(",") > -1){
      return {x:parseInt(unit_str.split(",")[0]),y:parseInt(unit_str.split(",")[1])};
    }
    if(unit_str.indexOf("x") > -1){
      return {width:parseInt(unit_str.split("x")[0]),height:parseInt(unit_str.split("x")[1])};
    }
  }
}