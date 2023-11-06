document.querySelectorAll(".players").forEach((element) => {
    element.addEventListener('click', async (e) => {
    let {value: nameInput} = Swal.fire({
      html: `
      
      `,
      input: "text",
      inputLabel: "Name",
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return "You need to write something!";
        }
      }
    });
});
})

