/** AH Portfolio V2: GPU WebGL2 3D point-cloud sculpture. No third-party packages. */
export type HoloMode = "neural" | "systems" | "signal";
export type HoloController = {
  kind: "webgl2" | "static";
  setMode: (mode: HoloMode) => void;
  setPaused: (paused: boolean) => void;
  pulse: () => void;
  resetView: () => void;
  zoomIn: () => void;
  zoomOut: () => void;
  destroy: () => void;
};
const vertex = [
"#version 300 es",
"precision highp float;",
"in vec3 aPos; in float aSeed;",
"uniform float uTime,uYaw,uPitch,uZoom,uMode,uPulse,uAspect,uScale;",
"out float vHeat,vAlpha;",
"void main(){",
" vec3 p=aPos; float wave=sin(uTime*2.0+aSeed*18.0+p.y*6.0);",
" float motion=uMode>1.5?.040:uMode>.5?.023:.010;",
" p+=vec3(wave,cos(uTime+aSeed*8.),sin(uTime*1.2+aSeed*11.))*motion;",
" float cy=cos(uYaw),sy=sin(uYaw),cp=cos(uPitch),sp=sin(uPitch);",
" p=vec3(cy*p.x+sy*p.z,p.y,-sy*p.x+cy*p.z);",
" p=vec3(p.x,cp*p.y-sp*p.z,sp*p.y+cp*p.z);",
" p.y+=.14; float depth=uZoom-p.z; float perspective=2.08/depth;",
" gl_Position=vec4(p.x*perspective/uAspect,p.y*perspective,(depth-2.0)/8.0,1.0);",
" gl_PointSize=clamp(uScale*perspective*(.7+aSeed*.58)*(1.0+uPulse*.5),1.,8.5);",
" vHeat=clamp((aPos.x+.45)*.8+aSeed*.24+(uMode>1.5?wave*.18:0.),0.,1.);",
" vAlpha=clamp(.48+aSeed*.52+uPulse*.25,0.,1.);",
"}"
].join("\n");
const fragment = [
"#version 300 es",
"precision highp float;",
"in float vHeat,vAlpha; uniform float uMode; out vec4 color;",
"void main(){",
" float d=length(gl_PointCoord-vec2(.5));",
" float a=(1.0-smoothstep(.12,.50,d))*vAlpha;",
" vec3 blue=vec3(.10,.36,.92),ice=vec3(.12,.77,1.0),amber=vec3(1.,.57,.22);",
" vec3 cold=mix(blue,ice,.76);",
" vec3 c=mix(cold,amber,smoothstep(.45,.88,vHeat));",
" if(uMode>.5&&uMode<1.5)c=mix(cold,vec3(.53,1.,.86),smoothstep(.45,.88,vHeat));",
" if(uMode>1.5)c=mix(blue,vec3(1.,.67,.34),smoothstep(.18,.80,vHeat));",
" color=vec4(c*a,a);",
"}"
].join("\n");
function random(seed: number) {
  let n=seed>>>0;
  return () => { n=(Math.imul(n,1664525)+1013904223)>>>0;return n/4294967296; };
}
/** Actual XYZ geometry for a head, neck, torso and floating 3D scan rings. */
export function makeBust(seed=5417): Float32Array {
  const rnd=random(seed),data: number[]=[];
  const put=(x:number,y:number,z:number)=>data.push(x,y,z,rnd());
  for(let i=0;i<7200;i++){
    const a=rnd()*Math.PI*2,v=Math.acos(1-2*rnd()),h=Math.cos(v);
    put(.53*Math.sin(v)*Math.cos(a)*(h<-.3?.9:1),.88+.72*h,.47*Math.sin(v)*Math.sin(a)*(h<-.45?.82:1));
  }
  for(let i=0;i<1500;i++){
    const a=rnd()*Math.PI*2,y=-.42+rnd()*.8;
    put(Math.cos(a)*.255,y,Math.sin(a)*.245);
  }
  for(let i=0;i<10800;i++){
    const x=(rnd()*2-1)*1.45,ax=Math.abs(x);
    const shoulder=-.35-.48*Math.pow(Math.max(0,(ax-.17)/1.28),1.05);
    const y=(-1.64+.05*ax)+rnd()*(shoulder-(-1.64+.05*ax));
    const front=Math.sqrt(Math.max(0,1-(ax/1.53)**2))*(.27+.12*Math.max(0,1-Math.abs(y+.6)));
    put(x,y,Math.cos(rnd()*Math.PI)*front);
  }
  for(let i=0;i<2200;i++){
    const a=rnd()*Math.PI*2,l=Math.floor(rnd()*8),y=-1.51+l*.40+Math.sin(a*3)*.018,r=y>.2?.7:1.35;
    put(Math.cos(a)*r,y,Math.sin(a)*r*.53);
  }
  return new Float32Array(data);
}
function compile(gl:WebGL2RenderingContext,type:number,src:string){
  const s=gl.createShader(type);if(!s)throw Error("Shader unavailable");
  gl.shaderSource(s,src);gl.compileShader(s);
  if(!gl.getShaderParameter(s,gl.COMPILE_STATUS))throw Error(gl.getShaderInfoLog(s)||"Shader failed");
  return s;
}
const clamp=(n:number,a:number,b:number)=>Math.max(a,Math.min(b,n));
export function createHolo3D(canvas:HTMLCanvasElement, options:{forceStatic?:boolean;onContextLost?:()=>void}={}):HoloController{
  // A WebGL canvas cannot acquire a 2D context after a GPU loss. The React
  // component replaces it with a fresh canvas and requests a 2D-only renderer.
  const context=options.forceStatic?null:canvas.getContext("webgl2",{alpha:true,antialias:true,powerPreference:"low-power"});
  if(!context){
    const ctx=canvas.getContext("2d");
    if(ctx){
      // Cache geometry once; repaint only if the actual CSS size or DPR changes.
      // Unlike the WebGL renderer, 2D mode does not run a perpetual frame loop.
      const vertices=makeBust();
      const yaw=-.17,cy=Math.cos(yaw),sy=Math.sin(yaw);
      let disposed=false;
      let lastRatio=0;
      function paint(){
        if(disposed)return;
        const ratio=Math.min(window.devicePixelRatio||1,1.4);
        const width=Math.max(1,Math.round(canvas.clientWidth*ratio));
        const height=Math.max(1,Math.round(canvas.clientHeight*ratio));
        if(canvas.width===width&&canvas.height===height&&lastRatio===ratio)return;
        canvas.width=width;canvas.height=height;
        lastRatio=ratio;
        for(let i=0;i<vertices.length;i+=12){
          const x=vertices[i],y=vertices[i+1],z=vertices[i+2];
          const rx=cy*x+sy*z,rz=-sy*x+cy*z;
          const factor=2.08/(4.15-rz);
          const px=width/2+rx*factor*height/2;
          const py=height/2-(y+.14)*factor*height/2;
          ctx!.fillStyle=x>0?"rgba(255,161,92,.7)":"rgba(63,214,255,.75)";
          ctx!.fillRect(px,py,Math.max(1,ratio),Math.max(1,ratio));
        }
      }
      const resize=new ResizeObserver(paint);
      resize.observe(canvas);
      paint();
      return {
        kind:"static",setMode(){},setPaused(){},pulse(){},resetView(){},zoomIn(){},zoomOut(){},
        destroy(){disposed=true;resize.disconnect();}
      };
    }
    return {kind:"static",setMode(){},setPaused(){},pulse(){},resetView(){},zoomIn(){},zoomOut(){},destroy(){}};
  }
  const gl=context;
  const vs=compile(gl,gl.VERTEX_SHADER,vertex),fs=compile(gl,gl.FRAGMENT_SHADER,fragment);
  const program=gl.createProgram();if(!program)throw Error("WebGL program unavailable");
  gl.attachShader(program,vs);gl.attachShader(program,fs);gl.linkProgram(program);
  if(!gl.getProgramParameter(program,gl.LINK_STATUS))throw Error(gl.getProgramInfoLog(program)||"Link failed");
  gl.deleteShader(vs);gl.deleteShader(fs);
  const points=makeBust(),count=points.length/4,vao=gl.createVertexArray(),buffer=gl.createBuffer();
  if(!vao||!buffer)throw Error("GPU buffer unavailable");
  gl.bindVertexArray(vao);gl.bindBuffer(gl.ARRAY_BUFFER,buffer);
  gl.bufferData(gl.ARRAY_BUFFER,points,gl.STATIC_DRAW);
  const pos=gl.getAttribLocation(program,"aPos"),seed=gl.getAttribLocation(program,"aSeed");
  gl.enableVertexAttribArray(pos);gl.vertexAttribPointer(pos,3,gl.FLOAT,false,16,0);
  gl.enableVertexAttribArray(seed);gl.vertexAttribPointer(seed,1,gl.FLOAT,false,16,12);
  gl.bindVertexArray(null);
  const uni=(name:string)=>gl.getUniformLocation(program,name);
  const loc={time:uni("uTime"),yaw:uni("uYaw"),pitch:uni("uPitch"),zoom:uni("uZoom"),mode:uni("uMode"),pulse:uni("uPulse"),aspect:uni("uAspect"),scale:uni("uScale")};
  const coarse=window.matchMedia("(pointer: coarse)").matches;
  const minFrameTime=1000/(coarse?30:60);
  let yaw=-.17,pitch=.05,zoom=4.15,mode:HoloMode="neural",paused=false,visible=true,disposed=false,contextLost=false,raf=0,elapsed=0,pulseAt=0,dragging=false,px=0,py=0,lastTime=performance.now(),lastDraw=0;
  function render(now:number){
    raf=0;
    if(disposed||contextLost||!visible||document.visibilityState==="hidden")return;
    // Cap mobile GPU work at 30 FPS and a smaller raster without changing geometry.
    if(now-lastDraw<minFrameTime){raf=requestAnimationFrame(render);return;}
    if(!paused){elapsed+=Math.min(.05,(now-lastTime)/1000);yaw+=.00011*Math.min(50,now-lastTime);}
    lastTime=now;lastDraw=now;
    const ratio=Math.min(window.devicePixelRatio||1,coarse?1.4:1.75);
    const w=Math.max(1,Math.min(1800,Math.round(canvas.clientWidth*ratio))),h=Math.max(1,Math.min(1600,Math.round(canvas.clientHeight*ratio)));
    if(w!==canvas.width||h!==canvas.height){canvas.width=w;canvas.height=h;gl.viewport(0,0,w,h);}
    gl.clearColor(0,0,0,0);gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
    gl.enable(gl.DEPTH_TEST);gl.enable(gl.BLEND);gl.blendFunc(gl.ONE,gl.ONE_MINUS_SRC_ALPHA);
    gl.useProgram(program);gl.bindVertexArray(vao);
    gl.uniform1f(loc.time,elapsed);gl.uniform1f(loc.yaw,yaw);gl.uniform1f(loc.pitch,pitch);gl.uniform1f(loc.zoom,zoom);
    gl.uniform1f(loc.mode,mode==="neural"?0:mode==="systems"?1:2);
    gl.uniform1f(loc.pulse,Math.max(0,1-(now-pulseAt)/950));
    gl.uniform1f(loc.aspect,w/h);gl.uniform1f(loc.scale,Math.max(1.2,2.8*ratio));
    gl.drawArrays(gl.POINTS,0,count);gl.bindVertexArray(null);
    if((!paused&&visible)||now-pulseAt<950)raf=requestAnimationFrame(render);else raf=0;
  }
  function wake(){if(disposed||contextLost||!visible||document.visibilityState==="hidden")return;if(!raf){lastTime=performance.now();raf=requestAnimationFrame(render);}}
  // Track real touch pointers, not browser zoom. One finger can still pan the
  // document vertically (CSS touch-action:pan-y); two fingers adjust the 3D
  // camera only. Pointer cancellation resets every affected gesture cleanly.
  const touches=new Map<number,{x:number;y:number}>();
  let pinchDistance:number|null=null;
  function currentPinchDistance(){
    if(touches.size<2)return null;
    const [a,b]=Array.from(touches.values());
    return Math.hypot(a.x-b.x,a.y-b.y);
  }
  function down(e:PointerEvent){
    if(e.pointerType==="touch"){
      touches.set(e.pointerId,{x:e.clientX,y:e.clientY});
      if(touches.size>=2){
        dragging=false;
        pinchDistance=currentPinchDistance();
      }else{
        dragging=true;px=e.clientX;py=e.clientY;
      }
    }else{
      dragging=true;px=e.clientX;py=e.clientY;
    }
    canvas.setPointerCapture(e.pointerId);
  }
  function move(e:PointerEvent){
    if(e.pointerType==="touch"){
      if(!touches.has(e.pointerId))return;
      touches.set(e.pointerId,{x:e.clientX,y:e.clientY});
      if(touches.size>=2){
        const next=currentPinchDistance();
        if(pinchDistance!==null&&next!==null)adjustZoom((pinchDistance-next)*.012);
        pinchDistance=next;
        return;
      }
    }
    if(!dragging)return;
    yaw+=(e.clientX-px)*.009;
    pitch=clamp(pitch+(e.clientY-py)*.006,-.55,.55);
    px=e.clientX;py=e.clientY;wake();
  }
  function up(e:PointerEvent){
    if(e.pointerType!=="touch"){dragging=false;return;}
    touches.delete(e.pointerId);
    pinchDistance=null;
    if(touches.size===1){
      const remaining=touches.values().next().value;
      dragging=true;px=remaining!.x;py=remaining!.y;
    }else dragging=false;
  }
  function adjustZoom(delta:number){zoom=clamp(zoom+delta,3.3,6.5);wake();}
  // Keep normal document scrolling available while the cursor is above the artwork.
  // Alt+Wheel is an explicit camera gesture; the on-screen buttons serve touch users.
  function wheel(e:WheelEvent){if(!e.altKey)return;e.preventDefault();adjustZoom(e.deltaY*.0035);}
  function keys(e:KeyboardEvent){
    if(!["ArrowLeft","ArrowRight","ArrowUp","ArrowDown","Home","+","=","-","_"].includes(e.key))return;
    e.preventDefault();
    if(e.key==="Home"){yaw=-.17;pitch=.05;zoom=4.15;}
    else if(e.key==="+"||e.key==="="){adjustZoom(-.28);return;}
    else if(e.key==="-"||e.key==="_"){adjustZoom(.28);return;}
    else if(e.key==="ArrowLeft")yaw-=.12;else if(e.key==="ArrowRight")yaw+=.12;
    else if(e.key==="ArrowUp")pitch=clamp(pitch-.1,-.55,.55);else pitch=clamp(pitch+.1,-.55,.55);
    wake();
  }
  function webglLost(event:Event){
    // Avoid repeated recovery requests; stop drawing into an invalid context.
    event.preventDefault();
    if(disposed||contextLost)return;
    contextLost=true;
    cancelAnimationFrame(raf);raf=0;
    options.onContextLost?.();
  }
  function docVisibility(){if(document.visibilityState==="visible")wake();}
  canvas.addEventListener("pointerdown",down);canvas.addEventListener("pointermove",move);canvas.addEventListener("pointerup",up);
  canvas.addEventListener("pointercancel",up);canvas.addEventListener("wheel",wheel,{passive:false});canvas.addEventListener("keydown",keys);
  document.addEventListener("visibilitychange",docVisibility);
  canvas.addEventListener("webglcontextlost",webglLost);
  const intersection=new IntersectionObserver(([e])=>{visible=e.isIntersecting;if(visible)wake();},{threshold:.02});
  intersection.observe(canvas);
  const resize=new ResizeObserver(wake);resize.observe(canvas);wake();
  return {
    kind:"webgl2",
    setMode(next){mode=next;wake();},setPaused(next){paused=next;wake();},pulse(){pulseAt=performance.now();wake();},
    resetView(){yaw=-.17;pitch=.05;zoom=4.15;wake();},
    zoomIn(){adjustZoom(-.28);},zoomOut(){adjustZoom(.28);},
    destroy(){disposed=true;touches.clear();cancelAnimationFrame(raf);intersection.disconnect();resize.disconnect();canvas.removeEventListener("pointerdown",down);canvas.removeEventListener("pointermove",move);canvas.removeEventListener("pointerup",up);canvas.removeEventListener("pointercancel",up);canvas.removeEventListener("wheel",wheel);canvas.removeEventListener("keydown",keys);canvas.removeEventListener("webglcontextlost",webglLost);document.removeEventListener("visibilitychange",docVisibility);gl.deleteBuffer(buffer);gl.deleteVertexArray(vao);gl.deleteProgram(program);}
  };
}
