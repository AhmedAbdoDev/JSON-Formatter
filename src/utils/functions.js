const getBarColor = (strength) => {
  if (strength < 25) {
    return "bg-gray-400";
  } else if (strength < 50) {
    return "bg-red-500";
  } else if (strength < 75) {
    return "bg-yellow-500";
  } else {
    return "bg-green-500";
  }
};

const getStrengthText = (strength) => {
  if (strength < 25) {
    return "Very Weak";
  } else if (strength < 50) {
    return "Weak";
  } else if (strength < 75) {
    return "Good";
  } else {
    return "Very Strong";
  }
};

export { getBarColor, getStrengthText };
