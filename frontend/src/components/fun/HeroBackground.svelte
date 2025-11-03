<script lang="ts">
  import { onMount } from "svelte";

  let canvas: HTMLCanvasElement;

  const fontSize = 18;
  const spacingX = 4;
  const spacingY = 2;
  const fadeStart = 0.6;
  const fadeEnd = 1.0;

  function drawMatrix() {
    const ctx = canvas.getContext("2d")!;
    const w = (canvas.width = window.innerWidth);
    const h = (canvas.height = window.innerHeight);

    ctx.clearRect(0, 0, w, h);
    ctx.font = `${fontSize}px monospace`;
    ctx.textBaseline = "top";

    const cw = ctx.measureText("0").width;
    const ch = fontSize * 1.1;
    const cols = Math.ceil(w / (cw + spacingX));
    const rows = Math.ceil(h / (ch + spacingY));
    const offX = (w - cols * (cw + spacingX)) / 2;
    const offY = (h - rows * (ch + spacingY)) / 2;

    for (let y = 0; y < rows; y++) {
      const posY = offY + y * (ch + spacingY);
      const t = posY / h;
      const alpha = t > fadeStart ? Math.max(1 - (t - fadeStart) / (fadeEnd - fadeStart), 0) : 1;

      ctx.fillStyle = `rgba(0,133,255,${alpha})`;
      for (let x = 0; x < cols; x++) {
        ctx.fillText(Math.random() > 0.5 ? "1" : "0", offX + x * (cw + spacingX), posY);
      }
    }
  }

  onMount(() => {
    drawMatrix();
    window.addEventListener("resize", drawMatrix);
    return () => window.removeEventListener("resize", drawMatrix);
  });
</script>

<canvas
  bind:this={canvas}
  class="absolute inset-0 z-[-1] w-screen h-screen block pointer-events-none opacity-10"
></canvas>
