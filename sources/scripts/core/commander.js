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

  this.validate = function(q = ronin.commander.query())
  {
    if(!ronin.modules[q.module]){ console.log("Unknown module",q.module); return; }
    if(q.raw.indexOf("$") > -1){ console.log("Variables present"); return; }

    // Update settings
    for(setting_id in q.settings){
      var setting_value = q.settings[setting_id];
      if(!ronin.modules[q.module].settings[setting_id]){ console.log("Missing setting",setting_id); return; }
      ronin.modules[q.module].settings[setting_id] = setting_value;
    }
    
    ronin.modules[q.module].routes = q.routes;

    // Run methods
    for(method_id in q.methods){
      var method_param = q.methods[method_id];
      if(!ronin.modules[q.module].methods[method_id]){ console.log("Missing method",method_id); return; }
      ronin.modules[q.module].methods[method_id](method_param);
    }

    ronin.commander.input_el.value = "";
    ronin.hint.update();
    ronin.guide.update();
  }

  this.on_input = function(e)
  {
    console.log("input");
    ronin.hint.update();
    ronin.guide.update();
  }

  this.blur = function()
  {
    this.input_el.blur();
  }

  this.active_module = function()
  {
    return this.query().module;
  }

  this.inject = function(str)
  {
    ronin.commander.input_el.value = str;
    ronin.guide.update();
  }

  this.query = function()
  {
    return new Query(ronin.commander.input_el.value);
  }
}