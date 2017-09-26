function Commander()
{
  this.el = document.createElement('yu');
  this.el.id = "commander";
  this.input_el = document.createElement('input');
  this.input_el.value = "";

  this.install = function()
  {
    this.el.appendChild(this.input_el);
    ronin.el.appendChild(this.el);
    this.input_el.focus();
  }

  this.validate = function(query_str = ronin.commander.input_el.value)
  {
    var q = new Query(query_str);

    if(!ronin.modules[q.module]){ console.log("Unknown module",q); return; }

    // Update settings
    for(setting_id in q.settings){
      var setting_value = q.settings[setting_id];
      if(!ronin.modules[q.module].settings[setting_id]){ console.log("Missing setting",setting_id); return; }
      ronin.modules[q.module].settings[setting_id] = setting_value;
    }

    // Run methods
    for(method_id in q.methods){
      var method_param = q.methods[method_id];
      if(!ronin.modules[q.module][method_id]){ console.log("Missing method",method_id); return; }
      ronin.modules[q.module][method_id].run(method_param);
    }

    ronin.modules[q.module].routes = q.routes;

    ronin.commander.input_el.value = "";
    ronin.hint.update();
  }

  this.on_input = function(e)
  {
    ronin.hint.update();
  }

  this.blur = function()
  {
    this.input_el.blur();
  }
}