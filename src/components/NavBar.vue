<script setup>
import {ref} from 'vue';

const isMenuVisible = ref(false);

const toggleMenu = () => {
  isMenuVisible.value = !isMenuVisible.value;
};
</script>

<template>
  <div class="flex flex-col min-h-screen w-auto max-w-max drop-shadow-4xl border-gray-500 bg-customBlue-900 break-words mr-4">
    <button @click="toggleMenu" class="self-end m-4 text-customYellow-500">
      <span v-if="isMenuVisible" class="font-bold text-2xl mx-auto">◀</span>
      <span v-else class="font-bold text-4xl">☰</span>
    </button>
    <transition
        name="menu-transition"
        enter-active-class="transition ease-out duration-500 transform"
        leave-active-class="transition ease-in duration-500 transform"
        enter-from-class="-translate-x-full opacity-0"
        enter-to-class="translate-x-0 opacity-100"
        leave-from-class="translate-x-0 opacity-100"
        leave-to-class="-translate-x-full opacity-0"
    >
      <header v-if="isMenuVisible" class="flex flex-col gap-8 ml-4 my-4 mt-5">
        <RouterLink to="/typeFaster/" class="flex justify-center w-full">
          <span class="relative font-mono text-customYellow-500 pr-6 text-xl font-extrabold text-center hover:text-yellow-300
           before:absolute before:left-0 before:bottom-0 before:h-1 before:w-full before:bg-yellow-300 before:transform
           before:scale-x-0 hover:before:scale-x-125 before:origin-left before:transition-transform before:duration-300">Accueil</span>
        </RouterLink>
        <RouterLink to="/typeFaster/leaderboard" class="flex justify-end w-full">
          <span class="relative font-mono text-customYellow-500 pr-6 text-xl font-extrabold text-center hover:text-yellow-300
           before:absolute before:left-0 before:bottom-0 before:h-1 before:w-full before:bg-yellow-300 before:transform
           before:scale-x-0 hover:before:scale-x-125 before:origin-left before:transition-transform before:duration-300">Classement</span>
        </RouterLink>
        <RouterLink to="/typeFaster/profil" class="flex justify-end w-full">
          <span class="relative font-mono text-customYellow-500 pr-6 text-xl font-extrabold text-center hover:text-yellow-300
           before:absolute before:left-0 before:bottom-0 before:h-1 before:w-full before:bg-yellow-300 before:transform
           before:scale-x-0 hover:before:scale-x-125 before:origin-left before:transition-transform before:duration-300">Profil</span>
        </RouterLink>
      </header>
    </transition>

    <div class="mt-auto mx-auto my-4 hover:scale-125 hover:duration-300">
      <a href="https://github.com/ArthurDesmonts">
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="currentColor" class="text-yellow-500">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.11.82-.26.82-.577
          0-.285-.01-1.04-.015-2.04-3.338.725-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.09-.745.083-.73.083-.73 1.205.085
           1.84 1.237 1.84 1.237 1.07 1.835 2.805 1.305 3.49.998.108-.775.418-1.305.76-1.605-2.665-.305-5.466-1.335-5.466-5.93
            0-1.31.47-2.38 1.235-3.22-.125-.305-.535-1.54.115-3.205 0 0 1.005-.322 3.3 1.23.955-.265 1.98-.398 3-.403
            1.02.005 2.045.138 3 .403 2.28-1.552 3.285-1.23 3.285-1.23.655 1.665.245 2.9.12 3.205.77.84 1.23 1.91
            1.23 3.22 0 4.61-2.805 5.62-5.475 5.92.43.37.81 1.1.81 2.22 0 1.605-.015 2.895-.015 3.285 0
            .32.215.695.825.575C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z"/>
        </svg>
      </a>
    </div>
  </div>
</template>