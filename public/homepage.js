document.querySelectorAll(".players").forEach((element) => {
    element.addEventListener('click', async (e) => {
    console.log("")
    Swal.fire({
        title: 'Sweet!',
        text: 'Modal with a custom image.',
        imageUrl: 'https://unsplash.it/400/200',
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: 'Custom image',
      })
});
})