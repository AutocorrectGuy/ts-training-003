// handle errors

export const handleErrors = (err:any) => {
  return ({loginError: err.message});
}