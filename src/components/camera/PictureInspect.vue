<template>
    <main class="w-full">
      <section class="h-full flex justify-center flex-col items-center">
        <!-- open camera -->
        <div @click="isToggleCamera" v-if="!isShowCamera && capturedImages.length < 3" class="flex flex-col justify-center items-center gap-y-3 cursor-pointer">
          <font-awesome-icon icon="fa-solid fa-camera" size="xl"/>
          <p class="text-[11px] font-bold">Tambahkan Foto - Maksimal 3 Foto</p>
        </div>
        <div v-if="loading" class="text-center text-black/40">
          <font-awesome-icon icon="fa-solid fa-spinner" class="animate-spin" size="2x"/>
        </div>
        <!-- camera -->
        <div class="relative" v-if="isShowCamera">
          <video autoplay ref="camera" class="rounded"/>
          <button v-if="close" @click="closeCamera" class="absolute -top-1 left-0 text-black/40">
            <font-awesome-icon icon="fa-solid fa-rectangle-xmark" size="2x"/>
          </button>
          <div @click="takePhoto" class="absolute -bottom-12 -right-10 w-20 h-20 cursor-pointer">
            <button>
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" id="camera">
                <g fill="#fff"><path
                    d="M16 12a6 6 0 1 0 0 12 6 6 0 0 0 0-12zm0 11a5 5 0 1 1 .001-10.001A5 5 0 0 1 16 23zM28 9a2 2 0 1 0-.001 3.999A2 2 0 0 0 28 9zm0 3a1 1 0 1 1 0-2 1 1 0 0 1 0 2z">
                  </path><path
                    d="M16 9a9 9 0 0 0-9 9c0 4.971 4.029 9 9 9s9-4.029 9-9a9 9 0 0 0-9-9zm0 17a8 8 0 1 1 0-16 8 8 0 0 1 0 16z">
                  </path><path
                    d="M30 7h-7V5a2 2 0 0 0-2-2H11a2 2 0 0 0-2 2v2H2a2 2 0 0 0-2 2v18a2 2 0 0 0 2 2h28a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zm1 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2h7V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2h7a2 2 0 0 1 2 2v16z">
                  </path></g>
              </svg>
            </button>
          </div>
        </div>
      </section>
      <section>
        <div class="flex flex-row justify-center gap-x-2 mt-2">
            <div v-for="(image, index) in capturedImages" :key="index" class="relative">
                <img  :src="image" alt="Captured Image" class="border-2 border-black/50 rounded border-dashed overflow-hidden">
                <button @click="()=>capturedImages.splice(0,1)" class="absolute -top-1 -left-1 hover:text-red-500">
                    <font-awesome-icon icon="fa solid fa-circle-xmark"/>
                </button>
            </div>
        </div>
      </section>
    </main>
  </template>
  
  <script setup>
  import { ref } from 'vue';

  const emits = defineEmits(['save']) 
  
  const camera = ref(null);
  const isShowCamera = ref(false);
  const loading = ref(false);
  const close = ref(false);
  const capturedImages = ref([]);
  
  const isToggleCamera = () => {
    if (isShowCamera.value) {
      isShowCamera.value = false;
    } else {
      isShowCamera.value = true;
      isCameraOpen();
    }
  };
  
  const isCameraOpen = () => {
    const constraint = {
      video: true,
      audio: false
    };
    loading.value = true;
    navigator.mediaDevices
    .getUserMedia(constraint)
    .then((stream) => {
        camera.value.srcObject = stream;
        close.value = true;
      })
      .catch((err) => console.log(err))
      .finally(() => loading.value = false);
  };
  
  const closeCamera = () => {
    let tracks = camera.value.srcObject.getTracks();
    tracks.forEach((track) => {
      track.stop();
    });
    isShowCamera.value = false;
    close.value = false;
  };
  
  const takePhoto = async () => {
    if (capturedImages.value.length < 3) {
      const canvas = document.createElement('canvas');
      canvas.width = 100;
      canvas.height = 100;
  
      const context = canvas.getContext('2d');
      context.drawImage(camera.value, 0, 0, canvas.width, canvas.height);
      const imageData = canvas.toDataURL('image/png')
      capturedImages.value.push(imageData)
      isShowCamera.value = false;
      emits('save',imageData)
      closeCamera();
    }
  };
  </script>

  