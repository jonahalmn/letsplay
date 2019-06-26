precision highp float;

uniform sampler2D u_texture;
uniform vec2 u_scale;
uniform float u_scaleModel;
uniform vec2 u_mouseN;
uniform float u_time;
uniform float u_imageOpacity;

uniform float u_transition;
uniform float u_transitionOpacity;

varying vec2 v_position;

float frameLimit(vec2 position){
    return (1. - step(1., position.x)) * (1. - step(1., position.y)) * step(0., position.x) * step(0., position.y);
}

float frame(vec2 position, float size, float thin){
    float rect = (1. - step(size, position.x)) * (1. - step(size, position.y)) * step(0., position.x) * step(0., position.y);
    float littleRect = (1. - step(size, position.x + thin)) * (1. - step(size, position.y + thin)) * step(0., position.x - thin) * step(0., position.y - thin);
    return rect * (1. - littleRect);
}

vec4 transition(vec2 pos, float completion){
    vec4 color = vec4(0.);
    color.rgb -= frame(pos - .15, .7, .02);
    color.a += frame(pos - .15, .7, .02);

        for(float i=1.;i<4.;i++){
        vec4 colorTmp = vec4(0.);
        float tmpI = i * u_transition;
        colorTmp.rgb -= (frame(pos - (1. - (.7 -tmpI * .1))/2., .7 -tmpI * .1, .02 -tmpI*.003) -tmpI*.09);
        colorTmp.a += frame(pos - (1. - (.7 -tmpI * .1))/2., .7 -tmpI * .1, .02 -tmpI*.003);
        color+=colorTmp
    }

    return color * u_transitionOpacity;
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

    vec2 framePosition = v_position + cos((v_position.x * 20.) + u_time / 10. ) / 400. + cos((v_position.y * 20.) + u_time / 10. ) / 400.;

    gl_FragColor += transition(framePosition, 1.);
}