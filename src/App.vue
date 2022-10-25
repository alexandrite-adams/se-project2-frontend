<template>

  <v-app>
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <router-link to="/" class="navbar-brand">T2</router-link>
      <div class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link to="/courses" class="nav-link">Courses</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/add" class="nav-link">Add</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/calendar" class="nav-link">Calendar</router-link>
        </li>
      </div>
    </nav>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>
<script>
export default {
  name: "app"
};
</script>