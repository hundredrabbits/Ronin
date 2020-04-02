'use strict'

const DEFAULT_VERTEX_SHADER_CODE = 
`
  attribute vec2 a_position;
  attribute vec2 a_texCoord;
  
  uniform vec2 u_resolution;
  
  varying vec2 v_texCoord;
  
  void main() {
    // convert the rectangle from pixels to 0.0 to 1.0
    vec2 zeroToOne = a_position / u_resolution;
  
    // convert from 0->1 to 0->2
    vec2 zeroToTwo = zeroToOne * 2.0;
  
    // convert from 0->2 to -1->+1 (clipspace)
    vec2 clipSpace = zeroToTwo - 1.0;
  
    gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);
  
    // pass the texCoord to the fragment shader
    // The GPU will interpolate this value between points.
    v_texCoord = a_texCoord;
  }
`

const DEFAULT_FRAGMENT_SHADER_CODE = 
`
  precision highp float;

  // our texture
  uniform sampler2D u_image;
  
  // the texCoords passed in from the vertex shader.
  varying vec2 v_texCoord;

  void main() {
    gl_FragColor = texture2D(u_image, v_texCoord);
  }
`

function GlSurface (client) {

    this.el = document.createElement('canvas')
    this.el.id = 'glsurface'
    this.el.className = 'hidden'

    this.ratio = window.devicePixelRatio

    // Contexts
    this.context = this.el.getContext('webgl')

    this.install = function (host) {
        host.appendChild(this.el)
        window.addEventListener('resize', (e) => { this.onResize() }, false)
    }

    this.start = function () {
        this.maximize()
    }

    this.onResize = function () {
        if (client.commander._input.value === '') {
            this.maximize()
        }
        const f = this.getFrame()
        client.log(`resize ${f.w}x${f.h}`)
    }

    // Clear
    this.clear = function (rect = this.getFrame(), context = this.context) {
        context.clearColor(0, 0, 0, 0)
        context.clear(context.COLOR_BUFFER_BIT)
    }

    this.resize = (size, fit = false) => {
        const frame = this.getFrame()
        if (frame.w === size.w && frame.h === size.h) { return }
        console.log('GL Surface', `Resize: ${size.w}x${size.h}`)
        this.el.width = size.w
        this.el.height = size.h
        this.el.style.width = (size.w / this.ratio) + 'px'
        this.el.style.height = (size.h / this.ratio) + 'px'
    }

    this.maximize = () => {
        this.resize(this.bounds())
    }

    this.bounds = () => {
        return { x: 0, y: 0, w: ((window.innerWidth - 60) * this.ratio), h: ((window.innerHeight - 60) * this.ratio) }
    }

    this.getFrame = () => {
        return { x: 0, y: 0, w: this.el.width, h: this.el.height, c: this.el.width / 2, m: this.el.height / 2 }
    }

    this.toggleGlCanvas = function () {
        this.el.className = this.el.className === 'hidden' ? '' : 'hidden'
    }

    this.vertexshader = (vertexShaderCodeString = DEFAULT_VERTEX_SHADER_CODE, context = this.context) => { //prepare vertex shader code and return reference
        let vertShader = context.createShader(context.VERTEX_SHADER)
        context.shaderSource(vertShader, vertexShaderCodeString)

        return vertShader
    }

    this.fragmentshader = (fragmentShaderCodeString = DEFAULT_FRAGMENT_SHADER_CODE, context = this.context) => { //prepare fragment shader code and return reference
        let fragShader = context.createShader(context.FRAGMENT_SHADER)
        context.shaderSource(fragShader, fragmentShaderCodeString)

        return  fragShader
    }

    this.runshader = (fragShader, vertShader=this.vertexshader(), rect=this.getFrame(), context = this.context) => { //compile and link shaders, run canvas through shaders, put the result back on main canvas
        const currentImageFromCanvas = client.surface.context.getImageData(rect.x, rect.y, rect.w, rect.h)
        const webGlProgram = compileShaders(context, vertShader, fragShader)

        const positionVertices = calculatePositionVertices(rect, currentImageFromCanvas)
        bindPositionVerticesToGlProgram(context, positionVertices, webGlProgram)
        
        const texture = context.createTexture()
        bindTextureToGlProgram(context, webGlProgram, texture)

        loadImageIntoTexture(context, currentImageFromCanvas, webGlProgram)

        drawShader(context)

        copyGlCanvasToMainCanvas(context)
    }

    function copyGlCanvasToMainCanvas(context) {
        let pixels = new Uint8Array(context.drawingBufferWidth * context.drawingBufferHeight * 4)
        context.readPixels(0, 0, context.drawingBufferWidth, context.drawingBufferHeight, context.RGBA, context.UNSIGNED_BYTE, pixels)
        pixels = new Uint8ClampedArray(pixels)
        let processedImage = new ImageData(pixels, context.canvas.width, context.canvas.height)
        createImageBitmap(processedImage, 0, 0, context.canvas.width, context.canvas.height).then((img) => {
            client.surface.clear()
            client.surface.draw(img)
        })
    }

    function drawShader(context) {
        client.glSurface.clear()
        context.drawArrays(context.TRIANGLES, 0, 6)
    }

    function loadImageIntoTexture(context, currentImageFromCanvas, webGlProgram) {
        context.texImage2D(context.TEXTURE_2D, 0, context.RGBA, context.RGBA, context.UNSIGNED_BYTE, currentImageFromCanvas)
        context.viewport(0, 0, context.canvas.width, context.canvas.height)
        var resolutionLocation = context.getUniformLocation(webGlProgram, "u_resolution")
        context.uniform2f(resolutionLocation, context.canvas.width, context.canvas.height)
    }

    function bindTextureToGlProgram(context, webGlProgram, texture) {
        const texcoordLocation = context.getAttribLocation(webGlProgram, "a_texCoord")
        context.enableVertexAttribArray(texcoordLocation)
        context.activeTexture(context.TEXTURE0)
        context.bindTexture(context.TEXTURE_2D, texture)
        context.vertexAttribPointer(texcoordLocation, 2, context.FLOAT, false, 0, 0)

        context.texParameteri(context.TEXTURE_2D, context.TEXTURE_WRAP_S, context.CLAMP_TO_EDGE)
        context.texParameteri(context.TEXTURE_2D, context.TEXTURE_WRAP_T, context.CLAMP_TO_EDGE)
        context.texParameteri(context.TEXTURE_2D, context.TEXTURE_MIN_FILTER, context.LINEAR)
        context.texParameteri(context.TEXTURE_2D, context.TEXTURE_MAG_FILTER, context.LINEAR)
    }

    function bindPositionVerticesToGlProgram(context, positionVertices, webGlProgram) {
        const positionBuffer = context.createBuffer()
        context.bindBuffer(context.ARRAY_BUFFER, positionBuffer)
        context.bufferData(context.ARRAY_BUFFER, positionVertices, context.STATIC_DRAW)
        const positionLocation = context.getAttribLocation(webGlProgram, 'a_position')
        context.vertexAttribPointer(positionLocation, 2, context.FLOAT, false, 0, 0)
        context.enableVertexAttribArray(positionLocation)
        const texcoordBuffer = context.createBuffer()
        context.bindBuffer(context.ARRAY_BUFFER, texcoordBuffer)
        context.bufferData(context.ARRAY_BUFFER, new Float32Array([
            0.0, 1.0,
            1.0, 1.0,
            0.0, 0.0,
            0.0, 0.0,
            1.0, 1.0,
            1.0, 0.0,
        ]), context.STATIC_DRAW)
   
    }

    function calculatePositionVertices(rect, currentImageFromCanvas) {
        let x1 = rect.x
        let x2 = rect.x + currentImageFromCanvas.width
        let y1 = rect.y
        let y2 = rect.y + currentImageFromCanvas.height
        const positionVertices = new Float32Array([
            x1, y1,
            x2, y1,
            x1, y2,
            x1, y2,
            x2, y1,
            x2, y2,
        ])
        return positionVertices
    }

    function compileShaders(context, vertShader, fragShader) {
        context.compileShader(vertShader)
        context.compileShader(fragShader)
        const program = context.createProgram()
        context.attachShader(program, vertShader)
        context.attachShader(program, fragShader)
        context.linkProgram(program)
        context.useProgram(program)
        return program
    }
}
