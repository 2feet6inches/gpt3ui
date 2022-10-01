export const errorResponse = (status: number, errorString: string, detail?: any) => {
  return {
    status,
    error: errorString,
    detail,
  }
}

export const successResponse = (status: number, responseData: any) => {
  return {
    status,
    data: responseData,
  }
}
