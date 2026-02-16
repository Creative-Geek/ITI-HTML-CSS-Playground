// Fake app
// we make a fake frontend api, that checks if the input city is paris
// if it is, it returns success.
// it takes two second timeout
// any other city returns error

function checkCity(inputCity) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (inputCity === "paris") {
        resolve({ message: "City found!", status: "success" }); // Success
      } else {
        reject({ message: "City not found!", status: "error" }); // Error
      }
    }, 2000);
  });
}

async function main() {
  let city = prompt("Enter a city:");
  try {
    let result = await checkCity(city);
    console.log(result);
  } catch (error) {
    console.log(error);
  }
}

main();
