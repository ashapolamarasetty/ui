<script setup lang="ts"></script>

<template>
  <section class="video-section">
    <div class="container">
      <div class="video-wrapper">
        <video class="video" playsinline muted autoplay loop>
          <source src="https://media.factory.ai/demo.mp4" type="video/mp4" />
        </video>
      </div>
    </div>
  </section>
</template>

<style scoped>
.video-section {
  padding: 96px 0;
}

.video-wrapper {
  position: relative;
  overflow: hidden;
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  aspect-ratio: 16 / 9;
  background: #000;
}

.video {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
