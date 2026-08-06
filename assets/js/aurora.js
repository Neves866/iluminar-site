
import {
    Renderer,
    Program,
    Mesh,
    Color,
    Triangle
} from "https://cdn.jsdelivr.net/npm/ogl@1.0.11/+esm";

const container = document.querySelector(".aurora-background");
const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;

if (container && !reducedMotion) {
    try {
        /*
         * CORES DO AURORA
         *
         * Troque estes três valores pelas cores
         * exatas que você escolheu no React Bits.
         */
        const colorStops = [
            "#0d007c",
            "#5227FF",
            "#ffc203"
        ];

        const amplitude = 1.15;
        const blend = 0.55;
        const speed = 1;

        const vertexShader = `#version 300 es
        in vec2 position;

        void main() {
          gl_Position = vec4(position, 0.0, 1.0);
        }
      `;

        const fragmentShader = `#version 300 es
        precision highp float;

        uniform float uTime;
        uniform float uAmplitude;
        uniform vec3 uColorStops[3];
        uniform vec2 uResolution;
        uniform float uBlend;

        out vec4 fragColor;

        vec3 permute(vec3 x) {
          return mod(((x * 34.0) + 1.0) * x, 289.0);
        }

        float snoise(vec2 v) {
          const vec4 C = vec4(
            0.211324865405187,
            0.366025403784439,
            -0.577350269189626,
            0.024390243902439
          );

          vec2 i = floor(v + dot(v, C.yy));
          vec2 x0 = v - i + dot(i, C.xx);

          vec2 i1 =
            x0.x > x0.y
              ? vec2(1.0, 0.0)
              : vec2(0.0, 1.0);

          vec4 x12 = x0.xyxy + C.xxzz;
          x12.xy -= i1;

          i = mod(i, 289.0);

          vec3 p = permute(
            permute(
              i.y + vec3(0.0, i1.y, 1.0)
            ) +
            i.x + vec3(0.0, i1.x, 1.0)
          );

          vec3 m = max(
            0.5 - vec3(
              dot(x0, x0),
              dot(x12.xy, x12.xy),
              dot(x12.zw, x12.zw)
            ),
            0.0
          );

          m = m * m;
          m = m * m;

          vec3 x = 2.0 * fract(p * C.www) - 1.0;
          vec3 h = abs(x) - 0.5;
          vec3 ox = floor(x + 0.5);
          vec3 a0 = x - ox;

          m *= 1.79284291400159 -
            0.85373472095314 *
            (a0 * a0 + h * h);

          vec3 g;

          g.x =
            a0.x * x0.x +
            h.x * x0.y;

          g.yz =
            a0.yz * x12.xz +
            h.yz * x12.yw;

          return 130.0 * dot(m, g);
        }

        void main() {
          vec2 uv = gl_FragCoord.xy / uResolution;

          vec3 rampColor;

          if (uv.x < 0.5) {
            rampColor = mix(
              uColorStops[0],
              uColorStops[1],
              uv.x / 0.5
            );
          } else {
            rampColor = mix(
              uColorStops[1],
              uColorStops[2],
              (uv.x - 0.5) / 0.5
            );
          }

          float height = snoise(
            vec2(
              uv.x * 2.0 + uTime * 0.1,
              uTime * 0.25
            )
          ) * 0.5 * uAmplitude;

          height = exp(height);
          height = uv.y * 2.0 - height + 0.2;

          float intensity = 0.6 * height;
          float midpoint = 0.20;

          float auroraAlpha = smoothstep(
            midpoint - uBlend * 0.5,
            midpoint + uBlend * 0.5,
            intensity
          );

          vec3 auroraColor =
            intensity * rampColor;

          fragColor = vec4(
            auroraColor * auroraAlpha,
            auroraAlpha
          );
        }
      `;

        const mobileDevice = window.innerWidth <= 700;

        const renderer = new Renderer({
            alpha: true,
            premultipliedAlpha: true,
            antialias: !mobileDevice,
            dpr: Math.min(
                window.devicePixelRatio || 1,
                mobileDevice ? 1 : 1.35
            )
        });

        const gl = renderer.gl;

        gl.clearColor(0, 0, 0, 0);
        gl.enable(gl.BLEND);
        gl.blendFunc(
            gl.ONE,
            gl.ONE_MINUS_SRC_ALPHA
        );

        const geometry = new Triangle(gl);

        if (geometry.attributes.uv) {
            delete geometry.attributes.uv;
        }

        const convertedColors = colorStops.map((hex) => {
            const color = new Color(hex);

            return [
                color.r,
                color.g,
                color.b
            ];
        });

        const program = new Program(gl, {
            vertex: vertexShader,
            fragment: fragmentShader,

            uniforms: {
                uTime: {
                    value: 0
                },

                uAmplitude: {
                    value: amplitude
                },

                uColorStops: {
                    value: convertedColors
                },

                uResolution: {
                    value: [1, 1]
                },

                uBlend: {
                    value: blend
                }
            }
        });

        const mesh = new Mesh(gl, {
            geometry,
            program
        });

        container.appendChild(gl.canvas);

        gl.canvas.style.width = "100%";
        gl.canvas.style.height = "100%";
        gl.canvas.style.display = "block";

        function resizeAurora() {
            const width = Math.max(
                container.clientWidth,
                1
            );

            const height = Math.max(
                container.clientHeight,
                1
            );

            renderer.setSize(width, height);

            program.uniforms.uResolution.value = [
                gl.canvas.width,
                gl.canvas.height
            ];
        }

        const resizeObserver = new ResizeObserver(
            resizeAurora
        );

        resizeObserver.observe(container);
        resizeAurora();

        let animationFrame = null;
        let auroraVisible = true;

        function animate(time) {
            if (!auroraVisible) {
                animationFrame = null;
                return;
            }

            program.uniforms.uTime.value =
                time * 0.001 * speed;

            renderer.render({
                scene: mesh
            });

            animationFrame =
                requestAnimationFrame(animate);
        }

        function startAurora() {
            if (animationFrame === null) {
                animationFrame =
                    requestAnimationFrame(animate);
            }
        }

        function stopAurora() {
            if (animationFrame !== null) {
                cancelAnimationFrame(animationFrame);
                animationFrame = null;
            }
        }

        const visibilityObserver =
            new IntersectionObserver(
                ([entry]) => {
                    auroraVisible =
                        entry.isIntersecting &&
                        !document.hidden;

                    if (auroraVisible) {
                        startAurora();
                    } else {
                        stopAurora();
                    }
                },
                {
                    threshold: 0.01
                }
            );

        visibilityObserver.observe(container);

        document.addEventListener(
            "visibilitychange",
            () => {
                auroraVisible =
                    !document.hidden &&
                    container.getBoundingClientRect().bottom > 0;

                if (auroraVisible) {
                    startAurora();
                } else {
                    stopAurora();
                }
            }
        );

        startAurora();
    } catch (error) {
        console.error(
            "Não foi possível iniciar o Aurora:",
            error
        );
    }
}
