<template>
 <div>
  <notifications position="bottom right"/>
  <router-view/>
 </div>
</template>

  <script>
  </script>
<style>
header{
  font-family: 'Poppins', sans-serif;
}
.my-notification {
  
  margin: 0 5px 5px;
  padding: 10px;
  font-size: 12px;
  color: #ffffff;

  background: #2d99ff;
  border-left: 5px solid #1171d1;

  
  &.success {
    background: #68cd86;
    border-left-color: #42a85f;
  }

  &.warn {
    background: #ffb648;
    border-left-color: #f48a06;
  }

  &.error {
    background: #e54d42;
    border-left-color: #b82e24;
  }
}
</style>
