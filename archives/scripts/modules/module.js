function Module(rune)
{
  this.name = this.constructor.name.toLowerCase();
  this.rune = rune;
  this.element = null;
  this.settings  = {};
  this.methods  = {};
  this.modes  = {};
  this.layer = null;
  this.is_locked = false;

  this.docs = "Missing documentation.";
  
  this.add_method = function(method)
  {
    method.host = this;
    this.methods[method.name] = method;
  }

  this.add_setting = function(setting)
  {
    setting.host = this;
    this.settings[setting.name] = setting;
  }

  this.add_mode = function(mode)
  {
    mode.host = this;
    this.modes[mode.name] = mode;
  }

  this.install = function()
  {
  }

  this.context = function()
  {
    return this.get_layer().context();
  }

  this.create_layer = function(blink = false)
  {
    this.layer = new Layer(this.constructor.name+".Preview",this);
    this.layer.element.setAttribute("style","z-index:7000");
    if(blink){ this.layer.blink(); }
    ronin.frame.add_layer(this.layer);
  }

  this.get_layer = function(is_blinking = false)
  {
    if(!this.layer){ this.create_layer(); this.layer.is_blinking = is_blinking }
    return this.layer;
  }
  
  this.hint = function(method)
  {
    var html = "";

    if(method){
      html += method;
    }
    else{
      for(id in this.methods){
        html += this.methods[id]+" ";
      }
      for(id in this.settings){
        html += this.settings[id]+" ";
      }
      for(mode in this.modes){
        html += this.modes[mode]+" ";
      }
    }

    return html;
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

  this.lock = function()
  {
    ronin.terminal.is_locked = true;
  }

  this.unlock = function()
  {
    ronin.terminal.is_locked = false;
  }

  // Mouse

  this.mouse_mode = function()
  {
    for(mode_id in this.modes){
      if(!keyboard.shift_held && !keyboard.alt_held && !this.modes[mode_id].key){
        return this.modes[mode_id].name;
      }
    }
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
    ronin.frame.layer_up();
  }

  this.key_arrow_down = function()
  { 
    ronin.frame.layer_down();
  }

  this.key_arrow_left = function()
  { 
  }

  this.key_arrow_right = function()
  { 
  }

  this.toString = function()
  {
    return "<span class='module'>"+this.name+"</span>";
  }
}