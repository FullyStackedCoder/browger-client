export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties
  };
};

export const checkValidity = (value, rules, compareWith) => {
  let isValid = true;

  if (rules.required) {
    isValid = value.trim() !== "" && isValid;
  }

  if (rules.minLength) {
    isValid = value.length >= rules.minLength && isValid;
  }

  if (rules.maxLength) {
    isValid = value.length <= rules.maxLength && isValid;
  }

  if (rules.isEmail) {
    const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    isValid = pattern.test(value) && isValid;
  }

  if (rules.isNumeric) {
    const pattern = /^\d+$/;
    isValid = pattern.test(value) && isValid;
  }

  if (rules.isComparable) {
    isValid = value.trim() === compareWith.trim() && isValid;
  }

  return isValid;
};

export const formatDateTimeFromTicks = nTicks => {
  return new Date(nTicks).toLocaleString();
};

export const formatDateFromTicks = nTicks => {
  return new Date(nTicks).toLocaleDateString();
};

export const formatTimeFromTicks = nTicks => {
  return new Date(nTicks).toLocaleTimeString();
};

export const formatAMPM = time24 => {
  let ts = time24;
  let H = +ts.substr(0, 2);
  let h = H % 12 || 12;
  h = h < 10 ? "0" + h : h;
  let ampm = h < 12 ? " AM" : " PM";
  ts = h + ts.substr(2, 3) + ampm;
  return ts;
};
