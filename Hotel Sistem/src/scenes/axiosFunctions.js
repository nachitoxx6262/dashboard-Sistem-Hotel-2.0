import axios from "axios";
export const registerFamily = async(data)=>{
     let response = await axios({
        url: "http://localhost:3001/client",
        method: "POST",
        data: data,
      });
      return response
}

export const registerCompany = async(data)=>{
    let response = await axios({
        url: "http://localhost:3001/company",
        method: "POST",
        data: data,
      });
      return response
}
export const updateDate = async(fullfecha,id)=>{
  let response = await axios({
    url: `http://localhost:3001/client/date/${id}`,
    method: "PUT",
    data: {date:fullfecha},
  });
  return response
}
export const registerRoom = async(number,capacity,type)=>{
  let response = await axios({
    url: `http://localhost:3001/room`,
    method: "POST",
    data: {number,capacity,type},
  })
  return response
}

export const deleteRoom = async(id)=>{
  let response = await axios({
    url:`http://localhost:3001/room`,
    method: "DELETE",
    data: {id}
  })
  console.log(response)
  return response
}

export const updateStatusRoom = async(id,status)=>{
  let response = await axios({
    url:`http://localhost:3001/room/${id}`,
    method: "PUT",
    data: {status}
  })
  console.log(response)
  return response
}