<template>
      <div class="check_button" :class="{check: isChecked}"  :is-checked="itemInfo.checked">
        <img src="~/assets/img/cart/gou.jpg" alt="">
      </div>
</template>

<script>
	export default {
		name: "CheckButton",
    props: {
		  isChecked: {
		    type: Boolean,
        default(){
          return false
        }
      }
    },
    data() {
		  return {
		    
      }
    },
    methods: {
      
    }
	}
</script>

<style scoped>
  .check_button {
    background: red;
    border-radius: 50%;
    border:2px solid #aaa;
  }
  /* .check_button img{
    width:15px;
    height:15px;
  } */

  .check {
    background-color: red;
    border-color: red;
  }
</style>
