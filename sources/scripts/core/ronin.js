function Ronin()
{
  this.modules  = {};
  this.element  = document.getElementById('ronin');  
  
  this.default  = new Default("`");

  this.frame    = new Frame("@");
  this.path     = new Path("+");
  this.type     = new Type("&");
  this.brush    = new Brush("-");

  this.source   = new Source("$");
  
  this.eye      = new Eye("*");
  this.render   = new Render("%");
  this.magnet   = new Magnet("^");

  this.overlay  = new Overlay("|");
  this.terminal = new Terminal(">");
  this.cursor   = new Cursor(".");
  this.widget   = new Widget("?");
  
  this.modules[this.frame.name]    = this.frame;
  this.modules[this.type.name]     = this.type;
  this.modules[this.path.name]     = this.path;

  this.modules[this.brush.name]    = this.brush;

  this.modules[this.source.name]   = this.source;
  this.modules[this.render.name]   = this.render;
  this.modules[this.eye.name]      = this.eye;
  this.modules[this.magnet.name]   = this.magnet;

  this.modules[this.cursor.name]   = this.cursor;
  this.modules[this.terminal.name] = this.terminal;

  // document.addEventListener('contextmenu', function(ev){ ev.preventDefault(); return false;}, false);
  window.addEventListener('resize', function(){ ronin.on_resize(); }, true);

  this.install = function()
  {
    ronin.frame.element = document.getElementById('frame');
    ronin.cursor.element = document.getElementById('cursor');
    ronin.terminal.element = document.getElementById('terminal');

    for(var key in this.modules){
      this.modules[key].install();
    }

    this.widget.install();
    ronin.cursor.mode = ronin.brush;
    this.on_drag();
  }

  this.start = function(hash = null)
  {
    var target_file = hash.length > 2 ? hash.substr(1,hash.length-1)+".rin" : "default.rin"
  
    ronin.terminal.update();
    ronin.widget.update();
    ronin.terminal.input.focus();
    ronin.load(target_file);
  }

  this.hint = function(method)
  {
    var html = "";
    if(this.terminal.input.value){
      for(id in ronin.modules){
        if(this.terminal.input.value != ronin.modules[id].name.substr(0,this.terminal.input.value.length)){ continue; }
        html += "<span class='module'>"+ronin.modules[id].name+"</span> ";
      }
    }
    else{
      for(id in ronin.modules){
        html += "<span class='module'>"+ronin.modules[id].name+"</span> ";
      }
    }
    return html;
  }
  
  this.cursors = [];
  
  this.position_in_canvas = function(e)
  {
    // x -= parseInt(this.frame.element.style.left) - parseInt(this.frame.element.style.width/2);
    var x = e.clientX - parseInt(this.frame.element.style.left);
    var y = e.clientY - parseInt(this.frame.element.style.top);
    return new Position(x,y);
  }
  
  this.timestamp = function()
  {
    var currentdate = new Date();
    var date = currentdate.getFullYear()+""+(currentdate.getMonth()+1)+""+currentdate.getDate();
    return date+" "+currentdate.getHours()+":"+currentdate.getMinutes()+":"+currentdate.getSeconds();
  }

  this.on_resize = function()
  {
    ronin.frame.center();
  }

  this.on_drag = function()
  {
    // Position Background
    var bg_offset_parts = ronin.element.style.backgroundPosition == "" ? [0,0] : ronin.element.style.backgroundPosition.split(" ");

    var x = parseInt(ronin.frame.element.style.left)/4;
    var y = parseInt(ronin.frame.element.style.top)/4;

    ronin.element.style.backgroundPosition = x+"px "+y+"px";
  }

  this.filename = "default.rin";

  this.load = function readTextFile(name)
  {    
    this.filename = name;
    var file = "presets/"+name+'?'+new Date().getTime();
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                ronin.terminal.log(new Log(null,"Loaded file "+name));
                ronin.terminal.run_multi(allText.split("\n").join(";"));
            }
        }
    }
    rawFile.send(null);
    ronin.widget.update();
    ronin.terminal.update();
  }

  // Drag file on canvas

  this.element.addEventListener('dragover',function(e)
  { 
    e.stopPropagation(); e.preventDefault(); e.dataTransfer.dropEffect = 'copy'; 
  });

  this.element.addEventListener('drop', function(e)
  {
    e.stopPropagation();
    e.preventDefault();
    var files = e.dataTransfer.files;
    var file = files[0];

    if (!file.type.match(/image.*/)) { console.log("Not image"); return false; }

    var reader = new FileReader();
    
    reader.onload = function(event)
    {
      base_image = new Image();
      base_image.src = event.target.result;

      var width = base_image.naturalWidth;
      var height = base_image.naturalHeight;

      // Display as large as the canvas
      var ratio = ronin.frame.size.width/width;
      ronin.frame.active_layer.context().drawImage(base_image, 0,0,width * ratio,height * ratio);
    }
    reader.readAsDataURL(file);
  });
  
}