document.querySelector('.topBox i:first-child').addEventListener("click", async function (e) {
    const res = await fetch('/api/room/logout', {
        method: 'PUT',
      })
      console.log("hi")
      if (res.ok) {
        window.location.href = "/";
      } 
})