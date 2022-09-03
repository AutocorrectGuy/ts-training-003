interface IformData {
  [k: string]: FormDataEntryValue
}

export const formDataToObject = (e: React.FormEvent<HTMLFormElement>) => {
  const formData = Object.fromEntries(new FormData(e.currentTarget))
  formData.username = `${formData.username}`.toLowerCase()
  return formData
}

export const filterDataToPost = (formData: IformData) => {
  const keysForDb = ["username", "password", "employeeRegistration"]

  return (Object.keys(formData)
    .filter(key => keysForDb.includes(key))
    .reduce((acc, curr) => ({ ...acc, [curr]: formData[curr] }), {})
  )
}