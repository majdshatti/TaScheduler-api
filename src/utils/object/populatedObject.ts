const getPopulatedObject = (populatedObject: Object) => {
  try {
    const jsonObject = JSON.stringify(populatedObject);
    const obj = JSON.parse(jsonObject);
    return obj;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export default getPopulatedObject;
