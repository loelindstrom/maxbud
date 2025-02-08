<template>
  <v-bottom-navigation
    :elevation="12"
    grow
  >
    <v-btn
      value="home"
      to="/home"
    >
      <v-icon>mdi-home</v-icon>
      <span>Hem</span>
    </v-btn>

    <v-btn
      value="summary"
      to="/summary"
    >
      <v-icon>mdi-chart-gantt</v-icon>
      <span>Summering</span>
    </v-btn>

    <v-btn
      value="analysis"
      to="/analysis"
    >
      <v-icon>mdi-chart-line</v-icon>
      <span>Analys</span>
    </v-btn>
  </v-bottom-navigation>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
a
{
  text-decoration: none;
  color: inherit;
}
</style>
