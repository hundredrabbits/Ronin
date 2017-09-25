function Module(name)
{
  this.name = name;

  this.hint = function()
  {
    var html = "";

    for(setting_id in this.settings){
      var setting_value = this.settings[setting_id];
      html += setting_id+"="+setting_value+" ";
    }

    return this.name+"["+html.trim()+"]";
  }
}