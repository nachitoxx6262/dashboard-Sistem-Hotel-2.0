import axios from "axios";
export const registerFamily = async(passengers)=>{
  let response = await axios({
        url: `http://localhost:3001/client`,
        method: "POST",
        data: {passengers},
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
export const registerRoom = async(number,capacity,type,status)=>{
  let response = await axios({
    url: `http://localhost:3001/room`,
    method: "POST",
    data: {number,capacity,type,status},
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
  console.log(id,status)
  let response = await axios({
    url:`http://localhost:3001/room`,
    method: "PUT",
    data: {id,status}
  })
  console.log(response)
  return response
}
export const bookingRoom= async(data)=>{
  console.log(data.roomId)
  let response = await axios({
        url: "http://localhost:3001/booking",
        method: "POST",
        data: data,
      })
      return response;  
}