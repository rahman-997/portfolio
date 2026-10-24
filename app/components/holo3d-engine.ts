/** AH Portfolio V2: GPU WebGL2 3D point-cloud sculpture. No third-party packages. */
export type HoloMode = "neural" | "systems" | "signal";
export type HoloController = {
  setMode: (mode: HoloMode) => void;
  setPaused: (paused: boolean) => void;
  pulse: () => void;
  resetView: () => void;
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
" p.y+=.14; float depth=uZoom-p.z; float perspective=3.0/depth;",
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
export function createHolo3D(canvas:HTMLCanvasElement):HoloController{
  const context=canvas.getContext("webgl2",{alpha:true,antialias:true,powerPreference:"low-power"});
  if(!context){
    const context2d=canvas.getContext("2d");
    if(context2d){
      canvas.width=Math.max(1,canvas.clientWidth);canvas.height=Math.max(1,canvas.clientHeight);
      context2d.strokeStyle="#44d7ff";context2d.lineWidth=2;
      context2d.beginPath();context2d.ellipse(canvas.width/2,canvas.height*.37,canvas.width*.15,canvas.height*.20,0,0,Math.PI*2);
      context2d.moveTo(canvas.width*.26,canvas.height*.88);
      context2d.quadraticCurveTo(canvas.width*.5,canvas.height*.51,canvas.width*.74,canvas.height*.88);
      context2d.stroke();
    }
    return {setMode(){},setPaused(){},pulse(){},resetView(){},destroy(){}};
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
  let yaw=-.17,pitch=.05,zoom=4.15,mode:HoloMode="neural",paused=false,visible=true,disposed=false,raf=0,elapsed=0,pulseAt=0,dragging=false,px=0,py=0,lastTime=performance.now();
  function render(now:number){
    if(disposed)return;
    if(!paused&&visible){elapsed+=Math.min(.05,(now-lastTime)/1000);yaw+=.00011*Math.min(50,now-lastTime);}
    lastTime=now;
    const ratio=Math.min(devicePixelRatio||1,1.75);
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
  function wake(){if(disposed)return;if(!raf){lastTime=performance.now();raf=requestAnimationFrame(render);}}
  function down(e:PointerEvent){dragging=true;px=e.clientX;py=e.clientY;canvas.setPointerCapture(e.pointerId);}
  function move(e:PointerEvent){if(!dragging)return;yaw+=(e.clientX-px)*.009;pitch=clamp(pitch+(e.clientY-py)*.006,-.55,.55);px=e.clientX;py=e.clientY;wake();}
  function up(){dragging=false;}
  function wheel(e:WheelEvent){e.preventDefault();zoom=clamp(zoom+e.deltaY*.0035,3.3,6.5);wake();}
  function keys(e:KeyboardEvent){if(!["ArrowLeft","ArrowRight","ArrowUp","ArrowDown","Home"].includes(e.key))return;e.preventDefault();
    if(e.key==="Home"){yaw=-.17;pitch=.05;zoom=4.15;}
    else if(e.key==="ArrowLeft")yaw-=.12;else if(e.key==="ArrowRight")yaw+=.12;
    else if(e.key==="ArrowUp")pitch=clamp(pitch-.1,-.55,.55);else pitch=clamp(pitch+.1,-.55,.55);
    wake();
  }
  function docVisibility(){visible=document.visibilityState==="visible";if(visible)wake();}
  canvas.addEventListener("pointerdown",down);canvas.addEventListener("pointermove",move);canvas.addEventListener("pointerup",up);
  canvas.addEventListener("pointercancel",up);canvas.addEventListener("wheel",wheel,{passive:false});canvas.addEventListener("keydown",keys);
  document.addEventListener("visibilitychange",docVisibility);
  const intersection=new IntersectionObserver(([e])=>{visible=e.isIntersecting&&document.visibilityState==="visible";if(visible)wake();},{threshold:.02});
  intersection.observe(canvas);
  const resize=new ResizeObserver(wake);resize.observe(canvas);wake();
  return {
    setMode(next){mode=next;wake();},setPaused(next){paused=next;wake();},pulse(){pulseAt=performance.now();wake();},
    resetView(){yaw=-.17;pitch=.05;zoom=4.15;wake();},
    destroy(){disposed=true;cancelAnimationFrame(raf);intersection.disconnect();resize.disconnect();canvas.removeEventListener("pointerdown",down);canvas.removeEventListener("pointermove",move);canvas.removeEventListener("pointerup",up);canvas.removeEventListener("pointercancel",up);canvas.removeEventListener("wheel",wheel);canvas.removeEventListener("keydown",keys);document.removeEventListener("visibilitychange",docVisibility);gl.deleteBuffer(buffer);gl.deleteVertexArray(vao);gl.deleteProgram(program);}
  };
}
