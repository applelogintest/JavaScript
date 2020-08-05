const special = document.querySelector(".special");
special.addEventListener("click", (event) => {
  const rect = special.getBoundingClientRect();
  console.log(rect);
  console.log(`client :  ${event.clientX}, ${event.clientY}`);
  console.log(`page :  ${event.pageX}, ${event.pageY}`);
});
