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
        return { x: 0, y: 0, w: this.el.width, h: this.el.height, c: this.el.width / 2, m: this.el.height / 2, 
            getGlRepresentation: ()=> {
              const x1 = 0
              const x2 = 0 + this.el.width
              const y1 = 0
              const y2 = 0 + this.el.height
              return new Float32Array([
                x1, y1,
                x2, y1,
                x1, y2,
                x1, y2,
                x2, y1,
                x2, y2, 
            ])} }
    }

    this.toggleGlCanvas = function () {
        this.el.className = this.el.className === 'hidden' ? '' : 'hidden'
    }

    this.compileAndApplyShader = (shaderDef,args,context=this.context) => {
        debugger;
        let vertexShaderCode = ""
        shaderDef.vertex.shaderCode.forEach((line)=>{
            vertexShaderCode += line
        })

        const vertexShader = this.vertexshader(vertexShaderCode, context)

        let fragmentShaderCode = ""
        shaderDef.fragment.shaderCode.forEach((line)=>{
            fragmentShaderCode += line
        })

        const fragmentShader = this.fragmentshader(fragmentShaderCode, context);
        const program = this.createGlProgramAndLinkShaders(vertexShader,fragmentShader,context)

        shaderDef.vertex.inputs.forEach((input)=>{
            debugger;
            let value
            if (input.source === "CANVAS"){
            
                this.loadMainCanvasIntoShaderProgram(program,this.getFrame(),context)
            } else {
                const match = input.source.match('(?:args\\[)([0-9])(?:\\])')
                if(match.length>1){
                    value = args[match[1]]
                    value = value?value:input.default
                    if(value==="FRAME"){
                        value = this.getFrame()
                    }
                } else {
                    console.log("Error: no value for " + input.name)
                }
            
                switch (input.qualifier) {
                    case "attribute":
                        this.bindAttributeToProgram(input, value, program, context)
                        break
                    case "uniform":
                        this.bindUniformToProgram(input, value, program, context)
                        break
                    default:
                        console.log("Error: qualifier- " + variable.qualifier + " cannot be bound to an argument")
                        
                }
            }
        })

        shaderDef.fragment.inputs.forEach((input)=>{
            debugger;
            let value
            
            const match = input.source.match('(?:args\\[)([0-9])(?:\\])')
            if(match.length>1){
                value = args[match[1]]
                value = value?value:input.default
            } else {
                console.log("Error: no value for " + input.name)
            }
           
            switch (input.qualifier) {
                case "uniform":
                    this.bindUniformToProgram(input, value, program, context)
                    break
                default:
                    console.log("Error: qualifier- " + variable.qualifier + " cannot be bound to an argument")
                    
            }
            
        })

        this.renderShaders(context)
        this.copyGlCanvasToMainCanvas()
    }

    this.bindAttributeToProgram = (input,value,program,context=this.context) => {
        
        let size
        switch(input.type){
            case "float":
                size = 1
                break
            case "vec2":
                size = 2
                break
            case "vec3":
                size = 3
                break
            case "vec4":
                size = 4
                break
            case "mat2":
                size = 4
                break
            case "mat3":
                size = 9
                break
            case "mat4":
                size = 16
                break
            default:
                size = 0
        }

        const attribute = {
            name: input.name,
            type: input.type,
            size: input.size?input.size:size,
            normalized: input.normalized?input.normalized:false,
            stride: input.stride?input.stride:0,
            offset: input.offset?input.offset:0
        }

        debugger;

        const attributeBuffer = context.createBuffer()
        context.bindBuffer(context.ARRAY_BUFFER, attributeBuffer)
        context.bufferData(context.ARRAY_BUFFER, value.getGlRepresentation(), context.STATIC_DRAW)
        const attributeLocation = context.getAttribLocation(program, attribute.name)
        context.vertexAttribPointer(attributeLocation, attribute.size, context.FLOAT, attribute.normalized, attribute.stride, attribute.offset)
        context.enableVertexAttribArray(attributeLocation)
   
    }

    // this.bindPositionVerticesToGlProgram = (positionVertices, webGlProgram, context = this.context) => {
    //     const positionBuffer = context.createBuffer()
    //     context.bindBuffer(context.ARRAY_BUFFER, positionBuffer)
    //     context.bufferData(context.ARRAY_BUFFER, positionVertices, context.STATIC_DRAW)
    //     const positionLocation = context.getAttribLocation(webGlProgram, 'a_position')
    //     context.vertexAttribPointer(positionLocation, 2, context.FLOAT, false, 0, 0)
    //     context.enableVertexAttribArray(positionLocation)
   
    // }

    this.bindUniformToProgram = (input,value,program,context=this.context)=>{

        const qualifiedType = "uniform" + " " + input.type
        const uniformLocation = context.getUniformLocation(program, input.name)
        
        switch (input.type) {
            case "float":
                context.uniform1f(uniformLocation, value)
                break
            case "float[]":
                context.uniform1fv(uniformLocation, value)
                break
            case "vec2":
                context.uniform2f(uniformLocation, value)
                break
            case "vec2[]":
                context.uniform2fv(uniformLocation, value)
                break
            case "vec3":
                context.uniform3f(uniformLocation, value)
                break
            case "vec3[]":
                context.uniform3fv(uniformLocation, value)
                break
            case "vec4":
                context.uniform4fv(uniformLocation, value)
                break
            case "vec4[]":
                context.uniform4fv(uniformLocation, value)
                break
            case "int":
                context.uniform1i(uniformLocation, value)
                break
            case "int[]":
                context.uniform1iv(uniformLocation, value)
                break
            case "ivec2":
                context.uniform2f(uniformLocation, value)
                break
            case "ivec2[]":
                context.uniform2iv(uniformLocation, value)
                break
            case "ivec3":
                context.uniform3i(uniformLocation, value)
                break
            case "ivec3[]":
                context.uniform3iv(uniformLocation, value)
                break
            case "ivec4":
                context.uniform4iv(uniformLocation, value)
                break
            case "ivec4[]":
                context.uniform4iv(uniformLocation, value)
                break
            case "mat2":
                gl.uniformMatrix2fv(uniformLocation, false, value)
                break
            case "mat3":
                gl.uniformMatrix3fv(uniformLocation, false, value)
                break
            case "mat4":
                gl.uniformMatrix4fv(uniformLocation, false, value)
                break
            default:
                console.log("Error: unrecognized variable type "+ qualifiedType)
                return
        }
    }

    this.runshader = (fragShader=this.fragmentshader(), vertShader=this.vertexshader(), rect=this.getFrame(), context = this.context) => { //compile and link shaders, run canvas through shaders, put the result back on main canvas
        const webGlProgram = this.createGlProgramAndLinkShaders(vertShader, fragShader,context)

        const positionVertices = calculatePositionVertices(rect,context)
        this.bindPositionVerticesToGlProgram(positionVertices, webGlProgram,context)

        this.loadMainCanvasIntoShaderProgram(webGlProgram,rect,context)

        this.renderShaders(context)

        this.copyGlCanvasToMainCanvas()
    }

    this.applyKaleidShader = (numberOfSides, rect=this.getFrame(), context = this.context)=>{
        // fragment shader borrowed from https://github.com/ojack/hydra-synth
        const fragmentShaderCode = `
            precision highp float;
            uniform sampler2D u_image;
            uniform float u_numberOfSides;
            varying vec2 v_texCoord;
            vec2 kaleid(vec2 st, float nSides){
                st-=0.5;
                float r = length(st);
                float a = atan(st.y, st.x);
                float pi = 2.0*3.1416;
                a = mod(a,pi/nSides);
                a = abs(a-pi/nSides/2.0);
                return r*vec2(cos(a), sin(a));
            }
            void main() {
                vec2 coord = kaleid(v_texCoord, u_numberOfSides);
                gl_FragColor = texture2D(u_image, coord);
            }
        `
        const fragShader = this.fragmentshader(fragmentShaderCode, context)
        const defaultVertexShader = this.vertexshader(DEFAULT_VERTEX_SHADER_CODE)
        const webGlProgram = this.createGlProgramAndLinkShaders(defaultVertexShader, fragShader, context)

        const positionVertices = calculatePositionVertices(rect)
        this.bindPositionVerticesToGlProgram( positionVertices, webGlProgram, context)

        this.bindUniformFloatToProgram("u_numberOfSides", numberOfSides, webGlProgram, context)

        this.loadMainCanvasIntoShaderProgram(webGlProgram,rect,context)
        
        this.renderShaders(context)

        this.copyGlCanvasToMainCanvas()
    }

    this.vertexshader = (vertexShaderCodeString = DEFAULT_VERTEX_SHADER_CODE, context = this.context) => { //prepare vertex shader code and return reference
        let vertShader = context.createShader(context.VERTEX_SHADER)
        context.shaderSource(vertShader, vertexShaderCodeString)
        this.compileShader(vertShader,context)

        return vertShader
    }

    this.fragmentshader = (fragmentShaderCodeString = DEFAULT_FRAGMENT_SHADER_CODE, context = this.context) => { //prepare fragment shader code and return reference
        let fragShader = context.createShader(context.FRAGMENT_SHADER)
        context.shaderSource(fragShader, fragmentShaderCodeString)
        this.compileShader(fragShader,context)

        return fragShader
    }

    this.compileShader = (shader,context = this.context) => {
        context.compileShader(shader)
        var compiled = context.getShaderParameter(shader, context.COMPILE_STATUS)
        console.log('Shader compiled successfully: ' + compiled)
        var compilationLog = context.getShaderInfoLog(shader)
        console.log('Shader compiler log: ' + compilationLog)
    }

    this.createGlProgramAndLinkShaders = (vertShader, fragShader, context = this.context) => {
        const program = context.createProgram()
        context.attachShader(program, vertShader)
        context.attachShader(program, fragShader)
        context.linkProgram(program)
        context.useProgram(program)
        return program
    }

    this.loadMainCanvasIntoShaderProgram=( webGlProgram,rect=this.getFrame(), context=this.context) => {
        const currentImageFromCanvas = client.surface.context.getImageData(rect.x, rect.y, rect.w, rect.h)
        const texture = context.createTexture()
        this.bindTextureToGlProgram(texture, webGlProgram, context)
        this.loadImageIntoTexture(currentImageFromCanvas, webGlProgram, context)
    }

    this.loadImageIntoTexture= (currentImageFromCanvas, webGlProgram,context = this.context) => {
        context.texImage2D(context.TEXTURE_2D, 0, context.RGBA, context.RGBA, context.UNSIGNED_BYTE, currentImageFromCanvas)
        context.viewport(0, 0, context.canvas.width, context.canvas.height)
        var resolutionLocation = context.getUniformLocation(webGlProgram, "u_resolution")
        context.uniform2f(resolutionLocation, context.canvas.width, context.canvas.height)
    }

    this.bindUniformFloatToProgram = (name, value, program, context=this.context) => {
        const uniformLocation = context.getUniformLocation(program, name);
        context.uniform1f(uniformLocation, value);  
    }

    this.bindTextureToGlProgram = (texture, webGlProgram, context = this.context) => {
        const texcoordBuffer = context.createBuffer()
        context.bindBuffer(context.ARRAY_BUFFER, texcoordBuffer)
        context.bufferData(context.ARRAY_BUFFER, new Float32Array([
            0.0, 0.0,
            1.0, 0.0,
            0.0, 1.0,
            0.0, 1.0,
            1.0, 0.0,
            1.0, 1.0,
        ]), context.STATIC_DRAW)
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

    this.bindPositionVerticesToGlProgram = (positionVertices, webGlProgram, context = this.context) => {
        const positionBuffer = context.createBuffer()
        context.bindBuffer(context.ARRAY_BUFFER, positionBuffer)
        context.bufferData(context.ARRAY_BUFFER, positionVertices, context.STATIC_DRAW)
        const positionLocation = context.getAttribLocation(webGlProgram, 'a_position')
        context.vertexAttribPointer(positionLocation, 2, context.FLOAT, false, 0, 0)
        context.enableVertexAttribArray(positionLocation)
   
    }

    this.renderShaders = (context=this.context) => {
        this.clear(context)
        context.drawArrays(context.TRIANGLES, 0, 6)
    }

    this.copyGlCanvasToMainCanvas= ()=> {
        client.surface.draw(this.el)
    }

    function calculatePositionVertices(rect, currentImageFromCanvas) {
        let x1 = rect.x
        let x2 = rect.x + rect.w
        let y1 = rect.y
        let y2 = rect.y + rect.h
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
}
