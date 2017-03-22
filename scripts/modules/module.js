function Module(rune)
{
  this.rune = rune;
  this.element = null;
  this.settings  = {};
  this.methods  = {};
  this.layer = null;

  this.docs = "Missing documentation.";
  
  this.install = function()
  {
    console.log("Installing "+ronin.modules[this.rune].constructor.name);
  }

  this.context = function()
  {
    return this.select_layer().context();
  }

  this.create_layer = function()
  {
    this.layer = new Layer(this.constructor.name+".Preview",this);
    this.layer.element.setAttribute("style","z-index:7000");
    ronin.surface.add_layer(this.layer);
  }

  this.select_layer = function()
  {
    if(!this.layer){ this.create_layer(); }
    return this.layer;
  }

  this.active = function(cmd)
  {
  }
  
  this.passive = function(cmd)
  {
  }
  
  this.update_settings = function(cmd)
  {
    for (var key in this.settings){
      if(!cmd.setting(key)){ continue; }
      var value = new this.settings[key].constructor(cmd.setting(key).value);
      this.settings[key] = value;
      ronin.terminal.log(new Log(this,"Updated "+key+" with "+cmd.setting(key).value));
      return;
    }
    ronin.terminal.log(new Log(this,"Unknown setting: "+key));
  }

  this.run_methods = function(cmd)
  {
    var methods = cmd.methods();
    for(i in methods){
      var content = methods[i].split(":");
      var name = content.shift();
      var params = content;
      if(this[name]){
        this[name](params);
      }
      else{
        ronin.terminal.log(new Log(this,name+" is not a method of "+this.constructor.name,"error"));
      }
      
    }
  }
  
  this.hint = function(content)
  {
    var h = "<b>"+ronin.module.constructor.name+"</b> ";
    
    for(method in ronin.module.methods){
      h += ronin.module.methods[method].render()+" ";
    }
    for(setting in ronin.module.settings){
      h += setting+"="+ronin.module.settings[setting].render()+" ";
    }

    h += ronin.module.mouse_mode() ? "<i>"+ronin.module.mouse_mode()+"</i>" : "";

    return this.pad(content)+h;    
  }

  this.pad = function(input)
  {
    var s = "";
    for (i = 0; i < input.length+1; i++){
      s += "_";
    }
    return "<span style='color:#000'>"+s+"</span>";
  }
  
  this.widget = function()
  {
    return "";
  }

  // Mouse

  this.mouse_mode = function()
  {
    return null;
  }

  this.mouse_pointer = function(position)
  {
    return ronin.cursor.draw_pointer_arrow(position);
  }

  this.mouse_from = null;
  this.mouse_held = null;
  this.mouse_prev = null;
  
  this.mouse_down = function(position)
  {
  }
  
  this.mouse_move = function(position,rect)
  {
  }
  
  this.mouse_up = function(position,rect)
  {
  }

  // Keyboard

  this.key_escape = function()
  { 
  }

  this.key_delete = function()
  {
  }

  this.key_arrow_up = function()
  { 
    ronin.surface.layer_up();
  }

  this.key_arrow_down = function()
  { 
    ronin.surface.layer_down();
  }

  this.key_arrow_left = function()
  { 
  }

  this.key_arrow_right = function()
  { 
  }
}