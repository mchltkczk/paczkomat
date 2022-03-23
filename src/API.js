function isPackageReceived(id) {
    fetch(`http://localhost:3000/packages/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        isPackageReceived: true,
      }),
    })
      .then((response) => response.json())
      // .then((json) => console.log(json));
  }

  export { isPackageReceived }