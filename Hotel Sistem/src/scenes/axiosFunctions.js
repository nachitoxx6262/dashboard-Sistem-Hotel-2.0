import axios from "axios";
/// 🚨POST REGISTER CLIENTS (passengers)🚨
export const registerFamily = async(passengers)=>{
  try {
    let response = await axios({
        url: `http://localhost:3001/client`,
        method: "POST",
        data: {passengers},
      });
      return response
  } catch (e) {
    console.error(e)
  }
}
/// 🚨POST REGISTER COMPANY (data)🚨

export const registerCompany = async(data)=>{
    let response = await axios({
        url: "http://localhost:3001/company",
        method: "POST",
        data: data,
      });
      return response
}

/// 🚨PUT UPDATE DATE CLIENT (fullfecha,id)🚨

export const updateDate = async(fullfecha,id)=>{
  let response = await axios({
    url: `http://localhost:3001/client/date/${id}`,
    method: "PUT",
    data: {date:fullfecha},
  });
  return response
}

/// 🚨POST REGISTER ROOM (number,capacity,type,status)🚨

export const registerRoom = async(number,capacity,type,status)=>{
  let response = await axios({
    url: `http://localhost:3001/room`,
    method: "POST",
    data: {number,capacity,type,status},
  })
  return response
}
/// 🚨DELETE ROOM (id)🚨

export const deleteRoom = async(id)=>{
  let response = await axios({
    url:`http://localhost:3001/room`,
    method: "DELETE",
    data: {id}
  })
  console.log(response)
  return response
}
/// 🚨UPDATE STATUS ROOM  (id,status)🚨

export const updateStatusRoom = async(id,status)=>{
  console.log(id,status)
  let response = await axios({
    url:`http://localhost:3001/room`,
    method: "PUT",
    data: {id,status}
  })
  console.log(response)
  return response
}
/// 🚨POST OCCUPATION ROOM (clienIds,passangerId,price,from,to)🚨
export const occupationRoom= async(occupation)=>{
  let response = await axios({
        url: "http://localhost:3001/occupation",
        method: "POST",
        data: occupation,
      })
      return response;  
}