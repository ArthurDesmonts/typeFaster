<script setup>

</script>

<template>
  <div class="container bg-customBlue-900 flex justify-center rounded-2xl w-fit p-10 mx-auto mt-20">
    <div class="row">
      <div class="col-md-6 offset-md-3">
        <h1 class="text-center mb-1">Se connecter</h1>
        <form>
          <div class="flex flex-col gap-2">
            <div class="mb-3 mt-2">
              <input type="text" placeholder="Pseudo" class="form-control bg-customBlue-800 rounded font-bold text-center" id="name">
            </div>
            <div class="mb-3">
              <input type="password" placeholder="Mot de passe" class="form-control bg-customBlue-800 rounded font-bold text-center" id="password">
            </div>
            <button type="submit" class="btn btn-primary bg-customOrange-500 rounded text-customBlue-900 p-2">Connection</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
input::placeholder {
  text-align: center;
}
</style>