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
    if(q.raw.indexOf(";") > -1){ this.validate_multi(q); return; }

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
      ronin.modules[q.module].methods[method_id].run(method_param);
    }

    ronin.commander.input_el.value = "";
    ronin.hint.update();
    ronin.guide.update();
  }

  this.queue = [];

  this.validate_multi = function(q)
  {
    var queue = [];
    var queries = q.string.split(";");

    for(id in queries){
      var q = new Query(queries[id].trim());
      queue.push(q);
    }
    this.queue = queue;
    this.run_queue();
  }

  this.run_queue = function()
  {
    if(ronin.commander.queue.length == 0){ return; }
      
    ronin.commander.validate(ronin.commander.queue[0]);

    ronin.commander.queue = ronin.commander.queue.splice(1,ronin.commander.queue.length-1)

    setTimeout(ronin.commander.run_queue,250);
  }

  this.update = function()
  {
    var q = ronin.commander.query();
    if(ronin.modules[q.module] && ronin.modules[q.module]["preview"]){
      ronin.modules[q.module].preview(q);
    } 
    ronin.hint.update();
    ronin.guide.update();
  }

  this.autocomplete = function()
  {
    var target_module = ronin.commander.query().module;

    var ac = ronin.modules[target_module] ? ronin.hint.find_autocomplete(ronin.modules[target_module].methods,":") : ronin.hint.find_autocomplete(ronin.modules," ")

    if(ac.lenght < 1 || !ac[0]){ return; }

    this.append(ac[0]);
    this.focus();
  }

  this.on_input = function(e)
  {
    ronin.commander.update();
  }

  this.focus = function()
  {
    this.input_el.focus();
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
    ronin.commander.update();
  }

  this.append = function(str)
  {
    ronin.commander.input_el.value += str;
    ronin.commander.update();    
  }

  this.query = function()
  {
    return new Query(ronin.commander.input_el.value);
  }
}