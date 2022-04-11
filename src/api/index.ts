export const getCats = async () => {
    const url = "https://cataas.com/api/cats?limit=10";
  // const url = "https://dog.ceo/api/breeds/image/random";
  try {
    const res = await fetch(url);
    return await res.json();
  } catch (err) {
    console.log(err);
  }
};
