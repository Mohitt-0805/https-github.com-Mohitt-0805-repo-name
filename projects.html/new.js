function validateAge(){
    let age  = document.getElementById("age").value ;
    if (age>18){
        console.log("age is valid");
        return true;
    }
    else{
        console.log("age is not valid");
        return false;
    }
}
document.getElementById("register").addEventListener("click",function(event){
    validateAge();
}
)
function validateName(){
    const nameInput=document.getElementById("name");

}

  function validateAge(){
    let age = document.getElementById("age").value;
    if (age > 18) {
        console.log("Age is valid");
        return true;
    }
    else{
        console.log("Age is not valid");
        return false;
    }
}
document.getElementById("register").addEventListener("click", function(event) {
    validateAge();
});


  document.getElementById("firstName").addEventListener("input", function () {
    this.value = this.value.replace(/[^a-zA-Z ]/g, ''); 
  });
  
document.getElementById("register").addEventListener("click", function(event) {
    validateAge();
});


  document.getElementById("lastname").addEventListener("input", function () {
    this.value = this.value.replace(/[^a-zA-Z ]/g, ''); 
  });
  