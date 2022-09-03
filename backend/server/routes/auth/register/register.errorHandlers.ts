// handle errors

interface IerrorsObj { [key:string]:string | number | undefined | null}
export const handleErrors = (err:any) => {
  console.log(err.message, err.code);
  let errors = <IerrorsObj>{ username: '', password: '' };

  // duplicate email error
  if (err.code === 11000) {
    errors.username = "Šāds lietotājvārds jau ir reģistrēts";
    return errors;
  }

  // validation errors
  if (err.message.includes('user validation failed')) {
    // console.log(err);
    Object.values(err.errors).forEach((errVal:any) => {
      // console.log(val);
      // console.log(properties);
      errors[errVal.properties.path] = errVal.properties.message;
    });
  }

  return errors;
}