function IO()
{
  this.drag_over = function(e)
  {
    e.stopPropagation();
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  }

  this.drop = function(e)
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

      ronin.frame.resize_to({width:width * 0.5,height:height * 0.5});
      ronin.render.context().drawImage(base_image, 0,0,width,height);
    }
    reader.readAsDataURL(file);
  }
}