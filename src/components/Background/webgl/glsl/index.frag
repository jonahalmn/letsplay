precision mediump float;

uniform sampler2D u_texture;
uniform vec2 u_scale;
uniform float u_scaleModel;
uniform vec2 u_mouseN;
uniform float u_time;
uniform float u_imageOpacity;

varying vec2 v_position;

float frameLimit(vec2 position){
    return (1. - step(1., position.x)) * (1. - step(1., position.y)) * step(0., position.x) * step(0., position.y);
}

float frame(vec2 position, float size){
    return (1. - step(size, position.x)) * (1. - step(size, position.y)) * step(0., position.x) * step(0., position.y);
}

void main(){
    vec2 position = vec2(((v_position.x - u_mouseN.x) / u_scale.x), ((v_position.y - u_mouseN.y) / u_scale.y)) * vec2(10.);
    position.x += cos((position.y * 10.) + u_time / 10. ) / 70.;
    position = position /  u_scaleModel;

    vec4 texColor = texture2D(u_texture, position);
    texColor.rgb += cos((position.y * 10.) + u_time / 10. ) / 20.;
    texColor.a = frameLimit(position);
    texColor*=u_imageOpacity;

    gl_FragColor = texColor;
    //gl_FragColor.rgb -= frame(v_position - .15, .7);
    //gl_FragColor.a += frame(v_position - .15, .7);
}